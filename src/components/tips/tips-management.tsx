'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { formatCurrency, formatTime, formatDate } from '@/lib/utils'
import { mockTransactions, currentUser, currentDJ } from '@/lib/mock-data'

interface Transaction {
  id: string
  type: 'sent' | 'received'
  amount: number
  netAmount: number
  platformFee: number
  status: 'pending' | 'succeeded' | 'failed' | 'refunded'
  createdAt: Date
  description: string
  user: {
    name: string
    profileImage: string
  }
}

export function TipsManagement() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'send' | 'history'>('overview')
  const [tipAmount, setTipAmount] = useState('')
  const [tipMessage, setTipMessage] = useState('')

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'received',
      amount: 10.00,
      netAmount: 9.00,
      platformFee: 1.00,
      status: 'succeeded',
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      description: 'Tip for Blinding Lights',
      user: {
        name: 'John D.',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
      }
    },
    {
      id: '2',
      type: 'sent',
      amount: 5.00,
      netAmount: 5.00,
      platformFee: 0.50,
      status: 'succeeded',
      createdAt: new Date(Date.now() - 60 * 60 * 1000),
      description: 'Tip to DJ Mike',
      user: {
        name: 'DJ Mike',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
      }
    },
    {
      id: '3',
      type: 'received',
      amount: 15.00,
      netAmount: 13.50,
      platformFee: 1.50,
      status: 'pending',
      createdAt: new Date(Date.now() - 90 * 60 * 1000),
      description: 'Tip for Good 4 U',
      user: {
        name: 'Sarah M.',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
      }
    }
  ]

  const totalReceived = transactions
    .filter(t => t.type === 'received' && t.status === 'succeeded')
    .reduce((sum, t) => sum + t.netAmount, 0)

  const totalSent = transactions
    .filter(t => t.type === 'sent' && t.status === 'succeeded')
    .reduce((sum, t) => sum + t.amount, 0)

  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.netAmount, 0)

  const handleSendTip = () => {
    // Mock tip sending
    console.log('Sending tip:', {
      amount: parseFloat(tipAmount),
      message: tipMessage,
      recipient: currentDJ
    })
    setTipAmount('')
    setTipMessage('')
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-dark-secondary/30 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'send', label: 'Send Tip' },
          { id: 'history', label: 'History' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedTab === tab.id
                ? 'bg-primary-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-dark-secondary/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <ArrowDownIcon className="h-5 w-5 text-success" />
                  <div>
                    <p className="text-sm text-gray-400">Total Received</p>
                    <p className="text-2xl font-bold text-success">
                      {formatCurrency(totalReceived)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <ArrowUpIcon className="h-5 w-5 text-primary-500" />
                  <div>
                    <p className="text-sm text-gray-400">Total Sent</p>
                    <p className="text-2xl font-bold text-primary-500">
                      {formatCurrency(totalSent)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-warning" />
                  <div>
                    <p className="text-sm text-gray-400">Pending</p>
                    <p className="text-2xl font-bold text-warning">
                      {formatCurrency(pendingAmount)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest tip activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-dark-secondary/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'received' 
                          ? 'bg-success/20' 
                          : 'bg-primary-500/20'
                      }`}>
                        {transaction.type === 'received' ? (
                          <ArrowDownIcon className="h-5 w-5 text-success" />
                        ) : (
                          <ArrowUpIcon className="h-5 w-5 text-primary-500" />
                        )}
                      </div>
                      <img
                        src={transaction.user.profileImage}
                        alt={transaction.user.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-400">
                          {transaction.type === 'received' ? 'From' : 'To'} {transaction.user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTime(transaction.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'received' ? 'text-success' : 'text-primary-500'
                      }`}>
                        {transaction.type === 'received' ? '+' : '-'}
                        {formatCurrency(transaction.type === 'received' ? transaction.netAmount : transaction.amount)}
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
      )}

      {/* Send Tip Tab */}
      {selectedTab === 'send' && (
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Send a Tip</CardTitle>
              <CardDescription>
                Show appreciation to the current DJ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* DJ Info */}
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-dark-secondary/30">
                <img
                  src={currentDJ.profileImage}
                  alt={`${currentDJ.firstName} ${currentDJ.lastName}`}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{currentDJ.firstName} {currentDJ.lastName}</h3>
                  <p className="text-sm text-gray-400">Currently performing</p>
                </div>
              </div>

              {/* Tip Amount */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tip Amount
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[5, 10, 15, 20].map((amount) => (
                    <Button
                      key={amount}
                      variant={tipAmount === amount.toString() ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTipAmount(amount.toString())}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(e.target.value)}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message (Optional)
                </label>
                <Input
                  placeholder="Add a message..."
                  value={tipMessage}
                  onChange={(e) => setTipMessage(e.target.value)}
                />
              </div>

              {/* Send Button */}
              <Button
                className="w-full"
                variant="gradient"
                onClick={handleSendTip}
                disabled={!tipAmount || parseFloat(tipAmount) <= 0}
              >
                <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                Send {tipAmount ? formatCurrency(parseFloat(tipAmount)) : 'Tip'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
