import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { User } from "@/lib/mock-data"
import { isValidEmail, isStrongPassword } from "@/lib/utils"

// Extended user type for authentication
export interface AuthUser extends User {
  accessToken?: string
  refreshToken?: string
  provider?: string
  providerId?: string
  password?: string
}

// Session type
export interface AuthSession {
  user: AuthUser
  expires: string
  accessToken?: string
}

// Mock user database (in production, this would be a real database)
let users: AuthUser[] = [
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
    // Demo password: "demo123!" (easy to remember for testing)
    password: '$2b$12$6fA6ggzkttZjXl/AREMw0u8lmwC/SAnT/9mbAtsHKLaGaRK8FbDmy'
  },
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
    // Mock hashed password for "password123!"
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.6'
  },
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
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.6'
  }
]

// Authentication functions
export async function createUser(userData: {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: 'client' | 'dj' | 'admin'
}): Promise<AuthUser> {
  const { email, password, firstName, lastName, role = 'dj' } = userData

  // Validate input
  if (!isValidEmail(email)) {
    throw new Error('Invalid email address')
  }

  if (!isStrongPassword(password)) {
    throw new Error('Password must be at least 8 characters with uppercase, lowercase, number, and special character')
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (existingUser) {
    throw new Error('User already exists with this email')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  // Create new user
  const newUser: AuthUser = {
    id: `user-${Date.now()}`,
    email: email.toLowerCase(),
    firstName,
    lastName,
    role,
    createdAt: new Date(),
    lastLogin: new Date(),
    preferences: {
      notifications: true,
      emailUpdates: true,
      publicProfile: false,
    },
    password: hashedPassword
  }

  users.push(newUser)
  return newUser
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  
  if (!user || !user.password) {
    return null
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return null
  }

  // Update last login
  user.lastLogin = new Date()

  // Remove password from returned user object
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword as AuthUser
}

export async function getUserById(id: string): Promise<AuthUser | null> {
  const user = users.find(u => u.id === id)
  if (!user) return null

  // Remove password from returned user object
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword as AuthUser
}

export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return null

  // Remove password from returned user object
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword as AuthUser
}

export async function updateUserProfile(userId: string, updates: Partial<AuthUser>): Promise<AuthUser | null> {
  const userIndex = users.findIndex(u => u.id === userId)
  if (userIndex === -1) return null

  // Don't allow updating sensitive fields
  const { id, password, createdAt, ...allowedUpdates } = updates
  
  users[userIndex] = { ...users[userIndex], ...allowedUpdates }
  
  // Remove password from returned user object
  const { password: _, ...userWithoutPassword } = users[userIndex]
  return userWithoutPassword as AuthUser
}

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await authenticateUser(credentials.email, credentials.password)
        return user ? {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          image: user.profileImage,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
        } : null
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.firstName = user.firstName
        token.lastName = user.lastName
      }
      
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.provider = account.provider
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        session.accessToken = token.accessToken as string
      }
      
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider !== "credentials") {
        // Handle OAuth sign-in
        const existingUser = await getUserByEmail(user.email!)
        
        if (!existingUser) {
          // Create new user from OAuth profile
          try {
            const names = user.name?.split(' ') || ['', '']
            await createUser({
              email: user.email!,
              password: crypto.randomUUID(), // Random password for OAuth users
              firstName: names[0] || '',
              lastName: names.slice(1).join(' ') || '',
              role: 'dj'
            })
          } catch (error) {
            console.error('Error creating OAuth user:', error)
            return false
          }
        }
      }
      
      return true
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
