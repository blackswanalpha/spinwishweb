# 🎵 Spinwish Web

A modern, DJ-focused web platform that connects DJs with music lovers, enabling real-time song requests, tip management, and live performance tracking. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

### 🔐 Authentication & Security
- **Multi-Provider OAuth**: Google, GitHub, Facebook integration via NextAuth.js
- **Secure Credentials**: Email/password authentication with bcrypt hashing
- **Role-Based Access**: DJ, Client, and Admin user roles with protected routes
- **Session Management**: JWT-based sessions with automatic token refresh
- **Password Security**: Enforced strong password requirements

### 🎧 DJ Dashboard
- **Live Status Management**: Toggle between live/offline states
- **Real-time Analytics**: Track earnings, requests, and performance metrics
- **Queue Management**: Accept, reject, and reorder song requests
- **Tip Tracking**: Monitor incoming tips and total earnings
- **Profile Management**: Update DJ information, genres, and availability

### 🎵 Music Request System
- **Song Search**: Browse and search extensive music catalog
- **Request Queue**: Real-time queue with estimated play times
- **Tip Integration**: Add tips to song requests for priority placement
- **Request Status**: Track pending, accepted, and fulfilled requests

### 💰 Payment & Tips
- **Secure Tipping**: Integrated payment system for DJ tips
- **Transaction History**: Complete payment and earning records
- **Minimum Tip Settings**: Customizable minimum tip amounts per DJ
- **Earnings Dashboard**: Detailed financial analytics and reporting

### 🎨 User Experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Theme**: Professional dark theme optimized for nightclub environments
- **Loading States**: Smooth loading animations and skeleton screens
- **Real-time Updates**: Live data synchronization across all users
- **Accessibility**: WCAG compliant with keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/blackswanalpha/spinwishweb.git
   cd spinwishweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your configuration:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # OAuth Provider Credentials (optional for development)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Project Structure

```
spinwishweb/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── auth/           # Authentication pages
│   │   ├── api/            # API routes
│   │   └── (dashboard)/    # Protected dashboard routes
│   ├── components/         # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   ├── dj/            # DJ-specific components
│   │   ├── ui/            # Base UI components
│   │   └── navigation/    # Navigation components
│   ├── contexts/          # React contexts
│   ├── lib/               # Utility functions and configurations
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── docs/                  # Documentation
```

### Key Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **State Management**: React Context + Hooks
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Charts**: Recharts
- **Testing**: Jest + React Testing Library

## 🎯 Demo Account

For testing and demonstration purposes, use the demo DJ account:

- **Email**: `demo@spinwish.com`
- **Password**: `demo123!`

This account provides access to all DJ features with realistic mock data.

## 🔧 Configuration

### OAuth Setup

To enable OAuth providers, register your application with each provider:

1. **Google OAuth**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

2. **GitHub OAuth**
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create a new OAuth App
   - Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | JWT signing secret | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | No |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret | No |

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Test files are located alongside their corresponding components with `.test.tsx` extension.

## 📱 Mobile Support

Spinwish Web is fully responsive and optimized for mobile devices:

- **Touch-friendly**: Large touch targets and gesture support
- **Performance**: Optimized loading and smooth animations
- **Offline Support**: Basic offline functionality for core features
- **PWA Ready**: Progressive Web App capabilities

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import project from GitHub to Vercel
   - Configure environment variables in Vercel dashboard

2. **Deploy**
   ```bash
   # Automatic deployment on git push
   git push origin main
   ```

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

### Environment Variables for Production

Ensure all environment variables are set in your production environment:

```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
# Add OAuth credentials for production
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs via [GitHub Issues](https://github.com/blackswanalpha/spinwishweb/issues)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/blackswanalpha/spinwishweb/discussions)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons

---

Built with ❤️ for the DJ community
