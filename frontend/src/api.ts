// Same-host API calls. FastAPI serves both the SPA and these endpoints.

export interface RsvpPayload {
  name: string;
  attending: boolean;
  guest_slug?: string;
}

export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  const res = await fetch("/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`RSVP failed: ${res.status}`);
}

export interface Guest {
  slug: string;
  greeting: string;
  name: string;
}

// Resolve a personalised invitation by its slug. Returns null when the slug
// is unknown (404), so the page can fall back to the generic greeting.
export async function fetchGuest(slug: string): Promise<Guest | null> {
  const res = await fetch(`/api/guests/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`guest fetch failed: ${res.status}`);
  return (await res.json()) as Guest;
}
