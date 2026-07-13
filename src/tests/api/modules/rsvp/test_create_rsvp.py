import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
class TestCreateRsvp:
    endpoint = "/api/rsvp"

    async def test_create_rsvp_yes(self, client: AsyncClient):
        payload = {"name": "Іван Петренко", "attending": True}

        resp = await client.post(self.endpoint, json=payload)

        assert resp.status_code == 201
        data = resp.json()
        assert "id" in data
        assert data["name"] == "Іван Петренко"
        assert data["attending"] is True

    async def test_create_rsvp_no_with_comment(self, client: AsyncClient):
        payload = {
            "name": "Марія",
            "attending": False,
            "comment": "На жаль, не зможемо бути",
        }

        resp = await client.post(self.endpoint, json=payload)

        assert resp.status_code == 201
        data = resp.json()
        assert data["attending"] is False
        assert data["comment"] == "На жаль, не зможемо бути"

    async def test_create_rsvp_empty_name(self, client: AsyncClient):
        payload = {"name": "", "attending": True}

        resp = await client.post(self.endpoint, json=payload)

        assert resp.status_code == 422

    async def test_list_rsvps_requires_auth(self, client: AsyncClient):
        resp = await client.get(self.endpoint)

        assert resp.status_code in (401, 403)
