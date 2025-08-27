// src/components/client/ResponsiveClientSidebar.tsx
'use client'
import { useAuth } from '@/contexts/AuthContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  BarChart3, 
  LogOut,
  UserCircle,
  FolderOpen,
  CreditCard,
  FileText,
  Settings,
  MessageCircle,
  Clock,
  Coins,
  TrendingUp,
} from 'lucide-react'

export default function ResponsiveClientSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  
  const navigation = [
    { name: 'Dashboard', href: '/client', icon: BarChart3 },
    { name: 'Projects', href: '/client/projects', icon: FolderOpen },
    { name: 'Payments', href: '/client/payments', icon: CreditCard },
    { name: 'Requests', href: '/client/requests', icon: Clock },
    { name: 'Documents', href: '/client/documents', icon: FileText },
    { name: 'Token Requests', href: '/client/token-request', icon: Coins },
    { name: 'Request Status', href: '/client/token-request/status', icon: Clock },
    { name: 'Marketplace', href: '/client/marketplace', icon: TrendingUp }
  ]

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-slate-800 text-white">
      {/* Logo/Brand Section */}
      <Link
        className="mb-2 flex h-16 items-center justify-start rounded-md bg-blue-600 p-4 md:h-20"
        href="/client"
      >
        <div className="flex items-center space-x-2 text-white">
          <UserCircle className="h-8 w-8 md:h-10 md:w-10" />
          <div className="hidden md:block">
            <p className="font-bold text-lg">Client Portal</p>
            <p className="text-xs text-blue-200">Coltium Industries</p>
          </div>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-1 flex-grow">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/client')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium transition-all duration-200 md:flex-none md:justify-start md:p-2 md:px-3 ${
                  isActive 
                    ? 'bg-slate-700 text-white border-r-2 border-blue-500 md:border-r-2' 
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white md:bg-transparent md:hover:bg-slate-700'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : ''}`} />
                <span className="hidden md:block">{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Spacer for desktop */}
        <div className="hidden md:block h-auto w-full grow rounded-md"></div>

        

        {/* Logout Button */}
        <Button
          onClick={logout}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-sm font-medium hover:bg-red-600 hover:text-white transition-colors md:flex-none md:justify-start md:p-2 md:px-3"
          variant="ghost"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden md:block">Sign Out</span>
        </Button>
      </div>
    </div>
  )
}