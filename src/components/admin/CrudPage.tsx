'use client'

import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Field = {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'number' | 'date' | 'url'
  required?: boolean
  placeholder?: string
}

type Props = {
  title: string
  description: string
  table: string
  fields: Field[]
  initialRows: any[]
  displayKey: string
  subtitleKey?: string
}

export default function CrudPage({
  title,
  description,
  table,
  fields,
  initialRows,
  displayKey,
  subtitleKey,
}: Props) {
  const [rows, setRows] = useState(initialRows)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [q, setQ] = useState('')
  const supabase = createClient()
  const empty = Object.fromEntries(fields.map((f) => [f.key, '']))

  function start(row?: any) {
    setEditing(row ? { ...row } : empty)
    setOpen(true)
  }

  async function save(e: FormEvent) {
    e.preventDefault()
    const payload = { ...editing }
    if (!payload.id) delete payload.id
    const result = editing.id
      ? await supabase.from(table).update(payload).eq('id', editing.id).select().single()
      : await supabase.from(table).insert(payload).select().single()
    if (result.error) {
      toast.error(result.error.message)
      return
    }
    setRows(editing.id ? rows.map((r) => (r.id === editing.id ? result.data : r)) : [result.data, ...rows])
    setOpen(false)
    toast.success(editing.id ? 'Changes saved.' : 'Item added.')
  }

  async function remove(id: string) {
    if (!confirm('Delete this item?')) return
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) {
      toast.error(error.message)
      return
    }
    setRows(rows.filter((r) => r.id !== id))
    toast.success('Item deleted.')
  }

  const filtered = rows.filter((r) => String(r[displayKey] || '').toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="p-6 md:p-8">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold tracking-[.16em] text-primary uppercase">Content management</p>
          <h1 className="mt-1 font-serif text-3xl">{title}</h1>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
        <Button onClick={() => start()}>
          <Plus size={17} /> Add new
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <div className="relative max-w-sm">
            <Search size={17} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="h-10 pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {filtered.length ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="h-auto p-4 font-semibold capitalize">
                    {displayKey.replaceAll('_', ' ')}
                  </TableHead>
                  {subtitleKey && (
                    <TableHead className="h-auto p-4 font-semibold capitalize">
                      {subtitleKey.replaceAll('_', ' ')}
                    </TableHead>
                  )}
                  <TableHead className="h-auto p-4 font-semibold">Created</TableHead>
                  <TableHead className="h-auto p-4" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="p-4 font-medium capitalize">{r[displayKey] || '—'}</TableCell>
                    {subtitleKey && (
                      <TableCell className="max-w-md truncate p-4 text-muted-foreground">
                        {r[subtitleKey] || '—'}
                      </TableCell>
                    )}
                    <TableCell className="p-4 text-muted-foreground">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString() : '—'}
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon-sm" onClick={() => start(r)} title="Edit">
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => remove(r.id)}
                          title="Delete"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-12 text-center text-muted-foreground">No records yet.</div>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl sm:max-w-2xl">
          <form onSubmit={save}>
            <DialogHeader>
              <DialogTitle>
                {editing?.id ? 'Edit' : 'Add'} {title.slice(0, -1)}
              </DialogTitle>
              <DialogDescription>Changes are saved to Supabase.</DialogDescription>
            </DialogHeader>

            <div className="grid max-h-[60vh] gap-4 overflow-y-auto py-4">
              {fields.map((f) => (
                <div key={f.key} className="space-y-2">
                  <Label htmlFor={f.key}>
                    {f.label}
                    {f.required && ' *'}
                  </Label>
                  {f.type === 'textarea' ? (
                    <Textarea
                      id={f.key}
                      required={f.required}
                      value={editing?.[f.key] ?? ''}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      rows={5}
                    />
                  ) : (
                    <Input
                      id={f.key}
                      required={f.required}
                      type={f.type || 'text'}
                      value={editing?.[f.key] ?? ''}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
