# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Production build
- `npm run build:dev` - Development build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run coverage` - Generate test coverage report

## Architecture Overview

This is a React-based resume builder application with the following key architecture:

### Core Structure
- **Framework**: Vite + React 18 + TypeScript
- **UI**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Testing**: Vitest with @testing-library
- **State**: React hooks (useState) for local state, Context for themes

### Key Components
- `Index.tsx` - Main page with tabbed interface (Editor/AI Assistant)
- `LayoutEditor.tsx` - Core editor with layout selection, code editing, and JSON editing modes
- `ResumePreview.tsx` - Live preview with PDF export capability
- `ResumeAssistant.tsx` - AI-powered chat interface for resume improvements

### Resume Data Structure
The application uses a centralized `ResumeDataState` interface in `utils/jsonResume.ts`:
- Personal info, work experience, education, skills
- Extra data field for custom properties
- JSON Resume format compatibility for import/export

### Layout System
- Four built-in layouts: Simple, Modern, Sidebar, Centered
- Custom layout support via Monaco editor with live preview
- Template system in `resume-layouts/layoutTemplates.tsx`

### AI Integration
- OpenAI API integration with configurable endpoints
- Chat interface with system prompts and templates
- Supports custom models and parameters

## Path Resolution
Uses `@/` alias for `src/` directory imports.

## Testing
Tests are located alongside components (`.test.tsx`) and utilities (`.test.ts`). Setup uses jsdom environment with @testing-library/jest-dom matchers.