import { wedding as w } from "../data";

export function Footer() {
  return (
    <footer className="w-full bg-minimal-dark px-6 py-12 text-center">
      <p className="font-signature text-[40px] leading-none text-white">
        {w.groom} &amp; {w.bride}
      </p>
      <p className="label mt-4 text-[10px] text-white/50">{w.dateLabel} · {w.city}</p>
    </footer>
  );
}
