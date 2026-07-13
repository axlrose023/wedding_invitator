// Cursive section heading used across the invitation ("Our big day", "Details"...).
export function SectionTitle({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "right";
}) {
  return (
    <h2
      className={
        "section-title reveal text-[64px] sm:text-[72px] " +
        (align === "right" ? "text-right" : "text-center")
      }
    >
      {children}
    </h2>
  );
}
