'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LazyImage, LazyAvatar } from '@/components/ui/lazy-image'
import {
  MusicalNoteIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ClockIcon,
  PlayIcon,
  PauseIcon,
  StarIcon,
  ChartBarIcon,
  CalendarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { formatCurrency, formatTime } from '@/lib/utils'
import { mockRequests, mockTransactions, currentVenue, getDJProfile, mockDJProfiles } from '@/lib/mock-data'

export function DJDashboard() {
  const { data: session } = useSession()
  
  // Get current DJ profile (in real app, this would be fetched from API)
  const currentDJProfile = mockDJProfiles.find(dj => dj.userId === session?.user?.id) || mockDJProfiles[0] // Demo DJ or fallback
  
  // Calculate stats from mock data
  const todayRequests = mockRequests.filter(r => 
    new Date(r.requestedAt).toDateString() === new Date().toDateString()
  ).length
  
  const todayEarnings = mockTransactions
    .filter(t => 
      t.status === 'succeeded' && 
      new Date(t.createdAt).toDateString() === new Date().toDateString()
    )
    .reduce((sum, t) => sum + t.netAmount, 0)
  
  const pendingRequests = mockRequests.filter(r => r.status === 'pending').length
  const queueLength = mockRequests.filter(r => r.status === 'accepted').length

  const recentRequests = mockRequests.slice(0, 5)
  const upcomingGigs = [
    {
      id: 1,
      venue: 'Club Paradise',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      time: '21:00',
      duration: '4 hours',
      fee: 500
    },
    {
      id: 2,
      venue: 'The Underground',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      time: '22:00',
      duration: '3 hours',
      fee: 350
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i}>
        {i < Math.floor(rating) ? (
          <StarIconSolid className="h-4 w-4 text-yellow-400" />
        ) : (
          <StarIcon className="h-4 w-4 text-gray-400" />
        )}
      </span>
    ))
  }

  return (
    <div className="space-y-6">
      {/* DJ Status Card */}
      <Card className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border-primary-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <LazyAvatar
                  src={session?.user?.image || undefined}
                  alt={currentDJProfile.stageName}
                  size="xl"
                  fallbackInitials={currentDJProfile.stageName.slice(0, 2)}
                />
                {currentDJProfile.isLive && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-dark-primary animate-pulse flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentDJProfile.stageName}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    {renderStars(currentDJProfile.rating)}
                    <span className="text-sm text-gray-400">({currentDJProfile.rating})</span>
                  </div>
                  <Badge variant={currentDJProfile.verificationStatus === 'verified' ? 'default' : 'secondary'}>
                    {currentDJProfile.verificationStatus === 'verified' ? 'Verified DJ' : 'Pending Verification'}
                  </Badge>
                </div>
                <p className="text-gray-400 mt-1">{currentDJProfile.experience} years experience</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                {currentDJProfile.isLive ? (
                  <>
                    <Badge className="bg-green-500 text-white animate-pulse">LIVE NOW</Badge>
                    <Button size="sm" variant="outline">
                      <PauseIcon className="h-4 w-4 mr-1" />
                      End Set
                    </Button>
                  </>
                ) : (
                  <Button size="sm">
                    <PlayIcon className="h-4 w-4 mr-1" />
                    Go Live
                  </Button>
                )}
              </div>
              {currentDJProfile.currentVenue && (
                <div className="flex items-center text-sm text-gray-400">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {currentVenue.name}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-dark-secondary/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MusicalNoteIcon className="h-8 w-8 text-primary-500" />
              <div>
                <p className="text-2xl font-bold text-white">{todayRequests}</p>
                <p className="text-sm text-gray-400">Requests Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-white">{formatCurrency(todayEarnings)}</p>
                <p className="text-sm text-gray-400">Earned Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-white">{pendingRequests}</p>
                <p className="text-sm text-gray-400">Pending Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UsersIcon className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-white">{queueLength}</p>
                <p className="text-sm text-gray-400">Songs in Queue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card className="bg-dark-secondary/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <MusicalNoteIcon className="h-5 w-5" />
              <span>Recent Requests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-dark-primary/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <LazyImage
                      src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=40&h=40&fit=crop"
                      alt="Song"
                      className="h-10 w-10 rounded"
                    />
                    <div>
                      <p className="font-medium text-white">Song Title</p>
                      <p className="text-sm text-gray-400">Artist Name</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-medium">{formatCurrency(request.tipAmount)}</p>
                    <Badge 
                      variant={request.status === 'pending' ? 'secondary' : 'default'}
                      className="text-xs"
                    >
                      {request.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Requests
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Gigs */}
        <Card className="bg-dark-secondary/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>Upcoming Gigs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingGigs.map((gig) => (
                <div key={gig.id} className="p-4 bg-dark-primary/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{gig.venue}</h3>
                    <Badge className="bg-primary-500 text-white">
                      {formatCurrency(gig.fee)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{gig.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{gig.time} ({gig.duration})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Bookings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="bg-dark-secondary/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <ChartBarIcon className="h-5 w-5" />
            <span>Performance Insights</span>
          </CardTitle>
          <CardDescription>
            Your performance metrics for this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{currentDJProfile.totalRequests}</p>
              <p className="text-sm text-gray-400">Total Requests</p>
              <p className="text-xs text-green-400 mt-1">+12% from last month</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{formatCurrency(currentDJProfile.totalEarnings)}</p>
              <p className="text-sm text-gray-400">Total Earnings</p>
              <p className="text-xs text-green-400 mt-1">+8% from last month</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{currentDJProfile.rating}</p>
              <p className="text-sm text-gray-400">Average Rating</p>
              <p className="text-xs text-green-400 mt-1">+0.2 from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
