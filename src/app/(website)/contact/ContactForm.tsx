'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from('contact_messages').insert({ name, email, subject, message })
      if (error) throw error
      setSubmitted(true)
      toast.success("Thanks for reaching out — we'll get back to you soon.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="rounded-3xl">
        <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
          <CheckCircle2 className="text-primary" size={40} />
          <h2 className="serif text-3xl">Message sent.</h2>
          <p className="text-muted-foreground">Thank you for reaching out — we will respond as soon as we can.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="message">Your message</Label>
        <Textarea
          id="message"
          required
          placeholder="Your message"
          rows={7}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button type="submit" size="lg" disabled={loading} className="rounded-full">
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={17} /> Sending…
          </>
        ) : (
          'Send message'
        )}
      </Button>
    </form>
  )
}
