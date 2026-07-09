interface Props {
  label: string;
  meta?: string;
}

import type { DayDrop } from "../types/feed.model";

export default function DateDivider({ day }: { day: DayDrop }) {
 
 
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px" style={{ background:"var(--mv-border-subtle)" }} />
      <div className="text-center">
        <p className="text-sm font-black uppercase" style={{ fontFamily: "'Onest',sans-serif", letterSpacing: "-0.01em", color:"var(--mv-text)"}}>{day.label}</p>
        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: "'Onest',sans-serif",color:"var(--mv-text-dim)" }}>
          {day.date} · {day.dropTime} · {day.posts.length} posts
        </p>
      </div>
      <div className="flex-1 h-px" style={{ background:"var(--mv-border-subtle)" }} />
    </div>
  );
}