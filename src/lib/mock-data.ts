// Mock data for Spinwish application

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  profileImage?: string
  role: 'client' | 'dj' | 'admin'
  createdAt: Date
  lastLogin: Date
  preferences: {
    notifications: boolean
    emailUpdates: boolean
    publicProfile: boolean
  }
}

export interface DJProfile {
  id: string
  userId: string
  stageName: string
  bio: string
  genres: string[]
  experience: number // years of experience
  rating: number // 1-5 stars
  totalEarnings: number
  totalRequests: number
  socialMedia: {
    instagram?: string
    twitter?: string
    soundcloud?: string
    spotify?: string
    youtube?: string
  }
  equipment: string[]
  availability: {
    monday: { start: string; end: string; available: boolean }
    tuesday: { start: string; end: string; available: boolean }
    wednesday: { start: string; end: string; available: boolean }
    thursday: { start: string; end: string; available: boolean }
    friday: { start: string; end: string; available: boolean }
    saturday: { start: string; end: string; available: boolean }
    sunday: { start: string; end: string; available: boolean }
  }
  currentVenue?: string
  isLive: boolean
  minimumTip: number
  specialties: string[]
  achievements: string[]
  joinedDate: Date
  verificationStatus: 'pending' | 'verified' | 'rejected'
}

export interface Venue {
  id: string
  name: string
  address: string
  city: string
  state: string
  latitude: number
  longitude: number
  capacity: number
  type: 'nightclub' | 'bar' | 'restaurant' | 'event_space'
  isActive: boolean
}

export interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  genre: string
  imageUrl: string
  previewUrl?: string
  popularity: number
}

export interface Request {
  id: string
  userId: string
  djId: string
  venueId: string
  songId: string
  status: 'pending' | 'accepted' | 'rejected' | 'fulfilled' | 'cancelled'
  tipAmount: number
  message?: string
  requestedAt: Date
  queuePosition?: number
  estimatedPlayTime?: Date
}

export interface Transaction {
  id: string
  payerId: string
  recipientId: string
  requestId?: string
  amount: number
  platformFee: number
  netAmount: number
  status: 'pending' | 'succeeded' | 'failed' | 'refunded'
  createdAt: Date
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'client',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date(),
    preferences: {
      notifications: true,
      emailUpdates: true,
      publicProfile: false,
    },
  },
  {
    id: 'user-2',
    email: 'sarah.wilson@example.com',
    firstName: 'Sarah',
    lastName: 'Wilson',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'client',
    createdAt: new Date('2024-02-01'),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    preferences: {
      notifications: true,
      emailUpdates: false,
      publicProfile: true,
    },
  },
  {
    id: 'user-3',
    email: 'alex.chen@example.com',
    firstName: 'Alex',
    lastName: 'Chen',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'client',
    createdAt: new Date('2024-01-20'),
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    preferences: {
      notifications: false,
      emailUpdates: true,
      publicProfile: false,
    },
  },
  // Demo DJ User (for testing and demonstrations)
  {
    id: 'demo-dj',
    email: 'demo@spinwish.com',
    firstName: 'Demo',
    lastName: 'DJ',
    profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face',
    role: 'dj',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    preferences: {
      notifications: true,
      emailUpdates: true,
      publicProfile: true,
    },
  },
  // DJ Users
  {
    id: 'dj-1',
    email: 'dj.mike@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'dj',
    createdAt: new Date('2024-01-10'),
    lastLogin: new Date(),
    preferences: {
      notifications: true,
      emailUpdates: true,
      publicProfile: true,
    },
  },
  {
    id: 'dj-2',
    email: 'djluna@example.com',
    firstName: 'Luna',
    lastName: 'Rodriguez',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'dj',
    createdAt: new Date('2023-11-15'),
    lastLogin: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    preferences: {
      notifications: true,
      emailUpdates: true,
      publicProfile: true,
    },
  },
  {
    id: 'dj-3',
    email: 'djbeatmaster@example.com',
    firstName: 'Marcus',
    lastName: 'Thompson',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    role: 'dj',
    createdAt: new Date('2023-09-20'),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    preferences: {
      notifications: true,
      emailUpdates: false,
      publicProfile: true,
    },
  },
  {
    id: 'dj-4',
    email: 'djnova@example.com',
    firstName: 'Zoe',
    lastName: 'Kim',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    role: 'dj',
    createdAt: new Date('2023-12-01'),
    lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    preferences: {
      notifications: true,
      emailUpdates: true,
      publicProfile: true,
    },
  },
  {
    id: 'dj-5',
    email: 'djvibe@example.com',
    firstName: 'Carlos',
    lastName: 'Santos',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'dj',
    createdAt: new Date('2023-08-10'),
    lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    preferences: {
      notifications: false,
      emailUpdates: true,
      publicProfile: true,
    },
  },
  {
    id: 'dj-6',
    email: 'djecho@example.com',
    firstName: 'Emma',
    lastName: 'Davis',
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    role: 'dj',
    createdAt: new Date('2024-01-05'),
    lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    preferences: {
      notifications: true,
      emailUpdates: true,
      publicProfile: true,
    },
  },
  // Admin User
  {
    id: 'admin-1',
    email: 'admin@spinwish.com',
    firstName: 'Sarah',
    lastName: 'Admin',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    preferences: {
      notifications: true,
      emailUpdates: true,
      publicProfile: false,
    },
  },
]

// Mock DJ Profiles
export const mockDJProfiles: DJProfile[] = [
  // Demo DJ Profile (for testing and demonstrations)
  {
    id: 'demo-djprofile',
    userId: 'demo-dj',
    stageName: 'DJ Demo',
    bio: 'Welcome to Spinwish! I\'m your demo DJ showcasing all the amazing features of our platform. I specialize in electronic music and love taking requests from the crowd. Try out the platform features with my profile!',
    genres: ['Electronic', 'House', 'Techno', 'Pop', 'Dance'],
    experience: 5,
    rating: 4.8,
    totalEarnings: 2500.00,
    totalRequests: 150,
    socialMedia: {
      instagram: '@djdemo_spinwish',
      soundcloud: 'dj-demo-spinwish',
      spotify: 'DJ Demo',
    },
    equipment: ['Pioneer DDJ-FLX6', 'KRK Rokit 5', 'Sennheiser HD 25', 'MacBook Pro'],
    availability: {
      monday: { start: '19:00', end: '23:00', available: true },
      tuesday: { start: '19:00', end: '23:00', available: true },
      wednesday: { start: '19:00', end: '23:00', available: true },
      thursday: { start: '20:00', end: '02:00', available: true },
      friday: { start: '21:00', end: '03:00', available: true },
      saturday: { start: '21:00', end: '03:00', available: true },
      sunday: { start: '18:00', end: '22:00', available: true },
    },
    currentVenue: 'venue-1',
    isLive: true,
    minimumTip: 2.00,
    specialties: ['Crowd Reading', 'Live Mixing', 'Demo Performances'],
    achievements: ['Demo DJ of the Year', 'Platform Ambassador', 'User Favorite'],
    joinedDate: new Date('2024-01-01'),
    verificationStatus: 'verified',
  },
  {
    id: 'djprofile-1',
    userId: 'dj-1',
    stageName: 'DJ MikeBeats',
    bio: 'Professional DJ with 8 years of experience spinning at top venues across NYC. Specializing in electronic dance music and crowd-pleasing hits. Known for seamless mixing and reading the room perfectly.',
    genres: ['Electronic', 'House', 'Techno', 'Pop', 'Hip Hop'],
    experience: 8,
    rating: 4.8,
    totalEarnings: 15420.50,
    totalRequests: 1247,
    socialMedia: {
      instagram: '@djmikebeats',
      twitter: '@mikebeats_dj',
      soundcloud: 'djmikebeats',
      spotify: 'DJ MikeBeats',
    },
    equipment: ['Pioneer CDJ-3000', 'DJM-900NXS2', 'KRK Rokit 8', 'Shure SM58'],
    availability: {
      monday: { start: '20:00', end: '02:00', available: false },
      tuesday: { start: '20:00', end: '02:00', available: false },
      wednesday: { start: '20:00', end: '02:00', available: true },
      thursday: { start: '20:00', end: '03:00', available: true },
      friday: { start: '21:00', end: '04:00', available: true },
      saturday: { start: '21:00', end: '04:00', available: true },
      sunday: { start: '19:00', end: '01:00', available: true },
    },
    currentVenue: 'venue-1',
    isLive: true,
    minimumTip: 5.00,
    specialties: ['Crowd Reading', 'Seamless Mixing', 'Live Remixing'],
    achievements: ['Top DJ 2023', 'Most Requested DJ', '1000+ Successful Sets'],
    joinedDate: new Date('2024-01-10'),
    verificationStatus: 'verified',
  },
  {
    id: 'djprofile-2',
    userId: 'dj-2',
    stageName: 'Luna Vibes',
    bio: 'Latin music specialist and rising star in the electronic scene. Bringing infectious energy and authentic Latin rhythms to every performance. Fluent in Spanish and English.',
    genres: ['Latin', 'Reggaeton', 'Salsa', 'Electronic', 'Pop'],
    experience: 5,
    rating: 4.9,
    totalEarnings: 8750.25,
    totalRequests: 892,
    socialMedia: {
      instagram: '@lunavibes_dj',
      twitter: '@lunavibes',
      soundcloud: 'lunavibes',
      youtube: 'Luna Vibes DJ',
    },
    equipment: ['Pioneer DDJ-SX3', 'JBL EON615', 'Audio-Technica ATH-M50x'],
    availability: {
      monday: { start: '19:00', end: '01:00', available: true },
      tuesday: { start: '19:00', end: '01:00', available: true },
      wednesday: { start: '19:00', end: '01:00', available: false },
      thursday: { start: '20:00', end: '02:00', available: true },
      friday: { start: '21:00', end: '03:00', available: true },
      saturday: { start: '21:00', end: '03:00', available: true },
      sunday: { start: '18:00', end: '24:00', available: false },
    },
    currentVenue: 'venue-2',
    isLive: false,
    minimumTip: 3.00,
    specialties: ['Latin Music', 'Bilingual MC', 'Cultural Fusion'],
    achievements: ['Rising Star 2023', 'Best Latin DJ', 'Community Choice Award'],
    joinedDate: new Date('2023-11-15'),
    verificationStatus: 'verified',
  },
  {
    id: 'djprofile-3',
    userId: 'dj-3',
    stageName: 'BeatMaster Marcus',
    bio: 'Veteran DJ with over 12 years in the game. Hip-hop purist who also masters electronic and R&B. Known for epic scratch sessions and throwback mixes that get everyone moving.',
    genres: ['Hip Hop', 'R&B', 'Rap', 'Old School', 'Electronic'],
    experience: 12,
    rating: 4.7,
    totalEarnings: 22100.75,
    totalRequests: 1856,
    socialMedia: {
      instagram: '@beatmaster_marcus',
      twitter: '@beatmasterdj',
      soundcloud: 'beatmaster-marcus',
      spotify: 'BeatMaster Marcus',
      youtube: 'BeatMaster Marcus Official',
    },
    equipment: ['Technics SL-1200MK7', 'Pioneer DJM-S11', 'Serato DJ Pro', 'Ortofon Concorde'],
    availability: {
      monday: { start: '18:00', end: '24:00', available: false },
      tuesday: { start: '18:00', end: '24:00', available: false },
      wednesday: { start: '19:00', end: '01:00', available: true },
      thursday: { start: '20:00', end: '02:00', available: true },
      friday: { start: '21:00', end: '04:00', available: true },
      saturday: { start: '21:00', end: '04:00', available: true },
      sunday: { start: '17:00', end: '23:00', available: true },
    },
    currentVenue: undefined,
    isLive: false,
    minimumTip: 7.00,
    specialties: ['Turntablism', 'Scratching', 'Hip-Hop History', 'Throwback Sets'],
    achievements: ['DJ Battle Champion', 'Scratch Master', '10+ Years Excellence'],
    joinedDate: new Date('2023-09-20'),
    verificationStatus: 'verified',
  },
  {
    id: 'djprofile-4',
    userId: 'dj-4',
    stageName: 'DJ Nova',
    bio: 'Fresh talent bringing innovative sounds and cutting-edge electronic music. Specializes in progressive house and trance with a modern twist. Always experimenting with new sounds.',
    genres: ['Progressive House', 'Trance', 'Techno', 'Ambient', 'Electronic'],
    experience: 3,
    rating: 4.6,
    totalEarnings: 4250.00,
    totalRequests: 387,
    socialMedia: {
      instagram: '@djnova_official',
      soundcloud: 'dj-nova',
      spotify: 'DJ Nova',
    },
    equipment: ['Pioneer DDJ-FLX6', 'KRK Rokit 5', 'Sennheiser HD 25'],
    availability: {
      monday: { start: '19:00', end: '01:00', available: true },
      tuesday: { start: '19:00', end: '01:00', available: true },
      wednesday: { start: '19:00', end: '01:00', available: true },
      thursday: { start: '20:00', end: '02:00', available: false },
      friday: { start: '21:00', end: '03:00', available: true },
      saturday: { start: '21:00', end: '03:00', available: false },
      sunday: { start: '18:00', end: '24:00', available: true },
    },
    currentVenue: undefined,
    isLive: false,
    minimumTip: 2.00,
    specialties: ['Progressive Mixing', 'Sound Design', 'Electronic Innovation'],
    achievements: ['Newcomer Award', 'Innovation in Sound'],
    joinedDate: new Date('2023-12-01'),
    verificationStatus: 'verified',
  },
  {
    id: 'djprofile-5',
    userId: 'dj-5',
    stageName: 'DJ Vibe',
    bio: 'Multi-genre master with a passion for creating the perfect atmosphere. From chill lounge vibes to high-energy dance floors, I adapt to any crowd and venue.',
    genres: ['Deep House', 'Lounge', 'Chill', 'Nu-Disco', 'Funk'],
    experience: 6,
    rating: 4.5,
    totalEarnings: 9875.50,
    totalRequests: 743,
    socialMedia: {
      instagram: '@djvibe_music',
      twitter: '@djvibe',
      soundcloud: 'dj-vibe-official',
    },
    equipment: ['Native Instruments Traktor S4', 'Yamaha HS8', 'Pioneer HDJ-X10'],
    availability: {
      monday: { start: '17:00', end: '23:00', available: true },
      tuesday: { start: '17:00', end: '23:00', available: true },
      wednesday: { start: '18:00', end: '24:00', available: true },
      thursday: { start: '19:00', end: '01:00', available: true },
      friday: { start: '20:00', end: '02:00', available: false },
      saturday: { start: '20:00', end: '02:00', available: false },
      sunday: { start: '16:00', end: '22:00', available: true },
    },
    currentVenue: undefined,
    isLive: false,
    minimumTip: 4.00,
    specialties: ['Atmosphere Creation', 'Multi-Genre Mixing', 'Lounge Vibes'],
    achievements: ['Versatility Award', 'Crowd Favorite'],
    joinedDate: new Date('2023-08-10'),
    verificationStatus: 'verified',
  },
  {
    id: 'djprofile-6',
    userId: 'dj-6',
    stageName: 'DJ Echo',
    bio: 'Emerging talent with a unique style blending classic and contemporary sounds. Passionate about creating memorable musical journeys and connecting with audiences.',
    genres: ['Indie Electronic', 'Alternative', 'Synthwave', 'Pop', 'Rock'],
    experience: 2,
    rating: 4.3,
    totalEarnings: 1850.25,
    totalRequests: 156,
    socialMedia: {
      instagram: '@djecho_sounds',
      soundcloud: 'dj-echo',
    },
    equipment: ['Pioneer DDJ-SB3', 'Audio-Technica ATH-M40x', 'Mackie CR3-X'],
    availability: {
      monday: { start: '18:00', end: '24:00', available: false },
      tuesday: { start: '18:00', end: '24:00', available: true },
      wednesday: { start: '18:00', end: '24:00', available: true },
      thursday: { start: '19:00', end: '01:00', available: true },
      friday: { start: '20:00', end: '02:00', available: true },
      saturday: { start: '20:00', end: '02:00', available: true },
      sunday: { start: '17:00', end: '23:00', available: false },
    },
    currentVenue: undefined,
    isLive: false,
    minimumTip: 1.00,
    specialties: ['Indie Sounds', 'Alternative Mixing', 'Emerging Artist Support'],
    achievements: ['New Talent Award'],
    joinedDate: new Date('2024-01-05'),
    verificationStatus: 'pending',
  },
]

// Mock Venues
export const mockVenues: Venue[] = [
  {
    id: 'venue-1',
    name: 'Club Paradise',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    latitude: 40.7128,
    longitude: -74.0060,
    capacity: 500,
    type: 'nightclub',
    isActive: true,
  },
  {
    id: 'venue-2',
    name: 'The Underground',
    address: '456 Beat Ave',
    city: 'Los Angeles',
    state: 'CA',
    latitude: 34.0522,
    longitude: -118.2437,
    capacity: 300,
    type: 'nightclub',
    isActive: true,
  },
]

// Mock Songs
export const mockSongs: Song[] = [
  {
    id: 'song-1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    genre: 'Pop',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    popularity: 95,
  },
  {
    id: 'song-2',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    genre: 'Pop',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    popularity: 88,
  },
  {
    id: 'song-3',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    genre: 'Pop Rock',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    popularity: 92,
  },
  {
    id: 'song-4',
    title: 'Industry Baby',
    artist: 'Lil Nas X ft. Jack Harlow',
    album: 'MONTERO',
    duration: 212,
    genre: 'Hip Hop',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    popularity: 90,
  },
]

// Mock Requests
export const mockRequests: Request[] = [
  {
    id: 'req-1',
    userId: 'user-1',
    djId: 'dj-1',
    venueId: 'venue-1',
    songId: 'song-1',
    status: 'accepted',
    tipAmount: 10.00,
    message: 'Please play this for my birthday!',
    requestedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    queuePosition: 3,
    estimatedPlayTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
  },
  {
    id: 'req-2',
    userId: 'user-1',
    djId: 'dj-1',
    venueId: 'venue-1',
    songId: 'song-2',
    status: 'pending',
    tipAmount: 5.00,
    requestedAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    queuePosition: 7,
  },
]

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    payerId: 'user-1',
    recipientId: 'dj-1',
    requestId: 'req-1',
    amount: 10.00,
    platformFee: 1.00,
    netAmount: 9.00,
    status: 'succeeded',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 'txn-2',
    payerId: 'user-1',
    recipientId: 'dj-1',
    requestId: 'req-2',
    amount: 5.00,
    platformFee: 0.50,
    netAmount: 4.50,
    status: 'pending',
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
  },
]

// Current user session (for demo purposes)
export const currentUser = mockUsers[0] // Demo DJ as default user
export const currentDJ = mockUsers[0] // Demo DJ
export const currentDJProfile = mockDJProfiles[0] // Demo DJ profile
export const currentVenue = mockVenues[0] // Club Paradise

// Helper functions to get DJ data
export const getDJProfile = (djId: string): DJProfile | undefined => {
  return mockDJProfiles.find(profile => profile.userId === djId)
}

export const getDJByStage = (stageName: string): DJProfile | undefined => {
  return mockDJProfiles.find(profile =>
    profile.stageName.toLowerCase().includes(stageName.toLowerCase())
  )
}

export const getActiveDJs = (): DJProfile[] => {
  return mockDJProfiles.filter(profile => profile.isLive)
}

export const getDJsByGenre = (genre: string): DJProfile[] => {
  return mockDJProfiles.filter(profile =>
    profile.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))
  )
}

export const getTopRatedDJs = (limit: number = 5): DJProfile[] => {
  return mockDJProfiles
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

export const getDJsByExperience = (minYears: number): DJProfile[] => {
  return mockDJProfiles.filter(profile => profile.experience >= minYears)
}

export const getVerifiedDJs = (): DJProfile[] => {
  return mockDJProfiles.filter(profile => profile.verificationStatus === 'verified')
}

// DJ Statistics
export const getDJStats = () => {
  const totalDJs = mockDJProfiles.length
  const activeDJs = getActiveDJs().length
  const verifiedDJs = getVerifiedDJs().length
  const averageRating = mockDJProfiles.reduce((sum, dj) => sum + dj.rating, 0) / totalDJs
  const totalEarnings = mockDJProfiles.reduce((sum, dj) => sum + dj.totalEarnings, 0)
  const totalRequests = mockDJProfiles.reduce((sum, dj) => sum + dj.totalRequests, 0)

  return {
    totalDJs,
    activeDJs,
    verifiedDJs,
    averageRating: Math.round(averageRating * 10) / 10,
    totalEarnings,
    totalRequests,
  }
}
