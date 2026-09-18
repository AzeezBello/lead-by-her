import DonationForm from '@/components/donations/DonationForm'

export default function Donate() {
  return (
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
  )
}
