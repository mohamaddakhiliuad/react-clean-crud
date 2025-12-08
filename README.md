# React Clean CRUD – Professional Architecture Demo

A production-style **Clean CRUD Architecture** built with **React**, **TypeScript**, **TanStack Query**, **Feature‑Based Structure**, **Atomic Components**, and **JWT Authentication**.

This repository showcases how an experienced front-end engineer structures **real-world scalable applications**: clean separation of concerns, reusable UI patterns, and architecture that grows with the project.

---

## ⭐ About This Project
This project is designed to demonstrate **professional-grade front-end architecture** suitable for SaaS dashboards, admin panels, internal tools, and enterprise systems.

It focuses on:
- 🧱 **Clean Architecture & Modular Structure**
- ⚛️ **Modern React Patterns (Hooks, Composition, Feature Modules)**
- 🔄 **Server-State Management via TanStack Query**
- 🔐 **JWT Authentication + Protected Routes**
- 🎨 **Reusable UI + Centralized Theme Tokens**
- 🧩 **Atomic Design System**
- 🗂 **Highly Scalable Folder Structure**
- 🚀 **Optimized Developer Experience (DX)**

This is not just a demo—it's a **template-level architecture** for building real, maintainable, scalable applications.

---

## 📁 Folder Structure (Feature-Based Architecture)

> **Note:** This repository currently includes a fully implemented `profile` feature as a complete demonstration of the architecture.  
> Additional features (such as `users`, `auth`, and `settings`) follow the exact same scalable structure and can be added easily.

Below is the clean and scalable folder structure implemented in this project: (Feature-Based Architecture)
Below is the clean and scalable folder structure implemented in this project:
ش/
 ├─ features/
 │   ├─ users/
 │   │    ├─ api/
 │   │    ├─ components/
 │   │    ├─ hooks/
 │   │    ├─ pages/
 │   │    ├─ types/
 │   │    └─ index.ts
 │   │
 │   └─ auth/
 │        ├─ api/
 │        ├─ hooks/
 │        ├─ components/
 │        ├─ types/
 │        └─ index.ts
 │
 ├─ components/
 │   ├─ ui/            # Atom components (Input, Button, Spinner)
 │   ├─ layout/        # FormWrapper, PageWrapper
 │   └─ feedback/      # Error states, loaders
 │
 ├─ hooks/             # Reusable logic: debounce, pagination
 │
 ├─ lib/
 │   ├─ axios.ts       # Configured axios + JWT interceptor
 │   ├─ queryClient.ts # TanStack Query setup
 │   └─ helpers.ts
 │
 ├─ styles/
 │   ├─ theme.ts       # Design tokens (colors, radius, spacing)
 │   └─ formStyles.ts  # Centralized form styles
 │
 ├─ router/
 │   ├─ index.tsx
 │   └─ ProtectedRoute.tsx
 │
 ├─ App.tsx
 └─ main.tsx
```

---

## 🔐 Authentication Layer (JWT + Protected Routes)
This demo includes a real-world authentication pattern:

- Login API returns a **JWT token**
- Token stored in **localStorage**
- Axios interceptor attaches token to requests
- ProtectedRoute component restricts access
- Logout clears token & resets app state

This pattern mirrors **enterprise SPA authentication workflows**.

---

## 🎨 Design System & Reusable UI
This project uses a lightweight but powerful atomic UI system:

- **Atoms** → Input, Button, Label, Spinner
- **Molecules** → SearchBar, Pagination, UserCard
- **Organisms** → UserForm, UserList
- **Layouts** → FormWrapper, PageWrapper

All styles come from **centralized design tokens** for maintainability.

---

## 🔄 Data Layer: TanStack Query
TanStack Query provides:
- Caching
- Automatic refetch
- Background updates
- Mutation management
- Optimistic UI options

Custom hooks:
- `useUsers()`
- `useCreateUser()`
- `useUpdateUser()`
- `useDeleteUser()`

This ensures clean and predictable server-state handling.

---

## 🧩 Key Features
- Fully modular **feature-based architecture**
- Clean, typed CRUD flows
- JWT authentication integration
- Reusable UI components
- Debounce hook for search
- Pagination hook
- Centralized theme system
- Layered responsibility separation

---

## 🔍 Keywords 
- React Clean Architecture
- React CRUD Template
- Feature-Based Architecture React
- React TypeScript Starter
- TanStack Query CRUD
- React Admin Panel Starter
- JWT React Authentication
- Scalable React Architecture
- Professional React Boilerplate
- Enterprise Front-End Architecture

These keywords help this repository appear in tech searches and recruiter indexing.

---

## 🎯 Ideal Use Cases
This architecture is ideal for:
- SaaS applications
- Admin dashboards
- Internal tools
- CRUD-based systems
- React interview preparation
- Enterprise-grade front-end development

---

## 📌 Author
Built by **Mohammad Dakhilitarghi** – Senior Full-Stack Engineer (React / .NET / FastAPI / AI Integrations)

If you are a recruiter or client reviewing this repository:  
This project is intentionally designed to demonstrate **clean thinking, modular design, and real-world engineering practices**.

---

## 📄 License
MIT – Free to use and adapt.

