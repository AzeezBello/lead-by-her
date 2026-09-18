import Link from 'next/link'
import { SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const campaigns = [
  ['Education for Every Child', '₦10,000,000', '75%', '₦7.5M'],
  ['Community Health Initiative', '₦15,000,000', '48%', '₦7.2M'],
  ['Empowering Young People', '₦8,000,000', '62%', '₦5M'],
] as const

const gradients = ['from-green-300 to-stone-100', 'from-amber-300 to-stone-100', 'from-green-200 to-stone-100']

export default function Campaigns() {
  return (
    <>
      <section className="section bg-stone-100">
        <div className="container">
          <SectionTitle
            eyebrow="Campaigns"
            title="Your generosity can move an idea into action."
            text="[Placeholder] Support a campaign and help fund practical projects with measurable community impact."
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map(([t, g, p, raised], i) => (
              <Card key={t} className="overflow-hidden rounded-3xl py-0">
                <div className={`h-[230px] bg-gradient-to-br ${gradients[i]}`} />
                <CardContent className="p-6">
                  <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Active Campaign</div>
                  <h2 className="serif my-2 text-[29px]">{t}</h2>
                  <p className="leading-relaxed text-muted-foreground">[Campaign description placeholder]</p>
                  <div className="mt-3 flex justify-between text-sm font-bold">
                    <span>{raised} raised</span>
                    <span>{p}</span>
                  </div>
                  <div className="my-2 h-[9px] rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: p }} />
                  </div>
                  <div className="text-[13px] text-muted-foreground">Goal: {g}</div>
                  <Button asChild className="mt-5 w-full rounded-full">
                    <Link href="/donate">Donate to this campaign</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
