'use client'
import { useState } from 'react'
import { Heart, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

const amounts = [5000, 10000, 25000, 50000]

export default function DonationForm({ campaignId }: { campaignId?: string }) {
  const [amount, setAmount] = useState(10000)
  const [custom, setCustom] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const value = Number(custom || amount)
    if (value < 100) {
      setError('Minimum donation is ₦100.')
      return
    }
    setLoading(true)
    try {
      const r = await fetch('/api/payments/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: value, name, email, campaignId, isAnonymous: anonymous, donationType: 'one_time' }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'Unable to start payment')
      window.location.href = d.authorizationUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed')
      setLoading(false)
    }
  }

  return (
    <Card className="mt-9 rounded-3xl">
      <CardContent className="grid gap-4 p-8">
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {amounts.map((v) => (
              <Button
                key={v}
                type="button"
                variant={amount === v && !custom ? 'default' : 'outline'}
                className="h-auto rounded-xl py-3.5 font-extrabold"
                onClick={() => {
                  setAmount(v)
                  setCustom('')
                }}
              >
                ₦{v.toLocaleString()}
              </Button>
            ))}
          </div>
          <Input
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="Custom amount"
            inputMode="numeric"
            className="h-auto rounded-xl py-3.5"
          />
          <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="h-auto rounded-xl py-3.5" />
          <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="h-auto rounded-xl py-3.5" />
          <Label className="flex items-center gap-2 text-sm font-normal">
            <input type="checkbox" className="size-4" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
            Make my donation anonymous
          </Label>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button disabled={loading} type="submit" size="lg" className={cn('rounded-full py-6 text-base')}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={17} /> Connecting securely…
              </>
            ) : (
              <>
                <Heart size={17} /> Continue to secure payment
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">You will be redirected to Paystack to complete your donation.</p>
        </form>
      </CardContent>
    </Card>
  )
}
