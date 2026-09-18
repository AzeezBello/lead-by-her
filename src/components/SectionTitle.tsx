export function SectionTitle({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="mb-9 max-w-2xl">
      {eyebrow && (
        <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">{eyebrow}</div>
      )}
      <h2 className="serif mt-2.5 text-[clamp(34px,5vw,52px)] leading-[1.05] font-normal">{title}</h2>
      {text && <p className="mt-3.5 text-[17px] leading-7 text-muted-foreground">{text}</p>}
    </div>
  )
}
