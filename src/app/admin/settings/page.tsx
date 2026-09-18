import { requireAdmin } from '@/lib/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Settings() {
  const { user, profile } = await requireAdmin()

  return (
    <div className="max-w-4xl p-6 md:p-8">
      <p className="text-xs font-bold tracking-[.16em] text-primary uppercase">System</p>
      <h1 className="mt-1 font-serif text-3xl">Settings</h1>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="mt-1">{user?.email}</p>
            <p className="mt-4 text-sm text-muted-foreground">Role</p>
            <p className="mt-1 capitalize">{profile?.role?.replace('_', ' ') || 'Admin'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supabase</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Authentication and content storage are powered by Supabase. Add your project keys to{' '}
              <code>.env.local</code> before running locally.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
