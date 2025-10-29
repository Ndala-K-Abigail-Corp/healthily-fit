# ADR-002: Client-Side Firestore Operations Over Cloud Functions

**Status:** Accepted  
**Date:** 2024-01-15  
**Deciders:** Development Team  
**Context:** Backend Architecture

## Context

We need to determine how the frontend will interact with Firebase Firestore for data persistence. Options include:
1. Direct client-side Firestore SDK calls
2. Firebase Cloud Functions with tRPC/HTTP API layer
3. Hybrid approach

## Decision

We will use direct client-side Firestore SDK calls with comprehensive security rules, reserving Cloud Functions for future complex operations.

## Rationale

### Reasons for Client-Side Approach:

1. **Simplicity**: Direct SDK calls eliminate the need for an intermediate API layer
2. **Real-time Updates**: Firestore's onSnapshot provides automatic real-time data synchronization
3. **Offline Support**: Built-in offline persistence without additional implementation
4. **Cost Efficiency**: Fewer Cloud Function invocations = lower Firebase costs
5. **Type Safety**: Firestore SDK integrates well with TypeScript and Zod schemas
6. **Development Speed**: Faster iteration without managing API endpoints

### Security Model:

- **Firestore Security Rules** enforce all access control:
  - Users can only read/write their own data (`userId` matching)
  - Least-privilege access model
  - Rules tested in Firebase emulator during development
  
```javascript
// Example from firestore.rules
match /workoutPlans/{planId} {
  allow read: if resource.data.userId == request.auth.uid;
  allow create: if request.resource.data.userId == request.auth.uid;
}
```

### Validation Strategy:

- **Client-side**: Zod schemas validate all inputs before submission
- **Firestore Rules**: Additional validation layer prevents malformed data
- **Shared Package**: `@healthily-fit/shared` contains schemas used by both client and future backend

## Alternatives Considered

### Cloud Functions + tRPC:
**Pros:**
- Server-side validation
- Complex business logic centralization
- Rate limiting at function level

**Cons:**
- Additional latency for every operation
- Higher Firebase costs
- More complex deployment pipeline
- Loss of real-time updates without additional setup

**Decision:** Reserve for future use when needed (e.g., workout generation algorithm, email notifications)

### Hybrid Approach:
**Pros:**
- Best of both worlds
- Gradual migration path

**Cons:**
- Inconsistent patterns
- More complexity to maintain

## Consequences

### Positive:
- Faster development velocity
- Real-time data synchronization
- Lower operational costs
- Offline-first capabilities
- Simpler architecture

### Negative:
- Limited server-side business logic
- Client bundle includes Firestore SDK (~100KB)
- No centralized rate limiting
- Workout generation algorithm runs client-side (could be inconsistent across devices)

### Mitigations:
- Comprehensive Firestore security rules prevent abuse
- Zod validation ensures data integrity
- Future migration path to Cloud Functions available when needed

## Implementation

### Current Architecture:
```
Client (React) → Firestore SDK → Firestore Database
                    ↓
              Security Rules (enforcement)
                    ↓
              Zod Schemas (validation)
```

### File Structure:
- `apps/web/src/lib/firestore.ts`: Firestore operations (CRUD)
- `firestore.rules`: Security rules
- `packages/shared/src/schemas/`: Zod validation schemas

## Future Considerations

Migrate to Cloud Functions when:
1. **Workout Generation**: Algorithm needs to run server-side for consistency
2. **Email Notifications**: Scheduled reminders, progress reports
3. **Analytics**: Aggregate statistics across users
4. **Rate Limiting**: Need centralized throttling
5. **Third-party Integrations**: Wearable devices, nutrition APIs

## References

- [Firestore Security Rules Best Practices](https://firebase.google.com/docs/firestore/security/rules-structure)
- firestore.rules
- apps/web/src/lib/firestore.ts
- packages/shared/src/schemas/

