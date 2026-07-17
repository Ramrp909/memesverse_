"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { AuthProvider } from "@/shared/providers/AuthProvider";
import { Toaster } from "sonner";
interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}
        <Toaster richColors position="top-center" duration={3000}/>
      </AuthProvider>
    </ThemeProvider>
  );
}