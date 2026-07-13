from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base, DateTimeMixin, UUID7IDMixin


class Rsvp(Base, UUID7IDMixin, DateTimeMixin):
    __tablename__ = "rsvps"

    name: Mapped[str] = mapped_column(String, index=True)
    attending: Mapped[bool] = mapped_column(Boolean)
    comment: Mapped[str | None] = mapped_column(String, nullable=True)
