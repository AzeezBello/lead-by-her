import Link from 'next/link'
import Image from 'next/image'
import { SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const events = ['Community Outreach Day', 'Leadership Bootcamp', 'Skills Workshop for Girls'] as const

const moments = [
  'book-distribution-classroom.jpg',
  'students-with-books-hijab.jpg',
  'community-book-handout.jpg',
  'outreach-team-photo.jpg',
  'students-studying-desks.jpg',
  'team-school-visit-group.jpg',
] as const

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
          <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Recent Moments</div>
          <h2 className="serif my-2 text-[27px]">A look back at recent outreach.</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-black">
              <video
                autoPlay
                muted
                loop
                playsInline
                aria-label="Lead by Her community outreach moment"
                className="h-full w-full object-cover"
              >
                <source src="/videos/program-moment.mp4" type="video/mp4" />
              </video>
            </div>
            {moments.map((img) => (
              <div key={img} className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={`/images/gallery/${img}`}
                  alt="Lead by Her community outreach moment"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
