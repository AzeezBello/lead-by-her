import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Geist, Bodoni_Moda } from "next/font/google";
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const bodoni = Bodoni_Moda({subsets:['latin'],variable:'--font-serif'});

export const metadata: Metadata={title:'Lead by Her | Empowering Women & Young Girls',description:'Lead by Her Empowerment Initiative — education, leadership, welfare, wellbeing and skills programs for women and young girls, based in Nigeria with impact beyond borders.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${geist.variable} ${bodoni.variable}`} suppressHydrationWarning><body><TooltipProvider delayDuration={200}><Navbar/><main>{children}</main><Footer/><Toaster position="top-right" richColors/></TooltipProvider></body></html>}
