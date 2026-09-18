import { BookOpen, MapPin, ArrowUpRight } from 'lucide-react'
import DonationForm from '@/components/donations/DonationForm'
import { Reveal } from '@/components/Reveal'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const bookDrive = [
  {
    title: 'Donate a book',
    text: '[Placeholder] Give new or gently used books to help stock our classrooms and community libraries.',
    href: 'https://forms.gle/N93jqtAt9s3J8LMJ9',
    icon: BookOpen,
    cta: 'Donate a book',
  },
  {
    title: 'Register a drop-off location',
    text: '[Placeholder] Host a collection point in your school, office, or community for our book donation drive.',
    href: 'https://forms.gle/kQDqjqYtw26dShPU6',
    icon: MapPin,
    cta: 'Register a location',
  },
] as const

export default function Donate() {
  return (
    <>
      <section className="section bg-stone-100">
        <div className="container mx-auto max-w-[850px]">
          <div className="text-center">
            <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Make a Difference</div>
            <h1 className="serif text-[clamp(50px,7vw,76px)] leading-[0.98]">Give back today.</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              [Placeholder] Your donation supports programs and campaigns that help communities create better opportunities.
            </p>
          </div>
          <DonationForm />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container mx-auto max-w-[850px]">
          <div className="text-center">
            <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Book Donation Drive</div>
            <h2 className="serif mt-2 text-4xl">Prefer to give books instead?</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              [Placeholder] Support our book distribution program directly — donate a book or help us collect them.
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {bookDrive.map(({ title, text, href, icon: Icon, cta }, i) => (
              <Reveal key={title} delay={i * 100}>
                <Card className="h-full rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex h-full flex-col p-8">
                    <div className="grid size-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                      <Icon size={20} />
                    </div>
                    <h3 className="serif mt-4 text-2xl">{title}</h3>
                    <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{text}</p>
                    <Button asChild variant="outline" className="mt-5 h-auto w-full rounded-full py-3">
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {cta} <ArrowUpRight size={16} />
                      </a>
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
