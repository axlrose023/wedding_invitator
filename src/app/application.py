import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from pathlib import Path

from dishka.integrations.fastapi import setup_dishka
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from prometheus_fastapi_instrumentator import Instrumentator

from app.api import register_routers
from app.ioc import get_async_container
from app.services.logging import setup_logging
from app.settings import get_config

config = get_config()
setup_logging(config.env)
logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/ping")
async def ping() -> None | dict:
    """Ping endpoint to check if the service is alive."""
    return {"message": "pong"}


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    logger.info("Starting application...")
    yield
    logger.info("Shutting down application...")


def get_production_app() -> FastAPI:
    """Get the FastAPI application instance."""
    app = FastAPI(
        title=config.api.title,
        version=config.api.version,
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=config.api.allowed_hosts,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_routers(router)
    app.include_router(router)

    setup_dishka(get_async_container(), app)

    # Setup Prometheus metrics
    instrumentator = Instrumentator()
    instrumentator.instrument(app).expose(app)

    # Serve the built SPA (frontend/dist) from the same host, if present.
    # Must be mounted last so API/metrics routes take precedence.
    repo_root = Path(__file__).resolve().parents[2]
    spa_dist = repo_root / "frontend" / "dist"
    if spa_dist.is_dir():
        app.mount("/", StaticFiles(directory=spa_dist, html=True), name="spa")
    else:
        logger.warning("SPA build not found at %s (run `npm run build`)", spa_dist)

    return app
