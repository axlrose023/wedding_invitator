import { wedding as w } from "../data";
import { SectionTitle } from "./SectionTitle";

export function Greeting() {
  return (
    <section className="w-full bg-minimal-paper px-6 py-20 text-minimal-text">
      <SectionTitle>{w.greeting.title}</SectionTitle>
      <div className="reveal mx-auto mt-10 max-w-md text-center">
        <p className="label mb-6 text-[13px] text-minimal-text">
          {w.greeting.heading}
        </p>
        <p className="text-[15px] font-light leading-relaxed text-minimal-secondary">
          {w.greeting.text}
        </p>
      </div>
    </section>
  );
}
