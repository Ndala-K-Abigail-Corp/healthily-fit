# Contributing to Healthily Fit

Thank you for your interest in contributing to Healthily Fit! This document provides guidelines and instructions for contributing to this project.

## 🌟 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct.

## 🚀 Getting Started

1. **Fork the repository** and clone it locally
2. **Install dependencies** with `pnpm install`
3. **Create a branch** for your feature or bug fix
4. **Make your changes** following our coding standards
5. **Test your changes** thoroughly
6. **Submit a pull request**

## 🧪 Test-Driven Development (TDD)

This project follows strict TDD methodology:

### The TDD Cycle

1. **Red** - Write a failing test first
2. **Green** - Write minimal code to make the test pass
3. **Refactor** - Improve the code while keeping tests green

### Writing Tests

- **Unit tests** for utilities, schemas, and pure functions
- **Component tests** for React components
- **Integration tests** for API interactions
- **E2E tests** for critical user journeys

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e
```

## 📝 Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Code style changes (formatting, missing semi-colons, etc)
- `refactor:` - Code refactoring (no feature change or bug fix)
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks (dependency updates, build config, etc)
- `perf:` - Performance improvements
- `ci:` - CI/CD configuration changes

### Examples

```bash
feat: add workout plan generation algorithm
fix: resolve BMI calculation rounding error
docs: update API documentation for profile endpoints
test: add E2E test for authentication flow
```

## 🎨 Code Style

### TypeScript

- Use **strict mode** - all TypeScript strict flags enabled
- **No `any` types** - use proper typing or `unknown`
- **Prefer interfaces** for public APIs, types for internal use
- **Use Zod schemas** for runtime validation

### React

- Use **functional components** with hooks
- **Colocate tests** with components
- **Use proper semantic HTML**
- Follow **accessibility best practices** (WCAG AA)

### Styling

- Use **Tailwind CSS** utilities
- Reference **design tokens** from `docs/design-tokens.json`
- Follow **mobile-first** responsive design
- Maintain **consistent spacing** using token values

### File Naming

- **Components**: `PascalCase.tsx` (e.g., `LoginForm.tsx`)
- **Hooks**: `camelCase.ts` starting with `use` (e.g., `useAuth.ts`)
- **Utilities**: `kebab-case.ts` (e.g., `bmi-calculator.ts`)
- **Tests**: Same as source file with `.test.tsx` or `.spec.ts` suffix

## 📦 Project Structure

```
apps/web/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   ├── auth/         # Authentication components
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities
│   ├── pages/            # Page components
│   └── styles/           # Global styles
├── e2e/                  # Playwright tests
└── public/               # Static assets

packages/shared/
├── src/
│   ├── schemas/          # Zod schemas
│   └── utils/            # Shared utilities
└── __tests__/            # Unit tests
```

## 🔍 Code Review Process

1. All PRs require at least one approval
2. CI/CD pipeline must pass
3. Code coverage must not decrease
4. Follow the PR template
5. Address review feedback promptly

## 🐛 Reporting Bugs

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment** (browser, OS, etc.)

## 💡 Feature Requests

When requesting features:

- **Describe the problem** you're trying to solve
- **Explain your proposed solution**
- **Consider alternative solutions**
- **Provide use cases**

## 📚 Documentation

- Update documentation for any new features
- Add JSDoc comments for public APIs
- Update README.md if adding major features
- Create ADRs (Architecture Decision Records) for significant changes

## ✅ Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows the style guidelines
- [ ] Tests have been added/updated (TDD approach)
- [ ] All tests pass locally
- [ ] Documentation has been updated
- [ ] Commit messages follow convention
- [ ] No linting errors
- [ ] Code has been self-reviewed
- [ ] Changes have been tested in multiple browsers

## 🙏 Questions?

Feel free to:
- Open an issue for questions
- Join our Discord community
- Email maintainers

Thank you for contributing to Healthily Fit! 🎉


