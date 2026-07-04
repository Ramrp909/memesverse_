
import { padTwo } from "@/shared/utils/number";
import { useState, useEffect } from "react";


function getNextMidnightUTC(): number {
  const now = new Date();
  const nextMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return nextMidnight.getTime();
}

export function useCountdown() {
//   const [hh, setHh] = useState("00");
//   const [mm, setMm] = useState("00");
//   const [ss, setSs] = useState("00");
const [time, setTime] = useState({
  hh: "00",
  mm: "00",
  ss: "00",
});

  useEffect(() => {
    const target = getNextMidnightUTC();

    function tick() {
      const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      setTime({
  hh: padTwo(h),
  mm: padTwo(m),
  ss: padTwo(s),
});
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
