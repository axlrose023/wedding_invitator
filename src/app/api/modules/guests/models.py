from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base, DateTimeMixin, UUID7IDMixin


class Guest(Base, UUID7IDMixin, DateTimeMixin):
    __tablename__ = "guests"

    # Short token used in the invitation link (?g=<slug>).
    slug: Mapped[str] = mapped_column(String, unique=True, index=True)
    # The exact vocative greeting shown instead of "ДОРОГІ ГОСТІ!"
    # (e.g. "Дорога Ірино!", "Дорогі Іван та Марія!", "Дорогі батьки!").
    greeting: Mapped[str] = mapped_column(String)
    # Human name used for RSVP attribution / admin list (e.g. "Ірина").
    name: Mapped[str] = mapped_column(String)
