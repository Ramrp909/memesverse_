"use client";
import { useEffect, useState } from "react";

export function getNextDrop() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
}

export function useCountdown() {
  const [secs, setSecs] = useState(() => Math.max(0, Math.floor((getNextDrop().getTime() - Date.now()) / 1000)));
  useEffect(() => {
    const id = setInterval(() => setSecs(Math.max(0, Math.floor((getNextDrop().getTime() - Date.now()) / 1000))), 1000);
    return () => clearInterval(id);
  }, []);
  return { h: Math.floor(secs / 3600), m: Math.floor((secs % 3600) / 60), s: secs % 60 };
}