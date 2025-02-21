# API Service Layer Design Document

## 1. Introduction

This document outlines the design for the API service layer for the Kubernetes Automation Agent UI. The API leverages Next.js server-side rendering and data access patterns, and uses Prisma as the ORM for interfacing with a SQLite database. The current UI services (located in `/lib/services`) serve as the basis for the anticipated service layer architecture.

## 2. Architecture Overview

- **Framework & Patterns:**

  - Next.js with server-side rendering (SSR) and data fetching using either `getServerSideProps` (for pages) or server components (in the App Router).
  - Service layer functions are imported directly into server-side contexts, avoiding the need for a separate REST API initially.
  - React hooks for client-side data fetching and state management.

- **ORM & Database:**
  - **Prisma ORM** for type-safe database operations and schema management.
  - **SQLite Database** for local development and testing, stored in `.data` directory.
  - Migrations handled through Prisma Migrate.

## 3. Service Layer Implementation

### Structure

The service layer is organized into domain-specific modules:

```typescript
/lib/services/
  ├── prisma.ts          # Shared Prisma client instance
  ├── kubernetesService.ts  # Kubernetes cluster management
  ├── gitService.ts      # Git repository and manifest management
  ├── agentService.ts    # AI agent message handling
  └── index.ts          # Service exports and singleton instances
```

### Error Handling

Custom error classes for different scenarios:

```typescript
- ServiceError: Base error class
- ValidationError: Input validation errors (400)
- NotFoundError: Resource not found (404)
- DatabaseError: Database operation errors (500)
```

### Logging

Centralized logging system with:

- Multiple log levels (debug, info, warn, error)
- Structured logging with contexts
- Development/production mode support
- Stack trace preservation
- Extensible for external logging services

## 4. API Routes

### Kubernetes Clusters

- `GET /api/clusters` - List all clusters
- `POST /api/clusters` - Create a new cluster

### Git Repositories

- `GET /api/repositories` - List all repositories
- `POST /api/repositories` - Create a new repository

### Chat Messages

- `GET /api/chat` - Get message history
- `POST /api/chat` - Send a new message

## 5. React Hooks

### Available Hooks

```typescript
// Kubernetes cluster management
const { clusters, isLoading, error, createCluster, refreshClusters } =
  useClusters();

// Git repository management
const { repositories, isLoading, error, createRepository } = useRepositories();

// Chat functionality
const { messages, isLoading, error, sendMessage } = useChat();
```

### Features

- Automatic data fetching
- Loading states
- Error handling
- Real-time state updates
- Type-safe operations
- JSON field handling

## 6. Testing

### Test Structure

```typescript
/tests/
  ├── setup.ts           # Test environment setup
  ├── helpers/
  │   └── prisma.mock.ts # Prisma mocking utilities
  ├── services/
  │   └── kubernetesService.test.ts
  └── hooks/
      └── useClusters.test.tsx
```

### Testing Tools

- Vitest for test runner
- React Testing Library for hook testing
- JSDOM for browser environment
- Coverage reporting with v8

## 7. Development Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up the database:

   ```bash
   mkdir -p .data
   npx prisma generate
   npx prisma migrate dev
   ```

3. Run tests:
   ```bash
   npm test              # Watch mode
   npm run test:coverage # Coverage report
   npm run test:ui       # UI mode
   ```

## 8. Best Practices

1. **Error Handling:**

   - Use custom error classes
   - Include context in error messages
   - Log errors with appropriate levels
   - Return user-friendly error responses

2. **Data Validation:**

   - Validate inputs at service level
   - Use TypeScript types for compile-time checks
   - Handle edge cases explicitly

3. **Testing:**

   - Write unit tests for services
   - Write integration tests for hooks
   - Mock external dependencies
   - Maintain high test coverage

4. **State Management:**
   - Use React hooks for data fetching
   - Handle loading and error states
   - Implement optimistic updates
   - Cache data appropriately

## 9. Future Considerations

1. **Performance:**

   - Implement caching layer
   - Add request batching
   - Optimize database queries

2. **Scalability:**

   - Consider migration to PostgreSQL for production
   - Add connection pooling
   - Implement rate limiting

3. **Security:**

   - Add authentication/authorization
   - Implement input sanitization
   - Add request validation middleware

4. **Monitoring:**
   - Integrate with external logging service
   - Add performance monitoring
   - Set up error tracking

## 10. Conclusion

This implementation provides a solid foundation for the API service layer, with:

- Type-safe database operations
- Comprehensive error handling
- Extensive test coverage
- Clean and maintainable code structure

The service layer can be extended as needed while maintaining the established patterns and practices.
