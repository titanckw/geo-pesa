import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://geopesa.com'),
  title: 'GeoPesa | Pan-African Credit, Wealth & Protection',
  description: 'GeoPesa Financial Services Group channels international capital into Africa’s underfinanced businesses through structured credit, wealth management and protection.',
  keywords: ['GeoPesa', 'African investment', 'MSME lending Africa', 'wealth management Kenya', 'trade credit insurance', 'FSC Mauritius'],
  authors: [{ name: 'GeoPesa Financial Services Group' }],
  creator: 'GeoPesa Financial Services Group',
  publisher: 'GeoPesa Financial Services Group',
  category: 'financial services',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'GeoPesa | Pan-African Credit, Wealth & Protection',
    description: 'A Mauritius-domiciled, FSC-regulated financial services group serving Africa’s next financial frontier.',
    siteName: 'GeoPesa Financial Services Group',
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GeoPesa | Pan-African Credit, Wealth & Protection',
    description: 'Structured finance, wealth management and protection for Africa’s productive businesses.',
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#071b2b',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
