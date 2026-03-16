import type { Metadata } from "next";
import { Geist, Raleway, Comfortaa } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import TanStackProvider from "./components/TanStackProvider/TanStackProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin", "cyrillic"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["cyrillic"],
  weight: ["400", "700"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Місячний календар",
  description: "Описи днів за місячним календарем",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${raleway.variable} ${comfortaa.variable}`}
      >
        <TanStackProvider>
          <Header />
          <main>{children}</main>

          <footer>
            <p>
              Створений <time dateTime="2026">2026</time>
            </p>
          </footer>
        </TanStackProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
