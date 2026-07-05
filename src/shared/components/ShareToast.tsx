interface Props {
  visible: boolean;
  message?: string;
}

export function ShareToast({ visible, message = "Post shared" }: Props) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[90] -translate-x-1/2 px-3">
      <div className="rounded-full border border-[var(--mv-border)] bg-[var(--mv-card)] px-4 py-2 text-sm font-semibold text-[var(--mv-text)] shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur">
        {message}
      </div>
    </div>
  );
}
