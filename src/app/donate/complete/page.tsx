'use client'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Complete() {
  return (
    <Suspense
      fallback={
        <main className="section">
          <div className="container mx-auto max-w-2xl text-center">
            <Loader2 className="mx-auto mb-6 animate-spin text-primary" size={40} />
            <h1 className="serif text-4xl">Confirming your donation…</h1>
          </div>
        </main>
      }
    >
      <CompleteInner />
    </Suspense>
  )
}

function CompleteInner() {
  const params = useSearchParams()
  const reference = params.get('reference') || ''
  const [state, setState] = useState<'loading' | 'success' | 'failed'>('loading')
  const [error, setError] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!reference) {
        if (!cancelled) setState('failed')
        return
      }
      try {
        const res = await fetch('/api/payments/paystack/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference }),
        })
        const data = await res.json()
        if (!res.ok || !data.success) throw new Error(data.error || 'Payment could not be verified')
        if (cancelled) return
        setToken(data.receiptToken || '')
        setState('success')
      } catch (e) {
        if (cancelled) return
        setError(e instanceof Error ? e.message : 'Payment verification failed')
        setState('failed')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [reference])

  return (
    <main className="section">
      <div className="container mx-auto max-w-2xl text-center">
        {state === 'loading' ? (
          <>
            <Loader2 className="mx-auto mb-6 animate-spin text-primary" size={40} />
            <h1 className="serif text-4xl">Confirming your donation…</h1>
            <p className="mt-3 text-muted-foreground">Please wait while we securely verify your payment.</p>
          </>
        ) : state === 'success' ? (
          <>
            <CheckCircle2 className="mx-auto mb-6 text-primary" size={48} />
            <div className="text-xs font-bold tracking-[0.16em] text-primary uppercase">Thank you</div>
            <h1 className="serif mt-2 text-4xl">Your donation was successful.</h1>
            <p className="mt-3 text-muted-foreground">
              Reference: <strong className="text-foreground">{reference}</strong>
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full">
                <a href={`/api/receipts/${encodeURIComponent(reference)}${token ? `?token=${encodeURIComponent(token)}` : ''}`}>View / Print Receipt</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <XCircle className="mx-auto mb-6 text-destructive" size={48} />
            <h1 className="serif text-4xl">We could not confirm the payment.</h1>
            <p className="mt-3 text-muted-foreground">{error}</p>
            <Button asChild size="lg" className="mt-7 rounded-full">
              <Link href="/donate">Try Again</Link>
            </Button>
          </>
        )}
      </div>
    </main>
  )
}
