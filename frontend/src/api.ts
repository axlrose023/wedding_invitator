// Same-host API calls. FastAPI serves both the SPA and these endpoints.

export interface RsvpPayload {
  name: string;
  attending: boolean;
}

export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  const res = await fetch("/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`RSVP failed: ${res.status}`);
}
