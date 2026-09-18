import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

const programs = [
  'Education',
  'Leadership',
  'Welfare',
  'Wellbeing',
  'Skills Development',
  'Mentorship & Advocacy',
] as const

const gradients = [
  'from-forest-200 to-stone-100',
  'from-sage-200 to-stone-100',
  'from-forest-300 to-stone-100',
  'from-sage-300 to-stone-100',
  'from-forest-200 to-sage-100',
  'from-sage-200 to-forest-100',
]

export default function Programs() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Our Work</div>
          <h1 className="serif mt-3 text-[clamp(50px,7vw,76px)] leading-[0.98]">
            Programs designed for lasting impact.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            [Placeholder] Explore the pillars through which Lead by Her invests in women and young girls.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Card key={p} className="overflow-hidden rounded-3xl py-0">
                <div className={`h-[230px] bg-gradient-to-br ${gradients[i]}`} />
                <CardContent className="p-6">
                  <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Program 0{i + 1}</div>
                  <h2 className="serif my-2 text-[29px]">{p}</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    [Program description placeholder explaining objectives, activities, beneficiaries, and expected
                    outcomes.]
                  </p>
                  <Link href="/contact" className="mt-3 inline-block font-bold text-primary">
                    Learn more →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
