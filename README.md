# 🏋️ Healthily Fit - Personalized Fitness Tracker

A modern, full-stack fitness tracking application built with **TDD methodology**, providing personalized workout plans tailored to users' age, BMI, health conditions, and fitness goals.

[![CI/CD](https://github.com/yourusername/healthily-fit/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/healthily-fit/actions)
[![codecov](https://codecov.io/gh/yourusername/healthily-fit/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/healthily-fit)

## ✨ Features

- 🎯 **Personalized Workout Plans** - AI-generated routines based on your unique profile
- 💪 **Health-First Approach** - Accounts for medical conditions and physical limitations
- 📊 **Progress Tracking** - Visualize your fitness journey with detailed metrics
- 🔄 **Adaptive Routines** - Plans that evolve with your progress
- 🔐 **Secure Authentication** - Firebase Auth with Google Sign-In support
- 🎨 **Modern UI** - Beautiful, accessible design with Tailwind CSS + shadcn/ui
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

| Layer              | Technology                                   |
| ------------------ | -------------------------------------------- |
| **Frontend**       | React 18 + TypeScript + Vite                 |
| **Styling**        | Tailwind CSS + Design Tokens                 |
| **UI Components**  | shadcn/ui (Radix UI + CVA)                   |
| **Backend**        | Firebase (Auth, Firestore, Cloud Functions)  |
| **Forms**          | React Hook Form + Zod                        |
| **State**          | TanStack Query                               |
| **API**            | tRPC (type-safe)                             |
| **Testing**        | Vitest + Testing Library + Playwright        |
| **Monorepo**       | PNPM Workspaces + Turborepo                  |
| **CI/CD**          | GitHub Actions                               |
| **Deployment**     | Firebase Hosting                             |

## 📦 Project Structure

```
healthily-fit/
├── apps/
│   └── web/                    # React frontend application
│       ├── src/
│       │   ├── components/     # UI components
│       │   │   ├── ui/         # shadcn/ui components
│       │   │   ├── auth/       # Authentication components
│       │   │   ├── landing/    # Landing page sections
│       │   │   ├── profile/    # Profile/onboarding components
│       │   │   └── dashboard/  # Dashboard components
│       │   ├── hooks/          # Custom React hooks
│       │   ├── lib/            # Utilities & Firebase config
│       │   ├── pages/          # Page components
│       │   └── styles/         # Global styles & design tokens
│       ├── e2e/                # Playwright E2E tests
│       └── public/             # Static assets
├── packages/
│   ├── shared/                 # Shared Zod schemas & utilities
│   │   ├── src/
│   │   │   ├── schemas/        # Data models (User, Profile, Workout, etc.)
│   │   │   └── utils/          # BMI calculator, etc.
│   │   └── __tests__/          # Unit tests
│   └── seeding/                # Firestore data seeding scripts
├── docs/                       # Technical documentation
│   ├── TECHNICAL DESIGN DOCUMENT.md
│   └── design-tokens.json      # Design system tokens
└── .github/
    └── workflows/              # CI/CD pipelines
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **PNPM** >= 9.0.0
- **Firebase CLI** (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/healthily-fit.git
   cd healthily-fit
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create `apps/web/.env` with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start Firebase Emulators** (for local development)
   ```bash
   firebase emulators:start
   ```

5. **Seed the database** (optional - adds exercise data)
   ```bash
   pnpm seed
   ```

6. **Start development server**
   ```bash
   pnpm dev
   ```

   The app will be available at `http://localhost:5173`

## 🧪 Testing

### Run all tests
```bash
pnpm test
```

### Run tests with coverage
```bash
pnpm test -- --coverage
```

### Run E2E tests
```bash
pnpm test:e2e
```

### Run E2E tests with UI
```bash
pnpm --filter web e2e:ui
```

## 🏗️ Building

```bash
pnpm build
```

## 📊 Testing Strategy

- **Unit Tests** - Pure functions, utilities, schemas (Vitest)
- **Component Tests** - React components (Testing Library)
- **Integration Tests** - API & database interactions
- **E2E Tests** - Full user journeys (Playwright)
- **Coverage Target** - ≥ 80% statements

## 🎨 Design System

The application uses a custom design token system defined in `docs/design-tokens.json`:

- **Colors** - Primary (#ff6b00), Accent (#00e0ff), Neutrals
- **Typography** - Lato (body), Raleway (headings)
- **Spacing** - 8-point grid system
- **Animations** - Consistent timing (fast: 150ms, medium: 300ms, slow: 500ms)

All tokens are integrated into Tailwind CSS and available as CSS variables.

## 🔒 Security

- **Firestore Rules** - Row-level security ensuring users can only access their own data
- **Authentication** - Firebase Auth with email/password and Google OAuth
- **Type Safety** - End-to-end TypeScript with Zod runtime validation
- **Environment Variables** - T3 Env for validated configuration

## 📈 Performance

- **Code Splitting** - Dynamic imports for route-based chunking
- **Caching** - Optimized TanStack Query configuration
- **CDN** - Firebase Hosting with global edge network
- **Lighthouse Score Target** - 90+ across all metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests following TDD methodology
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design tokens inspired by Material Design 3
- UI components built with [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For support, email support@healthily-fit.com or open an issue on GitHub.

---

**Built with ❤️ using TDD methodology**
