from collections.abc import Sequence

from app.api.modules.rsvp.models import Rsvp
from app.api.modules.rsvp.schema import CreateRsvpRequest
from app.database.uow import UnitOfWork


class RsvpService:
    def __init__(self, uow: UnitOfWork):
        self.uow = uow

    async def create_rsvp(self, request: CreateRsvpRequest) -> Rsvp:
        rsvp = Rsvp(
            name=request.name,
            attending=request.attending,
            comment=request.comment,
        )
        await self.uow.rsvps.create(rsvp)
        await self.uow.commit()
        return rsvp

    async def get_rsvps(self) -> Sequence[Rsvp]:
        return await self.uow.rsvps.get_all()
