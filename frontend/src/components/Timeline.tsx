import { wedding as w } from "../data";
import { SectionTitle } from "./SectionTitle";

// Centre-line timeline: a vertical rail with square nodes, entries alternating
// left / right of the rail (zig-zag), title aligned to the right.
export function Timeline() {
  return (
    <section className="w-full bg-minimal-paper px-6 py-20 text-minimal-text">
      <SectionTitle>{w.timeline.title}</SectionTitle>

      <div className="reveal relative mx-auto mt-14 max-w-sm">
        {/* central rail */}
        <span className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-minimal-text/25" />

        {w.timeline.items.map((it, i) => {
          const left = i % 2 === 0;
          return (
            <div
              key={it.time}
              className="relative grid grid-cols-2 pb-14 last:pb-0"
            >
              {/* square node on the rail */}
              <span className="absolute left-1/2 top-1.5 h-2.5 w-2.5 -translate-x-1/2 bg-minimal-text" />

              <div
                className={
                  left
                    ? "col-start-1 pr-7 text-right"
                    : "col-start-2 pl-7 text-left"
                }
              >
                <p className="text-[20px] font-medium tracking-wide">
                  {it.time}
                </p>
                <p className="mt-1 text-[14px] font-light text-minimal-secondary">
                  {it.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
