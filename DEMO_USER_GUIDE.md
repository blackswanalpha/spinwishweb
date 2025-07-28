# Demo DJ User Guide

## Overview

The Spinwish platform includes a comprehensive demo DJ account that allows users to explore all features without registration. The demo account showcases the full DJ experience with realistic data and live status.

## Demo Account Details

### Login Credentials
- **Email**: `demo@spinwish.com`
- **Password**: `demo123!`

### DJ Profile Information
- **Stage Name**: DJ Demo
- **Real Name**: Demo DJ
- **Experience**: 5 years
- **Rating**: 4.8/5 stars
- **Status**: Currently LIVE
- **Verification**: Verified DJ ✓

### Performance Statistics
- **Total Requests**: 150 songs
- **Total Earnings**: $2,500.00
- **Current Venue**: Club Paradise
- **Minimum Tip**: $2.00

### Music Specialties
- **Genres**: Electronic, House, Techno, Pop, Dance
- **Specialties**: Crowd Reading, Live Mixing, Demo Performances
- **Equipment**: Pioneer DDJ-FLX6, KRK Rokit 5, Sennheiser HD 25

### Social Media
- **Instagram**: @djdemo_spinwish
- **SoundCloud**: dj-demo-spinwish
- **Spotify**: DJ Demo

## How to Access Demo Account

### Method 1: Demo Login Component (Recommended)
1. Visit the sign-in page at `/auth/signin`
2. Look for the "Try Demo Account" card on the right side
3. Click "Try Demo Account" button
4. Automatically signed in and redirected to dashboard

### Method 2: Manual Login
1. Visit the sign-in page at `/auth/signin`
2. Enter email: `demo@spinwish.com`
3. Enter password: `demo123!`
4. Click "Sign In"

### Method 3: OAuth Alternative
The demo account can also be accessed through OAuth providers if configured, but manual credentials are the most reliable method.

## Features You Can Explore

### 1. DJ Dashboard
- **Live Status Management**: Toggle between live and offline
- **Real-time Statistics**: View today's requests and earnings
- **Performance Metrics**: Career totals and monthly insights
- **Recent Requests**: See incoming song requests with tips
- **Upcoming Gigs**: Scheduled performances at venues

### 2. Queue Management (`/queue`)
- **Current Queue**: Songs waiting to be played
- **Request Handling**: Accept, decline, or prioritize requests
- **Queue Statistics**: Total songs, estimated wait time, tips

### 3. Song Requests (`/requests`)
- **Incoming Requests**: New requests from audience
- **Request Details**: Song info, requester, tip amount
- **Quick Actions**: Accept, decline, add to queue

### 4. Earnings & Tips (`/tips`)
- **Daily Earnings**: Track today's income
- **Payment History**: Complete transaction history
- **Tip Analytics**: Average tips, top tippers
- **Payout Management**: Withdrawal options

### 5. Performance Analytics (`/analytics`)
- **Performance Trends**: Charts and graphs
- **Popular Songs**: Most requested tracks
- **Audience Insights**: Demographic data
- **Revenue Analytics**: Earnings breakdown

### 6. DJ Profile (`/profile`)
- **Profile Management**: Edit bio, genres, equipment
- **Social Media**: Update social links
- **Availability**: Set weekly schedule
- **Verification Status**: View verification badge

### 7. Other DJs (`/djs`)
- **DJ Directory**: Browse other platform DJs
- **Filter Options**: By genre, rating, experience
- **DJ Profiles**: View other DJ details
- **Networking**: Connect with other DJs

## Demo Data Highlights

### Realistic Performance Data
- **150 Total Requests**: Shows established DJ presence
- **$2,500 Earnings**: Demonstrates earning potential
- **4.8 Star Rating**: High-quality service indicator
- **Verified Status**: Trust and credibility marker

### Live Status Features
- **Currently Live**: Shows active performance state
- **Venue Assignment**: Connected to Club Paradise
- **Real-time Indicators**: Pulsing live badges
- **Go Live/End Set**: Toggle performance status

### Professional Equipment
- **Pioneer DDJ-FLX6**: Industry-standard controller
- **KRK Rokit 5**: Professional studio monitors
- **Sennheiser HD 25**: DJ headphones
- **MacBook Pro**: Performance laptop

### Social Media Integration
- **Instagram**: Platform for visual content
- **SoundCloud**: Music hosting and sharing
- **Spotify**: Artist profile and playlists
- **Professional Presence**: Complete online identity

## Demo Account Benefits

### For Potential Users
- **No Registration Required**: Instant access to platform
- **Full Feature Access**: Experience complete functionality
- **Realistic Data**: See how platform works with real scenarios
- **Risk-Free Exploration**: Try before committing

### For Demonstrations
- **Sales Presentations**: Show platform capabilities
- **User Training**: Teach platform navigation
- **Feature Showcasing**: Highlight key functionality
- **Performance Testing**: Test platform under load

### For Development
- **Testing Environment**: Consistent test data
- **Feature Development**: Stable user for testing
- **Bug Reproduction**: Reliable account for debugging
- **User Experience**: Validate UX decisions

## Demo Account Limitations

### Data Persistence
- **Session-Based**: Data resets between sessions
- **No Permanent Changes**: Profile edits don't persist
- **Mock Transactions**: No real money involved
- **Temporary Status**: Live status may reset

### Functionality Restrictions
- **No Real Payments**: All transactions are simulated
- **Limited Customization**: Some settings may not save
- **Mock Notifications**: Email/SMS not actually sent
- **Demo Watermarks**: Some areas marked as demo

## Best Practices for Demo Use

### For New Users
1. **Start with Dashboard**: Get overview of features
2. **Explore Navigation**: Try all menu items
3. **Test Live Status**: Toggle live/offline mode
4. **View Analytics**: Check performance metrics
5. **Browse DJ Directory**: See other platform users

### For Demonstrations
1. **Prepare Talking Points**: Know key features to highlight
2. **Practice Navigation**: Smooth demo flow
3. **Show Live Features**: Demonstrate real-time aspects
4. **Highlight Earnings**: Focus on monetization
5. **Explain Verification**: Trust and credibility features

### For Testing
1. **Document Issues**: Note any bugs or problems
2. **Test Responsiveness**: Try on different devices
3. **Validate Features**: Ensure all functions work
4. **Performance Check**: Monitor loading times
5. **User Experience**: Evaluate ease of use

## Technical Implementation

### Demo User Creation
```typescript
// Demo DJ User in mock data
{
  id: 'demo-dj',
  email: 'demo@spinwish.com',
  firstName: 'Demo',
  lastName: 'DJ',
  role: 'dj',
  // ... other properties
}
```

### Demo DJ Profile
```typescript
// Demo DJ Profile with realistic data
{
  id: 'demo-djprofile',
  userId: 'demo-dj',
  stageName: 'DJ Demo',
  rating: 4.8,
  totalEarnings: 2500.00,
  isLive: true,
  verificationStatus: 'verified',
  // ... other properties
}
```

### Authentication Integration
- **Credentials Provider**: Supports demo login
- **Password Hash**: Secure demo password storage
- **Session Management**: Standard NextAuth handling
- **Role Assignment**: Automatic DJ role assignment

## Troubleshooting

### Common Issues
1. **Login Failed**: Check credentials are exactly `demo@spinwish.com` and `demo123!`
2. **Features Missing**: Ensure you're logged in as demo user
3. **Data Not Loading**: Refresh page or clear browser cache
4. **Live Status Issues**: Toggle live status in dashboard
5. **Navigation Problems**: Use sidebar menu for navigation

### Reset Demo Account
- **Logout and Login**: Clears session data
- **Browser Refresh**: Reloads current state
- **Clear Cache**: Removes stored data
- **Incognito Mode**: Fresh browser session

## Support and Feedback

### Getting Help
- **Documentation**: Refer to implementation guides
- **Code Comments**: Check component documentation
- **Console Logs**: Monitor browser console for errors
- **Network Tab**: Check API calls and responses

### Providing Feedback
- **Bug Reports**: Document steps to reproduce
- **Feature Requests**: Suggest improvements
- **User Experience**: Share usability insights
- **Performance Issues**: Report slow loading or errors

The demo DJ account provides a comprehensive way to experience the Spinwish platform as a professional DJ, showcasing all features with realistic data and professional presentation.
