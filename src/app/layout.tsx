import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.css'
import StyledComponentsRegistry from '../lib/AntdRegistry';
import {ConfigProvider} from "antd";
import {theme} from "@app/theme";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rick and Morty Wiki',
  description: 'Rick and Morty Wiki',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}> <StyledComponentsRegistry><ConfigProvider theme={theme}>{children}</ConfigProvider></StyledComponentsRegistry></body>
    </html>
  )
}
