import { SectionTitle } from '@/components/SectionTitle'
import { ContactForm } from './ContactForm'

export default function Contact() {
  return (
    <section className="section">
      <div className="container grid gap-14 md:grid-cols-2">
        <SectionTitle
          eyebrow="Contact"
          title="Let's start a conversation."
          text="[Placeholder] Have a question about our work, partnerships, volunteering, or donations? Send us a message."
        />
        <ContactForm />
      </div>
    </section>
  )
}
