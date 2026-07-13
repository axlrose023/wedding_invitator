import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Skip the intro — start playback (and every loop) at 0:28.
// The `#t=` media fragment makes the browser start natively at the offset,
// independent of the JS metadata-load race; the JS seek below is the backup
// and also handles the loop-back.
const START_OFFSET = 28;
const TRACK_SRC = `/music/kohannya.mp3#t=${START_OFFSET}`;
export const TRACK_TITLE = "Pianoboy — Кохання";

interface MusicApi {
  playing: boolean;
  play: () => void;
  toggle: () => void;
}

const MusicContext = createContext<MusicApi | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // Create the audio element once.
  useEffect(() => {
    const audio = new Audio(TRACK_SRC);
    audio.preload = "auto";
    audio.volume = 0.6;
    audioRef.current = audio;

    // Seek to the offset before playback begins and on every loop.
    const seekToStart = () => {
      try {
        audio.currentTime = START_OFFSET;
      } catch {
        /* not seekable yet — loadedmetadata will retry */
      }
    };
    audio.addEventListener("loadedmetadata", seekToStart);
    const onEnded = () => {
      seekToStart();
      void audio.play().catch(() => {});
    };
    audio.addEventListener("ended", onEnded);

    const sync = () => setPlaying(!audio.paused);
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);

    // Optimistic autoplay + fallback: start on the very first user gesture.
    const start = async () => {
      try {
        // Seek before play when metadata is already available so mobile
        // (iOS/Android) never plays a blip of the intro before the offset.
        if (audio.readyState >= 1 && audio.currentTime < START_OFFSET) {
          seekToStart();
        }
        await audio.play();
        seekToStart();
        removeGestureListeners();
      } catch {
        /* blocked — wait for a gesture */
      }
    };
    const onGesture = () => start();
    const events = ["pointerdown", "keydown", "touchstart", "scroll"];
    const addGestureListeners = () =>
      events.forEach((e) =>
        window.addEventListener(e, onGesture, { once: true, passive: true })
      );
    const removeGestureListeners = () =>
      events.forEach((e) => window.removeEventListener(e, onGesture));

    void start();
    addGestureListeners();

    return () => {
      removeGestureListeners();
      audio.removeEventListener("loadedmetadata", seekToStart);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
      audio.pause();
    };
  }, []);

  const api = useMemo<MusicApi>(
    () => ({
      playing,
      play: () => void audioRef.current?.play().catch(() => {}),
      toggle: () => {
        const a = audioRef.current;
        if (!a) return;
        if (a.paused) void a.play().catch(() => {});
        else a.pause();
      },
    }),
    [playing]
  );

  return <MusicContext.Provider value={api}>{children}</MusicContext.Provider>;
}

export function useMusic(): MusicApi {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
