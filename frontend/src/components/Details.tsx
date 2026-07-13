import { wedding as w } from "../data";
import { SectionTitle } from "./SectionTitle";

function RouteButton({ href, dark }: { href: string; dark?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        "label mt-6 inline-block border px-8 py-3 text-[11px] transition-colors " +
        (dark
          ? "border-white/70 text-white hover:bg-white hover:text-minimal-dark"
          : "border-minimal-dark text-minimal-dark hover:bg-minimal-dark hover:text-white")
      }
    >
      ПРОКЛАСТИ МАРШРУТ
    </a>
  );
}

export function Details() {
  return (
    <section className="w-full bg-minimal-paper pt-8 pb-20 text-minimal-text">
      <div className="px-6">
        <SectionTitle>{w.details.title}</SectionTitle>
      </div>

      <div className="flex flex-col gap-6">
        {w.details.events.map((e) =>
          e.withPhoto ? (
            // Full-bleed photo: spans the whole column, no side frame.
            <div
              key={e.name}
              className="reveal relative flex min-h-[460px] flex-col justify-center overflow-hidden py-16 text-center text-white"
            >
              <img
                src="/images/banquet.jpg"
                alt=""
                className="absolute inset-0 h-full w-full scale-[1.35] object-cover grayscale sepia-[0.55] brightness-95"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative px-6">
                <EventBody e={e} dark />
              </div>
            </div>
          ) : (
            <div
              key={e.name}
              className="reveal mx-auto max-w-md px-6 py-10 text-center"
            >
              <EventBody e={e} />
            </div>
          )
        )}
      </div>
    </section>
  );
}

function EventBody({
  e,
  dark,
}: {
  e: (typeof w.details.events)[number];
  dark?: boolean;
}) {
  const secondary = dark ? "text-white/85" : "text-minimal-secondary";
  return (
    <>
      <p className="label text-[15px] tracking-[0.25em]">{e.name}</p>
      <p
        className={
          "mt-5 text-[19px] font-light underline decoration-1 underline-offset-[6px] " +
          secondary
        }
      >
        {e.time}
      </p>
      <p className="mt-5 text-[18px] font-semibold">{e.place}</p>
      <p className={"mt-1.5 text-[14px] font-light " + secondary}>
        {e.address}
      </p>
      <RouteButton href={e.mapUrl} dark={dark} />
    </>
  );
}
