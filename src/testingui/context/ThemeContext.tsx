'use client';
import { createContext, useContext } from "react";

export const ThemeCtx = createContext(true); // true = dark
export function useTheme() { return useContext(ThemeCtx); }

export function tc(dark: boolean, d: string, l: string) { return dark ? d : l; }
export function C(dark: boolean) {
  return {
    bg:        dark ? "#08090e" : "#f2f2f7",
    card:      dark ? "#0f1018" : "#ffffff",
    cardEl:    dark ? "#181926" : "#f8f8fc",
    border:    dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    borderSub: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)",
    text:      dark ? "#e8e8f2" : "#111118",
    textMid:   dark ? "rgba(232,232,242,0.65)" : "rgba(17,17,24,0.65)",
    textMuted: dark ? "#5c5d7a" : "#7777aa",
    textDim:   dark ? "#2e2f46" : "#b0b0c8",
    btnBg:     dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    btnText:   dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)",
    inputBg:   dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
    inputBdr:  dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)",
    overlay:   dark ? "rgba(8,9,14,0.92)" : "rgba(240,240,248,0.92)",
    modalBg:   dark ? "rgba(8,9,14,0.88)" : "rgba(200,200,220,0.7)",
    chipBg:    dark ? "#13141f" : "#e8e8f5",
    chipText:  dark ? "#818cf8" : "#6366f1",
    hdr:       dark ? "rgba(8,9,14,0.92)" : "rgba(242,242,247,0.92)",
  };
}