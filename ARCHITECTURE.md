# Architecture Documentation

## System Overview

Healthily Fit is a full-stack fitness tracking application built with a **serverless architecture** using Firebase services. The application follows **Test-Driven Development (TDD)** methodology and is organized as a **monorepo** managed by Turborepo.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  React + TypeScript + Vite + TailwindCSS + shadcn/ui       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ tRPC (Type-safe API)
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                     API Layer (Cloud Functions)              │
│  tRPC Routers + Business Logic + Validation (Zod)          │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Firebase Admin SDK
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                    Firebase Services                         │
│  • Auth (Email/Password + Google OAuth)                     │
│  • Firestore (NoSQL Database)                               │
│  • Hosting (Static Site Hosting)                            │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
healthily-fit/
├── apps/
│   └── web/                    # Frontend React application
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── hooks/          # Custom React hooks
│       │   ├── lib/            # Utilities & Firebase client
│       │   ├── pages/          # Page components
│       │   └── styles/         # Global styles & tokens
│       ├── e2e/                # Playwright E2E tests
│       └── .storybook/         # Storybook configuration
│
├── packages/
│   ├── shared/                 # Shared code between client & server
│   │   ├── schemas/            # Zod schemas (data validation)
│   │   └── utils/              # Pure utility functions
│   └── seeding/                # Database seeding scripts
│
├── functions/                  # Firebase Cloud Functions
│   └── src/
│       ├── trpc/               # tRPC router definitions
│       └── services/           # Business logic services
│
├── docs/                       # Documentation
│   ├── TECHNICAL DESIGN DOCUMENT.md
│   └── design-tokens.json      # Design system tokens
│
└── .github/                    # CI/CD workflows
    └── workflows/
```

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development + optimized production builds)
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query (server state)
- **Routing**: React Router v6

### Backend
- **Runtime**: Node.js 20 (Firebase Cloud Functions Gen 2)
- **API**: tRPC (end-to-end type safety)
- **Authentication**: Firebase Auth
- **Database**: Firestore (NoSQL, real-time)
- **Validation**: Zod (runtime type checking)

### DevOps & Tooling
- **Monorepo**: PNPM Workspaces + Turborepo
- **Testing**: Vitest (unit/component) + Playwright (E2E)
- **Linting**: ESLint + Prettier + eslint-plugin-perfectionist
- **CI/CD**: GitHub Actions
- **Deployment**: Firebase Hosting
- **Component Workshop**: Storybook

## Data Flow

### Authentication Flow
```
1. User → LoginForm → Firebase Auth
2. Firebase Auth → ID Token
3. Client stores token → Included in API requests
4. Cloud Function validates token → Returns user data
```

### API Request Flow (tRPC)
```
1. Client calls tRPC mutation/query
2. Request sent with Auth token in header
3. Cloud Function context extracts & validates token
4. tRPC router executes procedure
5. Firestore read/write operation
6. Type-safe response returned to client
```

## Database Schema (Firestore)

### Collections

**users/{uid}**
```typescript
{
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
  role: "user" | "admin"
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

**users/{uid}/profile/main** (subcollection)
```typescript
{
  userId: string
  age: number
  heightCm: number
  weightKg: number
  targetWeightKg?: number
  healthConditions: string[]
  dietaryPreference: string
  fitnessGoal: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

**workoutPlans/{planId}**
```typescript
{
  id: string
  userId: string
  startDate: Timestamp
  endDate: Timestamp
  status: "active" | "completed" | "cancelled"
  totalWeeks: number
  dailyWorkouts: DailyWorkout[]
  generatedAt: Timestamp
  notes?: string
}
```

**activityLogs/{logId}**
```typescript
{
  id: string
  userId: string
  date: Timestamp
  type: string
  durationMinutes: number
  caloriesBurned?: number
  workoutPlanId?: string
  exercisesCompleted: string[]
  weightKg?: number
  notes?: string
  createdAt: Timestamp
}
```

**exercises/{exerciseId}** (read-only)
```typescript
{
  id: string
  name: string
  description: string
  videoUrl?: string
  targetMuscles: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  contraindications: string[]
  equipmentNeeded: string[]
  caloriesPerMinute?: number
}
```

### Indexes

1. **activityLogs**: `(userId ASC, date DESC)` - For progress history queries
2. **workoutPlans**: `(userId ASC, status ASC)` - For active plan lookup

## Security

### Firestore Security Rules

- Users can only read/write their own documents
- Profile subcollection requires matching `uid`
- Exercises collection is read-only for authenticated users
- Activity logs and workout plans require userId match

### Authentication

- Email/Password with minimum 6 characters
- Google OAuth integration
- Firebase ID tokens validated on every API request
- Tokens expire after 1 hour (auto-refresh handled by Firebase SDK)

## Testing Strategy

### Test Pyramid

```
     /\
    /E2E\          ← Few, slow, comprehensive
   /──────\
  / Integ \        ← Medium number, moderate speed
 /─────────\
/ Unit/Comp \      ← Many, fast, focused
─────────────
```

### Test Types

1. **Unit Tests** (Vitest)
   - Pure functions (BMI calculator, utilities)
   - Zod schema validation
   - Business logic services

2. **Component Tests** (Vitest + Testing Library)
   - React components in isolation
   - User interaction simulation
   - Snapshot testing

3. **Integration Tests** (Vitest)
   - tRPC router procedures
   - Firebase interactions (with emulators)
   - End-to-end data flow

4. **E2E Tests** (Playwright)
   - Critical user journeys
   - Cross-browser testing
   - Visual regression testing

### Coverage Targets

- **Statements**: ≥ 80%
- **Branches**: ≥ 80%
- **Functions**: ≥ 80%
- **Lines**: ≥ 80%

## Design System

### Design Tokens

All design tokens are defined in `docs/design-tokens.json` and integrated into:
- Tailwind CSS configuration
- CSS custom properties (`:root`)
- TypeScript types for type safety

**Token Categories**:
- Colors (primary, secondary, accent, neutrals, semantic)
- Typography (font families, sizes, weights, line heights)
- Spacing (8-point grid system)
- Animations (durations, easing functions, keyframes)
- Components (pre-configured styles for common patterns)

### Component Architecture

Components follow **atomic design principles**:

1. **Atoms**: Basic UI elements (Button, Input, Label)
2. **Molecules**: Simple combinations (LoginForm, StatsCard)
3. **Organisms**: Complex sections (Hero, Features, Navbar)
4. **Templates**: Page layouts
5. **Pages**: Full pages with data fetching

## Performance Optimization

### Frontend
- **Code Splitting**: Route-based dynamic imports
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image compression, lazy loading
- **Caching**: TanStack Query with optimized stale times

### Backend
- **Firestore Indexing**: Optimized queries with composite indexes
- **Data Denormalization**: Strategic duplication for read performance
- **Cloud Function Cold Start**: Gen 2 functions with improved cold start times

### Monitoring
- Firebase Performance Monitoring
- Custom metrics for workout generation
- Error tracking with proper logging

## Deployment Strategy

### Environments

1. **Local Development**
   - Firebase Emulators for Auth & Firestore
   - Vite dev server with HMR
   - Port 5173 (web) + 4000 (emulator UI)

2. **Preview (PR)**
   - Automatic deployment on PR creation
   - Firebase Hosting preview channel
   - URL: `healthily-fit--pr-{number}.web.app`
   - Auto-expires after 7 days

3. **Production**
   - Deployment on merge to `main`
   - Firebase Hosting live channel
   - URL: `https://healthily-fit.web.app`
   - Cloud Functions deployed automatically

### CI/CD Pipeline

```
GitHub Push/PR
    ↓
Install Dependencies
    ↓
Lint & Type Check
    ↓
Run Tests (Unit + Component)
    ↓
Build Application
    ↓
Run E2E Tests
    ↓
Deploy (Preview or Production)
```

## Scalability Considerations

### Current Architecture (MVP)
- Firebase Firestore (serverless, auto-scaling)
- Cloud Functions (scales with demand)
- Firebase Hosting (global CDN)

### Future Scaling Options
- **Caching Layer**: Redis for frequently accessed data
- **Search**: Algolia for advanced exercise search
- **Analytics**: BigQuery for data warehousing
- **ML/AI**: Vertex AI for advanced workout generation
- **Real-time**: Firebase Realtime Database for live features

## Development Workflow

### TDD Cycle

1. **Red**: Write failing test
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve code quality
4. **Commit**: Use conventional commit message

### Branch Strategy

- `main`: Production-ready code
- `dev`: Integration branch
- `feature/*`: Feature branches
- `fix/*`: Bug fix branches

### Code Review Requirements

- At least 1 approval
- All CI checks passing
- No decrease in test coverage
- Documentation updated

---

**Last Updated**: 2025-01-22  
**Version**: 1.0.0


