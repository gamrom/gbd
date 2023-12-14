'use client'

import { Inter } from 'next/font/google'
import './globals.css'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Header } from './header'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'dayjs/locale/ko'

import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" id="root">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
        <body className={`${inter.className} max-w-[650px] mx-auto px-4 min-h-screen`}>
          <Header />
          {children}
          <Analytics />
        </body>
      </LocalizationProvider>
    </html>

  )
}
