from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.modules.guests.models import Guest


class GuestGateway:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_slug(self, slug: str) -> Guest | None:
        stmt = select(Guest).where(Guest.slug == slug)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all(self) -> Sequence[Guest]:
        stmt = select(Guest).order_by(Guest.created_at.desc())
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def create(self, guest: Guest) -> Guest:
        self.session.add(guest)
        await self.session.flush()
        return guest

    async def upsert(self, slug: str, greeting: str, name: str) -> Guest:
        existing = await self.get_by_slug(slug)
        if existing is not None:
            existing.greeting = greeting
            existing.name = name
            return existing
        return await self.create(Guest(slug=slug, greeting=greeting, name=name))
