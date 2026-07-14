from app.api.modules.guests.models import Guest
from app.database.uow import UnitOfWork


class GuestService:
    def __init__(self, uow: UnitOfWork):
        self.uow = uow

    async def get_by_slug(self, slug: str) -> Guest | None:
        return await self.uow.guests.get_by_slug(slug)
