# Image Replacement Guide

## ✅ Step 2 Complete: Placeholder Images Updated

All placeholder images have been replaced with real Unsplash images and enhanced with detailed comments for future customization.

---

## Updated Images

### 1. Splash/Welcome Screen (`/welcome`)
**Location**: `apps/web/src/pages/splash.tsx`
**Current Image**: Unsplash fitness gym photo
**URL**: `https://images.unsplash.com/photo-1517836357463-d25dfeac3438`
**Alt Text**: "Person exercising - start your fitness journey"
**Dimensions**: 600x500px
**Pinterest Search**: https://www.pinterest.com/search/pins/?q=fitness%20journey%20illustration%20modern
**Suggested Keywords**:
- "fitness app illustration"
- "workout motivation graphic"
- "health journey vector"
- "modern fitness design"

---

### 2. Login Page (`/auth/login`)
**Location**: `apps/web/src/pages/login.tsx`
**Current Image**: Unsplash gym equipment photo
**URL**: `https://images.unsplash.com/photo-1534438327276-14e5300c3a48`
**Alt Text**: "Fitness motivation - welcome back to your journey"
**Dimensions**: 500x500px
**Pinterest Search**: https://www.pinterest.com/search/pins/?q=fitness%20motivation%20welcome%20back
**Suggested Keywords**:
- "gym motivation"
- "fitness comeback"
- "workout dedication"
- "strength training inspiration"

---

### 3. Signup Page (`/auth/signup`)
**Location**: `apps/web/src/pages/signup.tsx`
**Current Image**: Unsplash gym workout photo
**URL**: `https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b`
**Alt Text**: "Start your fitness journey today"
**Dimensions**: 500x500px
**Pinterest Search**: https://www.pinterest.com/search/pins/?q=fitness%20start%20journey%20inspiration
**Suggested Keywords**:
- "new beginning fitness"
- "workout start"
- "health journey begins"
- "fitness transformation"

---

### 4. Dashboard - Empty Workout Plan (`/dashboard`)
**Location**: `apps/web/src/pages/dashboard/index.tsx`
**Current Image**: Unsplash workout planner photo
**URL**: `https://images.unsplash.com/photo-1506126613408-eca07ce68773`
**Alt Text**: "Create your personalized workout plan"
**Dimensions**: 300x200px
**Pinterest Search**: https://www.pinterest.com/search/pins/?q=workout%20plan%20calendar%20fitness
**Suggested Keywords**:
- "fitness planner"
- "workout schedule"
- "training calendar"
- "exercise plan template"

---

### 5. Dashboard - Empty Recent Activity
**Location**: `apps/web/src/components/dashboard/recent-activity.tsx`
**Current Image**: Unsplash running/activity photo
**URL**: `https://images.unsplash.com/photo-1476480862126-209bfaa8edc8`
**Alt Text**: "Track your fitness activities and progress"
**Dimensions**: 300x200px
**Pinterest Search**: https://www.pinterest.com/search/pins/?q=fitness%20tracking%20app%20activity
**Suggested Keywords**:
- "activity tracker"
- "fitness log"
- "workout history"
- "progress tracking"

---

## Image Specifications

### Technical Requirements
- **Format**: JPG, PNG, or WebP
- **Max File Size**: 200KB per image (optimized)
- **Resolution**: 2x for retina displays
- **Aspect Ratios**:
  - Hero images: 6:5 (600x500)
  - Card images: 3:2 (300x200)
- **Loading**: `eager` for above-fold, `lazy` for below-fold
- **Object Fit**: `cover` for all images

### Accessibility
- ✅ All images have descriptive alt text
- ✅ Alt text describes content and purpose
- ✅ Images are not essential for understanding content
- ✅ Decorative images could use `alt=""` if needed

### Performance
- ✅ Unsplash URLs include `?w=XXX&h=XXX&fit=crop` for optimization
- ✅ Images use `loading="lazy"` attribute (except splash)
- ✅ Object-cover class prevents distortion
- ✅ Images sized appropriately for use case

---

## How to Replace with Custom Images

### Option 1: Unsplash (Free, No Attribution Required)
1. Go to https://unsplash.com
2. Search for fitness-related terms
3. Choose high-quality image
4. Click "Download" → select size
5. Get URL: `https://images.unsplash.com/photo-XXXXX?w=600&h=500&fit=crop`
6. Replace in code

### Option 2: Pinterest (Curated, Visual Discovery)
1. Use Pinterest search links provided above
2. Find image matching your brand
3. Download or get direct URL
4. Upload to your CDN/hosting
5. Replace URL in code

### Option 3: Custom Photography
1. Take branded fitness photos
2. Edit to match color scheme (green theme)
3. Optimize with tools like:
   - TinyPNG: https://tinypng.com
   - Squoosh: https://squoosh.app
4. Upload to Firebase Storage or CDN
5. Replace URLs in code

### Option 4: Stock Photos (Shutterstock, iStock)
1. Purchase license for commercial use
2. Download high-resolution versions
3. Optimize for web
4. Upload to hosting
5. Replace URLs

---

## Image Optimization Checklist

Before deploying custom images:
- [ ] Resize to exact dimensions needed
- [ ] Compress to <200KB per image
- [ ] Convert to WebP format (with JPG fallback)
- [ ] Add to CDN for fast delivery
- [ ] Update alt text if image content changes
- [ ] Test on slow 3G connection
- [ ] Verify images display correctly on:
  - [ ] Mobile (320px-767px)
  - [ ] Tablet (768px-1023px)
  - [ ] Desktop (1024px+)
- [ ] Run Lighthouse audit for performance
- [ ] Check images don't cause layout shift (CLS)

---

## Brand Consistency Guide

### Color Palette (for image selection)
- **Primary Green**: #00c853
- **Accent Green**: #007e33
- **Neutral Backgrounds**: White, light gray
- **Text Colors**: Dark gray, black

### Image Style Guide
**Do:**
- ✅ Active, energetic scenes
- ✅ People in motion (diverse representation)
- ✅ Clean, modern gym equipment
- ✅ Natural lighting
- ✅ Positive, motivational vibes
- ✅ Green accents where possible

**Don't:**
- ❌ Overly posed/staged photos
- ❌ Dark, gloomy lighting
- ❌ Cluttered backgrounds
- ❌ Off-brand colors (blues, oranges)
- ❌ Low-quality or pixelated images
- ❌ Stock photo clichés

---

## Testing After Image Replacement

### Visual Check
- [ ] Images load correctly on all pages
- [ ] No broken image icons
- [ ] Images fit properly in containers
- [ ] No distortion or stretching
- [ ] Text overlays remain readable

### Performance Check
- [ ] Page load time <3 seconds
- [ ] Lighthouse Performance score >90
- [ ] Images don't block rendering
- [ ] Lazy loading works correctly

### Accessibility Check
- [ ] Alt text is descriptive
- [ ] Images don't rely on color alone
- [ ] Images enhance, not replace, text content

---

## Quick Reference: All Image URLs

For easy bulk replacement:

```javascript
// apps/web/src/pages/splash.tsx
const SPLASH_IMAGE = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=500&fit=crop";

// apps/web/src/pages/login.tsx
const LOGIN_IMAGE = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop";

// apps/web/src/pages/signup.tsx
const SIGNUP_IMAGE = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop";

// apps/web/src/pages/dashboard/index.tsx
const EMPTY_PLAN_IMAGE = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop";

// apps/web/src/components/dashboard/recent-activity.tsx
const EMPTY_ACTIVITY_IMAGE = "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=300&h=200&fit=crop";
```

---

## Next Steps

1. **Review Current Images**: Check if Unsplash images match your brand
2. **Customize if Needed**: Replace with Pinterest finds or custom photos
3. **Optimize**: Compress and resize for web
4. **Test**: Verify on all devices and connections
5. **Deploy**: Push to production once satisfied

---

## ✅ Current Status

All placeholder images have been replaced with real, high-quality Unsplash photos. The app is now visually complete and ready for production, with optional customization available using the Pinterest search links and keywords provided in code comments.

**Images Updated**: 5/5 ✅
**Linting Errors**: 0 ✅
**Alt Text**: All images have descriptive alt text ✅
**Loading Strategy**: Optimized (eager/lazy) ✅
**Performance**: Unsplash CDN for fast delivery ✅

---

**Ready for deployment with production-quality images!** 🎨

