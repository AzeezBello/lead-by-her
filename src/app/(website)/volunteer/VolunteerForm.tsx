'use client'
import { useState } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const VOLUNTEER_EMAIL = 'info@leadbyher.org'

const fields = [
  ['name', 'Full name', 'text'],
  ['email', 'Email address', 'email'],
  ['phone', 'Phone number', 'tel'],
  ['interest', 'Area of interest', 'text'],
] as const

const fieldClass = 'h-auto rounded-xl py-3.5'

export function VolunteerForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [interest, setInterest] = useState('')
  const [message, setMessage] = useState('')

  const values: Record<string, string> = { name, email, phone, interest }
  const setters: Record<string, (v: string) => void> = {
    name: setName,
    email: setEmail,
    phone: setPhone,
    interest: setInterest,
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Volunteer application — ${name}`)
    const body = encodeURIComponent(
      `Full name: ${name}\nEmail: ${email}\nPhone: ${phone}\nArea of interest: ${interest}\n\nAbout me:\n${message}`
    )
    window.location.href = `mailto:${VOLUNTEER_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <Card className="rounded-3xl">
      <CardContent className="p-8">
        <form onSubmit={submit} className="grid gap-4">
          <h2 className="serif text-3xl">Volunteer application</h2>
          {fields.map(([key, label, type]) => (
            <div key={key} className="grid gap-1.5">
              <Label htmlFor={key} className="text-sm font-bold">
                {label}
              </Label>
              <Input
                id={key}
                type={type}
                required={key === 'name' || key === 'email'}
                placeholder={label}
                value={values[key]}
                onChange={(e) => setters[key](e.target.value)}
                className={fieldClass}
              />
            </div>
          ))}
          <div className="grid gap-1.5">
            <Label htmlFor="message" className="text-sm font-bold">
              Tell us about yourself
            </Label>
            <Textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-xl py-3.5"
            />
          </div>
          <Button type="submit" size="lg" className="h-auto rounded-full py-3.5 text-base">
            <Mail size={17} /> Submit application
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Opens your email app addressed to {VOLUNTEER_EMAIL}.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
