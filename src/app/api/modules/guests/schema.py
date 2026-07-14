from pydantic import BaseModel, ConfigDict


class GuestResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    slug: str
    greeting: str
    name: str
