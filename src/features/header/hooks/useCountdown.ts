"use client";

import { useEffect, useState } from "react";
import { padTwo } from "@/shared/utils/number";

export interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;

  hh: string;
  mm: string;
  ss: string;
}

function getNextMidnightUTC(): number {
  const now = new Date();

  return Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0,
    0,
    0,
    0
  );
}

export function useCountdown(): CountdownTime {
  const [time, setTime] = useState<CountdownTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    hh: "00",
    mm: "00",
    ss: "00",
  });

  useEffect(() => {
    function tick() {
      const diff = Math.max(
        0,
        Math.floor((getNextMidnightUTC() - Date.now()) / 1000)
      );

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setTime({
        hours,
        minutes,
        seconds,
        hh: padTwo(hours),
        mm: padTwo(minutes),
        ss: padTwo(seconds),
      });
    }

    tick();

    const interval = window.setInterval(tick, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return time;
}