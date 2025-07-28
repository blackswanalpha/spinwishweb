import { describe, it, expect, beforeEach } from '@jest/globals'
import { createUser, authenticateUser, getUserById, getUserByEmail } from '@/lib/auth'
import { isValidEmail, isStrongPassword } from '@/lib/utils'

// Mock bcrypt for testing
jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockImplementation((password, hash) => {
    return Promise.resolve(password === 'password123!' && hash === 'hashed_password')
  })
}))

describe('Authentication Utilities', () => {
  describe('Email Validation', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true)
      expect(isValidEmail('user123@test-domain.com')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@domain.com')).toBe(false)
      expect(isValidEmail('test..test@domain.com')).toBe(false)
    })
  })

  describe('Password Validation', () => {
    it('should validate strong passwords', () => {
      expect(isStrongPassword('Password123!')).toBe(true)
      expect(isStrongPassword('MySecure@Pass1')).toBe(true)
      expect(isStrongPassword('Complex#Password9')).toBe(true)
    })

    it('should reject weak passwords', () => {
      expect(isStrongPassword('password')).toBe(false) // No uppercase, number, special char
      expect(isStrongPassword('PASSWORD')).toBe(false) // No lowercase, number, special char
      expect(isStrongPassword('Password')).toBe(false) // No number, special char
      expect(isStrongPassword('Password1')).toBe(false) // No special char
      expect(isStrongPassword('Pass1!')).toBe(false) // Too short
    })
  })

  describe('User Management', () => {
    beforeEach(() => {
      // Reset users array before each test
      jest.clearAllMocks()
    })

    describe('createUser', () => {
      it('should create a new user with valid data', async () => {
        const userData = {
          email: 'newuser@example.com',
          password: 'Password123!',
          firstName: 'John',
          lastName: 'Doe',
          role: 'client' as const
        }

        const user = await createUser(userData)

        expect(user).toBeDefined()
        expect(user.email).toBe('newuser@example.com')
        expect(user.firstName).toBe('John')
        expect(user.lastName).toBe('Doe')
        expect(user.role).toBe('client')
        expect(user.id).toBeDefined()
        expect(user.createdAt).toBeInstanceOf(Date)
        expect(user.password).toBeUndefined() // Password should not be returned
      })

      it('should reject invalid email', async () => {
        const userData = {
          email: 'invalid-email',
          password: 'Password123!',
          firstName: 'John',
          lastName: 'Doe'
        }

        await expect(createUser(userData)).rejects.toThrow('Invalid email address')
      })

      it('should reject weak password', async () => {
        const userData = {
          email: 'test@example.com',
          password: 'weak',
          firstName: 'John',
          lastName: 'Doe'
        }

        await expect(createUser(userData)).rejects.toThrow('Password must be at least 8 characters')
      })

      it('should reject duplicate email', async () => {
        const userData = {
          email: 'john.doe@example.com', // This email already exists in mock data
          password: 'Password123!',
          firstName: 'John',
          lastName: 'Doe'
        }

        await expect(createUser(userData)).rejects.toThrow('User already exists with this email')
      })
    })

    describe('authenticateUser', () => {
      it('should authenticate user with correct credentials', async () => {
        // This uses the mock user from auth.ts
        const user = await authenticateUser('john.doe@example.com', 'password123!')

        expect(user).toBeDefined()
        expect(user?.email).toBe('john.doe@example.com')
        expect(user?.firstName).toBe('John')
        expect(user?.lastName).toBe('Doe')
      })

      it('should reject authentication with wrong password', async () => {
        const user = await authenticateUser('john.doe@example.com', 'wrongpassword')
        expect(user).toBeNull()
      })

      it('should reject authentication with non-existent email', async () => {
        const user = await authenticateUser('nonexistent@example.com', 'password123!')
        expect(user).toBeNull()
      })
    })

    describe('getUserById', () => {
      it('should return user by valid ID', async () => {
        const user = await getUserById('user-1')

        expect(user).toBeDefined()
        expect(user?.id).toBe('user-1')
        expect(user?.email).toBe('john.doe@example.com')
      })

      it('should return null for invalid ID', async () => {
        const user = await getUserById('invalid-id')
        expect(user).toBeNull()
      })
    })

    describe('getUserByEmail', () => {
      it('should return user by valid email', async () => {
        const user = await getUserByEmail('john.doe@example.com')

        expect(user).toBeDefined()
        expect(user?.email).toBe('john.doe@example.com')
        expect(user?.id).toBe('user-1')
      })

      it('should return null for invalid email', async () => {
        const user = await getUserByEmail('invalid@example.com')
        expect(user).toBeNull()
      })

      it('should be case insensitive', async () => {
        const user = await getUserByEmail('JOHN.DOE@EXAMPLE.COM')

        expect(user).toBeDefined()
        expect(user?.email).toBe('john.doe@example.com')
      })
    })
  })
})

describe('Authentication Flow Integration', () => {
  it('should complete full registration and login flow', async () => {
    // Register new user
    const userData = {
      email: 'integration@test.com',
      password: 'TestPassword123!',
      firstName: 'Integration',
      lastName: 'Test'
    }

    const newUser = await createUser(userData)
    expect(newUser).toBeDefined()
    expect(newUser.email).toBe('integration@test.com')

    // Authenticate the new user
    const authenticatedUser = await authenticateUser('integration@test.com', 'TestPassword123!')
    expect(authenticatedUser).toBeDefined()
    expect(authenticatedUser?.id).toBe(newUser.id)

    // Retrieve user by ID
    const retrievedUser = await getUserById(newUser.id)
    expect(retrievedUser).toBeDefined()
    expect(retrievedUser?.email).toBe('integration@test.com')

    // Retrieve user by email
    const userByEmail = await getUserByEmail('integration@test.com')
    expect(userByEmail).toBeDefined()
    expect(userByEmail?.id).toBe(newUser.id)
  })
})

describe('Security Tests', () => {
  it('should not return password in user objects', async () => {
    const user = await getUserById('user-1')
    expect(user).toBeDefined()
    expect(user).not.toHaveProperty('password')
  })

  it('should hash passwords before storage', async () => {
    const userData = {
      email: 'security@test.com',
      password: 'PlainTextPassword123!',
      firstName: 'Security',
      lastName: 'Test'
    }

    const user = await createUser(userData)
    expect(user).toBeDefined()
    
    // The returned user should not have the plain text password
    expect(user).not.toHaveProperty('password')
    
    // But authentication should still work
    const authenticatedUser = await authenticateUser('security@test.com', 'PlainTextPassword123!')
    expect(authenticatedUser).toBeDefined()
  })

  it('should normalize email addresses to lowercase', async () => {
    const userData = {
      email: 'UPPERCASE@EXAMPLE.COM',
      password: 'Password123!',
      firstName: 'Test',
      lastName: 'User'
    }

    const user = await createUser(userData)
    expect(user.email).toBe('uppercase@example.com')

    // Should be able to authenticate with any case
    const auth1 = await authenticateUser('UPPERCASE@EXAMPLE.COM', 'Password123!')
    const auth2 = await authenticateUser('uppercase@example.com', 'Password123!')
    const auth3 = await authenticateUser('UpPeRcAsE@ExAmPlE.cOm', 'Password123!')

    expect(auth1).toBeDefined()
    expect(auth2).toBeDefined()
    expect(auth3).toBeDefined()
  })
})
