"use client";

import { Roboto } from "next/font/google";

import "./globals.css";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/ko";

// import { Analytics } from '@vercel/analytics/react';
import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
// import { ThemeProvider } from "@material-tailwind/react";

import { NextUIProvider } from "@nextui-org/react";

// Font files can be colocated inside of `pages`

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ThemeProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <html lang="ko" id="root" className="light font-[Pretendard]">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />

          <title>감롬의보드게임동아리</title>
          <meta name="description" content="감보동 사이트입니다." />

          <meta property="og:url" content="https://www.gambodong.com/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="감롬의보드게임동아리" />
          <meta property="og:description" content="" />
          <meta
            property="og:image"
            content="https://opengraph.b-cdn.net/production/documents/e11d93e3-ddd4-4b19-a19a-14592b5cb9ea.png?token=JBsz2BlhZcfuovakmojI0n6WZjcnnWJmCGWTxg4e0dY&height=400&width=800&expires=33240121561"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="gambodong.com" />
          <meta property="twitter:url" content="https://www.gambodong.com/" />
          <meta name="twitter:title" content="감롬의보드게임동아리" />
          <meta name="twitter:description" content="" />
          <meta
            name="twitter:image"
            content="https://opengraph.b-cdn.net/production/documents/e11d93e3-ddd4-4b19-a19a-14592b5cb9ea.png?token=JBsz2BlhZcfuovakmojI0n6WZjcnnWJmCGWTxg4e0dY&height=400&width=800&expires=33240121561"
          />
        </head>
        <body className={roboto.className}>
          <NextUIProvider>
            {children}
            <SpeedInsights />
          </NextUIProvider>
          {/* <Analytics /> */}
          <GoogleTagManager gtmId="GTM-TQ8SGL5W" />
        </body>
      </html>
    </LocalizationProvider>
    // </ThemeProvider>
  );
}
