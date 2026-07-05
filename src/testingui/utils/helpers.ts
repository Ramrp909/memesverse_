export function fmtNum(n: number) {
  return n >= 1_000_000
    ? (n / 1_000_000).toFixed(1) + "M"
    : n >= 1_000
      ? (n / 1_000).toFixed(1) + "K"
      : String(n);
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}