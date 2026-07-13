import { wedding as w } from "../data";

// Dark photo band: shared-chat CTA + coordinator contact.
export function Connected() {
  const c = w.connected;
  return (
    <section className="relative w-full overflow-hidden px-6 py-20 text-center text-white">
      <img
        src="/images/contacts.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto max-w-md">
        <h2 className="section-title reveal text-[64px] text-white" style={{ color: "#fff" }}>
          {c.title}
        </h2>

        <p className="reveal mt-6 text-[15px] font-light leading-relaxed text-white/85">
          {c.chatText}
        </p>
        <a
          href={c.chatUrl}
          className="label reveal mt-6 inline-block border border-white/70 px-8 py-3 text-[11px] transition-colors hover:bg-white hover:text-minimal-dark"
        >
          {c.chatCta}
        </a>

        <p className="reveal mt-12 text-[14px] font-light leading-relaxed text-white/80">
          {c.helpText}
        </p>

        <div className="reveal mt-6">
          <p className="font-script text-[44px] leading-none">{c.coordinatorName}</p>
          <p className="label mt-2 text-[10px] text-white/70">{c.coordinatorRole}</p>
          <a href={`tel:${c.coordinatorPhone.replace(/\s/g, "")}`} className="mt-2 block text-[15px] font-light">
            {c.coordinatorPhone}
          </a>
        </div>
      </div>
    </section>
  );
}
