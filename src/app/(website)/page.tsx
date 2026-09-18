import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, HeartHandshake, Users, Globe2, HandHeart } from 'lucide-react'
import { SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const stats = [
  ['10,000+', 'Women & girls reached', Users],
  ['25+', 'Communities served', Globe2],
  ['50+', 'Programs completed', HeartHandshake],
  ['500+', 'Volunteers & mentors', HandHeart],
] as const

const programs = [
  ['Education', 'Expanding access to learning so every girl can stay in school and reach her full potential.', 'book-distribution-classroom.jpg'],
  ['Leadership', 'Building the confidence and skills young women need to lead in their communities.', 'classroom-address.jpg'],
  ['Skills & Welfare', 'Practical training, welfare support and wellbeing programs that open doors to independence.', 'community-outreach-meeting.jpg'],
] as const

const posts = [
  ['Impact Story', 'How a Scholarship Changed One Girl’s Path', 'students-exam-prep-books.jpg'],
  ['News & Updates', 'Inside Our Latest Leadership Bootcamp', 'students-studying-desks.jpg'],
  ['Insights', 'Five Ways to Support Women in Your Community', 'outreach-team-photo.jpg'],
] as const

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-28 text-white">
        <Image
          src="/images/gallery/team-school-visit-group.jpg"
          alt="Lead by Her team and students during a school outreach visit"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950/95 via-forest-800/85 to-forest-700/70" />
        <div className="container relative">
          <div className="max-w-3xl">
            <Badge className="bg-sage-400/90 text-forest-950 hover:bg-sage-400/90">Empowering Women & Young Girls</Badge>
            <h1 className="serif mt-4 text-[clamp(52px,8vw,88px)] leading-[0.96] font-normal">
              Lead by her. Led by her.
            </h1>
            <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-forest-50/90">
              [Placeholder] Lead by Her Empowerment Initiative works alongside women and young girls in Nigeria —
              through education, leadership, welfare, wellbeing and skills — with impact beyond borders.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-white text-forest-800 hover:bg-forest-50">
                <Link href="/donate">
                  Donate Now <ArrowRight size={17} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href="/programs">Explore Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([n, l, Icon]) => (
              <Card key={l} className="rounded-2xl">
                <CardContent className="p-7">
                  <Icon className="mb-5 text-primary" size={25} />
                  <div className="serif text-4xl font-bold">{n}</div>
                  <div className="mt-1 text-muted-foreground">{l}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section pt-0">
        <div className="container">
          <SectionTitle
            eyebrow="Our Work"
            title="Practical action. Human impact."
            text="[Placeholder] Explore the programs through which Lead by Her invests in women and young girls."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map(([t, d, img], i) => (
              <Card key={t} className="overflow-hidden rounded-3xl py-0">
                <div className="relative h-56">
                  <Image src={`/images/gallery/${img}`} alt={t} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">0{i + 1}</div>
                  <h3 className="serif my-2 text-2xl">{t}</h3>
                  <p className="leading-relaxed text-muted-foreground">{d}</p>
                  <Link href="/programs" className="mt-3 inline-block font-bold text-primary">
                    Learn more →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured campaign */}
      <section className="section bg-stone-100">
        <div className="container">
          <SectionTitle
            eyebrow="Featured Campaign"
            title="Help us build a better future."
            text="[Placeholder] Support a current campaign and help move a community project from vision to reality."
          />
          <Card className="overflow-hidden rounded-3xl py-0">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[240px] md:min-h-[380px]">
                <Image
                  src="/images/gallery/students-with-books-hijab.jpg"
                  alt="Girls holding textbooks provided through Lead by Her's education program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-10">
                <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Education & Opportunity</div>
                <h3 className="serif mt-2 text-4xl leading-tight">Education for Every Girl</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  [Placeholder campaign description explaining the need, the intervention, and the expected impact.]
                </p>
                <div className="mt-6">
                  <div className="flex justify-between font-bold">
                    <span>₦7,500,000 raised</span>
                    <span>75%</span>
                  </div>
                  <div className="my-3 h-2.5 rounded-full bg-muted">
                    <div className="h-full w-3/4 rounded-full bg-primary" />
                  </div>
                  <div className="text-sm text-muted-foreground">Goal: ₦10,000,000</div>
                </div>
                <Button asChild className="mt-6 rounded-full">
                  <Link href="/donate">Support this campaign</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Stories */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Stories & News" title="See the work. Hear the stories." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(([c, t, img]) => (
              <article key={t}>
                <div className="relative h-52 overflow-hidden rounded-2xl">
                  <Image src={`/images/gallery/${img}`} alt={t} fill className="object-cover" />
                </div>
                <div className="mt-5 text-xs font-bold tracking-[0.16em] text-primary uppercase">{c}</div>
                <h3 className="serif my-2 text-[27px] leading-snug">{t}</h3>
                <Link href="/blog" className="font-bold text-primary">
                  Read story →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="section bg-stone-100">
        <div className="container">
          <SectionTitle
            eyebrow="See It In Action"
            title="Watch our work on the ground."
            text="[Placeholder] A short look inside a recent Lead by Her school outreach and book distribution."
          />
          <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-border bg-black">
            <video controls playsInline preload="metadata" className="aspect-square w-full">
              <source src="/videos/program-visit.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-gradient-to-br from-forest-900 via-forest-700 to-sage-500 py-20 text-white">
        <div className="container flex flex-wrap items-center justify-between gap-8">
          <div>
            <Badge className="bg-sage-400/90 text-forest-950 hover:bg-sage-400/90">Your Support Matters</Badge>
            <h2 className="serif mt-3 text-5xl">There are many ways to get involved.</h2>
          </div>
          <Button asChild size="lg" className="rounded-full bg-white text-forest-800 hover:bg-forest-50">
            <Link href="/volunteer">Get Involved</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
