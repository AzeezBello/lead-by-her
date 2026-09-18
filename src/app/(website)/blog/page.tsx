import Link from 'next/link'
import { SectionTitle } from '@/components/SectionTitle'

const posts = [
  ['impact-story', 'How Small Acts of Giving Create Big Change'],
  ['news-updates', 'Inside Our Latest Community Outreach Project'],
  ['community', 'Building Stronger Communities Through Education'],
  ['insights', 'Five Ways You Can Give Back to Your Community'],
  ['project-update', 'What Your Support Made Possible This Month'],
  ['news-updates', 'Meet the People Behind the Project'],
] as const

const gradients = [
  'from-green-200 to-stone-100',
  'from-amber-200 to-stone-100',
  'from-green-300 to-stone-100',
  'from-amber-300 to-stone-100',
  'from-green-200 to-amber-100',
  'from-amber-200 to-green-100',
]

export default function Blog() {
  return (
    <>
      <section className="section bg-stone-100">
        <div className="container">
          <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Stories · News · Insights</div>
          <h1 className="serif mt-3 text-[clamp(52px,7vw,78px)] leading-[0.98]">Stories from the work.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            [Placeholder] Follow projects, community stories, announcements, and ideas about giving back.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Latest" title="From The Giving Back Project" />
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
