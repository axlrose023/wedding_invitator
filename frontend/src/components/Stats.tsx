import { wedding as w } from "../data";

// Whole days from `togetherSince` to today.
function daysTogether(): number {
  const start = new Date(w.togetherSince).getTime();
  return Math.max(0, Math.floor((Date.now() - start) / 86_400_000));
}

// Dark photo band with four "us in numbers" figures.
export function Stats() {
  const days = daysTogether();
  return (
    <section className="relative w-full overflow-hidden px-6 py-24 text-center text-white">
      <img
        src="/images/stats.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative mx-auto grid max-w-md grid-cols-1 gap-12">
        {w.stats.items.map((s) => (
          <div key={s.label} className="reveal">
            <p className="font-serif text-[56px] font-light leading-none">
              {s.value ?? days}
            </p>
            <p className="label mt-3 text-[10px] text-white/75">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
