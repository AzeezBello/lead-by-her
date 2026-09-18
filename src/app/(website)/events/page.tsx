import Link from 'next/link'
import { SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const events = ['Community Outreach Day', 'Leadership Bootcamp', 'Skills Workshop for Girls'] as const

export default function Events() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Events"
          title="Come together. Take action. Make an impact."
          text="[Placeholder] Discover upcoming community events, fundraisers, workshops, and outreach activities."
        />
        <div className="grid gap-4">
          {events.map((e, i) => (
            <Card key={e} className="rounded-2xl">
              <CardContent className="flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center">
                <div className="rounded-2xl bg-stone-100 px-4 py-3 text-center">
                  <strong className="serif block text-3xl">{12 + i * 8}</strong>
                  <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">SEP</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">[Location]</div>
                  <h2 className="serif my-1 text-[27px]">{e}</h2>
                  <p className="text-muted-foreground">[Event description placeholder]</p>
                </div>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/contact">Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
