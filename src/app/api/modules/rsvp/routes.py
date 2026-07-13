from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter, Depends

from app.api.modules.auth.services.auth import AuthenticateUser
from app.api.modules.rsvp.schema import CreateRsvpRequest, RsvpResponse
from app.api.modules.rsvp.service import RsvpService
from app.api.modules.users.models import User

router = APIRouter(route_class=DishkaRoute)


@router.post("", response_model=RsvpResponse, status_code=201)
async def create_rsvp(
    request: CreateRsvpRequest,
    service: FromDishka[RsvpService],
) -> RsvpResponse:
    """Public endpoint: a guest confirms attendance."""
    return await service.create_rsvp(request)


@router.get("", response_model=list[RsvpResponse])
async def get_rsvps(
    service: FromDishka[RsvpService],
    current_user: User = Depends(AuthenticateUser()),
) -> list[RsvpResponse]:
    """Admin-only: list all collected responses."""
    return list(await service.get_rsvps())
