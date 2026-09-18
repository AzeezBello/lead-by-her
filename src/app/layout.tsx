import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Geist } from "next/font/google";
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata={title:'The Giving Back Project | Creating Change Together',description:'Placeholder NGO website for The Giving Back Project.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={geist.variable} suppressHydrationWarning><body><TooltipProvider delayDuration={200}><Navbar/><main>{children}</main><Footer/><Toaster position="top-right" richColors/></TooltipProvider></body></html>}
