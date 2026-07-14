import { wedding as w } from "../data";
import { SectionTitle } from "./SectionTitle";

export function DressCode() {
  return (
    <section className="w-full bg-minimal-paper px-6 pt-20 pb-0 text-minimal-text">
      <SectionTitle>{w.dressCode.title}</SectionTitle>

      <p className="reveal mx-auto mt-8 max-w-sm text-center text-[15px] font-light leading-relaxed text-minimal-secondary">
        {w.dressCode.text}
      </p>

      <p className="reveal mx-auto mt-5 max-w-sm text-center text-[15px] font-light leading-relaxed text-minimal-secondary">
        {w.dressCode.note}
      </p>
    </section>
  );
}
