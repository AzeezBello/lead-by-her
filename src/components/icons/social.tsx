type IconProps = { size?: number; className?: string }

function Base({ size = 16, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.6c0-.93.26-1.56 1.6-1.56h1.7V3.17C15.96 3.06 15.03 3 13.94 3 11.63 3 10.05 4.4 10.05 7.3v2.3H7.29v3.2h2.76V21h3.45Z" />
    </Base>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm0 5.94a2.34 2.34 0 1 1 0-4.68 2.34 2.34 0 0 1 0 4.68Zm4.6-6.09a.84.84 0 1 1-1.68 0 .84.84 0 0 1 1.68 0ZM20.97 8c-.06-1.28-.35-2.41-1.28-3.34-.93-.93-2.06-1.22-3.34-1.28C15.06 3.32 8.94 3.32 7.65 3.38c-1.28.06-2.4.35-3.34 1.28C3.38 5.59 3.1 6.72 3.03 8 2.97 9.3 2.97 15.4 3.03 16.7c.06 1.28.35 2.41 1.28 3.34.94.93 2.06 1.22 3.34 1.28 1.29.06 7.41.06 8.7 0 1.28-.06 2.41-.35 3.34-1.28.93-.93 1.22-2.06 1.28-3.34.06-1.3.06-7.4 0-8.7ZM19.2 18c-.28.7-.82 1.24-1.52 1.53-1.06.42-3.56.32-4.68.32s-3.63.1-4.68-.32A2.73 2.73 0 0 1 6.8 18c-.42-1.06-.32-3.56-.32-4.68s-.1-3.63.32-4.68c.28-.7.82-1.24 1.52-1.53 1.06-.42 3.56-.32 4.68-.32s3.63-.1 4.68.32c.7.28 1.24.82 1.52 1.53.42 1.06.32 3.56.32 4.68s.1 3.63-.32 4.68Z" />
    </Base>
  )
}

export function XIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M13.6 10.6 20.3 3h-1.6l-5.8 6.6L8.3 3H3l7 10.1L3 21h1.6l6.2-7 5 7H21l-7.4-10.4Zm-2.2 2.5-.7-1L5 4.3h2.5l4.6 6.6.7 1 6 8.6h-2.5l-4.9-7Z" />
    </Base>
  )
}

export function LinkedinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3.4a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM21 13.9c0-3.3-1.76-4.84-4.11-4.84-1.9 0-2.74 1.05-3.21 1.78V8.5H10.3c.04 1 0 12.5 0 12.5h3.38v-6.98c0-.37.03-.75.14-1.02.3-.74 1-1.52 2.15-1.52 1.52 0 2.13 1.16 2.13 2.86V21H21v-7.1Z" />
    </Base>
  )
}

export function YoutubeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M21.6 7.6a3 3 0 0 0-2.1-2.1C17.7 5 12 5 12 5s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.6 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.4 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.4ZM10 15.3V8.7l5.7 3.3-5.7 3.3Z" />
    </Base>
  )
}
