import { Inter } from 'next/font/google'
import './globals.scss'

import { Toaster } from "@/ui/toaster"

// Components
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bogdan Gevko',
  description: 'Bogdan Gevko (bgevko), software developer, blog, portfolio, projects',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} px-4 w-screen, flex flex-col`}>
				<Navbar />
				{children}
				<Footer />
				<Toaster />
			</body>
    </html>
  )
}
