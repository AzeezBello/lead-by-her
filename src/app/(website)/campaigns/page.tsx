import Link from 'next/link'
import Image from 'next/image'
import { SectionTitle } from '@/components/SectionTitle'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const campaigns = [
  ['Education for Every Girl', '₦10,000,000', '75%', '₦7.5M', 'students-exam-prep-books.jpg'],
  ['Leadership Bootcamp Fund', '₦15,000,000', '48%', '₦7.2M', 'outreach-team-photo.jpg'],
  ['Skills for Her Future', '₦8,000,000', '62%', '₦5M', 'students-studying-desks.jpg'],
] as const

export default function Campaigns() {
  return (
    <>
      <section className="section bg-stone-100">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="Campaigns"
              title="Your generosity can move an idea into action."
              text="[Placeholder] Support a campaign and help fund practical projects with measurable community impact."
            />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map(([t, g, p, raised, img], i) => (
              <Reveal key={t} delay={i * 100}>
                <Card className="group overflow-hidden rounded-3xl py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-[230px] overflow-hidden">
                    <Image
                      src={`/images/gallery/${img}`}
                      alt={t}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Active Campaign</div>
                    <h2 className="serif my-2 text-[29px]">{t}</h2>
                    <p className="leading-relaxed text-muted-foreground">[Campaign description placeholder]</p>
                    <div className="mt-3 flex justify-between text-sm font-bold">
                      <span>{raised} raised</span>
                      <span>{p}</span>
                    </div>
                    <div className="my-2 h-[9px] rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: p }} />
                    </div>
                    <div className="text-[13px] text-muted-foreground">Goal: {g}</div>
                    <Button asChild className="mt-5 w-full rounded-full transition-transform hover:-translate-y-0.5">
                      <Link href="/donate">Donate to this campaign</Link>
                    </Button>
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
