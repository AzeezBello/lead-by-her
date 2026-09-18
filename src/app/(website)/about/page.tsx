import Link from 'next/link'
import { SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const team = [
  ['Alex Morgan', 'Executive Director'],
  ['Jordan Williams', 'Programs Director'],
  ['Taylor Okafor', 'Community Partnerships Lead'],
  ['Sam Adeyemi', 'Finance & Operations Lead'],
] as const

const board = [
  ['Dr. Jamie Carter', 'Board Chair'],
  ['Morgan Bello', 'Board Treasurer'],
  ['Chris Johnson', 'Board Secretary'],
] as const

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-stone-100">
        <div className="container">
          <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">About Us</div>
          <h1 className="serif mt-3 max-w-3xl text-[clamp(48px,7vw,78px)] leading-[1]">
            People, purpose, and a commitment to giving back.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            [Placeholder] Learn about the people, principles, and governance behind The Giving Back Project.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container grid gap-14 md:grid-cols-2">
          <SectionTitle eyebrow="Who We Are" title="Built around people and possibility." />
          <div className="grid gap-5">
            <p className="text-[17px] leading-8 text-muted-foreground">
              [Placeholder organization story. This section will contain the NGO&apos;s history, founding purpose,
              communities served, and approach to creating sustainable impact.]
            </p>
            <p className="text-[17px] leading-8 text-muted-foreground">
              Our mission: <strong className="text-foreground">[Placeholder mission statement]</strong>
            </p>
            <p className="text-[17px] leading-8 text-muted-foreground">
              Our vision: <strong className="text-foreground">[Placeholder vision statement]</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section bg-stone-100">
        <div className="container">
          <SectionTitle eyebrow="Leadership" title="The people guiding our work." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(([n, r]) => (
              <Card key={n} className="rounded-3xl">
                <CardContent className="p-5">
                  <div className="h-56 rounded-2xl bg-gradient-to-br from-green-200 to-amber-100" />
                  <h3 className="serif mt-4 mb-1 text-2xl">{n}</h3>
                  <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">{r}</div>
                  <p className="mt-2 leading-relaxed text-muted-foreground">[Short biography placeholder]</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Board of Directors" title="Independent governance and accountability." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {board.map(([n, r]) => (
              <Card key={n} className="rounded-2xl">
                <CardContent className="p-6">
                  <div className="mb-5 size-[92px] rounded-full bg-gradient-to-br from-green-200 to-amber-100" />
                  <h3 className="serif text-2xl">{n}</h3>
                  <div className="mt-1.5 text-xs font-bold tracking-[0.16em] text-primary uppercase">{r}</div>
                  <p className="mt-2 leading-relaxed text-muted-foreground">[Board member biography placeholder]</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Governance CTA */}
      <section className="bg-gradient-to-br from-green-900 via-green-700 to-amber-500 py-20 text-white">
        <div className="container max-w-2xl">
          <Badge className="bg-amber-400/90 text-green-950 hover:bg-amber-400/90">Transparency & Governance</Badge>
          <h2 className="serif mt-3 text-[clamp(34px,5vw,52px)] leading-[1.05]">Trust is built through accountability.</h2>
          <p className="mt-3.5 text-[17px] leading-7 text-green-50/90">
            [Placeholder] Access annual reports, financial information, policies, and governance documents.
          </p>
          <Button asChild size="lg" className="mt-7 rounded-full bg-white text-green-800 hover:bg-green-50">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
