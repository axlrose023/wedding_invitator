import { useReveal } from "./hooks/useReveal";
import { MusicProvider } from "./music";
import { MusicPlayer } from "./components/MusicPlayer";
import { Hero } from "./components/Hero";
import { Greeting } from "./components/Greeting";
import { Details } from "./components/Details";
import { DressCode } from "./components/DressCode";
import { Timeline } from "./components/Timeline";
import { Gifts } from "./components/Gifts";
import { Connected } from "./components/Connected";
import { Attendance } from "./components/Attendance";
import { Questions } from "./components/Questions";
import { Stats } from "./components/Stats";
import { Countdown } from "./components/Countdown";
import { Footer } from "./components/Footer";

export default function App() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <MusicProvider>
      <div
        ref={ref}
        className="app-content relative mx-auto min-h-screen w-full max-w-[480px] bg-minimal-bg shadow-sm"
      >
        <MusicPlayer />
        <Hero />
      <Greeting />
      <Details />
      <DressCode />
      <Timeline />
      <Gifts />
      <Connected />
      <Attendance />
      <Questions />
      <Stats />
      <Countdown />
      <Footer />
      </div>
    </MusicProvider>
  );
}
