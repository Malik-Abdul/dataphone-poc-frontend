import type { Metadata } from "next";
import "./globals.css";

import ThemeProvider from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "DataPhone POC",
  description: "DataPhone carrier management POC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
