# FWD EMS — Frontend Development Instructions

## 1. Project Overview

FWD EMS is an Employee Management System developed for FWD Technologies Inc.

The frontend and backend are maintained in separate repositories. This repository is responsible exclusively for frontend development.

### User Roles

- **Employee:** Attendance, leave requests, cash advances, reimbursements, and personal trend analysis.
- **Admin:** Employee management, request approvals, records, reports, and trend analysis.
- **Super Admin:** Account management and read-only access to reports and trend analysis.

## 2. Technology Stack

Use the technologies already established in this repository.

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: shadcn/ui and Radix UI
- Icons: lucide-react
- Forms: React Hook Form
- Validation: Zod
- Server State: TanStack Query
- Client State: Zustand
- Tables: TanStack Table
- Charts: Recharts
- Notifications: Sonner
- Date Utilities: date-fns
- Package Manager: pnpm

Do not introduce alternative libraries when existing dependencies already provide the required functionality.

Do not upgrade, remove, or replace dependencies without a clear requirement.

## 3. Project Architecture

The project uses a combination of route-level feature organization and shared feature organization.

Understand the ownership of functionality before deciding where new files belong.

### 3.1 Application Routes — `src/app/`

The `app/` directory uses the Next.js App Router and contains route-specific functionality.

Route directories can own their complete feature implementation, not just their `page.tsx` files.

For example:

```text
src/app/(protected)/super-admin/admin-management/
├── page.tsx
├── api/
├── components/
├── hooks/
├── mock-data/
└── types/
```

Follow this structure for route-specific features.

**Directory responsibilities:**

- `page.tsx`: Route entry point and page composition.
- `api/`: API functions used specifically by the route.
- `components/`: UI components used specifically by the route.
- `hooks/`: Hooks used specifically by the route.
- `mock-data/`: Mock data used for development when applicable.
- `types/`: Types specific to the route.

These directories are introduced when needed. Do not create empty or unnecessary folders.

Keep route-specific functionality within its owning route directory unless there is a clear reason for sharing it.

### 3.2 Shared Features — `src/features/`

The `features/` directory contains functionality that is shared across multiple routes or is organized as an independently managed application feature.

Example:

```text
src/features/
├── account-management/
├── auth/
├── dashboard/
├── profile-account/
├── reports/
└── trend-analysis/
```

Feature directories may contain:

- `api/`
- `components/`
- `hooks/`
- `mock-data/`
- `types/`
- `server/`
- `util/`

Use additional directories when justified by the feature's responsibilities.

Do not move route-specific functionality into `src/features/` simply to make the folder structure look uniform.

### 3.3 Application-Wide Components — `src/components/`

Contains reusable components used across different features or routes.

```text
src/components/
├── layout/
├── providers/
├── shared/
├── skeletons/
└── ui/
```

Before creating a reusable component, check whether an existing component already provides the required functionality.

### 3.4 Shared Utilities — `src/lib/`

Contains shared utilities, hooks, types, and UI-related infrastructure.

```text
src/lib/
├── components/
├── hooks/
├── types/
├── ui/
└── util/
```

Avoid placing feature-specific logic here.

### 3.5 Architecture Decision Rules

When deciding where a file belongs:

1. If it belongs exclusively to one route, keep it within that route's directory.
2. If it is shared across multiple routes as a feature, consider `src/features/`.
3. If it is a reusable application-wide UI component, use `src/components/`.
4. If it is a shared utility or infrastructure concern, use `src/lib/`.

Do not reorganize existing files without an explicit requirement or approved architectural change.

## 4. Coding Standards

### General Principles

- Write clean, maintainable, and readable TypeScript.
- Prefer simple solutions over unnecessary abstractions.
- Follow DRY principles without sacrificing readability.
- Use descriptive variable, function, and component names.
- Avoid unnecessary code duplication.
- Avoid overengineering.
- Preserve existing naming conventions and coding patterns.

### Components

- Keep components focused on a clear responsibility.
- Extract reusable components when they provide meaningful value.
- Avoid unnecessarily large components.
- Separate business logic from presentation when appropriate.
- Reuse existing shared components before creating new ones.
- Avoid creating duplicate components that perform essentially the same function.

### TypeScript

- Define explicit types for component props, API responses, and application data.
- Avoid using `any`.
- Do not use type assertions simply to silence TypeScript errors.
- Prefer existing types over creating duplicate definitions.

## 5. UI/UX Guidelines

The system should maintain a consistent, professional, and practical enterprise interface.

### Design Principles

- Prioritize usability and clarity.
- Maintain consistent spacing, typography, sizing, and alignment.
- Follow existing design patterns across modules.
- Avoid unnecessary visual decoration.
- Avoid excessive colors, gradients, shadows, and animations.
- Maintain consistency between light and dark themes.
- Use appropriate loading, empty, success, and error states.
- Ensure responsive layouts.
- Use clear labels and meaningful feedback for user actions.

### UI Components

- Prefer existing shadcn/ui components.
- Check `src/components/ui/` before installing or creating components.
- Use lucide-react for icons.
- Follow existing component variants and styling conventions.
- Do not introduce another icon library.

## 6. State Management

Use the appropriate state management solution based on the type of state.

### Local State

Use React state for component-specific state.

### Server State

Use TanStack Query for backend data fetching, caching, mutations, and query invalidation.

### Shared Client State

Use Zustand when state needs to be shared across components and is not appropriately managed by TanStack Query or local state.

Avoid duplicating server data in Zustand.

Do not introduce global state when local state is sufficient.

## 7. Forms and Validation

Use the established form stack:

- React Hook Form for form state and submission.
- Zod for schema validation.
- @hookform/resolvers for connecting validation schemas.

Requirements:

- Define reusable schemas when appropriate.
- Validate user input.
- Display meaningful validation messages.
- Handle loading and submission states.
- Prevent unintended duplicate submissions.
- Follow existing form component patterns.

## 8. API Integration

The backend is maintained in a separate NestJS repository.

The frontend communicates with the backend through its existing API integration patterns.

### Rules

- Inspect existing API functions before implementing new integrations.
- Keep API request logic separate from presentation components.
- Use existing API types and conventions.
- Handle loading, success, and error responses properly.
- Use TanStack Query for server-state integration.
- Invalidate or update relevant queries after successful mutations.
- Follow established authentication and cookie-handling mechanisms.
- Respect existing environment variable configuration.

### API Contract Integrity

Never invent API endpoints, request payloads, response structures, or backend behavior.

When an API contract is unclear:

1. Inspect existing API integrations.
2. Check existing types and documentation.
3. Identify missing information.
4. Ask for clarification instead of assuming.

Do not modify the separate backend repository.

## 9. Next.js Guidelines

This project uses the Next.js App Router.

- Follow App Router conventions.
- Use Server Components by default.
- Introduce Client Components only when client-side functionality is required.
- Add `"use client"` only when necessary.
- Keep server-only logic out of Client Components.
- Do not use Pages Router conventions.
- Follow Next.js conventions for layouts, loading states, error handling, and route organization.
- Be mindful of server-side rendering, caching, and request boundaries.

Do not change rendering or caching behavior without understanding the existing implementation and its requirements.

## 10. Development Workflow

Before implementing a task:

1. Understand the requested functionality.
2. Inspect relevant files and existing implementations.
3. Review applicable documentation and architectural decisions.
4. Identify affected routes, components, hooks, API functions, and types.
5. Determine whether the proposed change affects other features.
6. Present a short implementation plan for substantial changes.

During implementation:

- Make only the changes necessary for the task.
- Preserve existing architecture and functionality.
- Avoid unrelated refactoring.
- Reuse existing components and utilities.
- Do not silently change established behavior.
- Ask for clarification when requirements are ambiguous.

After implementation:

1. Review modified files.
2. Check for TypeScript errors.
3. Run relevant lint checks.
4. Run a production build when appropriate.
5. Report what was changed.
6. Report remaining issues or unverified behavior.

Never claim that something was tested if it was not actually tested.

## 11. Documentation

The `docs/` directory contains project-specific development documentation.

- `docs/frontend-decisions.md`: Architectural and technical decisions.
- `docs/learnings.md`: Technical learnings and explanations.

Read relevant documentation before making architectural changes.

Treat established decisions as constraints unless the project owner explicitly approves a change.

Do not automatically modify documentation for every code change.

When an implementation introduces a meaningful architectural decision, explain the decision and recommend documenting it.

## 12. Restrictions

- Do not modify backend code.
- Do not restructure the repository without approval.
- Do not install dependencies without a justified need.
- Do not replace existing libraries without approval.
- Do not remove existing functionality to simplify implementation.
- Do not create duplicate components, hooks, or utilities unnecessarily.
- Do not overwrite existing design decisions based solely on personal preference.
- Do not use mock data as a substitute for real API integration unless explicitly requested.
- Do not expose secrets, credentials, or sensitive environment variables.

## 13. General Agent Behavior

Act as a frontend engineer working within an existing production-oriented codebase.

Prioritize correctness, maintainability, consistency, and usability.

Understand the existing implementation before changing it.

Do not assume that a task requires a large refactor.

When there are multiple possible solutions, prefer the simplest approach that aligns with the established architecture.

The project owner makes the final decisions on architecture, design, and implementation scope.
