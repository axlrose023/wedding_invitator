import { useState } from "react";
import { wedding as w } from "../data";
import { SectionTitle } from "./SectionTitle";

export function Questions() {
  const [open, setOpen] = useState(0);

  return (
    <section className="w-full bg-minimal-paper px-6 py-20 text-minimal-text">
      <SectionTitle>{w.questions.title}</SectionTitle>

      <div className="reveal mx-auto mt-10 max-w-md">
        {w.questions.items.map((item, i) => {
          const isOpen = open === i;
          const num = String(i + 1).padStart(2, "0");
          return (
            <div key={i} className="border-b border-minimal-text/15">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <span className="label text-[11px] text-minimal-muted">
                  {num}
                </span>
                <span className="flex-1 text-[14px] font-light">{item.q}</span>
                <span
                  className={
                    "text-minimal-muted transition-transform " +
                    (isOpen ? "rotate-45" : "")
                  }
                >
                  +
                </span>
              </button>
              <div
                className={
                  "overflow-hidden transition-all duration-300 " +
                  (isOpen ? "max-h-40 pb-5" : "max-h-0")
                }
              >
                <p className="pl-10 text-[13px] font-light leading-relaxed text-minimal-secondary">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
