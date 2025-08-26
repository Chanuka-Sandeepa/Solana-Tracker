import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata: Metadata = {
  title: "Solana Tracker - Track Tokens & Wallets",
  description: "Track trending Solana tokens, analyze wallet portfolios, and connect your Phantom wallet",
  generator: "v0.app",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: 'Geist', 'Inter', 'Segoe UI', 'Arial', sans-serif;
  --font-sans: 'Geist', 'Inter', 'Segoe UI', 'Arial', sans-serif;
  --font-mono: 'Geist Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
}
        `}</style>
      </head>
      <body>
        <ErrorBoundary>
          <Navigation />
          <main>{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  )
}
