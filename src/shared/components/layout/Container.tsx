import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Container({ children }: Props) {
  return (
    <main
      style={{
        maxWidth: 512,
        margin: "0 auto",
        padding: "16px 12px 96px",
      }}
    >
      {children}
    </main>
  );
}