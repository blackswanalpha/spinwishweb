'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  PlayIcon, 
  CheckIcon, 
  XMarkIcon, 
  ClockIcon,
  MusicalNoteIcon,
  CurrencyDollarIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { formatCurrency, formatTime, formatDuration } from '@/lib/utils'
import { mockRequests, mockSongs, mockUsers } from '@/lib/mock-data'

interface QueueItem {
  id: string
  position: number
  song: {
    title: string
    artist: string
    duration: number
    imageUrl: string
  }
  requester: {
    name: string
    profileImage: string
  }
  tipAmount: number
  message?: string
  requestedAt: Date
  status: 'pending' | 'accepted' | 'rejected' | 'fulfilled'
}

export function QueueManagement() {
  // Mock queue data
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    {
      id: '1',
      position: 1,
      song: {
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        duration: 200,
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop'
      },
      requester: {
        name: 'John D.',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
      },
      tipAmount: 10.00,
      message: 'Please play this for my birthday!',
      requestedAt: new Date(Date.now() - 30 * 60 * 1000),
      status: 'accepted'
    },
    {
      id: '2',
      position: 2,
      song: {
        title: 'Levitating',
        artist: 'Dua Lipa',
        duration: 203,
        imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop'
      },
      requester: {
        name: 'Sarah M.',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
      },
      tipAmount: 5.00,
      requestedAt: new Date(Date.now() - 20 * 60 * 1000),
      status: 'pending'
    },
    {
      id: '3',
      position: 3,
      song: {
        title: 'Good 4 U',
        artist: 'Olivia Rodrigo',
        duration: 178,
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop'
      },
      requester: {
        name: 'Mike R.',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
      },
      tipAmount: 15.00,
      message: 'Great song for the dance floor!',
      requestedAt: new Date(Date.now() - 15 * 60 * 1000),
      status: 'pending'
    },
    {
      id: '4',
      position: 4,
      song: {
        title: 'Industry Baby',
        artist: 'Lil Nas X ft. Jack Harlow',
        duration: 212,
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop'
      },
      requester: {
        name: 'Emma L.',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
      },
      tipAmount: 8.00,
      requestedAt: new Date(Date.now() - 10 * 60 * 1000),
      status: 'pending'
    }
  ])

  const handleAcceptRequest = (id: string) => {
    setQueueItems(items => 
      items.map(item => 
        item.id === id ? { ...item, status: 'accepted' as const } : item
      )
    )
  }

  const handleRejectRequest = (id: string) => {
    setQueueItems(items => 
      items.map(item => 
        item.id === id ? { ...item, status: 'rejected' as const } : item
      )
    )
  }

  const handlePlayNext = (id: string) => {
    setQueueItems(items => 
      items.map(item => 
        item.id === id ? { ...item, status: 'fulfilled' as const } : item
      )
    )
  }

  const totalTips = queueItems.reduce((sum, item) => sum + item.tipAmount, 0)
  const pendingCount = queueItems.filter(item => item.status === 'pending').length
  const acceptedCount = queueItems.filter(item => item.status === 'accepted').length

  return (
    <div className="space-y-6">
      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MusicalNoteIcon className="h-5 w-5 text-primary-500" />
              <div>
                <p className="text-sm text-gray-400">Total Requests</p>
                <p className="text-2xl font-bold">{queueItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-gray-400">Accepted</p>
                <p className="text-2xl font-bold">{acceptedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CurrencyDollarIcon className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-gray-400">Total Tips</p>
                <p className="text-2xl font-bold">{formatCurrency(totalTips)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queue List */}
      <Card>
        <CardHeader>
          <CardTitle>Request Queue</CardTitle>
          <CardDescription>
            Manage incoming song requests and organize your playlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {queueItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 rounded-lg border border-gray-700 bg-dark-secondary/30"
              >
                {/* Position */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-400">
                    {item.position}
                  </span>
                </div>

                {/* Song Info */}
                <div className="flex items-center space-x-3 flex-1">
                  <img
                    src={item.song.imageUrl}
                    alt={item.song.title}
                    className="h-12 w-12 rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.song.title}</h3>
                    <p className="text-sm text-gray-400">{item.song.artist}</p>
                    <p className="text-xs text-gray-500">
                      {formatDuration(item.song.duration)}
                    </p>
                  </div>
                </div>

                {/* Requester Info */}
                <div className="flex items-center space-x-2">
                  <img
                    src={item.requester.profileImage}
                    alt={item.requester.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.requester.name}</p>
                    <p className="text-xs text-gray-400">
                      {formatTime(item.requestedAt)}
                    </p>
                  </div>
                </div>

                {/* Tip Amount */}
                <div className="text-center">
                  <p className="text-lg font-bold text-success">
                    {formatCurrency(item.tipAmount)}
                  </p>
                  <p className="text-xs text-gray-400">tip</p>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center space-x-2">
                  <Badge variant={item.status as any}>
                    {item.status}
                  </Badge>
                  
                  {item.status === 'pending' && (
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAcceptRequest(item.id)}
                        className="text-success border-success hover:bg-success hover:text-white"
                      >
                        <CheckIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectRequest(item.id)}
                        className="text-error border-error hover:bg-error hover:text-white"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {item.status === 'accepted' && (
                    <Button
                      size="sm"
                      variant="gradient"
                      onClick={() => handlePlayNext(item.id)}
                    >
                      <PlayIcon className="h-4 w-4 mr-1" />
                      Play
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
