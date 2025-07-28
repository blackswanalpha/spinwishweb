'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LazyAvatar } from '@/components/ui/lazy-image'
import { 
  StarIcon, 
  MapPinIcon, 
  ClockIcon, 
  MusicalNoteIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  PlayIcon,
  PauseIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { mockDJProfiles, mockUsers, getDJProfile, getActiveDJs, getTopRatedDJs, getDJStats } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'

export function DJShowcase() {
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'earnings'>('rating')
  
  const djStats = getDJStats()
  const activeDJs = getActiveDJs()
  const topRatedDJs = getTopRatedDJs(3)

  // Get all unique genres
  const allGenres = Array.from(
    new Set(mockDJProfiles.flatMap(dj => dj.genres))
  ).sort()

  // Filter and sort DJs
  const filteredDJs = mockDJProfiles
    .filter(dj => selectedGenre === 'all' || dj.genres.includes(selectedGenre))
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'experience':
          return b.experience - a.experience
        case 'earnings':
          return b.totalEarnings - a.totalEarnings
        default:
          return 0
      }
    })

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
      {/* DJ Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-dark-secondary/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserGroupIcon className="h-8 w-8 text-primary-500" />
              <div>
                <p className="text-2xl font-bold text-white">{djStats.totalDJs}</p>
                <p className="text-sm text-gray-400">Total DJs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <PlayIcon className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-white">{djStats.activeDJs}</p>
                <p className="text-sm text-gray-400">Live Now</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <StarIconSolid className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-white">{djStats.averageRating}</p>
                <p className="text-sm text-gray-400">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-white">{formatCurrency(djStats.totalEarnings)}</p>
                <p className="text-sm text-gray-400">Total Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Rated DJs */}
      <Card className="bg-dark-secondary/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <StarIconSolid className="h-5 w-5 text-yellow-500" />
            <span>Top Rated DJs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topRatedDJs.map((dj, index) => {
              const user = mockUsers.find(u => u.id === dj.userId)
              return (
                <div key={dj.id} className="bg-dark-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="relative">
                      <LazyAvatar
                        src={user?.profileImage}
                        alt={dj.stageName}
                        size="lg"
                        fallbackInitials={dj.stageName.slice(0, 2)}
                      />
                      {dj.isLive && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-primary"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{dj.stageName}</h3>
                      <div className="flex items-center space-x-1">
                        {renderStars(dj.rating)}
                        <span className="text-sm text-gray-400 ml-1">({dj.rating})</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-400">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {dj.experience} years experience
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <MusicalNoteIcon className="h-4 w-4 mr-1" />
                      {dj.totalRequests} requests
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {dj.genres.slice(0, 3).map(genre => (
                      <Badge key={genre} variant="secondary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-3 py-2 bg-dark-secondary border border-gray-600 rounded-lg text-white text-sm"
          >
            <option value="all">All Genres</option>
            {allGenres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rating' | 'experience' | 'earnings')}
            className="px-3 py-2 bg-dark-secondary border border-gray-600 rounded-lg text-white text-sm"
          >
            <option value="rating">Sort by Rating</option>
            <option value="experience">Sort by Experience</option>
            <option value="earnings">Sort by Earnings</option>
          </select>
        </div>

        <div className="text-sm text-gray-400">
          Showing {filteredDJs.length} of {mockDJProfiles.length} DJs
        </div>
      </div>

      {/* DJ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDJs.map(dj => {
          const user = mockUsers.find(u => u.id === dj.userId)
          return (
            <DJCard key={dj.id} dj={dj} user={user} />
          )
        })}
      </div>
    </div>
  )
}

interface DJCardProps {
  dj: any
  user: any
}

function DJCard({ dj, user }: DJCardProps) {
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
    <Card className="bg-dark-secondary/50 hover:bg-dark-secondary/70 transition-colors">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <LazyAvatar
                src={user?.profileImage}
                alt={dj.stageName}
                size="lg"
                fallbackInitials={dj.stageName.slice(0, 2)}
              />
              {dj.isLive && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-secondary animate-pulse"></div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-white">{dj.stageName}</h3>
              <p className="text-sm text-gray-400">{user?.firstName} {user?.lastName}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {dj.verificationStatus === 'verified' && (
              <CheckBadgeIcon className="h-5 w-5 text-blue-500" />
            )}
            {dj.isLive ? (
              <Badge className="bg-green-500 text-white">LIVE</Badge>
            ) : (
              <Badge variant="secondary">OFFLINE</Badge>
            )}
          </div>
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(dj.rating)}
            <span className="text-sm text-gray-400 ml-1">({dj.rating})</span>
          </div>
          <div className="text-sm text-gray-400">
            {dj.experience} years exp
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          {dj.bio}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-4">
          {dj.genres.slice(0, 4).map((genre: string) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
          {dj.genres.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{dj.genres.length - 4} more
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-400">Requests</p>
            <p className="text-white font-medium">{dj.totalRequests}</p>
          </div>
          <div>
            <p className="text-gray-400">Min Tip</p>
            <p className="text-white font-medium">{formatCurrency(dj.minimumTip)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1">
            Request Song
          </Button>
          <Button size="sm" variant="outline">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
