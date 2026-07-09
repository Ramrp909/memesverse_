import { ReactNode } from "react";

interface AppMainProps {
  children: ReactNode;
  className?: string;
}

export default function AppMain({
  children,
  className = "",
}: AppMainProps) {
  return (
    <main className={`flex-1 ${className}`}>
      {children}
    </main>
  );
}