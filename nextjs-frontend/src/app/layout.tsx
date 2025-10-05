import type { Metadata } from "next";
import { AuthProvider, ProtectRoute } from "@/providers/AuthProvider";
import "./globals.scss";

export const metadata: Metadata = {
  title: "TaskHub",
  description: "TaskHub application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ProtectRoute>
            {children}
          </ProtectRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
