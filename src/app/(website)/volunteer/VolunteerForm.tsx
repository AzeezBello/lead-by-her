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

const fields = [
  ['name', 'Full name', 'text'],
  ['email', 'Email address', 'email'],
  ['phone', 'Phone number', 'tel'],
  ['interest', 'Area of interest', 'text'],
] as const

export function VolunteerForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [interest, setInterest] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const values: Record<string, string> = { name, email, phone, interest }
  const setters: Record<string, (v: string) => void> = {
    name: setName,
    email: setEmail,
    phone: setPhone,
    interest: setInterest,
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from('volunteers').insert({ name, email, phone, interest, message })
      if (error) throw error
      setSubmitted(true)
      toast.success("Thank you — your application has been received.")
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
          <h2 className="serif text-3xl">Thank you for applying.</h2>
          <p className="text-muted-foreground">
            We have received your volunteer application and will be in touch soon.
          </p>
        </CardContent>
      </Card>
    )
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
              />
            </div>
          ))}
          <div className="grid gap-1.5">
            <Label htmlFor="message" className="text-sm font-bold">
              Tell us about yourself
            </Label>
            <Textarea id="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <Button type="submit" size="lg" disabled={loading} className="rounded-full">
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={17} /> Submitting…
              </>
            ) : (
              'Submit application'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
