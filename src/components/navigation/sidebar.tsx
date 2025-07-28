'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import {
  HomeIcon,
  QueueListIcon,
  MusicalNoteIcon,
  ChartBarIcon,
  UserIcon,
  CogIcon,
  PlayIcon,
  CurrencyDollarIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

interface SidebarProps {
  className?: string
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'My Queue', href: '/queue', icon: QueueListIcon },
  { name: 'Song Requests', href: '/requests', icon: MusicalNoteIcon },
  { name: 'Earnings & Tips', href: '/tips', icon: CurrencyDollarIcon },
  { name: 'Performance Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Other DJs', href: '/djs', icon: UserIcon },
  { name: 'DJ Profile', href: '/profile', icon: UserIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' })
  }

  return (
    <div className={cn("flex h-full w-64 flex-col bg-dark-primary border-r border-gray-700", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500">
            <PlayIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">Spinwish</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary-500/20 text-primary-400 border-r-2 border-primary-500"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-primary-400" : "text-gray-400 group-hover:text-white"
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-700 p-4">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <img
              className="h-10 w-10 rounded-full"
              src={session?.user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
              alt="User avatar"
            />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-white truncate">
                {session?.user?.firstName && session?.user?.lastName
                  ? `${session.user.firstName} ${session.user.lastName}`
                  : session?.user?.name || 'User'
                }
              </p>
              <p className="text-xs text-gray-400 truncate capitalize">
                {session?.user?.role || 'Client'}
              </p>
            </div>
            <ChevronDownIcon
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform",
                showUserMenu && "rotate-180"
              )}
            />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-dark-secondary border border-gray-600 rounded-lg shadow-lg py-2">
              <Link
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <UserIcon className="h-4 w-4 mr-3" />
                View Profile
              </Link>
              <Link
                href="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <CogIcon className="h-4 w-4 mr-3" />
                Settings
              </Link>
              <hr className="my-2 border-gray-600" />
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
