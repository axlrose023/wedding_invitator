import { useMusic, TRACK_TITLE } from "../music";

// Animated equalizer toggle, pinned to the top-right corner of the invitation.
export function MusicPlayer() {
  const { playing, toggle } = useMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? `Пауза: ${TRACK_TITLE}` : `Грати: ${TRACK_TITLE}`}
      title={TRACK_TITLE}
      className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-black/25 text-white backdrop-blur-md transition-transform active:scale-95"
    >
      <span className={"equalizer" + (playing ? " playing" : "")}>
        <span />
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
