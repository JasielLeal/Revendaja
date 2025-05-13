import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme"
import ClientProvider from "./context/ClientProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Revendaja - Plataforma para Revendedores de Cosméticos",
  description:
    "Gerencie suas vendas, estoque e catálogo em um só lugar. A plataforma completa para revendedores de produtos de beleza.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ClientProvider>
            {children}
          </ClientProvider>
        </ThemeProvider>

      </body>
    </html >
  )
}
