'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  MusicalNoteIcon,
  CogIcon,
  ExclamationTriangleIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

export function SettingsManagement() {
  const [selectedTab, setSelectedTab] = useState<'general' | 'notifications' | 'privacy' | 'music' | 'account'>('general')

  const tabs = [
    { id: 'general', label: 'General', icon: CogIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'privacy', label: 'Privacy & Security', icon: ShieldCheckIcon },
    { id: 'music', label: 'Music Preferences', icon: MusicalNoteIcon },
    { id: 'account', label: 'Account', icon: ExclamationTriangleIcon }
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-dark-secondary/30 p-1 rounded-lg overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedTab === tab.id
                ? 'bg-primary-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-dark-secondary/50'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* General Settings */}
      {selectedTab === 'general' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PaintBrushIcon className="h-5 w-5 text-primary-500" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>Customize the look and feel of your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg border border-primary-500 bg-primary-500/10 cursor-pointer">
                    <div className="w-full h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded mb-2"></div>
                    <p className="text-sm font-medium text-center">Dark (Current)</p>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-600 hover:border-gray-500 cursor-pointer">
                    <div className="w-full h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2"></div>
                    <p className="text-sm font-medium text-center text-gray-400">Light</p>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-600 hover:border-gray-500 cursor-pointer">
                    <div className="w-full h-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded mb-2"></div>
                    <p className="text-sm font-medium text-center text-gray-400">Auto</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select className="w-full px-3 py-2 text-sm text-white bg-dark-secondary/50 border border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Time Zone</label>
                <select className="w-full px-3 py-2 text-sm text-white bg-dark-secondary/50 border border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Settings */}
      {selectedTab === 'notifications' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Manage your push notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Request Updates', description: 'When your requests are accepted or rejected', enabled: true },
                { label: 'Tip Notifications', description: 'When you receive tips from patrons', enabled: true },
                { label: 'Queue Position', description: 'Updates about your position in the queue', enabled: true },
                { label: 'New Features', description: 'Announcements about new Spinwish features', enabled: false },
                { label: 'Promotional Offers', description: 'Special offers and promotions', enabled: false }
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-dark-secondary/30">
                  <div>
                    <p className="font-medium">{notification.label}</p>
                    <p className="text-sm text-gray-400">{notification.description}</p>
                  </div>
                  <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notification.enabled ? 'bg-primary-500' : 'bg-gray-600'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notification.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure email notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Weekly Summary', description: 'Weekly performance and earnings summary', enabled: true },
                { label: 'Monthly Report', description: 'Detailed monthly analytics report', enabled: true },
                { label: 'Security Alerts', description: 'Important security and account notifications', enabled: true },
                { label: 'Marketing Emails', description: 'Product updates and promotional content', enabled: false }
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-dark-secondary/30">
                  <div>
                    <p className="font-medium">{notification.label}</p>
                    <p className="text-sm text-gray-400">{notification.description}</p>
                  </div>
                  <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notification.enabled ? 'bg-primary-500' : 'bg-gray-600'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notification.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Privacy & Security Settings */}
      {selectedTab === 'privacy' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your privacy and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Public Profile', description: 'Make your profile visible to other users', enabled: false },
                { label: 'Activity Status', description: 'Show when you\'re online and active', enabled: true },
                { label: 'Request History', description: 'Allow others to see your request history', enabled: false },
                { label: 'Analytics Sharing', description: 'Share anonymous usage data to improve the service', enabled: true }
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-dark-secondary/30">
                  <div>
                    <p className="font-medium">{setting.label}</p>
                    <p className="text-sm text-gray-400">{setting.description}</p>
                  </div>
                  <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    setting.enabled ? 'bg-primary-500' : 'bg-gray-600'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      setting.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-dark-secondary/30">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-dark-secondary/30">
                <div>
                  <p className="font-medium">Change Password</p>
                  <p className="text-sm text-gray-400">Update your account password</p>
                </div>
                <Button variant="outline">Change</Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-dark-secondary/30">
                <div>
                  <p className="font-medium">Login Sessions</p>
                  <p className="text-sm text-gray-400">Manage active sessions and devices</p>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Music Preferences */}
      {selectedTab === 'music' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Music Preferences</CardTitle>
              <CardDescription>Customize your music discovery and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Favorite Genres</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Pop', 'Hip Hop', 'Electronic', 'Rock', 'R&B', 'Country', 'Jazz', 'Classical', 'Reggae'].map((genre) => (
                    <button
                      key={genre}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        ['Pop', 'Hip Hop', 'Electronic'].includes(genre)
                          ? 'border-primary-500 bg-primary-500/20 text-primary-400'
                          : 'border-gray-600 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content Filters</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Allow Explicit Content</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hide Played Songs</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Auto-Request Settings</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enable Auto-Tip</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Default Tip Amount</label>
                    <Input type="number" placeholder="5.00" className="w-32" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Account Settings */}
      {selectedTab === 'account' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>Manage your account and data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-dark-secondary/30">
                <div>
                  <p className="font-medium">Export Data</p>
                  <p className="text-sm text-gray-400">Download a copy of your account data</p>
                </div>
                <Button variant="outline">Export</Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-dark-secondary/30">
                <div>
                  <p className="font-medium">Deactivate Account</p>
                  <p className="text-sm text-gray-400">Temporarily disable your account</p>
                </div>
                <Button variant="outline">
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                  Deactivate
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-400">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                <div>
                  <p className="font-medium text-red-400">Delete Account</p>
                  <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive">
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
