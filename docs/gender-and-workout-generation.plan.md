<!-- 70b97736-edd5-4cbd-8a0f-040ee12607a3 18bc6142-d5fc-4959-8e19-8c4196f1f59d -->
# Gender Selection & Personalized Workout Generation Plan

## Phase 1: Schema & Data Model Updates

### 1.1 Update Profile Schema

**File**: `packages/shared/src/schemas/profile.schema.ts`

Add gender enum and field to ProfileSchema:

```typescript
export const GenderEnum = z.enum(["male", "female", "other", "prefer_not_to_say"]);

// Add to ProfileSchema:
gender: GenderEnum,
```

### 1.2 Update Workout Schema

**File**: `packages/shared/src/schemas/workout.schema.ts`

Add fields to support customization:

```typescript
// Add to WorkoutPlanSchema:
isCustom: z.boolean().default(false),
customizedFrom: z.string().optional(), // Original plan ID if modified
```

## Phase 2: Onboarding Updates

### 2.1 Add Gender to Personal Info Step

**File**: `apps/web/src/components/onboarding/steps/step-personal-info.tsx`

Add gender selection dropdown after age field, before height/weight grid. Use same styling as existing form fields.

### 2.2 Update Summary Step

**File**: `apps/web/src/components/onboarding/steps/step-summary.tsx`

Display gender in the Personal Information card review section.

## Phase 3: Profile Management

### 3.1 Update Profile Edit Form

**File**: `apps/web/src/components/profile/profile-edit-form.tsx`

Add gender dropdown in Personal Information card after age field.

### 3.2 Update Profile View

**File**: `apps/web/src/components/profile/profile-view.tsx`

Display gender in personal information section if not "prefer_not_to_say".

## Phase 4: Workout Generation Engine

### 4.1 Create Workout Templates

**File**: `apps/web/src/lib/workout-templates.ts` (new)

Define base workout templates for different profiles:

- Beginner/Intermediate/Advanced levels
- Age-appropriate exercises (youth, adult, senior)
- Goal-specific templates (weight_loss, muscle_gain, etc.)
- Condition-safe exercise lists (contraindications)

### 4.2 Create Workout Generator Algorithm

**File**: `apps/web/src/lib/workout-generator.ts` (new)

Implement client-side logic:

- Input: Profile (age, gender, BMI, goals, conditions)
- Select appropriate base template
- Filter exercises based on health conditions
- Adjust intensity/duration based on age and fitness level
- Generate 4-week progressive plan
- Return WorkoutPlan object

Algorithm considerations:

- Age groups: 13-17 (youth), 18-64 (adult), 65+ (senior)
- BMI categories: adjust intensity
- Gender: consider exercise recommendations from research links
- Health conditions: exclude contraindicated exercises
- Goals: select exercise types (cardio, strength, flexibility)

### 4.3 Create Workout Customization Utilities

**File**: `apps/web/src/lib/workout-utils.ts` (new)

Helper functions:

- Clone workout plan for editing
- Validate workout plan
- Calculate estimated calories
- Format workout data for display

## Phase 5: Firestore Integration

### 5.1 Add Workout Plan Firestore Functions

**File**: `apps/web/src/lib/firestore.ts`

Add functions:

- `createWorkoutPlan(uid: string, plan: WorkoutPlan): Promise<WorkoutPlan>`
- `updateWorkoutPlan(planId: string, updates: Partial<WorkoutPlan>): Promise<WorkoutPlan>`
- `fetchWorkoutPlans(uid: string, status?: WorkoutPlanStatus): Promise<WorkoutPlan[]>`
- `fetchActiveWorkoutPlan(uid: string): Promise<WorkoutPlan | null>`
- `deleteWorkoutPlan(planId: string): Promise<void>`

## Phase 6: Dashboard UI Components

### 6.1 Create Workout Plan Display Component

**File**: `apps/web/src/components/dashboard/workout-plan-card.tsx` (new)

Display:

- Plan overview (dates, total weeks, status)
- Current week's workouts
- Progress indicators
- Actions: View Details, Edit, Mark Complete

### 6.2 Create Workout Generator Dialog

**File**: `apps/web/src/components/dashboard/workout-generator-dialog.tsx` (new)

Modal with:

- Generate button triggering algorithm
- Loading state during generation
- Preview of generated plan
- Option to accept or regenerate

### 6.3 Create Workout Editor Component

**File**: `apps/web/src/components/dashboard/workout-editor.tsx` (new)

Allow users to:

- Edit exercise sets/reps/duration
- Add/remove exercises
- Modify workout days
- Save as customized plan

### 6.4 Update Dashboard Page

**File**: `apps/web/src/pages/dashboard/index.tsx`

Replace placeholder workout plan card with:

- WorkoutPlanCard if active plan exists
- Generate button triggering WorkoutGeneratorDialog if no plan
- Update QuickActions to wire up "Generate Workout" button

### 6.5 Create Workouts Page

**File**: `apps/web/src/pages/dashboard/workouts.tsx`

Full workout management:

- List all workout plans (active, completed)
- Detailed workout view with daily exercises
- Edit/delete functionality
- Create custom workout from scratch

## Phase 7: Context & State Management

### 7.1 Create Workout Context

**File**: `apps/web/src/context/workout-context.tsx` (new)

Manage:

- Active workout plan state
- Generate workout function
- Update workout function
- Fetch workout plans

### 7.2 Create useWorkout Hook

**File**: `apps/web/src/hooks/use-workout.ts` (new)

Re-export `useWorkoutContext` for consistency with existing patterns.

### 7.3 Update Main App Provider

**File**: `apps/web/src/main.tsx` (if needed)

Add WorkoutProvider to context hierarchy.

## Phase 8: Constants & Types

### 8.1 Update Constants

**File**: `apps/web/src/lib/constants.ts`

Add:

- Gender display labels
- Workout generation constants (default weeks, exercises per day)
- Exercise difficulty mappings

## Phase 9: Testing & Validation

- Verify gender saves correctly during onboarding
- Test workout generation with various profiles
- Ensure health conditions properly filter exercises
- Validate workout customization saves
- Check responsive design on all workout components
- Verify Firestore rules allow workout operations

## Key Technical Decisions

1. **Client-side only**: All workout generation happens in browser, no Firebase Functions
2. **Hybrid templates**: Pre-defined exercise templates customized by algorithm
3. **Progressive plans**: 4-week programs that users can extend/repeat
4. **Safety first**: Always filter exercises based on contraindications
5. **Editable plans**: Users can modify any generated plan
6. **Single active plan**: Users have one active plan at a time (can archive/complete)

### To-dos

- [x] Add GenderEnum and gender field to ProfileSchema in shared package
- [x] Add isCustom and customizedFrom fields to WorkoutPlanSchema
- [x] Add gender dropdown to StepPersonalInfo component
- [x] Display gender in StepSummary review section
- [x] Add gender field to ProfileEditForm
- [x] Create workout-templates.ts with base exercise templates organized by level, age, goal, and conditions
- [x] Implement workout-generator.ts algorithm using profile data and templates
- [x] Create workout-utils.ts with helper functions for cloning, validation, and formatting
- [x] Add workout CRUD functions to firestore.ts
- [x] Create workout-context.tsx for state management
- [x] Create WorkoutPlanCard component to display active plan
- [x] Create WorkoutGeneratorDialog component with generation UI
- [x] Create WorkoutEditor component for plan customization
- [x] Update dashboard page to display and generate workouts
- [x] Create full workouts management page with list, detail, and custom creation
- [x] Add gender labels and workout-related constants to constants.ts