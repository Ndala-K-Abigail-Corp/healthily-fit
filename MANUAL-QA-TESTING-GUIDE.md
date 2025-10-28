# Manual QA Testing Guide - UI Redesign

## Testing Environment Setup

### Prerequisites
- [ ] Development server running (`npm run dev` or `pnpm dev`)
- [ ] Firebase emulators running (if testing locally)
- [ ] Test user accounts created
- [ ] Browser DevTools open (for responsive testing)

### Browsers to Test
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on macOS)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

---

## Phase 1: Onboarding Flow Testing

### Test 1: Splash/Welcome Screen (`/welcome`)

**Desktop (1920x1080)**
- [ ] Navigate to `/welcome`
- [ ] Verify gradient background displays correctly (green gradient)
- [ ] Check Dumbbell icon and "Healthily Fit" logo visible
- [ ] Verify main heading is readable and properly sized
- [ ] Check 3 feature bullet points with Sparkles icons display
- [ ] Verify placeholder illustration shows on right side
- [ ] Check stats section at bottom (1000+ users, 50K+ workouts, 4.8★)
- [ ] Click "Get Started" button → should navigate to `/auth/signup`
- [ ] Go back, click "Sign In" button → should navigate to `/auth/login`
- [ ] Verify fadeIn animation plays on page load
- [ ] Check slideUp animations on content

**Tablet (768x1024)**
- [ ] Same checks as desktop
- [ ] Verify illustration still visible
- [ ] Check text is readable and properly sized

**Mobile (375x667)**
- [ ] Illustration should be hidden (`hidden lg:block`)
- [ ] Buttons should stack vertically
- [ ] Text should be centered and readable
- [ ] Stats should stack in 3 columns
- [ ] All content fits without horizontal scroll

---

### Test 2: Login Page (`/auth/login`)

**Desktop**
- [ ] Navigate to `/auth/login`
- [ ] Verify two-column layout (illustration left, form right)
- [ ] Check background color is light gray (`--color-background-light`)
- [ ] Verify Dumbbell icon and logo at top
- [ ] Check shadcn Card component displays with shadow
- [ ] Verify LogIn icon in card header
- [ ] Check placeholder illustration displays on left
- [ ] Enter valid email and password
- [ ] Verify input focus states (blue ring)
- [ ] Submit form → should navigate to `/dashboard`
- [ ] Go back to login
- [ ] Enter invalid credentials
- [ ] Verify error message displays clearly
- [ ] Click Google sign-in button → verify it's functional
- [ ] Click "Sign up" link → should navigate to `/auth/signup`
- [ ] Click "Back to Home" → should navigate to `/`
- [ ] Check fadeIn animation on illustration
- [ ] Check slideUp animation on form card

**Mobile**
- [ ] Layout should be single column (no illustration)
- [ ] Card should be full-width with padding
- [ ] Form inputs should be easy to tap (min 44px height)
- [ ] Buttons should be full-width
- [ ] Keyboard should push content up, not cover it

---

### Test 3: Signup Page (`/auth/signup`)

**Desktop**
- [ ] Navigate to `/auth/signup`
- [ ] Verify two-column layout
- [ ] Check UserPlus icon in card header
- [ ] Enter name, email, password, confirm password
- [ ] Verify password strength indicator works
- [ ] Check validation errors display for:
  - [ ] Invalid email format
  - [ ] Password too short
  - [ ] Passwords don't match
- [ ] Submit with valid data → should navigate to `/onboarding`
- [ ] Verify Google sign-up works
- [ ] Click "Sign in" link → should navigate to `/auth/login`

**Mobile**
- [ ] Single column layout
- [ ] All form fields accessible
- [ ] Validation errors clearly visible
- [ ] Submit button full-width

---

### Test 4: Onboarding Flow (`/onboarding`)

**Step 1: Personal Information**
- [ ] Verify logo and welcome message with Sparkles icons
- [ ] Check card has gradient header
- [ ] Enter age (valid: 13-120)
- [ ] Select gender → verify ONLY "Male" and "Female" options show
- [ ] Enter height (valid range)
- [ ] Enter weight (valid range)
- [ ] Verify "Next" button full-width on mobile
- [ ] Click "Next" → should go to Step 2
- [ ] Check slideUp animation plays

**Step 2: Health Information**
- [ ] Progress bar shows "Step 2 of 4"
- [ ] Select dietary preference
- [ ] Select health conditions (multi-select)
- [ ] Click "Back" → returns to Step 1 with data preserved
- [ ] Click "Next" → goes to Step 3
- [ ] Check slideUp animation

**Step 3: Fitness Goals**
- [ ] Progress bar shows "Step 3 of 4"
- [ ] Select fitness goal from dropdown
- [ ] Enter target weight (optional)
- [ ] Click "Back" → returns to Step 2
- [ ] Click "Next" → goes to Step 4
- [ ] Check slideUp animation

**Step 4: Summary**
- [ ] Progress bar shows "Step 4 of 4"
- [ ] Verify all entered data displays correctly:
  - [ ] Personal info (age, gender, height, weight, BMI)
  - [ ] Health info (diet, health conditions)
  - [ ] Fitness goals (primary goal, target weight)
- [ ] Check cards are styled correctly with icons
- [ ] Verify "Start Training →" button text
- [ ] Click "Back" → returns to Step 3
- [ ] Click "Start Training" → creates profile and navigates to `/dashboard`
- [ ] Verify loading state shows "Creating Profile..."

**Mobile Responsiveness**
- [ ] All steps display correctly on small screens
- [ ] Buttons stack vertically
- [ ] Cards stack vertically
- [ ] Text is readable
- [ ] No horizontal scroll

---

## Phase 2: Dashboard Testing

### Test 5: Dashboard Index (`/dashboard`)

**Desktop**
- [ ] Successfully authenticated user lands on dashboard
- [ ] Verify welcome message with user's name
- [ ] Check "fitness progress overview" subtitle

**Stats Grid (4 Cards)**
- [ ] Card 1: Current BMI with category
- [ ] Card 2: Current Weight with target
- [ ] Card 3: Workouts Completed (this week)
- [ ] Card 4: Fitness Goal with diet preference
- [ ] Verify icons display correctly (Activity, Target, Flame, TrendingUp)
- [ ] Check hover shadow effect on cards
- [ ] Verify colors use design tokens

**Workout Plan Section**
- [ ] If NO active plan:
  - [ ] Verify placeholder image displays
  - [ ] Check "Generate Workout Plan" button works
  - [ ] Click button → dialog opens
- [ ] If ACTIVE plan:
  - [ ] Verify plan card displays with progress bar
  - [ ] Check stats (weeks, workouts, exercises)
  - [ ] Verify "This Week's Workouts" list shows
  - [ ] Check "View Full Plan" button → navigates to `/dashboard/workouts`

**Recent Activity Section**
- [ ] If NO activities:
  - [ ] Verify placeholder image displays
  - [ ] Check "Log Activity" button present
- [ ] If activities exist:
  - [ ] Verify activity items display correctly
  - [ ] Check timestamps and details

**Charts Section**
- [ ] Weight Progress Chart displays
- [ ] Weekly Activity Chart displays
- [ ] BMI Trend visualization shows
  - [ ] BMI range bar with color coding
  - [ ] Current BMI indicator
  - [ ] Health insights cards (Age, Height, To Goal)

**Animations**
- [ ] Header fadeIn animation plays
- [ ] Stats cards slideUp with staggered delays (check animation-delay)
- [ ] Workout plan slideUp (delay: 100ms)
- [ ] Recent activity slideUp (delay: 200ms)
- [ ] Charts slideUp (delays: 300ms, 400ms, 500ms)

**Mobile (375x667)**
- [ ] Stats grid stacks to 1-2 columns
- [ ] Workout plan and activity stack vertically
- [ ] Charts stack vertically
- [ ] All text readable
- [ ] Buttons accessible
- [ ] No horizontal scroll

**Tablet (768x1024)**
- [ ] Stats grid shows 2 columns
- [ ] Main content shows 2 columns side-by-side
- [ ] Charts show 2 columns
- [ ] Layout looks balanced

---

### Test 6: Navigation & Links

**Top Navbar**
- [ ] Logo/brand displays correctly
- [ ] "Dashboard" link highlighted when on dashboard
- [ ] "Profile" link works → navigates to `/dashboard/profile`
- [ ] Profile button shows user name/email
- [ ] "Logout" button works → signs out and redirects to landing
- [ ] Mobile menu toggle works
- [ ] Mobile menu shows all links
- [ ] Active route highlighted correctly

**Footer Links**
- [ ] Privacy Policy → `/privacy`
- [ ] Terms of Service → `/terms`
- [ ] Health Disclaimer → `/disclaimer`
- [ ] Cookie Policy → `/cookies`
- [ ] Contact → `/contact`
- [ ] All links work without page reload (SPA navigation)

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through login form → all fields reachable
- [ ] Focus indicators visible on all interactive elements
- [ ] Enter key submits forms
- [ ] Escape key closes dialogs
- [ ] Arrow keys work in dropdowns
- [ ] Tab order is logical (top to bottom, left to right)

### Screen Reader Testing (Optional)
- [ ] Form labels announced correctly
- [ ] Error messages announced
- [ ] Button purposes clear
- [ ] Images have alt text
- [ ] Headings in logical order

### Contrast & Colors
- [ ] Open browser DevTools → Lighthouse
- [ ] Run Accessibility audit
- [ ] Verify no contrast issues
- [ ] Check color-blind friendly (use DevTools emulation)

---

## Performance Testing

### Lighthouse Audit
- [ ] Open DevTools → Lighthouse
- [ ] Run audit on key pages:
  - [ ] Landing page (/)
  - [ ] Login (/auth/login)
  - [ ] Dashboard (/dashboard)
- [ ] Target scores:
  - [ ] Performance: >90
  - [ ] Accessibility: >90
  - [ ] Best Practices: >90
  - [ ] SEO: >80

### Load Times
- [ ] Clear cache and reload pages
- [ ] Verify images load quickly
- [ ] Check no console errors
- [ ] Animations don't stutter
- [ ] Forms respond instantly

---

## Responsive Breakpoint Testing

### Test at Specific Widths
Use DevTools responsive mode and test:

**320px (Small Mobile)**
- [ ] All content visible
- [ ] No horizontal scroll
- [ ] Text readable
- [ ] Buttons tappable

**375px (iPhone SE)**
- [ ] Layout correct
- [ ] Images scale properly
- [ ] Forms usable

**768px (iPad)**
- [ ] Grid layouts partial
- [ ] Sidebar/nav appropriate
- [ ] Cards use available space

**1024px (iPad Pro)**
- [ ] Multi-column layouts active
- [ ] Full desktop features available
- [ ] Illustrations visible

**1920px (Desktop)**
- [ ] Content doesn't stretch too wide
- [ ] Max-width containers working
- [ ] Layout balanced

---

## Functional Regression Testing

### Core Features Must Work
- [ ] User registration creates account
- [ ] Login authenticates successfully
- [ ] Onboarding creates profile in Firestore
- [ ] Dashboard loads user data correctly
- [ ] Workout plan generation works
- [ ] Workout plan editing works
- [ ] Activity logging works
- [ ] Profile editing works
- [ ] Logout clears session
- [ ] Protected routes redirect unauthenticated users

### Data Integrity
- [ ] Profile data persists after page reload
- [ ] Workout plans save correctly
- [ ] Activity logs record properly
- [ ] No data loss during navigation
- [ ] Firebase sync works (check Firestore console)

---

## Bug Reporting Template

If you find issues, document them:

```
**Issue**: [Brief description]
**Page**: [URL/route]
**Device**: [Desktop/Mobile, browser, screen size]
**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Expected vs Actual]

**Screenshots**: [Attach if possible]
**Console Errors**: [Copy any errors]
**Priority**: [High/Medium/Low]
```

---

## Sign-Off Checklist

Before marking UI redesign as complete:

### Visual Design
- [ ] All pages match design intent
- [ ] Colors consistent with design tokens
- [ ] Typography hierarchy clear
- [ ] Spacing consistent
- [ ] Animations smooth and purposeful
- [ ] Placeholder images display correctly

### Functionality
- [ ] All forms submit successfully
- [ ] Navigation works correctly
- [ ] Authentication flows work
- [ ] Data persists properly
- [ ] Error handling works
- [ ] Loading states display

### Responsive Design
- [ ] Mobile (320px-767px) works
- [ ] Tablet (768px-1023px) works
- [ ] Desktop (1024px+) works
- [ ] No horizontal scroll
- [ ] Touch targets adequate (44px+)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast passes AA
- [ ] Form labels present
- [ ] Error messages clear

### Performance
- [ ] Lighthouse scores acceptable
- [ ] No console errors
- [ ] Images optimized
- [ ] Animations don't lag
- [ ] Load times reasonable

---

## Testing Complete! ✅

Once all tests pass, the UI redesign is ready for production deployment!

**Tester Name**: _________________  
**Date**: _________________  
**Result**: [ ] Pass [ ] Fail (see bugs)  
**Notes**: _________________________________

