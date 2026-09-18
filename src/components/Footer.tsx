import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const columns = [
  { title: 'Explore', links: [['About', '/about'], ['Our Work', '/programs'], ['Campaigns', '/campaigns'], ['Blog', '/blog']] },
  { title: 'Get Involved', links: [['Volunteer', '/volunteer'], ['Events', '/events'], ['Donate', '/donate'], ['Contact', '/contact']] },
] as const

export function Footer() {
  return (
    <footer className="mt-20 bg-green-900 text-green-50/90">
      <div className="container py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">
          <div>
            <Image
              src="/images/logo-mark-white.png"
              alt="The Giving Back Project"
              width={1029}
              height={432}
              className="h-11 w-auto"
            />
            <p className="mt-5 max-w-md leading-7 text-green-100/70">
              [Placeholder] A community-centered NGO working to create opportunity, strengthen communities, and help people build better futures.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <strong className="text-white">{col.title}</strong>
              <div className="mt-4 grid gap-3 text-green-100/70">
                {col.links.map(([label, href]) => (
                  <Link key={href} href={href} className="hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div>
            <strong className="text-white">Stay Connected</strong>
            <p className="mt-4 leading-6 text-green-100/70">Receive updates about projects, stories, and opportunities to give back.</p>
            <form className="mt-4 flex gap-2">
              <Input placeholder="Your email" type="email" className="border-0 bg-white text-foreground" />
              <Button type="submit">Join</Button>
            </form>
          </div>
        </div>
        <Separator className="mt-12 bg-green-800" />
        <div className="mt-6 flex flex-col gap-2 text-sm text-green-100/60 sm:flex-row sm:justify-between">
          <span>© 2026 The Giving Back Project. Placeholder content.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  )
}
