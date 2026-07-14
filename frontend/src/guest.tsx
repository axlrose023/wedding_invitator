import { createContext, useContext, useEffect, useState } from "react";
import { fetchGuest, type Guest } from "./api";

interface GuestApi {
  guest: Guest | null; // resolved personalised guest, or null (generic)
  slug: string | null; // the ?g= slug from the URL, if any
  loaded: boolean; // false only while a slug is still being resolved
}

const GuestContext = createContext<GuestApi>({
  guest: null,
  slug: null,
  loaded: true,
});

// Read the guest slug from ?g=… and KEEP it in the URL. Telegram's in-app
// browser → "Open in browser" carries the current URL over, so stripping the
// query here would lose the guest's name on that hop.
function readSlug(): string | null {
  try {
    return new URLSearchParams(window.location.search).get("g");
  } catch {
    return null;
  }
}

export function GuestProvider({ children }: { children: React.ReactNode }) {
  const [slug] = useState(readSlug);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loaded, setLoaded] = useState(!slug);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    fetchGuest(slug)
      .then((g) => active && setGuest(g))
      .catch(() => {})
      .finally(() => active && setLoaded(true));
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <GuestContext.Provider value={{ guest, slug, loaded }}>
      {children}
    </GuestContext.Provider>
  );
}

export function useGuest(): GuestApi {
  return useContext(GuestContext);
}
