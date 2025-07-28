'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MusicalNoteIcon,
  UsersIcon,
  ClockIcon,
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { formatCurrency, formatDate } from '@/lib/utils'

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week')

  // Mock analytics data
  const analyticsData = {
    week: {
      totalEarnings: 450.75,
      totalRequests: 28,
      averageTip: 16.10,
      uniqueUsers: 18,
      topSongs: [
        { title: 'Blinding Lights', artist: 'The Weeknd', requests: 8, earnings: 85.00 },
        { title: 'Levitating', artist: 'Dua Lipa', requests: 6, earnings: 65.00 },
        { title: 'Good 4 U', artist: 'Olivia Rodrigo', requests: 5, earnings: 75.00 }
      ],
      dailyEarnings: [
        { day: 'Mon', earnings: 45.50 },
        { day: 'Tue', earnings: 62.25 },
        { day: 'Wed', earnings: 78.00 },
        { day: 'Thu', earnings: 89.50 },
        { day: 'Fri', earnings: 125.75 },
        { day: 'Sat', earnings: 49.75 },
        { day: 'Sun', earnings: 0 }
      ]
    },
    month: {
      totalEarnings: 1850.25,
      totalRequests: 142,
      averageTip: 13.03,
      uniqueUsers: 67,
      topSongs: [
        { title: 'Blinding Lights', artist: 'The Weeknd', requests: 25, earnings: 325.00 },
        { title: 'Levitating', artist: 'Dua Lipa', requests: 22, earnings: 285.00 },
        { title: 'Industry Baby', artist: 'Lil Nas X', requests: 18, earnings: 245.00 }
      ],
      dailyEarnings: [] // Would contain 30 days of data
    },
    year: {
      totalEarnings: 18750.80,
      totalRequests: 1456,
      averageTip: 12.88,
      uniqueUsers: 324,
      topSongs: [
        { title: 'Blinding Lights', artist: 'The Weeknd', requests: 156, earnings: 2145.00 },
        { title: 'Levitating', artist: 'Dua Lipa', requests: 134, earnings: 1875.00 },
        { title: 'Good 4 U', artist: 'Olivia Rodrigo', requests: 128, earnings: 1650.00 }
      ],
      dailyEarnings: [] // Would contain 365 days of data
    }
  }

  const currentData = analyticsData[selectedPeriod]
  const previousPeriodEarnings = selectedPeriod === 'week' ? 385.50 : selectedPeriod === 'month' ? 1650.75 : 16250.30
  const earningsChange = ((currentData.totalEarnings - previousPeriodEarnings) / previousPeriodEarnings) * 100

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="flex space-x-1 bg-dark-secondary/30 p-1 rounded-lg w-fit">
        {[
          { id: 'week', label: 'This Week' },
          { id: 'month', label: 'This Month' },
          { id: 'year', label: 'This Year' }
        ].map((period) => (
          <button
            key={period.id}
            onClick={() => setSelectedPeriod(period.id as any)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedPeriod === period.id
                ? 'bg-primary-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-dark-secondary/50'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Earnings</p>
                <p className="text-2xl font-bold text-success">
                  {formatCurrency(currentData.totalEarnings)}
                </p>
                <div className="flex items-center mt-1">
                  {earningsChange >= 0 ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-success mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-error mr-1" />
                  )}
                  <span className={`text-sm ${earningsChange >= 0 ? 'text-success' : 'text-error'}`}>
                    {Math.abs(earningsChange).toFixed(1)}%
                  </span>
                </div>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Requests</p>
                <p className="text-2xl font-bold">{currentData.totalRequests}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {(currentData.totalRequests / (selectedPeriod === 'week' ? 7 : selectedPeriod === 'month' ? 30 : 365)).toFixed(1)} per day
                </p>
              </div>
              <MusicalNoteIcon className="h-8 w-8 text-primary-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Average Tip</p>
                <p className="text-2xl font-bold text-secondary-500">
                  {formatCurrency(currentData.averageTip)}
                </p>
                <p className="text-sm text-gray-400 mt-1">per request</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-secondary-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Unique Users</p>
                <p className="text-2xl font-bold text-warning">{currentData.uniqueUsers}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {(currentData.totalRequests / currentData.uniqueUsers).toFixed(1)} requests/user
                </p>
              </div>
              <UsersIcon className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Earnings Trend</CardTitle>
            <CardDescription>
              Daily earnings for the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedPeriod === 'week' && (
              <div className="space-y-4">
                {currentData.dailyEarnings.map((day, index) => (
                  <div key={day.day} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{day.day}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                          style={{ width: `${(day.earnings / 150) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-16 text-right">
                        {formatCurrency(day.earnings)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedPeriod !== 'week' && (
              <div className="flex items-center justify-center h-32 text-gray-400">
                <div className="text-center">
                  <ChartBarIcon className="h-8 w-8 mx-auto mb-2" />
                  <p>Detailed chart would be displayed here</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Songs */}
        <Card>
          <CardHeader>
            <CardTitle>Top Requested Songs</CardTitle>
            <CardDescription>
              Most popular songs for the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentData.topSongs.map((song, index) => (
                <div key={`${song.title}-${song.artist}`} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-400">
                      {index + 1}
                    </span>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=40&h=40&fit=crop"
                    alt={song.title}
                    className="h-10 w-10 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{song.title}</p>
                    <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">
                      {formatCurrency(song.earnings)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {song.requests} requests
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>
            Key insights and recommendations based on your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <ArrowTrendingUpIcon className="h-5 w-5 text-success" />
                <span className="font-medium text-success">Peak Performance</span>
              </div>
              <p className="text-sm text-gray-300">
                Friday was your best day with {formatCurrency(125.75)} in earnings. 
                Consider scheduling more Friday performances.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-primary-500/10 border border-primary-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <MusicalNoteIcon className="h-5 w-5 text-primary-500" />
                <span className="font-medium text-primary-500">Popular Genre</span>
              </div>
              <p className="text-sm text-gray-300">
                Pop music generates the highest tips. "Blinding Lights" is your top earner 
                with {formatCurrency(85.00)} this week.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center space-x-2 mb-2">
                <ClockIcon className="h-5 w-5 text-warning" />
                <span className="font-medium text-warning">Opportunity</span>
              </div>
              <p className="text-sm text-gray-300">
                Sunday shows no activity. Consider promoting weekend events 
                to increase your weekly earnings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
