import { ReactNode } from "react";

interface AppContainerProps {
  children: ReactNode;
  className?: string;
}

export default function AppContainer({
  children,
  className = "",
}: AppContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-2xl px-3 sm:px-4 ${className}`}
    >
      {children}
    </div>
  );
}