import Link from 'next/link'
import Image from 'next/image'
import { SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const events = ['Community Outreach Day', 'Giving Back Fundraiser', 'Youth Skills Workshop'] as const

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

        <div className="mt-16">
          <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">From our archive</div>
          <h2 className="serif my-2 text-[27px]">A look back at past outreach.</h2>
          <Card className="mt-5 overflow-hidden rounded-3xl py-0">
            <Image
              src="/images/The Giving Back Project.png"
              alt="The Giving Back Project community outreach event in Makoko, 30 December 2022"
              width={3650}
              height={2618}
              className="w-full object-cover"
            />
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Community outreach in Makoko, 30 December 2022. Bank details shown in this archived flyer were specific
                to that appeal — for current donations, please use the{' '}
                <Link href="/donate" className="font-bold text-primary">
                  secure donate page
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
