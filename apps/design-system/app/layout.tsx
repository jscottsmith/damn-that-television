import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { AppChrome } from "@/components/app-chrome";
import { Providers } from "./providers";
import "../styles/globals.css";

const futura = localFont({
  variable: "--font-futura",
  src: [
    {
      path: "../fonts/fpt/fpt_light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/fpt/fpt_light-oblique.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/fpt/fpt_book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/fpt/fpt_book-oblique.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/fpt/fpt_medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/fpt/fpt_medium-oblique.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/fpt/fpt_demi.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/fpt/fpt_demi-oblique.woff",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/fpt/fpt_bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/fpt/fpt_bold-oblique.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/fpt/fpt_extrabold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/fpt/fpt_extrabold-oblique.woff",
      weight: "800",
      style: "italic",
    },
  ],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Design System",
  description: "Damnthat.tv design system",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(poppins.variable, poppins.className, futura.variable)}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  );
}
