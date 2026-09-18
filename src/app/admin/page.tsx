import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, BookOpen, HeartHandshake, Megaphone, Plus, Users } from 'lucide-react'
import { requireAdmin } from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

async function count(s: any, table: string) {
  const { count } = await s.from(table).select('*', { count: 'exact', head: true })
  return count || 0
}

type Stat = { label: string; value: number; icon: LucideIcon; href: string }

export default async function Dashboard() {
  const { supabase, profile } = await requireAdmin()
  const [campaigns, donations, volunteers, posts] = await Promise.all([
    count(supabase, 'campaigns'),
    count(supabase, 'donations'),
    count(supabase, 'volunteers'),
    count(supabase, 'blog_posts'),
  ])
  const { data: recent } = await supabase
    .from('donations')
    .select('id,donor_name,amount,currency,payment_status,created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats: Stat[] = [
    { label: 'Campaigns', value: campaigns, icon: Megaphone, href: '/admin/campaigns' },
    { label: 'Donations', value: donations, icon: HeartHandshake, href: '/admin/donations' },
    { label: 'Volunteers', value: volunteers, icon: Users, href: '/admin/volunteers' },
    { label: 'Blog posts', value: posts, icon: BookOpen, href: '/admin/blog' },
  ]

  const quickActions = [
    { label: 'Create campaign', href: '/admin/campaigns' },
    { label: 'Publish blog post', href: '/admin/blog' },
    { label: 'Add team member', href: '/admin/team' },
    { label: 'Review volunteers', href: '/admin/volunteers' },
  ]

  return (
    <div>
      <header className="flex items-center justify-between border-b border-border bg-card p-6 md:p-8">
        <div>
          <p className="text-xs font-bold tracking-[.16em] text-primary uppercase">Dashboard</p>
          <h1 className="mt-1 font-serif text-3xl">
            Good to see you{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}.
          </h1>
        </div>
        <Button variant="outline" asChild className="hidden sm:flex">
          <Link href="/" target="_blank">
            View website <ArrowUpRight size={16} />
          </Link>
        </Button>
      </header>

      <div className="space-y-8 p-6 md:p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <Card className="transition hover:shadow-sm">
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="grid size-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                      <stat.icon size={19} />
                    </div>
                    <ArrowUpRight size={17} className="text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-3xl font-semibold">{stat.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="font-semibold">Recent donations</h2>
                <p className="text-sm text-muted-foreground">Latest payment activity</p>
              </div>
              <Link href="/admin/donations" className="text-sm font-semibold text-primary">
                View all
              </Link>
            </div>
            {recent?.length ? (
              <div className="divide-y divide-border">
                {recent.map((d: any) => (
                  <div key={d.id} className="flex items-center justify-between p-5">
                    <div>
                      <div className="font-medium">{d.donor_name || 'Anonymous donor'}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(d.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {d.currency || 'NGN'} {Number(d.amount).toLocaleString()}
                      </div>
                      <div className="text-xs text-forest-700">{d.payment_status}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center text-muted-foreground">
                No donations yet. They will appear here after payment webhooks are connected.
              </div>
            )}
          </Card>

          <Card className="bg-primary p-6 text-primary-foreground">
            <p className="text-xs tracking-[.16em] text-primary-foreground/60 uppercase">Quick actions</p>
            <h2 className="mt-2 font-serif text-2xl">Keep the story moving.</h2>
            <div className="mt-6 space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center justify-between rounded-xl bg-primary-foreground/10 px-4 py-3 text-sm hover:bg-primary-foreground/15"
                >
                  <span>{action.label}</span>
                  <Plus size={16} />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
