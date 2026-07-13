import { wedding as w } from "../data";

// Full-screen B&W photo with date (top-left), stats icon (top-right),
// kicker + names (center) and city (bottom-right).
export function Hero() {
  return (
    <section className="relative h-screen-safe w-full overflow-hidden text-white">
      <img
        src="/images/hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />
      <div className="absolute inset-0 bg-black/15" />

      {/* date */}
      <span className="absolute left-6 top-6 text-lg font-light tracking-wide">
        {w.dateLabel}
      </span>

      {/* names block */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="label text-[12px] leading-relaxed text-white/90">
          {w.kicker}
        </p>
        <p className="label mb-2 text-[12px] text-white/90">{w.kickerOf}</p>

        <h1 className="font-signature text-[64px] leading-[0.9] sm:text-[76px]">
          {w.groom}
        </h1>
        <span className="font-signature -mt-2 text-[40px] sm:text-[46px]">
          {w.and}
        </span>
        <h1 className="font-signature -mt-1 text-[64px] leading-[0.9] sm:text-[76px]">
          {w.bride}
        </h1>
      </div>

      {/* city */}
      <span className="label absolute bottom-6 right-6 text-sm font-medium">
        {w.city}
      </span>
    </section>
  );
}
