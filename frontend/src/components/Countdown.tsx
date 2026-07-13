import { useEffect, useState } from "react";
import { wedding as w } from "../data";
import { SectionTitle } from "./SectionTitle";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export function Countdown() {
  const target = new Date(w.dateISO).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { v: t.days, l: "DAYS" },
    { v: t.hours, l: "HOURS" },
    { v: t.minutes, l: "MINUTES" },
    { v: t.seconds, l: "SECONDS" },
  ];

  return (
    <section className="w-full bg-minimal-paper px-6 py-20 text-minimal-text">
      <SectionTitle>{w.countdown.title}</SectionTitle>

      <div className="reveal mx-auto mt-10 flex max-w-sm justify-center gap-6">
        {cells.map((c) => (
          <div key={c.l} className="flex flex-col items-center">
            <span className="text-[34px] font-light tabular-nums">
              {String(c.v).padStart(2, "0")}
            </span>
            <span className="label mt-2 text-[9px] text-minimal-muted">
              {c.l}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
