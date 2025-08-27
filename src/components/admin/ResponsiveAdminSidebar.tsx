// src/components/admin/ResponsiveAdminSidebar.tsx 
'use client'
import { useAuth } from '@/contexts/AuthContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  LogOut,
  UserCircle,
  Users,
  ClipboardList,
  FileText,
  Settings,
  Shield,
  Database,
  FolderOpen,
  DollarSign,
  Coins
} from 'lucide-react'

export default function ResponsiveAdminSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Requests', href: '/admin/requested-projects', icon: ClipboardList },
    { name: 'Documents', href: '/admin/documents', icon: FileText },
    { name: 'Reports', href: '/admin/reports', icon: Database },
    { name: 'Payments', href: '/admin/payments', icon: DollarSign },
    { name: 'Token Requests', href: '/admin/token-requests', icon: Coins }
  ]

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-slate-800 text-white">
      {/* Logo/Brand Section */}
      <Link
        className="mb-2 flex h-16 items-center justify-start rounded-md bg-red-600 p-4 md:h-20"
        href="/admin"
      >
        <div className="flex items-center space-x-2 text-white">
          <Shield className="h-8 w-8 md:h-10 md:w-10" />
          <div className="hidden md:block">
            <p className="font-bold text-lg">Admin Panel</p>
            <p className="text-xs text-red-200">v1.0</p>
          </div>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-1 flex-grow">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium transition-all duration-200 md:flex-none md:justify-start md:p-2 md:px-3 ${
                  isActive 
                    ? 'bg-slate-700 text-white border-r-2 border-red-500 md:border-r-2' 
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white md:bg-transparent md:hover:bg-slate-700'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-red-400' : ''}`} />
                <span className="hidden md:block">{item.name}</span>
              </Link>
            )
          })}
        </div>     

        {/* Logout Button */}
        <Button
          onClick={logout}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-sm font-medium hover:bg-red-600 hover:text-white transition-colors md:flex-none md:justify-start md:p-2 md:px-3"
          variant="ghost"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden md:block">Logout</span>
        </Button>
      </div>
    </div>
  )
}