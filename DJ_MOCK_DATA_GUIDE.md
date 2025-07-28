# DJ Mock Data Guide

## Overview

This document outlines the comprehensive DJ user mock data created for the Spinwish application. The mock data includes detailed DJ profiles, user information, and helper functions to simulate a realistic DJ marketplace.

## Data Structure

### DJ Profile Interface

```typescript
interface DJProfile {
  id: string                    // Unique profile ID
  userId: string               // Reference to User ID
  stageName: string            // DJ's stage/performance name
  bio: string                  // Professional biography
  genres: string[]             // Music genres they specialize in
  experience: number           // Years of DJ experience
  rating: number               // Average rating (1-5 stars)
  totalEarnings: number        // Total earnings on platform
  totalRequests: number        // Total song requests fulfilled
  socialMedia: {               // Social media profiles
    instagram?: string
    twitter?: string
    soundcloud?: string
    spotify?: string
    youtube?: string
  }
  equipment: string[]          // DJ equipment they use
  availability: {              // Weekly availability schedule
    [day]: { start: string; end: string; available: boolean }
  }
  currentVenue?: string        // Current venue if performing live
  isLive: boolean             // Currently performing live
  minimumTip: number          // Minimum tip amount for requests
  specialties: string[]       // Special skills/techniques
  achievements: string[]      // Awards and recognitions
  joinedDate: Date           // When they joined the platform
  verificationStatus: 'pending' | 'verified' | 'rejected'
}
```

## Mock DJ Profiles

### 1. DJ MikeBeats (dj-1)
- **Experience**: 8 years
- **Rating**: 4.8/5
- **Genres**: Electronic, House, Techno, Pop, Hip Hop
- **Status**: Live at Club Paradise
- **Specialties**: Crowd Reading, Seamless Mixing, Live Remixing
- **Equipment**: Pioneer CDJ-3000, DJM-900NXS2, KRK Rokit 8
- **Earnings**: $15,420.50
- **Verification**: Verified

### 2. Luna Vibes (dj-2)
- **Experience**: 5 years
- **Rating**: 4.9/5
- **Genres**: Latin, Reggaeton, Salsa, Electronic, Pop
- **Status**: Offline (at The Underground)
- **Specialties**: Latin Music, Bilingual MC, Cultural Fusion
- **Equipment**: Pioneer DDJ-SX3, JBL EON615
- **Earnings**: $8,750.25
- **Verification**: Verified

### 3. BeatMaster Marcus (dj-3)
- **Experience**: 12 years
- **Rating**: 4.7/5
- **Genres**: Hip Hop, R&B, Rap, Old School, Electronic
- **Status**: Offline (freelance)
- **Specialties**: Turntablism, Scratching, Hip-Hop History
- **Equipment**: Technics SL-1200MK7, Pioneer DJM-S11
- **Earnings**: $22,100.75
- **Verification**: Verified

### 4. DJ Nova (dj-4)
- **Experience**: 3 years
- **Rating**: 4.6/5
- **Genres**: Progressive House, Trance, Techno, Ambient
- **Status**: Offline (freelance)
- **Specialties**: Progressive Mixing, Sound Design
- **Equipment**: Pioneer DDJ-FLX6, KRK Rokit 5
- **Earnings**: $4,250.00
- **Verification**: Verified

### 5. DJ Vibe (dj-5)
- **Experience**: 6 years
- **Rating**: 4.5/5
- **Genres**: Deep House, Lounge, Chill, Nu-Disco, Funk
- **Status**: Offline (freelance)
- **Specialties**: Atmosphere Creation, Multi-Genre Mixing
- **Equipment**: Native Instruments Traktor S4, Yamaha HS8
- **Earnings**: $9,875.50
- **Verification**: Verified

### 6. DJ Echo (dj-6)
- **Experience**: 2 years
- **Rating**: 4.3/5
- **Genres**: Indie Electronic, Alternative, Synthwave, Pop
- **Status**: Offline (freelance)
- **Specialties**: Indie Sounds, Alternative Mixing
- **Equipment**: Pioneer DDJ-SB3, Audio-Technica ATH-M40x
- **Earnings**: $1,850.25
- **Verification**: Pending

## Helper Functions

### Data Retrieval Functions

```typescript
// Get DJ profile by user ID
getDJProfile(djId: string): DJProfile | undefined

// Search DJ by stage name
getDJByStage(stageName: string): DJProfile | undefined

// Get currently live DJs
getActiveDJs(): DJProfile[]

// Filter DJs by genre
getDJsByGenre(genre: string): DJProfile[]

// Get top rated DJs
getTopRatedDJs(limit: number = 5): DJProfile[]

// Filter by experience level
getDJsByExperience(minYears: number): DJProfile[]

// Get verified DJs only
getVerifiedDJs(): DJProfile[]

// Get platform statistics
getDJStats(): {
  totalDJs: number
  activeDJs: number
  verifiedDJs: number
  averageRating: number
  totalEarnings: number
  totalRequests: number
}
```

## Platform Statistics

Based on the mock data:

- **Total DJs**: 6
- **Currently Live**: 1 (DJ MikeBeats)
- **Verified DJs**: 5
- **Average Rating**: 4.6/5
- **Total Platform Earnings**: $62,246.50
- **Total Requests Fulfilled**: 4,481

## Genre Distribution

- **Electronic/House/Techno**: 4 DJs
- **Hip Hop/R&B**: 2 DJs
- **Latin Music**: 1 DJ
- **Pop**: 4 DJs
- **Alternative/Indie**: 1 DJ
- **Lounge/Chill**: 1 DJ

## Experience Levels

- **Beginner (1-3 years)**: 2 DJs
- **Intermediate (4-7 years)**: 2 DJs
- **Expert (8+ years)**: 2 DJs

## Equipment Brands

- **Pioneer**: 5 DJs (most popular)
- **Native Instruments**: 1 DJ
- **Technics**: 1 DJ
- **KRK**: 2 DJs
- **Audio-Technica**: 2 DJs

## Usage Examples

### Display Active DJs
```typescript
import { getActiveDJs } from '@/lib/mock-data'

const activeDJs = getActiveDJs()
console.log(`${activeDJs.length} DJs are currently live`)
```

### Filter by Genre
```typescript
import { getDJsByGenre } from '@/lib/mock-data'

const houseDJs = getDJsByGenre('House')
const latinDJs = getDJsByGenre('Latin')
```

### Get Platform Stats
```typescript
import { getDJStats } from '@/lib/mock-data'

const stats = getDJStats()
console.log(`Platform has ${stats.totalDJs} DJs with average rating of ${stats.averageRating}`)
```

## UI Components

### DJ Showcase Component
- **Location**: `src/components/dj/dj-showcase.tsx`
- **Features**: 
  - DJ statistics overview
  - Top rated DJs display
  - Genre filtering
  - Sorting by rating, experience, earnings
  - Individual DJ cards with profiles

### DJ Directory Page
- **Location**: `src/app/djs/page.tsx`
- **Features**:
  - Complete DJ directory
  - Authentication required
  - Lazy loading for performance

## Social Media Integration

Each DJ profile includes social media links:
- Instagram handles
- Twitter profiles
- SoundCloud accounts
- Spotify artist pages
- YouTube channels

## Availability System

DJs have detailed weekly schedules:
- Day-specific availability
- Start and end times
- Available/unavailable status
- Supports different schedules per day

## Verification System

Three verification statuses:
- **Pending**: New DJs awaiting verification
- **Verified**: Confirmed professional DJs
- **Rejected**: DJs who didn't meet criteria

## Equipment Tracking

Each DJ lists their professional equipment:
- Mixing consoles
- Turntables/Controllers
- Speakers/Monitors
- Headphones
- Additional gear

## Achievements System

DJs can have various achievements:
- Performance milestones
- Awards and recognitions
- Platform-specific achievements
- Community recognition

## Future Enhancements

Potential additions to the mock data:
1. **Performance History**: Past gig records
2. **Music Library**: Tracks they commonly play
3. **Venue Partnerships**: Regular venue relationships
4. **Fan Following**: Follower counts and engagement
5. **Pricing Tiers**: Different rates for different services
6. **Booking Calendar**: Detailed availability calendar
7. **Reviews System**: Individual user reviews
8. **Skill Certifications**: Professional certifications

This comprehensive DJ mock data provides a realistic foundation for testing and demonstrating the Spinwish platform's DJ marketplace functionality.
