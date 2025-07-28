'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  UserIcon,
  CameraIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'
import { formatDate, formatCurrency } from '@/lib/utils'
import { currentUser } from '@/lib/mock-data'

export function ProfileManagement() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phone: '+1 (555) 123-4567',
    bio: 'Music lover and frequent club-goer. Always looking for the next great song to request!'
  })

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving profile:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phone: '+1 (555) 123-4567',
      bio: 'Music lover and frequent club-goer. Always looking for the next great song to request!'
    })
    setIsEditing(false)
  }

  const stats = {
    totalRequests: 47,
    totalTips: 285.50,
    favoriteGenre: 'Pop',
    memberSince: new Date('2024-01-15')
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={currentUser.profileImage}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="h-24 w-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <CameraIcon className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">
                    {currentUser.firstName} {currentUser.lastName}
                  </h1>
                  <p className="text-gray-400">{currentUser.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">{currentUser.role}</Badge>
                    <Badge variant="outline">Verified</Badge>
                  </div>
                </div>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-dark-secondary/30">
                  <p className="text-2xl font-bold text-primary-500">{stats.totalRequests}</p>
                  <p className="text-sm text-gray-400">Total Requests</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-dark-secondary/30">
                  <p className="text-2xl font-bold text-success">{formatCurrency(stats.totalTips)}</p>
                  <p className="text-sm text-gray-400">Tips Sent</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-dark-secondary/30">
                  <p className="text-2xl font-bold text-secondary-500">{stats.favoriteGenre}</p>
                  <p className="text-sm text-gray-400">Favorite Genre</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-dark-secondary/30">
                  <p className="text-2xl font-bold text-warning">{formatDate(stats.memberSince).split(',')[0]}</p>
                  <p className="text-sm text-gray-400">Member Since</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                className="w-full h-20 px-3 py-2 text-sm text-white bg-dark-secondary/50 border border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!isEditing}
                placeholder="Tell us about yourself..."
              />
            </div>

            {isEditing && (
              <div className="flex space-x-2 pt-4">
                <Button variant="default" onClick={handleSave}>
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Customize your Spinwish experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Notifications */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <BellIcon className="h-5 w-5 mr-2 text-primary-500" />
                Notifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Push Notifications</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Updates</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS Notifications</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <ShieldCheckIcon className="h-5 w-5 mr-2 text-success" />
                Privacy
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Public Profile</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show Activity</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <CreditCardIcon className="h-5 w-5 mr-2 text-warning" />
                Payment Methods
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700 bg-dark-secondary/30">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">VISA</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                      <p className="text-xs text-gray-400">Expires 12/25</p>
                    </div>
                  </div>
                  <Badge variant="success">Default</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Add Payment Method
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
