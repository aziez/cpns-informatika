import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import QueryProviders from "@/providers/query-provider";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Data CASN - Teknik Informatikaa",
  description: "Data CASN T",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <QueryProviders>
          <h1 className="text-center text-xl font-bold tracking-tighter sm:text-2xl md:text-2xl">
            DATA FORMASI CPNS 2024
          </h1>
          <h1 className="text-center text-xl font-bold tracking-tighter sm:text-2xl md:text-2xl">
            S-1/Sarjana - Teknik Informatika
          </h1>
          {children}
        </QueryProviders>
      </body>
    </html>
  );
}
