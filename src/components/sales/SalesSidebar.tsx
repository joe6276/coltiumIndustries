// src/components/sales/SalesSidebar.tsx - Sales Navigation
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
  FolderOpen,
  UserPlus,
  Settings,
  DollarSign,
  PlusCircle
} from 'lucide-react'

export default function SalesSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/sales', icon: BarChart3 },
    { name: 'Projects', href: '/sales/projects', icon: FolderOpen },
    { name: 'Create Project', href: '/sales/create-project', icon: PlusCircle },
    { name: 'Manage Clients', href: '/sales/clients', icon: Users },
    { name: 'Add Client', href: '/sales/add-client', icon: UserPlus },
    { name: 'Payments', href: '/sales/payments', icon: DollarSign },
    

    
    // { name: 'Settings', href: '/sales/settings', icon: Settings },
  ]

  return (
    <div className="w-64 bg-slate-800 text-white flex flex-col">
      {/* User Profile */}
      <div className="p-4 border-b border-slate-700 flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <DollarSign className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{user?.email}</p>
          <p className="text-xs text-slate-400">Sales Team</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/sales')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center p-3 space-x-3 rounded-md hover:bg-slate-700 transition-colors ${
                isActive ? 'bg-slate-700 border-r-2 border-green-500' : ''
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* System Info */}
      <div className="p-4 border-t border-slate-700 text-xs text-slate-400">
        <p>Sales Portal v1.0</p>
        <p>User ID: {user?.id}</p>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-white hover:bg-slate-700 hover:text-white"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}