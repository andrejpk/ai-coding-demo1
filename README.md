# ai-coding-demo1

## Overview

The ai-coding project is a comprehensive application designed to automate Kubernetes DevOps tasks through an intuitive user interface. The system features a split navigation UI, with a file or cluster explorer on the left, a central area for managing clusters or source files, and a change window on the right for interacting with the LLM/AI agent. This design facilitates efficient and modern DevOps workflows, catering to developers who prefer a sleek and dark mode interface. The project has evolved to prioritize clarity, documentation, and developer productivity, aligning with the high-level vision of streamlining Kubernetes operations.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## Project Structure & Key Directories

- **/app**

  - Contains the core application pages (e.g. app/page.tsx) and components.

- **/docs**

  - Contains essential project documentation:
    - **TODO-API.md:** List of API improvements and ideas.
    - **SETUP.md:** Detailed setup instructions and guidelines for environment configuration.
    - **api-design.md:** Overview of API design decisions.
    - **project-vision.md:** High-level vision and roadmap for the project.

- **Other Files & Directories**
  - Configuration files such as `next.config.ts` and `package.json` reside at the project root.

## Major Libraries & Tools

- **Next.js:** A powerful React framework providing routing, SSR, and more.
- **React:** The underlying library for building UI components.
- **Tailwind CSS:** A utility-first CSS framework to rapidly build custom designs.
- **ESLint:** Ensures code quality by enforcing consistent coding standards.
- **Prisma:** (If applicable) Provides a robust ORM layer for database interactions.
- **Vitest & Testing Library:** For efficient unit and component testing.
- **@heroicons/react:** Offers a collection of modern SVG icons for UI enhancement.
- **@monaco-editor/react:** Embeds the Monaco code editor, useful for in-app code editing features.

## Configuration & Patterns

- The `next.config.ts` is kept minimal to maintain a lean configuration setup.
- The project adheres to modern React and Next.js best practices emphasizing simplicity and performance.
- Developer experience is enhanced by fast refresh, integrated linting, and clear documentation.

## Development Experience

- **Fast Iteration:** Enjoy the benefits of Next.js's hot reloading which speeds up your development workflow.
- **Robust Documentation:** Comprehensive guidelines and notes are available in the **/docs** folder to help you understand the project's design, setup, and future directions.
- **Quality Assurance:** ESLint and vitest are set up to maintain high code-quality standards and facilitate testing.

For any changes or dependency additions, please refer to the project guidelines before proceeding.

## Deployment

Although the current focus is on development, the project can be deployed following Next.js deployment best practices, for instance on [Vercel](https://vercel.com/).

## Contributing & Next Steps

We welcome contributions! For details on setting up your development environment, please see **SETUP.md** in the **/docs** folder. Also, check **TODO-API.md** and **api-design.md** for insights into potential improvements and areas for contribution.

## License

[Insert license information here]
