'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LazyImage, LazyAvatar } from '@/components/ui/lazy-image'
import { useLoadingState } from '@/contexts/loading-context'
import {
  MusicalNoteIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ClockIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon
} from '@heroicons/react/24/outline'
import { formatCurrency, formatTime } from '@/lib/utils'
import { mockRequests, mockTransactions, currentVenue, currentDJ } from '@/lib/mock-data'

export function Dashboard() {
  const { isLoading, setLoading } = useLoadingState('dashboard')

  // Calculate stats from mock data
  const totalRequests = mockRequests.length
  const pendingRequests = mockRequests.filter(r => r.status === 'pending').length
  const totalEarnings = mockTransactions
    .filter(t => t.status === 'succeeded')
    .reduce((sum, t) => sum + t.netAmount, 0)
  const activeUsers = 47 // Mock active users count

  const recentRequests = mockRequests.slice(0, 3)
  const recentTransactions = mockTransactions.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <MusicalNoteIcon className="h-4 w-4 text-primary-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-gray-400">
              {pendingRequests} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tonight's Earnings</CardTitle>
            <CurrencyDollarIcon className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalEarnings)}</div>
            <p className="text-xs text-gray-400">
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-secondary-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-gray-400">
              Currently at venue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Wait Time</CardTitle>
            <ClockIcon className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 min</div>
            <p className="text-xs text-gray-400">
              -2 min from average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Now Playing */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PlayIcon className="h-5 w-5 text-primary-500" />
              <span>Now Playing</span>
              <Badge variant="live">LIVE</Badge>
            </CardTitle>
            <CardDescription>Currently playing at {currentVenue.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <LazyImage
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
                alt="Album cover"
                className="h-16 w-16 rounded-lg"
                priority={true}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Blinding Lights</h3>
                <p className="text-gray-400">The Weeknd • After Hours</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full w-3/4"></div>
                  </div>
                  <span className="text-sm text-gray-400">2:45 / 3:20</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <PauseIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ForwardIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DJ Info */}
        <Card>
          <CardHeader>
            <CardTitle>Current DJ</CardTitle>
            <CardDescription>Live at {currentVenue.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <LazyAvatar
                src={currentDJ.profileImage}
                alt={`${currentDJ.firstName} ${currentDJ.lastName}`}
                size="lg"
                fallbackInitials={`${currentDJ.firstName[0]}${currentDJ.lastName[0]}`}
              />
              <div>
                <h3 className="font-semibold">{currentDJ.firstName} {currentDJ.lastName}</h3>
                <p className="text-sm text-gray-400">Professional DJ</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Set Duration</span>
                <span>2h 15m</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Queue Length</span>
                <span>{pendingRequests} songs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tips Tonight</span>
                <span className="text-success">{formatCurrency(totalEarnings)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
            <CardDescription>Latest song requests from patrons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <LazyImage
                      src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=40&h=40&fit=crop"
                      alt="Song"
                      className="h-10 w-10 rounded"
                    />
                    <div>
                      <p className="font-medium">Song Title</p>
                      <p className="text-sm text-gray-400">Artist Name</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={request.status as any}>{request.status}</Badge>
                    <p className="text-sm text-gray-400 mt-1">
                      {formatCurrency(request.tipAmount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tips</CardTitle>
            <CardDescription>Latest tip transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <CurrencyDollarIcon className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="font-medium">Tip from John D.</p>
                      <p className="text-sm text-gray-400">
                        {formatTime(transaction.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">
                      +{formatCurrency(transaction.netAmount)}
                    </p>
                    <Badge variant={transaction.status as any} className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
