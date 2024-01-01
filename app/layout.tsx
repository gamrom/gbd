'use client'

import { Inter } from 'next/font/google'
import './globals.css'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Header } from './header'
import { Footer } from './footer'
import 'dayjs/locale/ko'

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" id="root">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <meta property="og:title" content="감롬의보드게임동아리" />
          <meta property="og:image" content="<generated>" />
          <title>감롬의 보드게임 동아리</title>
        </head>
        <body className={`${inter.className} max-w-[650px] mx-auto px-4 min-h-screen`}>
          <Header />
          {children}
          <Footer />
          <SpeedInsights />
          <Analytics />
        </body>
      </LocalizationProvider>
    </html>

  )
}
