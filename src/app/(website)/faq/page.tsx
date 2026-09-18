import Link from 'next/link'
import { SectionTitle } from '@/components/SectionTitle'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    q: 'What does Lead by Her actually do?',
    a: '[Placeholder] Lead by Her Empowerment Initiative runs education, leadership, welfare, wellbeing and skills programs for women and young girls in Nigeria, with impact reaching beyond borders.',
  },
  {
    q: 'How can I volunteer?',
    a: '[Placeholder] Visit our Volunteer page and submit an application. Our team reviews every application and reaches out about current opportunities that match your skills and interests.',
  },
  {
    q: 'How do I know my donation is used well?',
    a: '[Placeholder] We publish campaign progress and impact updates, and our Board of Directors provides independent governance and financial oversight. Annual reports are available on request.',
  },
  {
    q: 'Can I donate to a specific campaign or program?',
    a: '[Placeholder] Yes. Choose a campaign from our Campaigns page, or note your preference when you reach out via Contact, and your donation will be directed accordingly.',
  },
  {
    q: 'Is my donation tax-deductible?',
    a: '[Placeholder] This depends on your country of residence. Contact us for a receipt and any documentation needed for your records.',
  },
  {
    q: 'How can my organization partner with Lead by Her?',
    a: '[Placeholder] We welcome partnerships with schools, businesses, and other NGOs. Reach out via our Contact page and our Programs Director will follow up.',
  },
] as const

export default function Faq() {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionTitle
            eyebrow="FAQ"
            title="Frequently asked questions."
            text="[Placeholder] Answers to common questions about our programs, donations, and getting involved. Can't find what you're looking for?"
          />
        </Reveal>

        <Reveal delay={100}>
          <Accordion type="single" collapsible>
            {faqs.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={200} className="mt-12 rounded-3xl bg-stone-100 p-8 text-center">
          <h2 className="serif text-2xl">Still have a question?</h2>
          <p className="mt-2 text-muted-foreground">We&apos;re happy to help — send us a message and we&apos;ll get back to you.</p>
          <Button asChild size="lg" className="mt-5 h-auto rounded-full py-3.5 transition-transform hover:-translate-y-0.5">
            <Link href="/contact">Contact us</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
