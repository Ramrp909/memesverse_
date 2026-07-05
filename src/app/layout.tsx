import Providers from "./providers";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--mv-bg)] text-[var(--mv-text)] transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}