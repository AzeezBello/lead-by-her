'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/icons/social'

const columns = [
  { title: 'Explore', links: [['About', '/about'], ['Our Work', '/programs'], ['Campaigns', '/campaigns'], ['FAQ', '/faq']] },
  { title: 'Get Involved', links: [['Volunteer', '/volunteer'], ['Events', '/events'], ['Donate', '/donate'], ['Contact', '/contact']] },
] as const

const socials = [
  ['Facebook', '#', FacebookIcon],
  ['Instagram', 'https://www.instagram.com/leadbyherorg/', InstagramIcon],
  ['Twitter / X', '#', XIcon],
  ['LinkedIn', '#', LinkedinIcon],
  ['YouTube', '#', YoutubeIcon],
] as const

const NEWSLETTER_EMAIL = 'info@leadbyher.org'

export function Footer() {
  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = new FormData(e.currentTarget).get('email')
    const subject = encodeURIComponent('Newsletter signup')
    const body = encodeURIComponent(`Please add this email to the Lead by Her newsletter list:\n\n${email}`)
    window.location.href = `mailto:${NEWSLETTER_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <footer className="mt-20 bg-forest-700 text-sage-100/90">
      <div className="container py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">
          <div>
            <Image
              src="/images/logo-lbh-white.png"
              alt="Lead by Her"
              width={1327}
              height={1134}
              className="h-20 w-auto"
            />
            <p className="mt-5 max-w-md leading-7 text-sage-100/70">
              [Placeholder] Lead by Her Empowerment Initiative — empowering women and young girls through education,
              leadership, welfare, wellbeing and skills. Based in Nigeria, with impact beyond borders.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(([label, href, Icon]) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="grid size-9 place-items-center rounded-full bg-white/10 text-sage-100/80 transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <strong className="text-white">{col.title}</strong>
              <div className="mt-4 grid gap-3 text-sage-100/70">
                {col.links.map(([label, href]) => (
                  <Link key={href} href={href} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div>
            <strong className="text-white">Stay Connected</strong>
            <p className="mt-4 leading-6 text-sage-100/70">Receive updates about programs, stories, and opportunities to get involved.</p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <Input name="email" required placeholder="Your email" type="email" className="border-0 bg-white text-foreground" />
              <Button type="submit">Join</Button>
            </form>
          </div>
        </div>
        <Separator className="mt-12 bg-forest-600" />
        <div className="mt-6 flex flex-col gap-2 text-sm text-sage-100/60 sm:flex-row sm:justify-between">
          <span>© 2026 Lead by Her Empowerment Initiative. Placeholder content.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  )
}
