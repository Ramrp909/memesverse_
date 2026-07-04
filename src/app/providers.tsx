"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { AuthProvider } from "@/shared/providers/AuthProvider";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}