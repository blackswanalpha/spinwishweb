'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MagnifyingGlassIcon,
  MusicalNoteIcon,
  PlayIcon,
  HeartIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { formatDuration, formatCurrency } from '@/lib/utils'
import { mockSongs } from '@/lib/mock-data'

interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  genre: string
  imageUrl: string
  popularity: number
}

export function RequestsManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [tipAmount, setTipAmount] = useState(5)
  const [message, setMessage] = useState('')
  const [showRequestModal, setShowRequestModal] = useState(false)

  // Filter songs based on search query
  const filteredSongs = mockSongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRequestSong = (song: Song) => {
    setSelectedSong(song)
    setShowRequestModal(true)
  }

  const handleSubmitRequest = () => {
    // Mock request submission
    console.log('Submitting request:', {
      song: selectedSong,
      tipAmount,
      message
    })
    setShowRequestModal(false)
    setSelectedSong(null)
    setTipAmount(5)
    setMessage('')
  }

  const popularSongs = mockSongs.filter(song => song.popularity > 90)
  const recentlyPlayed = mockSongs.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Search Songs</CardTitle>
          <CardDescription>
            Find your favorite songs to request
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for songs, artists, or albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Popular Songs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HeartIcon className="h-5 w-5 text-red-500" />
              <span>Popular Tonight</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularSongs.map((song) => (
                <div key={song.id} className="flex items-center space-x-3">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="h-10 w-10 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{song.title}</p>
                    <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRequestSong(song)}
                  >
                    Request
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recently Played */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PlayIcon className="h-5 w-5 text-primary-500" />
              <span>Recently Played</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentlyPlayed.map((song) => (
                <div key={song.id} className="flex items-center space-x-3">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="h-10 w-10 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{song.title}</p>
                    <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRequestSong(song)}
                  >
                    Request
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MusicalNoteIcon className="h-5 w-5 text-secondary-500" />
              <span>My Requests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Blinding Lights</p>
                  <p className="text-sm text-gray-400">The Weeknd</p>
                </div>
                <Badge variant="accepted">Accepted</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Levitating</p>
                  <p className="text-sm text-gray-400">Dua Lipa</p>
                </div>
                <Badge variant="pending">Pending</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Good 4 U</p>
                  <p className="text-sm text-gray-400">Olivia Rodrigo</p>
                </div>
                <Badge variant="live">Playing</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {filteredSongs.length} songs matching "{searchQuery}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSongs.map((song) => (
                <div
                  key={song.id}
                  className="p-4 rounded-lg border border-gray-700 bg-dark-secondary/30 hover:bg-dark-secondary/50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={song.imageUrl}
                      alt={song.title}
                      className="h-16 w-16 rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{song.title}</h3>
                      <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                      <p className="text-xs text-gray-500 truncate">{song.album}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">
                          {formatDuration(song.duration)}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {song.genre}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-3"
                    variant="gradient"
                    onClick={() => handleRequestSong(song)}
                  >
                    Request Song
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Request Modal */}
      {showRequestModal && selectedSong && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Request Song</CardTitle>
              <CardDescription>
                Send a request to the DJ with an optional tip
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Song Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={selectedSong.imageUrl}
                  alt={selectedSong.title}
                  className="h-16 w-16 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{selectedSong.title}</h3>
                  <p className="text-sm text-gray-400">{selectedSong.artist}</p>
                  <p className="text-xs text-gray-500">{selectedSong.album}</p>
                </div>
              </div>

              {/* Tip Amount */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tip Amount (Optional)
                </label>
                <div className="flex space-x-2">
                  {[5, 10, 15, 20].map((amount) => (
                    <Button
                      key={amount}
                      variant={tipAmount === amount ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTipAmount(amount)}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message (Optional)
                </label>
                <Input
                  placeholder="Add a message for the DJ..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowRequestModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  className="flex-1"
                  onClick={handleSubmitRequest}
                >
                  <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                  Request ({formatCurrency(tipAmount)})
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
