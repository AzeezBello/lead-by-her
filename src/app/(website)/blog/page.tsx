import Link from 'next/link'
import { SectionTitle } from '@/components/SectionTitle'

const posts = [
  ['impact-story', 'How a Scholarship Changed One Girl’s Path'],
  ['news-updates', 'Inside Our Latest Leadership Bootcamp'],
  ['community', 'Building Confidence Through Mentorship'],
  ['insights', 'Five Ways to Support Women in Your Community'],
  ['project-update', 'What Your Support Made Possible This Month'],
  ['news-updates', 'Meet the Women Behind Lead by Her'],
] as const

const gradients = [
  'from-forest-200 to-stone-100',
  'from-sage-200 to-stone-100',
  'from-forest-300 to-stone-100',
  'from-sage-300 to-stone-100',
  'from-forest-200 to-sage-100',
  'from-sage-200 to-forest-100',
]

export default function Blog() {
  return (
    <>
      <section className="section bg-stone-100">
        <div className="container">
          <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Stories · News · Insights</div>
          <h1 className="serif mt-3 text-[clamp(52px,7vw,78px)] leading-[0.98]">Stories from the work.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            [Placeholder] Follow programs, community stories, announcements, and ideas about empowering women and girls.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Latest" title="From Lead by Her" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(([cat, t], i) => (
              <article key={t} className="flex flex-col">
                <div className={`h-[220px] rounded-2xl bg-gradient-to-br ${gradients[i]}`} />
                <div className="mt-4 text-xs font-bold tracking-[0.16em] text-primary uppercase">
                  {cat.replaceAll('-', ' ')}
                </div>
                <h2 className="serif my-1.5 text-[27px] leading-snug">{t}</h2>
                <p className="leading-relaxed text-muted-foreground">[Article excerpt placeholder]</p>
                <Link href={`/blog/${i + 1}`} className="mt-auto pt-3 font-bold text-primary">
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
