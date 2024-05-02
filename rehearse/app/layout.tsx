import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Georama } from 'next/font/google'

const georama = Georama({weight: '400', subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Rehearse',
  description: "Application de gestion des répèt', pensée pour les musiciens, par des musiciens"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={georama.className}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
