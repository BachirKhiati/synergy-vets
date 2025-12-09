# Web App Testing Guide

This document outlines how to run and extend automated tests for the web application.

## Test Commands

- `npm run test`: Execute the full Vitest suite once in CI-friendly mode.
- `npm run test:watch`: Start Vitest in watch mode for local development feedback.
- `npm run lint`: Run ESLint across the codebase to enforce style and catch common issues.

## Tooling Stack

- **Vitest** (JS DOM environment) powers unit and component tests.
- **Testing Library** drives DOM assertions with a user-centric testing approach.
- **Jest DOM** adds semantic matchers such as `toBeInTheDocument`.

All test utilities are configured via `vitest.config.ts` and the shared setup file under `src/test/setup.tsx`.
