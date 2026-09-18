import { requireAdmin } from '@/lib/admin'
import { Card, CardContent } from '@/components/ui/card'

export default async function Messages() {
  const { supabase } = await requireAdmin()
  const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })

  return (
    <div className="p-6 md:p-8">
      <p className="text-xs font-bold tracking-[.16em] text-primary uppercase">Inbox</p>
      <h1 className="mt-1 font-serif text-3xl">Messages</h1>
      <p className="mt-2 mb-7 text-muted-foreground">Contact form submissions from the website.</p>

      <div className="grid gap-4">
        {(data || []).map((m: any) => (
          <Card key={m.id}>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold">{m.subject || 'Website enquiry'}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {m.name} · {m.email}
                  </p>
                </div>
                <time className="shrink-0 text-xs text-muted-foreground">
                  {new Date(m.created_at).toLocaleDateString()}
                </time>
              </div>
              <p className="text-sm leading-6 whitespace-pre-wrap text-foreground/80">{m.message}</p>
            </CardContent>
          </Card>
        ))}
        {!data?.length && (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">No messages yet.</CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
