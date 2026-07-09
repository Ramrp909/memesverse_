import { ReactNode } from "react";

interface AppHeaderProps {
  children: ReactNode;
}

export default function AppHeader({
  children,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20">
      {children}
    </header>
  );
}