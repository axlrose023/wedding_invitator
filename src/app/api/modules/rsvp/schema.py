from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class CreateRsvpRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    attending: bool
    comment: str | None = Field(default=None, max_length=1000)
    # When present and valid, the response is attributed to this guest and
    # the stored name is taken from the guest record.
    guest_slug: str | None = Field(default=None, max_length=100)

    model_config = ConfigDict(extra="forbid")


class RsvpResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    name: str
    attending: bool
    comment: str | None
