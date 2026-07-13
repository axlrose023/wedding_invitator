import { useEffect, useState } from "react";
import { wedding as w } from "../data";
import { useMusic } from "../music";

// Full-screen cover shown first. The single tap to enter is also the user
// gesture that lets the music start with sound — the reliable way to have
// music "playing from the start" for every guest.
//
// On tap the cover plays a cinematic dissolve: the single hero image drifts
// gently toward the viewer, softens and fades, the title lifts away, a warm
// light blooms — and the invitation settles into focus underneath. One image,
// so there is no seam anywhere.
export function Intro() {
  const { play } = useMusic();
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  // While the cover is up, lock the page and keep it at the very top so the
  // invitation always opens from the beginning — the fixed overlay would
  // otherwise let the content scroll behind it (or the browser restore an old
  // scroll position on reload).
  useEffect(() => {
    if (gone) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gone]);

  const enter = () => {
    if (leaving) return;
    play();

    // Reveal the invitation already positioned on the second slide (Greeting),
    // not the top. Done instantly while the cover still hides the viewport, so
    // the jump is invisible — the page simply appears there as the cover fades.
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const target = document.querySelectorAll<HTMLElement>(
      ".app-content > section"
    )[1];
    document.body.style.overflow = "";
    if (target) target.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    html.style.scrollBehavior = prevScrollBehavior;

    // Let the invitation underneath settle into focus as the cover dissolves.
    html.classList.add("intro-opening");
    setLeaving(true);
    // Matches the longest transition below (the cover), then unmount.
    setTimeout(() => {
      html.classList.remove("intro-opening");
      setGone(true);
    }, 1450);
  };

  if (gone) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={enter}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && enter()}
      aria-label="Відкрити запрошення"
      className={
        "intro-root fixed inset-0 z-[100] overflow-hidden text-white " +
        (leaving ? "intro-leaving pointer-events-none" : "cursor-pointer")
      }
    >
      {/* The single cover image — drifts in, softens and fades on open */}
      <div
        className={
          "intro-cover absolute inset-0 will-change-transform " +
          (leaving ? "intro-cover-out" : "")
        }
      >
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/40" />
        {/* soft vignette for depth */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_45%,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
      </div>

      {/* Warm light bloom that flares as the cover opens */}
      <div className="intro-bloom pointer-events-none absolute left-1/2 top-1/2 z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,248,235,0.65)_0%,rgba(255,248,235,0)_65%)]" />

      {/* Title — lifts and fades away as the cover dissolves */}
      <div
        className={
          "intro-title pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center " +
          (leaving ? "-translate-y-4 opacity-0" : "translate-y-0 opacity-100")
        }
      >
        <p className="label text-[12px] text-white/90">{w.kicker}</p>
        <p className="label mb-3 text-[12px] text-white/90">{w.kickerOf}</p>
        <span className="font-signature text-[56px] leading-[0.9]">
          {w.groom}
        </span>
        <span className="font-signature -mt-1 text-[32px]">{w.and}</span>
        <span className="font-signature -mt-1 text-[56px] leading-[0.9]">
          {w.bride}
        </span>

        <span className="label mt-12 border border-white/70 px-8 py-3 text-[11px] intro-cta">
          Відкрити запрошення
        </span>
      </div>
    </div>
  );
}
