import type { Metadata } from "next";

import { GlobalOverlayManager } from "@/components/shared/global-overlay-manager/global-overlay-manager";
import { ItalianPlate } from "@/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Zeely Test Task",
  description: "Test task assignment for Artem Bodnia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ItalianPlate.className} antialiased`}>
        {children}
        <GlobalOverlayManager />
      </body>
    </html>
  );
}
