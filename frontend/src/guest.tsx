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

const STORAGE_KEY = "wg";

// Read the guest slug from ?g=… then hide it: strip the query from the address
// bar and remember it locally, so the URL stays clean and a reload still keeps
// the personalised greeting.
function readSlug(): string | null {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("g");
    if (fromUrl) {
      try {
        localStorage.setItem(STORAGE_KEY, fromUrl);
      } catch {
        /* storage unavailable — still works for this page load */
      }
      window.history.replaceState(null, "", window.location.pathname);
      return fromUrl;
    }
    return localStorage.getItem(STORAGE_KEY);
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
