from collections.abc import Sequence

from app.api.modules.rsvp.models import Rsvp
from app.api.modules.rsvp.schema import CreateRsvpRequest
from app.database.uow import UnitOfWork


class RsvpService:
    def __init__(self, uow: UnitOfWork):
        self.uow = uow

    async def create_rsvp(self, request: CreateRsvpRequest) -> Rsvp:
        guest_id = None
        name = request.name
        if request.guest_slug:
            guest = await self.uow.guests.get_by_slug(request.guest_slug)
            if guest is not None:
                guest_id = guest.id
                name = guest.name  # trust the invitation, not the client
        rsvp = Rsvp(
            name=name,
            attending=request.attending,
            comment=request.comment,
            guest_id=guest_id,
        )
        await self.uow.rsvps.create(rsvp)
        await self.uow.commit()
        return rsvp

    async def get_rsvps(self) -> Sequence[Rsvp]:
        return await self.uow.rsvps.get_all()
