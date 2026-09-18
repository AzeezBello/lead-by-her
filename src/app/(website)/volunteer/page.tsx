import { SectionTitle } from '@/components/SectionTitle'
import { VolunteerForm } from './VolunteerForm'

const ways = ['Community outreach', 'Event support', 'Professional skills', 'Fundraising & advocacy'] as const

export default function Volunteer() {
  return (
    <section className="section">
      <div className="container grid gap-14 md:grid-cols-2">
        <div>
          <SectionTitle
            eyebrow="Get Involved"
            title="Give your time. Share your skills. Make a difference."
            text="[Placeholder] Volunteers help us turn community ideas into meaningful action."
          />
          <div className="grid gap-3.5">
            {ways.map((w) => (
              <div key={w} className="rounded-2xl border border-border bg-card px-5 py-4 font-bold">
                {w}
              </div>
            ))}
          </div>
        </div>
        <VolunteerForm />
      </div>
    </section>
  )
}
