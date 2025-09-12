# Resume Builder

A web application that helps users create and manage their resumes. It allows for data input for personal information, work experience, education, and skills.

## Key Features

- Import and export resume data in JSON Resume format.
- Live preview of the resume as it's being built.
- AI-powered assistant to help write or improve resume content.
- Customizable layouts and themes for the resume.
- Ability to edit resume layout code directly.

## Running Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages:

1. **Automatic Deployment:** Push to the `main` branch triggers automatic deployment
2. **Live Site:** Available at `https://yourusername.github.io/resume-builder/`
3. **Setup:** Enable GitHub Pages in repository Settings → Pages → Source: "GitHub Actions"

### Manual Build

1. **Run the build script:**
   ```bash
   npm run build
   ```
2. **Output:**
   The production-ready files will be generated in the `dist` folder.

## Tech Stack

This project is a React application built with:

- **Vite:** For fast development and optimized builds.
- **TypeScript:** For static typing and improved code quality.
- **Shadcn UI:** For pre-built, accessible, and customizable UI components.
- **Tailwind CSS:** For utility-first CSS styling.
- **JSON Resume:** As the standard format for resume data.


## Development Commands

### Core Development
- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Production build
- `npm run build:dev` - Development build  
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Testing Commands
- `npm run test` - Run unit tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run coverage` - Generate test coverage report

### Storybook Commands
- `npm run storybook` - Start Storybook development server (localhost:6006)
- `npm run build-storybook` - Build Storybook for production

### Visual Testing Commands
- `npm run test:visual` - Run Playwright visual tests
- `npm run test:visual:ui` - Run Playwright tests with UI mode for debugging
- `npm run test:visual:debug` - Run Playwright tests in debug mode
- `npm run test:storybook` - Run Vitest tests with Storybook integration
- `npm run test:storybook:ui` - Run Storybook tests with UI mode
- `npm run test:all` - Run all tests (unit, Storybook, and visual)

## Visual Testing

This project includes comprehensive visual testing setup using **Playwright** and **Storybook Vitest addon** to ensure UI components render consistently across different browsers, viewports, and themes.

### Setup Overview

The visual testing framework consists of:

1. **Playwright Visual Tests** - Full browser visual regression testing with screenshot comparison
2. **Storybook Vitest Integration** - Component-level testing with HTML snapshots using existing stories

### Testing Architecture

```
tests/visual/
├── README.md                      # Detailed testing documentation
├── button.visual.spec.ts          # Playwright tests for Button component
├── resume-preview.visual.spec.ts  # Playwright tests for Resume Preview
├── form-components.visual.spec.ts # Playwright tests for form components
└── storybook.visual.test.ts       # Vitest integration with Storybook stories
```

### Configuration Files

- `playwright.config.ts` - Playwright configuration with multi-browser support
- `vitest.config.storybook.ts` - Vitest configuration for Storybook integration  
- `.storybook/vitest.setup.ts` - Setup file for Storybook + Vitest integration

### Key Features

#### Playwright Visual Tests
- **Cross-Browser Testing**: Chromium, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Responsive Testing**: Multiple viewport sizes (mobile, tablet, desktop)
- **Theme Testing**: Light/dark modes, print layouts
- **Interactive States**: Hover, focus, disabled states
- **Screenshot Comparison**: Automatic visual regression detection

#### Storybook Integration Tests  
- **Story Composition**: Reuses existing Storybook stories for testing
- **HTML Snapshots**: Creates HTML snapshots for component regression testing
- **Fast Execution**: Runs in Node.js environment for speed
- **Component Isolation**: Tests individual components in isolation

### Test Coverage

- **Button Components**: All variants, sizes, states, and responsive behavior
- **Resume Preview**: All themes (simple, modern, centered, sidebar, executive)  
- **Form Components**: Input fields, cards, form sections with interaction states
- **Data Variations**: Different resume data sets (minimal, executive, fresh graduate, etc.)
- **Responsive Layouts**: Testing across mobile, tablet, and desktop viewports

### Getting Started

1. **Install Dependencies**: Already included in `npm install`
2. **Start Storybook**: `npm run storybook` (required for Playwright tests)
3. **Run Visual Tests**: `npm run test:visual`
4. **Debug Tests**: `npm run test:visual:debug` for interactive debugging

### Updating Screenshots

When making intentional UI changes, update reference screenshots:

```bash
# Update all Playwright screenshots
npm run test:visual -- --update-snapshots

# Update specific test screenshots  
npm run test:visual -- --update-snapshots button.visual.spec.ts
```

### CI/CD Integration

- Tests run automatically in CI environments
- Screenshots captured on test failures for debugging
- Parallel execution optimized for CI stability
- HTML reports generated for easy issue identification

For detailed testing documentation, see `tests/visual/README.md`.

## Code Analysis

This project uses [Repomix](https://github.com/yamadashy/repomix) for codebase analysis:

```bash
repomix --compress
```
