'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const links = [
  ['About', '/about'],
  ['Our Work', '/programs'],
  ['Campaigns', '/campaigns'],
  ['Events', '/events'],
  ['FAQ', '/faq'],
  ['Get Involved', '/volunteer'],
] as const

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-[76px] items-center justify-between gap-5">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-lbh.png"
            alt="Lead by Her"
            width={1327}
            height={1134}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'rounded-full px-3.5 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-foreground',
                pathname === href && 'bg-secondary text-secondary-foreground'
              )}
            >
              {label}
            </Link>
          ))}
          <Button asChild className="ml-2 rounded-full">
            <Link href="/donate">Donate</Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle className="text-left font-serif">Lead by Her</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {links.map(([label, href]) => (
                <SheetClose asChild key={href}>
                  <Link
                    href={href}
                    className={cn(
                      'rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground',
                      pathname === href && 'bg-secondary text-secondary-foreground'
                    )}
                  >
                    {label}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button asChild className="mt-3 rounded-full">
                  <Link href="/donate">Donate</Link>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
