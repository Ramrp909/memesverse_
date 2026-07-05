
import {
  ThemeCtx,
  useTheme,
  C,
  tc,
} from "../context/ThemeContext"
import { DayDrop } from "../types/post";


export default function DateDivider({ day }: { day: DayDrop }) {
  const dark = useTheme();
  const c = C(dark);
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px" style={{ background: c.borderSub }} />
      <div className="text-center">
        <p className="text-sm font-black uppercase" style={{ fontFamily: "'Onest',sans-serif", letterSpacing: "-0.01em", color: c.text }}>{day.label}</p>
        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: "'Onest',sans-serif", color: c.textDim }}>
          {day.date} · {day.dropTime} · {day.posts.length} posts
        </p>
      </div>
      <div className="flex-1 h-px" style={{ background: c.borderSub }} />
    </div>
  );
}