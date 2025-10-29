# ADR-003: Monorepo Structure with Turborepo

**Status:** Accepted  
**Date:** 2024-01-10  
**Deciders:** Development Team  
**Context:** Project Structure & Build System

## Context

The Healthily Fit project requires:
- Frontend web application
- Shared code (Zod schemas, utilities)
- Potential for future backend/mobile apps
- Efficient build and test workflows

We need to decide on repository structure and build orchestration.

## Decision

Implement a monorepo using PNPM workspaces with Turborepo for build orchestration.

## Rationale

### Monorepo Benefits:

1. **Code Sharing**: Share Zod schemas between frontend and future backend
2. **Atomic Changes**: Update schemas and consumers in single PR
3. **Consistent Dependencies**: Single version of libraries across workspace
4. **Simplified CI/CD**: One pipeline for all packages
5. **Type Safety**: End-to-end TypeScript across packages

### Why Turborepo:

1. **Incremental Builds**: Only rebuild changed packages
2. **Remote Caching**: Share build artifacts across team and CI
3. **Parallel Execution**: Run tasks concurrently where possible
4. **Simple Configuration**: Declarative pipeline in `turbo.json`
5. **Framework Agnostic**: Works with any JS/TS framework

### Why PNPM:

1. **Disk Efficiency**: Content-addressable storage saves space
2. **Speed**: Faster installs than npm/yarn
3. **Strict**: Prevents phantom dependencies
4. **Monorepo Native**: Built-in workspace support

## Repository Structure

```
healthily-fit/
├── apps/
│   └── web/              # React frontend (Vite)
├── packages/
│   ├── shared/           # Zod schemas, utilities
│   └── seeding/          # Database seeding scripts
├── docs/                 # Documentation
├── turbo.json           # Turborepo configuration
├── pnpm-workspace.yaml  # PNPM workspace config
└── package.json         # Root package scripts
```

## Build Pipeline

Defined in `turbo.json`:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "storybook-static/**"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "lint": {},
    "typecheck": {}
  }
}
```

### Execution Flow:
1. `pnpm build` in root
2. Turbo determines dependency graph
3. Builds `packages/shared` first
4. Builds `apps/web` (depends on shared)
5. Caches outputs for future runs

## Consequences

### Positive:
- Shared code managed in `@healthily-fit/shared` package
- Type-safe imports across workspace
- Fast CI with Turbo caching
- Easy to add new apps (mobile, admin dashboard)
- Consistent tooling (ESLint, Prettier, TypeScript)

### Negative:
- Initial setup complexity
- All developers must use PNPM (not npm/yarn)
- Turbo learning curve for new contributors
- Must manage workspace dependencies carefully

### Performance Gains:
- **Local builds**: ~60% faster with Turbo cache
- **CI builds**: ~70% faster with remote cache
- **Install time**: ~40% faster with PNPM vs npm

## Alternative Considered

### Separate Repositories:
**Pros:**
- Simpler individual setup
- Independent versioning
- Smaller codebases

**Cons:**
- Code duplication
- Complex version synchronization
- Multiple CI pipelines
- Breaking changes harder to manage

**Decision:** Monorepo provides more value for coordinated development

### Nx Instead of Turborepo:
**Pros:**
- More features (generators, migrations)
- Better IDE integration
- Advanced dependency graph

**Cons:**
- Heavier, more opinionated
- Steeper learning curve
- More configuration required

**Decision:** Turborepo's simplicity fits our current needs

## Implementation Details

### Workspace Configuration (`pnpm-workspace.yaml`):
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Shared Package Setup:
- Published as `@healthily-fit/shared`
- Contains Zod schemas, TypeScript types, utilities
- Consumed by all apps with `workspace:*` protocol

### CI Integration:
- GitHub Actions uses Turbo cache
- Remote cache for faster builds
- Parallel test execution across packages

## Future Considerations

As the project grows:
1. **Add More Apps**: Mobile (React Native), Admin Dashboard
2. **Backend Package**: When Cloud Functions are needed
3. **UI Package**: Extract reusable components
4. **E2E Package**: Shared test utilities

## References

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [PNPM Workspaces](https://pnpm.io/workspaces)
- turbo.json
- pnpm-workspace.yaml
- packages/shared/package.json

