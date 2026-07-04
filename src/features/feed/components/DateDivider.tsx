interface Props {
  label: string;
  meta?: string;
}

export function DateDivider({ label, meta }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "4px 0" }}>
      <div style={{ flex: 1, height: 1, background: "var(--mv-border-sub)" }} />
      <div style={{ textAlign: "center", flexShrink: 0 }}>
        <div style={{ fontFamily: "'Onest', sans-serif", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: "-0.01em", color: "var(--mv-text)" }}>
          {label}
        </div>
        {meta && (
          <div style={{ fontFamily: "'Onest', sans-serif", fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--mv-text-dim)" }}>
            {meta}
          </div>
        )}
      </div>
      <div style={{ flex: 1, height: 1, background: "var(--mv-border-sub)" }} />
    </div>
  );
}
