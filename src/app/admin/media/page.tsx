'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { FileText, Loader2, UploadCloud } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function MediaPage() {
  const [files, setFiles] = useState<any[]>([])
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetch('/api/media/list')
      .then((r) => r.json().then((d) => ({ ok: r.ok, d })))
      .then(({ ok, d }) => {
        if (cancelled) return
        if (ok) setFiles(d.files || [])
        else toast.error(d.error || 'Unable to load media.')
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function upload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    const form = new FormData()
    form.append('file', file)
    const r = await fetch('/api/media/upload', { method: 'POST', body: form })
    const d = await r.json()
    if (!r.ok) {
      toast.error(d.error || 'Upload failed')
    } else {
      setFiles((v) => [d.file, ...v])
      toast.success('File uploaded.')
    }
    setBusy(false)
    e.target.value = ''
  }

  return (
    <div className="p-6 md:p-8">
      <p className="text-xs font-bold tracking-[.16em] text-primary uppercase">Content</p>
      <h1 className="mt-1 font-serif text-3xl">Media Library</h1>
      <p className="mt-2 text-muted-foreground">Upload images and documents for the website.</p>

      <Card className="mt-7">
        <CardContent className="space-y-3">
          <Label htmlFor="media-upload" className="flex items-center gap-2 text-sm font-semibold">
            <UploadCloud size={16} /> Upload a file
          </Label>
          <Input
            id="media-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
            onChange={upload}
            disabled={busy}
          />
          {busy && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={14} className="animate-spin" /> Uploading…
            </p>
          )}
        </CardContent>
      </Card>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {files.map((f) => (
          <Card key={f.id} className="overflow-hidden p-0">
            {f.mime_type?.startsWith('image/') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={f.file_url} alt={f.name} className="aspect-square w-full object-cover" />
            ) : (
              <div className="grid aspect-square place-items-center gap-2 bg-muted text-sm text-muted-foreground">
                <FileText size={22} />
                PDF / FILE
              </div>
            )}
            <div className="p-4">
              <p className="truncate font-semibold">{f.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{Math.round((f.size_bytes || 0) / 1024)} KB</p>
              <a
                className="mt-3 inline-block text-sm font-semibold text-primary"
                href={f.file_url}
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
            </div>
          </Card>
        ))}
      </div>

      {!files.length && <div className="py-16 text-center text-muted-foreground">No media uploaded yet.</div>}
    </div>
  )
}
