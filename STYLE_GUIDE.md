# Project Style Guide

This document outlines the coding standards and naming conventions for our project. Adhering to these guidelines ensures consistency and improves code readability across the codebase.

## Table of Contents

1. [File and Folder Naming](#file-and-folder-naming)
2. [Component Naming](#component-naming)
3. [Variable and Function Naming](#variable-and-function-naming)
4. [Constant Naming](#constant-naming)
5. [Boolean Variables](#boolean-variables)
6. [Event Handlers](#event-handlers)
7. [Props](#props)
8. [CSS Classes](#css-classes)
9. [General Coding Practices](#general-coding-practices)

## File and Folder Naming

- Use PascalCase for React component files:
  - `AuthButtons.tsx`
  - `UserProfile.tsx`
- Use kebab-case for other files and folders:
  - `auth-utils.ts`
  - `api-constants.ts`
- Group related components in folders:
  - `src/components/home/auth-screen/`
  - `src/utils/api/`

## Component Naming

- Use PascalCase for component names:
  - `AuthButtons`
  - `UserProfileWithAuth`

## Variable and Function Naming

- Use camelCase for variables and functions:
  - `redirectUrl`
  - `setLoading`
  - `fetchUserData`
- Use descriptive names:
  - `postLoginRedirectURL` instead of just `url`
  - `getUserProfileById` instead of `getProfile`

## Constant Naming

- Use UPPERCASE_SNAKE_CASE for constants:
  - `MAX_RETRY_COUNT`
  - `API_BASE_URL`

## Boolean Variables

- Prefix with "is", "has", or "should":
  - `isLoading`
  - `hasError`
  - `shouldRedirect`

## Event Handlers

- Prefix with "handle" or "on":
  - `handleSubmit`
  - `onLoginClick`

## Props

- Use camelCase for prop names:
  - `onClick`
  - `isDisabled`

## CSS Classes

- Use kebab-case for CSS class names:
  - `flex-1`
  - `md:flex-row`

## General Coding Practices

1. Use TypeScript for type safety.
2. Write self-documenting code with clear variable and function names.
3. Keep functions small and focused on a single task.
4. Use async/await for asynchronous operations instead of callbacks.
5. Avoid using `any` type in TypeScript; be as specific as possible with types.
6. Use meaningful comments to explain complex logic, but avoid redundant comments.
7. Follow the DRY (Don't Repeat Yourself) principle.
8. Use destructuring for props and state in React components.
9. Prefer functional components with hooks over class components.
10. Use optional chaining (`?.`) and nullish coalescing (`??`) operators when appropriate.

## ESLint Configuration

Ensure your `.eslintrc.js` file includes rules to enforce these conventions:
