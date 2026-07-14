import { wedding as w } from "../data";
import { SectionTitle } from "./SectionTitle";
import { useGuest } from "../guest";

export function Greeting() {
  const { guest, slug, loaded } = useGuest();
  // While a personalised slug is still resolving, keep the line blank to
  // avoid flashing the generic greeting before the name arrives.
  const pending = !!slug && !loaded;
  const heading = guest?.greeting ?? w.greeting.heading;

  return (
    <section className="w-full bg-minimal-paper px-6 pt-20 pb-0 text-minimal-text">
      <SectionTitle>{w.greeting.title}</SectionTitle>
      <div className="reveal mx-auto mt-10 max-w-md text-center">
        <p className="label mb-6 text-[13px] text-minimal-text">
          {pending ? " " : heading}
        </p>
        <p className="text-[15px] font-light leading-relaxed text-minimal-secondary">
          {w.greeting.text}
        </p>
      </div>
    </section>
  );
}
