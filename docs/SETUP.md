# Developer Setup Guide

This guide will help you set up the development environment for the Kubernetes Automation Agent UI.

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- Git

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   ```bash
   # Create the data directory
   mkdir -p .data

   # Generate Prisma client
   npx prisma generate

   # Create and apply migrations
   npx prisma migrate dev
   ```

## Development

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Run tests:

   ```bash
   # Run tests in watch mode
   npm test

   # Run tests with coverage report
   npm run test:coverage

   # Run tests with UI
   npm run test:ui
   ```

3. Lint code:
   ```bash
   npm run lint
   ```

## Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── page.tsx           # Main page
├── components/            # React components
├── lib/
│   ├── services/         # Service layer
│   ├── hooks/            # React hooks
│   └── utils/            # Utilities
├── tests/                # Test files
├── docs/                 # Documentation
└── prisma/               # Database schema and migrations
```

## Service Layer

The application uses a service-based architecture with:

1. **Database Services:**

   - `KubernetesService`: Manage Kubernetes clusters
   - `GitService`: Handle Git repositories and manifests
   - `AgentService`: Process chat messages

2. **React Hooks:**
   - `useClusters`: Kubernetes cluster management
   - `useRepositories`: Git repository management
   - `useChat`: Chat functionality

## Error Handling

The application uses custom error classes:

```typescript
- ValidationError: For invalid input (400)
- NotFoundError: For missing resources (404)
- DatabaseError: For database issues (500)
```

## Logging

Logging is available through the `logger` utility:

```typescript
import { logger } from "@/lib/utils/logger";

logger.debug("Debug message", { context: "value" });
logger.info("Info message");
logger.warn("Warning message");
logger.error("Error message", error, { context: "value" });
```

## Testing

1. **Unit Tests:**

   - Test individual services and utilities
   - Located in `tests/services/`
   - Use Prisma mocks for database operations

2. **Integration Tests:**

   - Test React hooks and components
   - Located in `tests/hooks/`
   - Use JSDOM environment

3. **Test Utilities:**
   - Prisma mocking in `tests/helpers/prisma.mock.ts`
   - React Testing Library setup in `tests/setup.ts`

## Common Tasks

1. **Adding a New Service:**

   - Create service file in `lib/services/`
   - Add tests in `tests/services/`
   - Export from `lib/services/index.ts`

2. **Creating a New API Route:**

   - Add route handler in `app/api/`
   - Use service layer for data operations
   - Add error handling and logging

3. **Adding a New React Hook:**

   - Create hook in `lib/hooks/`
   - Add tests in `tests/hooks/`
   - Export from `lib/hooks/index.ts`

4. **Database Schema Changes:**
   ```bash
   # Edit prisma/schema.prisma
   npx prisma migrate dev --name <migration-name>
   ```

## Troubleshooting

1. **Database Issues:**

   - Check `.env` for correct database URL
   - Ensure `.data` directory exists
   - Run `npx prisma migrate reset` to reset database

2. **Test Issues:**

   - Run `npm run test:ui` for detailed test view
   - Check mock setup in failing tests
   - Verify JSDOM environment for component tests

3. **Build Issues:**
   - Clear `.next` directory
   - Run `npm clean-install`
   - Check TypeScript errors with `tsc --noEmit`

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Vitest Documentation](https://vitest.dev/guide)
