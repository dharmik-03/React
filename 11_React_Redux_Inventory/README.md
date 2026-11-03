# React Learning Repository

This repository is a practical React training project that covers the fundamentals of React development through multiple mini applications and learning exercises. Each folder is an independent project or practice module designed to understand a specific React concept, UI pattern, or state-management approach.

The repository includes:

- JavaScript/React basics and array practice
- Component building and JSX fundamentals
- State and hooks
- Side effects and refs
- Events and forms
- CSS in React
- CRUD todo application
- Routing and nested layouts
- Student management system
- Context API for app-wide state
- Redux Toolkit inventory management

## Repository Structure

```text
React/
├── 01_Array-Practice/
├── 02_intro/
├── 03_state_and_hooks/
├── 04_useEffect_UseRef_hook/
├── 05_Events_And_Forms/
├── 06_CSS_styling_in_react/
├── 07_ToDo_react/
├── 08_React-Router/
├── 09_Student_Management_System/
├── 10_Context_API_expense/
├── 11_React_Redux_Inventory/
├── SMS-practice/
└── README.md
```

## Learning Modules Overview

### 01_Array-Practice
A JavaScript array fundamentals folder with multiple array exercises such as:

- literal arrays
- constructor arrays
- array creation patterns
- basic array operations
- practical JavaScript array logic

This module is a warm-up for understanding JavaScript data structures before moving into React state and component logic.

### 02_intro
The starting React + Vite app that introduces the project setup and the basic React development workflow using Vite.

Focus areas:

- React app bootstrapping
- Vite project structure
- JSX and React rendering basics
- ESLint configuration

### 03_state_and_hooks
Covers state management using React hooks, especially `useState`.

Focus areas:

- local component state
- re-rendering patterns
- event-driven updates
- simple hook-based UI behaviour

### 04_useEffect_UseRef_hook
Focuses on lifecycle-inspired logic and DOM reference handling.

Focus areas:

- `useEffect` for side effects
- data fetching and async behaviour
- `useRef` for preserving values and DOM access
- cleanup patterns

This module also includes `axios` usage, which is common for fetching external data in React apps.

### 05_Events_And_Forms
Introduces user interaction through events and form handling.

Focus areas:

- click and input events
- controlled inputs
- form submission workflows
- live UI updates from user actions

### 06_CSS_styling_in_react
Explores styling in React applications.

Focus areas:

- component-scoped styling
- CSS integration in React
- layout styling
- reusable design patterns

### 07_ToDo_react
A complete to-do application built with React state management.

Features:

- add tasks
- edit tasks
- toggle completion status
- delete tasks
- track task list updates in state

This is a strong example of a CRUD-style React app built using local component state.

### 08_React-Router
Introduces client-side routing with `react-router-dom`.

Focus areas:

- route definitions
- nested layouts
- lazy-loaded components
- route parameters and navigation
- error pages and loading fallbacks

### 09_Student_Management_System
A more advanced front-end project for managing student records.

Features likely present in this project:

- student listing
- add/edit student forms
- student detail/profile view
- route-based navigation
- validation logic
- data persistence patterns
- theme support
- CSV export utilities
- reusable UI components

This project is a realistic example of a production-style dashboard application.

### 10_Context_API_expense
An expense tracker built with React Context API to manage shared state at the app level.

Focus areas:

- Context provider pattern
- global app state
- expense addition and tracking
- statistics / summary views
- decoupling logic from component nesting

### 11_React_Redux_Inventory
A product/inventory management application using Redux Toolkit.

Focus areas:

- Redux state slices
- actions and reducers
- product add/edit/delete flows
- filtering and sorting
- centralized app-wide data management

This is a good example of moving from local component state to global application state.

### SMS-practice
A smaller practice project focused on Student Management System patterns and routing.

It demonstrates how route-based pages can be structured around a student dashboard and form flow.

## Technologies Used

This repository primarily uses:

- React
- Vite
- JavaScript
- JSX
- Bootstrap
- Axios
- React Router
- Redux Toolkit
- Formik
- Yup
- ESLint

## Project Learning Flow

The general progression of this learning repo is:

1. JavaScript fundamentals and arrays
2. React app setup and component basics
3. State and hooks
4. Side effects and refs
5. Events and forms
6. Styling and UI polish
7. Todo app CRUD implementation
8. Routing and navigation
9. Realistic data-driven app architecture
10. Global state with Context API
11. Global state with Redux Toolkit

## How to Run a Project

Each sub-project is an independent Vite app. To run any project:

```bash
cd <project-folder>
npm install
npm run dev
```

Example:

```bash
cd 07_ToDo_react
npm install
npm run dev
```

For the plain JavaScript folder (`01_Array-Practice`), you can run the JavaScript files directly with Node:

```bash
node 1-array.js
```

## Common Development Notes

- Most modules are created with Vite and use the same starter structure:
  - `public/`
  - `src/`
  - `index.html`
  - `vite.config.js`
  - `package.json`
- The applications are designed for learning, experimentation, and UI logic practice.
- The repository is not a single production app; it is a collection of focused mini-projects that build up React skills step by step.

## Recommended Order to Explore

If you are following the learning path in order, start here:

1. `01_Array-Practice`
2. `02_intro`
3. `03_state_and_hooks`
4. `04_useEffect_UseRef_hook`
5. `05_Events_And_Forms`
6. `06_CSS_styling_in_react`
7. `07_ToDo_react`
8. `08_React-Router`
9. `09_Student_Management_System`
10. `10_Context_API_expense`
11. `11_React_Redux_Inventory`

## Summary

This project is a complete React learning journey from beginner concepts to state-management and routing patterns. It offers a practical path for understanding how React applications are structured, how state flows through components, and how more advanced app architecture is handled in real-world frontend development.

## Next Step

To dive deeper, open any of the individual project folders and run them locally. Each one is designed to reinforce a specific React concept with a hands-on, working example.
