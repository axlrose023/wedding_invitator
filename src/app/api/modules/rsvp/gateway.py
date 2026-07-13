from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.modules.rsvp.models import Rsvp


class RsvpGateway:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, rsvp: Rsvp) -> Rsvp:
        self.session.add(rsvp)
        await self.session.flush()
        return rsvp

    async def get_all(self) -> Sequence[Rsvp]:
        stmt = select(Rsvp).order_by(Rsvp.created_at.desc())
        result = await self.session.execute(stmt)
        return result.scalars().all()
