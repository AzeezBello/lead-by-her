import { requireAdmin } from '@/lib/admin'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

function statusBadgeClass(status?: string | null) {
  const s = (status || '').toLowerCase()
  if (['successful', 'success', 'completed', 'paid'].includes(s)) return 'bg-secondary text-secondary-foreground'
  if (['pending', 'processing'].includes(s)) return 'bg-accent text-accent-foreground'
  if (['failed', 'cancelled', 'refunded'].includes(s)) return 'bg-destructive/10 text-destructive'
  return 'bg-muted text-muted-foreground'
}

export default async function Donations() {
  const { supabase } = await requireAdmin()
  const { data } = await supabase.from('donations').select('*').order('created_at', { ascending: false })

  return (
    <div className="p-6 md:p-8">
      <p className="text-xs font-bold tracking-[.16em] text-primary uppercase">Finance</p>
      <h1 className="mt-1 font-serif text-3xl">Donations</h1>
      <p className="mt-2 mb-7 text-muted-foreground">Review donation transactions and payment statuses.</p>

      <div className="overflow-auto rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              <TableHead className="h-auto p-4">Donor</TableHead>
              <TableHead className="h-auto p-4">Amount</TableHead>
              <TableHead className="h-auto p-4">Gateway</TableHead>
              <TableHead className="h-auto p-4">Status</TableHead>
              <TableHead className="h-auto p-4">Reference</TableHead>
              <TableHead className="h-auto p-4">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data || []).map((d: any) => (
              <TableRow key={d.id}>
                <TableCell className="p-4">{d.donor_name || 'Anonymous'}</TableCell>
                <TableCell className="p-4 font-semibold">
                  {d.currency || 'NGN'} {Number(d.amount).toLocaleString()}
                </TableCell>
                <TableCell className="p-4">{d.payment_gateway || '—'}</TableCell>
                <TableCell className="p-4">
                  <Badge className={cn('capitalize', statusBadgeClass(d.payment_status))}>
                    {d.payment_status || 'unknown'}
                  </Badge>
                </TableCell>
                <TableCell className="p-4 text-muted-foreground">{d.payment_reference || '—'}</TableCell>
                <TableCell className="p-4 text-muted-foreground">
                  {new Date(d.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!data?.length && <div className="p-12 text-center text-muted-foreground">No donation records yet.</div>}
      </div>
    </div>
  )
}
