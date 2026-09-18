import Link from 'next/link'
import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  FileText,
  FolderKanban,
  HeartHandshake,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { requireAdmin } from '@/lib/admin'
import SignOutButton from '@/components/admin/SignOutButton'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

type NavItem = { label: string; href: string; icon: LucideIcon }
type NavGroup = { title: string; items: NavItem[] }

const groups: NavGroup[] = [
  {
    title: 'Overview',
    items: [{ label: 'Dashboard', href: '/admin', icon: LayoutDashboard }],
  },
  {
    title: 'Content',
    items: [
      { label: 'Programs', href: '/admin/programs', icon: FolderKanban },
      { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
      { label: 'Campaigns', href: '/admin/campaigns', icon: Megaphone },
      { label: 'Media Library', href: '/admin/media', icon: FileText },
      { label: 'Events', href: '/admin/events', icon: CalendarDays },
    ],
  },
  {
    title: 'People',
    items: [
      { label: 'Team', href: '/admin/team', icon: Users },
      { label: 'Board', href: '/admin/board', icon: ShieldCheck },
      { label: 'Volunteers', href: '/admin/volunteers', icon: HeartHandshake },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Donations', href: '/admin/donations', icon: HeartHandshake },
      { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin()

  if (!user) return <>{children}</>

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="gap-0 px-4 py-5">
          <Link href="/admin">
            <Image src="/images/logo-lbh-white.png" alt="Lead by Her" width={1327} height={1134} className="h-12 w-auto" />
          </Link>
          <div className="mt-2 text-[10px] tracking-[.18em] text-sidebar-foreground/50 uppercase">
            Admin workspace
          </div>
        </SidebarHeader>

        <SidebarContent>
          {groups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild tooltip={item.label}>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <Separator className="mb-1 bg-sidebar-border" />
          <div className="truncate px-2 pt-1 text-xs text-sidebar-foreground/50">{user.email}</div>
          <SignOutButton />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-4 md:hidden">
          <SidebarTrigger />
          <Link href="/admin">
            <Image src="/images/logo-lbh.png" alt="Lead by Her" width={1327} height={1134} className="h-9 w-auto" />
          </Link>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
