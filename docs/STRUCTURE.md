# Healthily Fit Web App Structure

This document outlines the clean, modular structure of the Healthily Fit web application.

## 📁 Project Structure

```
apps/web/src/
├── components/
│   ├── auth/              # Authentication-related components
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── google-auth-button.tsx
│   │
│   ├── landing/           # Landing page sections (modular)
│   │   ├── hero.tsx       # Hero section with main CTA
│   │   ├── features.tsx   # Key features showcase
│   │   ├── personalized-profile.tsx  # Personalized workouts explanation
│   │   ├── testimonials.tsx          # User testimonials carousel
│   │   ├── cta.tsx                   # Final call-to-action
│   │   └── index.ts                  # Barrel exports
│   │
│   ├── layout/            # Layout components
│   │   ├── navbar.tsx     # Sticky navbar with mobile menu
│   │   └── footer.tsx     # Site footer
│   │
│   ├── profile/           # Profile/onboarding components
│   │   └── onboarding-form.tsx
│   │
│   ├── dashboard/         # Dashboard components
│   │   └── stats-card.tsx
│   │
│   └── ui/                # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── dialog.tsx
│
├── hooks/                 # Custom React hooks
│   ├── use-auth.ts        # Authentication state
│   ├── use-profile.ts     # User profile management
│   ├── use-navbar.ts      # Navbar state & scroll tracking
│   ├── use-scroll-animation.ts  # Intersection observer for animations
│   ├── use-personalization.ts   # UI personalization utilities
│   └── index.ts           # Barrel exports
│
├── pages/                 # Route pages
│   ├── landing.tsx        # Landing page (/)
│   ├── login.tsx          # Login page (/auth/login)
│   ├── signup.tsx         # Signup page (/auth/signup)
│   ├── onboarding.tsx     # Onboarding page (/onboarding)
│   └── dashboard.tsx      # Dashboard page (/dashboard)
│
├── lib/                   # Utility libraries
│   ├── firebase.ts        # Firebase configuration
│   ├── trpc.ts           # tRPC client setup
│   └── utils.ts          # General utilities
│
├── styles/
│   └── globals.css        # Global styles with design tokens
│
└── main.tsx              # App entry point with routing

```

## 🎨 Design System

### Design Tokens
All design tokens are defined in `/docs/design-tokens.json` and implemented in:
- `apps/web/src/styles/globals.css` - CSS variables
- `apps/web/tailwind.config.js` - Tailwind configuration

### Color Palette
- **Primary**: `#00c853` (Green)
- **Accent**: `#007e33` (Dark Green)
- **Neutral Scale**: 100-900
- **Semantic Colors**: success, warning, error

### Typography
- **Base Font**: Open Sans (400, 600, 700)
- **Heading Font**: Montserrat (400, 600, 700)

### Spacing Scale
- xs: 0.25rem
- sm: 0.5rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 3rem
- 3xl: 4rem

## 🎯 Landing Page Flow

### 1. Hero Section (`#hero`)
- Main headline and value proposition
- Primary CTA (Sign Up)
- Secondary CTA (Learn More)
- Key statistics

### 2. Features Section (`#features`)
- 4 key feature cards:
  - Personalized Plans
  - Health-First Approach
  - Progress Tracking
  - Adaptive Routines

### 3. Personalized Workouts Section (`#personalized-workouts`)
- Detailed explanation of personalization
- Visual profile card example
- Mini feature grid

### 4. Testimonials Section (`#testimonials`)
- User testimonials with avatars
- Social proof and success stories

### 5. Call-to-Action Section
- Final conversion opportunity
- Gradient background
- Clear benefit statement

## 🪝 Custom Hooks

### `useNavbar()`
Manages navbar state including:
- Mobile menu open/close
- Active section tracking (scroll-based)
- Scroll position for styling
- Auto-close on route change

```typescript
const { activeSection, isMenuOpen, isScrolled, toggleMenu, closeMenu } = useNavbar();
```

### `useScrollAnimation()`
Intersection Observer-based animation trigger:
- Detects when element enters viewport
- Supports trigger-once or repeated
- Customizable threshold and rootMargin

```typescript
const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
```

### `usePersonalization()`
UI personalization utilities:
- Time-based greetings
- User display name formatting
- Initial generation for avatars

```typescript
const { getPersonalizedGreeting, getDisplayName, getInitials } = usePersonalization();
```

## 🎭 Animations

All animations use design tokens for timing and easing:
- `fadeIn` - Opacity transition
- `slideUp` - Slide from bottom with fade
- `slideDown` - Slide from top with fade (mobile menu)
- `zoomIn` - Scale with fade

### Usage
```tsx
<div className="animate-slideUp">Content</div>
<div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>Content</div>
```

## 📱 Responsive Design

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1400px (container max-width)

### Mobile Menu
- Hamburger icon appears < md breakpoint
- Full-screen overlay menu
- Smooth animations
- Auto-closes on navigation

### Grid Layouts
- Features: 1 col (mobile) → 2 cols (md) → 4 cols (lg)
- Testimonials: 1 col (mobile) → 3 cols (md)
- Profile section: 1 col (mobile) → 2 cols (lg)

## 🔐 Authentication Flow

1. **Landing Page** → User explores features
2. **Signup** → Create account with email/password or Google
3. **Onboarding** → Complete health profile
4. **Dashboard** → Access personalized workouts

Protected routes automatically redirect unauthenticated users to login.

## 🚀 Getting Started

### Development
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

### Test
```bash
pnpm test
```

## 📝 Adding New Sections

To add a new landing page section:

1. Create component in `components/landing/`:
```tsx
// components/landing/new-section.tsx
export function NewSection() {
  return (
    <section id="new-section" className="py-3xl px-xl scroll-mt-16">
      {/* Section content */}
    </section>
  );
}
```

2. Export from `components/landing/index.ts`:
```typescript
export { NewSection } from "./new-section";
```

3. Add to landing page:
```tsx
// pages/landing.tsx
import { NewSection } from "@/components/landing";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* ... existing sections ... */}
        <NewSection />
      </main>
      <Footer />
    </div>
  );
}
```

4. Update navbar links if needed:
```tsx
// components/layout/navbar.tsx
const homeLinks = [
  // ... existing links ...
  { href: "#new-section", label: "New Section" },
];
```

## 🎨 Styling Guidelines

### Use Design Tokens
```css
/* ✅ Good */
background-color: var(--color-primary);
padding: var(--space-lg);

/* ❌ Avoid */
background-color: #00c853;
padding: 1.5rem;
```

### Utility Classes
```tsx
{/* ✅ Use Tailwind utilities with design tokens */}
<div className="bg-primary text-neutral-100 px-lg py-md" />

{/* ✅ Animations */}
<div className="animate-slideUp transition-medium" />
```

### Component Organization
- Keep components focused and single-purpose
- Use barrel exports for cleaner imports
- Co-locate tests with components
- Separate business logic into custom hooks

## 🔧 Configuration Files

- `tailwind.config.js` - Tailwind with design tokens
- `vite.config.ts` - Vite build configuration
- `vitest.config.ts` - Test configuration
- `tsconfig.json` - TypeScript configuration
- `firebase.json` - Firebase deployment

## 📚 Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **Testing**: Vitest + Testing Library
- **Auth**: Firebase Authentication
- **State**: React hooks (no external state management)

## 🤝 Contributing

When making changes:
1. Follow the existing structure
2. Use design tokens for all styling
3. Keep components modular and reusable
4. Add tests for new features
5. Update this document if structure changes

