import { wedding as w } from "../data";
import { SectionTitle } from "./SectionTitle";

export function Gifts() {
  return (
    <section className="w-full bg-minimal-paper px-6 py-20 text-minimal-text">
      <SectionTitle>{w.gifts.title}</SectionTitle>

      <div className="reveal mx-auto mt-10 max-w-md space-y-5 text-center">
        {w.gifts.lines.map((line, i) => (
          <p
            key={i}
            className="text-[15px] font-light leading-relaxed text-minimal-secondary"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
