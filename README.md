# React Clean CRUD – Professional Architecture Demo

A production-style **Clean CRUD Architecture** demo built with **React**, **TypeScript**, **TanStack Query**, **Feature-Based Structure**, **Atomic Components**, and **JWT Authentication**.

This repository demonstrates a practical approach to structuring scalable front-end applications through separation of concerns, reusable UI components, and modular features.

---

## About This Project

This project demonstrates front-end architecture patterns suitable for SaaS dashboards, admin panels, internal tools, and enterprise applications.

It focuses on:

- **Clean Architecture & Modular Structure**
- **Modern React Patterns** — hooks, composition, and feature modules
- **Server-State Management** with TanStack Query
- **JWT Authentication & Protected Routes**
- **Reusable UI & Centralized Theme Tokens**
- **Atomic Design Principles**
- **Scalable Folder Organization**
- **Developer Experience & Maintainability**

---

## Folder Structure

> The `profile` feature is the implemented reference for this architecture.
> Additional features, such as `users` and `settings`, can follow the same structure.

The following tree illustrates the feature-based organization:

```text
src/
├── features/
│   └── profile/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── types/
│       └── index.ts
│
├── components/
│   ├── ui/                 # Shared primitives: Input, Button, Spinner
│   ├── layout/             # FormWrapper, PageWrapper
│   └── feedback/           # Error states and loaders
│
├── hooks/                  # Shared hooks: debounce, pagination
│
├── lib/
│   ├── axios.ts            # Axios configuration and JWT interceptor
│   ├── queryClient.ts      # TanStack Query configuration
│   └── helpers.ts
│
├── styles/
│   ├── theme.ts            # Design tokens: colors, radius, spacing
│   └── formStyles.ts       # Shared form styles
│
├── router/
│   ├── index.tsx
│   └── ProtectedRoute.tsx
│
├── App.tsx
└── main.tsx
```

### Organization Principles

- **Features** own their API calls, components, hooks, pages, and types.
- **Shared components** provide reusable UI across features.
- **Shared hooks** contain reusable behavior.
- **Library configuration** centralizes HTTP and query-client setup.
- **Styles** define shared design tokens and styling patterns.
- **Routing** manages navigation and protected pages.

---

## Authentication Layer

The demo uses a JWT-based authentication flow:

1. The login API returns a JWT.
2. The application stores the token in `localStorage`.
3. An Axios interceptor attaches the token to API requests.
4. `ProtectedRoute` restricts navigation to authenticated pages.
5. Logout removes the token and resets authentication state.

> Token storage is a demo implementation choice. Production applications should evaluate storage and session handling against their security requirements. API endpoints must enforce authentication and authorization independently of client-side route protection.

---

## Design System & Reusable UI

The UI follows atomic design principles:

| Level | Responsibility | Example Components |
| --- | --- | --- |
| Atoms | Basic UI elements | Input, Button, Label, Spinner |
| Molecules | Small combinations of UI elements | SearchBar, Pagination |
| Organisms | Feature-level UI compositions | Forms, Lists |
| Layouts | Shared page and form structure | FormWrapper, PageWrapper |

Centralized design tokens keep colors, spacing, and border radii consistent.

---

## Data Layer: TanStack Query

TanStack Query manages server state through:

- Query caching
- Configurable refetching
- Background updates
- Mutation lifecycle management
- Cache invalidation
- Support for optimistic updates

Feature-specific hooks encapsulate query and mutation logic, keeping API concerns separate from presentation.

For example, a future `users` feature could expose:

```typescript
useUsers()
useCreateUser()
useUpdateUser()
useDeleteUser()
```

---

## Architecture Highlights

- Modular, feature-based organization
- Typed API boundaries and CRUD flows
- JWT authentication integration
- Protected routes
- Reusable UI components
- Shared debounce and pagination hooks
- Centralized theme tokens
- Separation between API access, server state, and presentation

---

## Ideal Use Cases

- SaaS applications
- Admin dashboards
- Internal tools
- CRUD-based systems
- React architecture and interview preparation
- Starting points for larger front-end applications

---

## Topics

- React Clean Architecture
- React CRUD Template
- Feature-Based React Architecture
- React TypeScript Starter
- TanStack Query CRUD
- React Admin Panel
- JWT Authentication
- Scalable Front-End Architecture

---

## Author

**Mohammad Dakhilitarghi**  
Senior Full-Stack Engineer | React · .NET · FastAPI · AI Integrations

This project demonstrates modular design, clear responsibility boundaries, and practical engineering patterns.

---

## License

MIT — Free to use and adapt.
