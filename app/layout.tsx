import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Beyond UI - Modern Blog Platform',
    template: '%s | Beyond UI Blog'
  },
  description: 'A modern, accessible blog application built with Next.js and React Query. Discover insightful articles on technology, design, and business.',
  keywords: ['blog', 'nextjs', 'react', 'ui', 'design', 'technology', 'web development', 'accessibility'],
  authors: [{ name: 'Beyond UI Team' }],
  creator: 'Beyond UI Team',
  publisher: 'Beyond UI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://beyond-ui-blog.vercel.app',
    title: 'Beyond UI - Modern Blog Platform',
    description: 'A modern, accessible blog application built with Next.js and React Query. Discover insightful articles on technology, design, and business.',
    siteName: 'Beyond UI Blog',
    images: [
      {
        url: 'https://cdn.dribbble.com/users/18489024/avatars/normal/4194f06fe3b975903f66b0f31adf47ce.png?1702911795',
        width: 1200,
        height: 630,
        alt: 'Beyond UI Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beyond UI - Modern Blog Platform',
    description: 'A modern, accessible blog application built with Next.js and React Query.',
    images: ['https://cdn.dribbble.com/users/18489024/avatars/normal/4194f06fe3b975903f66b0f31adf47ce.png?1702911795'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://beyond-ui-blog.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
