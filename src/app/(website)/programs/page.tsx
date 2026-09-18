import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Card, CardContent } from '@/components/ui/card'

const programs = [
  ['Education', 'textbook-stack.jpg'],
  ['Leadership', 'program-visit-group.jpg'],
  ['Welfare', 'community-outreach-meeting.jpg'],
  ['Wellbeing', 'sorting-donated-books.jpg'],
  ['Skills Development', 'textbooks-display-couch.jpg'],
  ['Mentorship & Advocacy', 'team-school-visit-group.jpg'],
] as const

export default function Programs() {
  return (
    <>
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Our Work</div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="serif mt-3 text-[clamp(50px,7vw,76px)] leading-[0.98]">
              Programs designed for lasting impact.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              [Placeholder] Explore the pillars through which Lead by Her invests in women and young girls.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map(([p, img], i) => (
              <Reveal key={p} delay={(i % 3) * 100}>
                <Card className="group overflow-hidden rounded-3xl py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-[230px] overflow-hidden">
                    <Image
                      src={`/images/gallery/${img}`}
                      alt={p}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Program 0{i + 1}</div>
                    <h2 className="serif my-2 text-[29px]">{p}</h2>
                    <p className="leading-relaxed text-muted-foreground">
                      [Program description placeholder explaining objectives, activities, beneficiaries, and expected
                      outcomes.]
                    </p>
                    <Link href="/contact" className="mt-3 inline-flex items-center gap-1 font-bold text-primary transition-[gap] hover:gap-2">
                      Learn more <ArrowRight size={15} />
                    </Link>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
