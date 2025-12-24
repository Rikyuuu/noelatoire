import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Noëlatoire - Tirage au sort de Noël',
    description:
        "Application de tirage au sort pour vos événements tel que l'ouverture des cadeaux de Noël !",
    keywords: ['tirage au sort', 'noël', 'loterie', 'animation', 'fêtes'],
    authors: [{ name: 'Julien Delissenne' }],
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='fr' data-theme='christmas'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-red-50 via-green-50 to-blue-50 dark:from-red-950 dark:via-green-950 dark:to-blue-950 min-h-screen`}
            >
                {children}
            </body>
        </html>
    )
}
