'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowRight, Loader2, LockKeyhole } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    router.replace('/admin')
    router.refresh()
  }

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-primary p-16 text-primary-foreground lg:flex">
        <div>
          <Image src="/images/logo-lbh-white.png" alt="Lead by Her" width={1327} height={1134} className="h-14 w-auto" />
          <h1 className="mt-10 font-serif text-6xl leading-tight">
            Admin
            <br />
            Portal
          </h1>
          <p className="mt-6 max-w-md text-lg text-primary-foreground/70">
            Manage campaigns, stories, programs, volunteers, events and donations from one secure workspace.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/50">© 2026 Lead by Her Empowerment Initiative</p>
      </section>

      <section className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="[--card-spacing:--spacing(8)]">
            <div className="grid size-12 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
              <LockKeyhole />
            </div>
            <h2 className="mt-6 font-serif text-3xl">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">Sign in to manage the organization.</p>

            <form onSubmit={submit} className="mt-7 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" disabled={loading} className="h-11 w-full">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Signing in...
                  </>
                ) : (
                  <>
                    Sign in <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
