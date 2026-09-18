'use client'
import { useState } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const CONTACT_EMAIL = 'info@leadbyher.org'

const fieldClass = 'h-auto rounded-xl py-3.5'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const mailSubject = encodeURIComponent(subject || `Message from ${name}`)
    const mailBody = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`
  }

  return (
    <Card className="rounded-3xl">
      <CardContent className="p-8">
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="name" className="text-sm font-bold">
              Name
            </Label>
            <Input
              id="name"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="email" className="text-sm font-bold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="subject" className="text-sm font-bold">
              Subject
            </Label>
            <Input
              id="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="message" className="text-sm font-bold">
              Your message
            </Label>
            <Textarea
              id="message"
              required
              placeholder="Your message"
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-xl py-3.5"
            />
          </div>
          <Button type="submit" size="lg" className="h-auto rounded-full py-3.5 text-base">
            <Mail size={17} /> Send message
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Opens your email app addressed to {CONTACT_EMAIL}.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
