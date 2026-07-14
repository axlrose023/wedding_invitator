import { useState } from "react";
import { wedding as w } from "../data";
import { SectionTitle } from "./SectionTitle";
import { submitRsvp } from "../api";
import { useGuest } from "../guest";

export function Attendance() {
  const a = w.attendance;
  const { guest, slug } = useGuest();
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  // A personalised guest doesn't type a name — it's taken from the invitation.
  const canSubmit =
    (guest !== null || name.trim().length > 0) && attending !== null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    try {
      await submitRsvp({
        name: guest ? guest.name : name.trim(),
        attending: attending!,
        guest_slug: slug ?? undefined,
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <section className="w-full bg-minimal-paper px-6 py-20 text-center text-minimal-text">
        <SectionTitle>{a.title}</SectionTitle>
        <p className="mx-auto mt-8 max-w-sm text-[15px] font-light text-minimal-secondary">
          Дякуємо! Вашу відповідь збережено.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full bg-minimal-paper px-6 py-20 text-minimal-text">
      <SectionTitle>{a.title}</SectionTitle>

      <form
        onSubmit={handleSubmit}
        className="reveal mx-auto mt-8 flex max-w-sm flex-col items-center"
      >
        <p className="text-center text-[15px] font-light text-minimal-secondary">
          {a.subtitle}
        </p>

        {guest ? (
          <p className="mt-8 text-center text-[17px] font-medium text-minimal-text">
            {guest.name}
          </p>
        ) : (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше ім'я"
            className="mt-8 w-full border-b border-minimal-text/25 bg-transparent py-3 text-center text-[15px] font-light outline-none placeholder:text-minimal-muted focus:border-minimal-text"
          />
        )}

        <p className="mt-10 text-center text-[13px] font-light text-minimal-secondary">
          {a.question}
        </p>

        <div className="mt-6 flex gap-4">
          {[
            { label: a.yes, value: true },
            { label: a.no, value: false },
          ].map((opt) => {
            const active = attending === opt.value;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setAttending(opt.value)}
                className={
                  "label border px-10 py-3 text-[11px] transition-colors " +
                  (active
                    ? "border-minimal-dark bg-minimal-dark text-white"
                    : "border-minimal-text/30 text-minimal-text hover:border-minimal-dark")
                }
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={!canSubmit || status === "sending"}
          className="label mt-10 border border-minimal-dark px-12 py-3 text-[11px] text-minimal-dark transition-colors hover:bg-minimal-dark hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "sending" ? "…" : "ВІДПРАВИТИ"}
        </button>

        {status === "error" && (
          <p className="mt-4 text-[12px] text-red-600">
            Не вдалося надіслати. Спробуйте ще раз.
          </p>
        )}
      </form>
    </section>
  );
}
