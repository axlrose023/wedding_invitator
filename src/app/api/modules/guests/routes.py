from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter, HTTPException

from app.api.modules.guests.schema import GuestResponse
from app.api.modules.guests.service import GuestService

router = APIRouter(route_class=DishkaRoute)


@router.get("/{slug}", response_model=GuestResponse)
async def get_guest(
    slug: str,
    service: FromDishka[GuestService],
) -> GuestResponse:
    """Public endpoint: resolve a personalised invitation by its slug."""
    guest = await service.get_by_slug(slug)
    if guest is None:
        raise HTTPException(status_code=404, detail="Guest not found")
    return guest
