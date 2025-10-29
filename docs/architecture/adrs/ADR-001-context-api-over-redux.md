# ADR-001: Use React Context API Over Redux

**Status:** Accepted  
**Date:** 2024-01-15  
**Deciders:** Development Team  
**Context:** State Management Selection

## Context

The Healthily Fit application requires state management for user authentication, profile data, workout plans, and activity tracking. We need to decide between React Context API and external state management libraries like Redux.

## Decision

We will use React Context API for application state management.

## Rationale

### Reasons for Context API:

1. **Simpler Architecture**: Context API is built into React, requiring no additional dependencies
2. **Adequate for Use Case**: Our state management needs are straightforward:
   - Auth state (user session)
   - Profile data (user health information)
   - Workout plans (current active plan)
   - Activity logs (workout history)
3. **Type Safety**: Works seamlessly with TypeScript without additional setup
4. **Learning Curve**: Lower barrier to entry for team members familiar with React
5. **Bundle Size**: No additional library weight

### Alternatives Considered:

- **Redux Toolkit**: Powerful but overkill for our current complexity level
- **Zustand**: Lighter than Redux but still external dependency
- **TanStack Query**: Installed for future data fetching layer, complements Context API

## Consequences

### Positive:
- Simpler codebase with fewer dependencies
- Direct integration with React lifecycle
- Easy to test with React Testing Library
- Natural separation by domain (auth, profile, workout, activity)

### Negative:
- No built-in DevTools (mitigated by React DevTools)
- Manual optimization needed for re-render performance
- No time-travel debugging
- May need refactoring if app complexity grows significantly

## Implementation

Created separate context providers for each domain:
- `AuthContext`: User authentication and session
- `ProfileContext`: User health profile
- `WorkoutContext`: Workout plan management
- `ActivityContext`: Activity log tracking

Each context includes:
- State management
- API calls to Firestore
- Error handling
- Loading states

## Future Considerations

If application grows to require:
- Complex state transitions
- Extensive undo/redo functionality
- Advanced debugging needs
- Multi-tab synchronization

Then migration to Redux or Zustand should be reconsidered.

## References

- [React Context API Documentation](https://react.dev/reference/react/createContext)
- apps/web/src/context/auth-context.tsx
- apps/web/src/context/profile-context.tsx
- apps/web/src/context/workout-context.tsx
- apps/web/src/context/activity-context.tsx

