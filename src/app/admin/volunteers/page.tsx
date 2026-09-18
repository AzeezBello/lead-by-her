import { requireAdmin } from '@/lib/admin'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

function statusBadgeClass(status?: string | null) {
  const s = (status || '').toLowerCase()
  if (['approved', 'active', 'contacted'].includes(s)) return 'bg-secondary text-secondary-foreground'
  if (['new', 'pending'].includes(s)) return 'bg-accent text-accent-foreground'
  if (['declined', 'inactive'].includes(s)) return 'bg-destructive/10 text-destructive'
  return 'bg-muted text-muted-foreground'
}

export default async function Volunteers() {
  const { supabase } = await requireAdmin()
  const { data } = await supabase.from('volunteers').select('*').order('created_at', { ascending: false })

  return (
    <div className="p-6 md:p-8">
      <p className="text-xs font-bold tracking-[.16em] text-primary uppercase">People</p>
      <h1 className="mt-1 font-serif text-3xl">Volunteers</h1>
      <p className="mt-2 mb-7 text-muted-foreground">Review people who want to support the project.</p>

      <div className="overflow-auto rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              <TableHead className="h-auto p-4">Name</TableHead>
              <TableHead className="h-auto p-4">Email</TableHead>
              <TableHead className="h-auto p-4">Phone</TableHead>
              <TableHead className="h-auto p-4">Interest</TableHead>
              <TableHead className="h-auto p-4">Status</TableHead>
              <TableHead className="h-auto p-4">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data || []).map((v: any) => (
              <TableRow key={v.id}>
                <TableCell className="p-4 font-medium">{v.name}</TableCell>
                <TableCell className="p-4">{v.email}</TableCell>
                <TableCell className="p-4">{v.phone || '—'}</TableCell>
                <TableCell className="p-4">{v.interest || '—'}</TableCell>
                <TableCell className="p-4">
                  <Badge className={cn('capitalize', statusBadgeClass(v.status))}>{v.status || 'new'}</Badge>
                </TableCell>
                <TableCell className="p-4 text-muted-foreground">
                  {new Date(v.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!data?.length && (
          <div className="p-12 text-center text-muted-foreground">No volunteer applications yet.</div>
        )}
      </div>
    </div>
  )
}
