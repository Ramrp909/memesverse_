interface Props {
  label: string;
  meta?: string;
}

export function DateDivider({ label, meta }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0 2px" }}>
      <div style={{ flex: 1, height: 1, background: "var(--mv-border-sub)" }} />
      <div style={{ textAlign: "center", flexShrink: 0 }}>
        <div style={{ fontFamily: "'Onest', sans-serif", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--mv-text)" }}>
          {label}
        </div>
        {meta && (
          <div style={{ fontFamily: "'Onest', sans-serif", fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--mv-text-dim)", marginTop: 2 }}>
            {meta}
          </div>
        )}
      </div>
      <div style={{ flex: 1, height: 1, background: "var(--mv-border-sub)" }} />
    </div>
  );
}
