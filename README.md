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

This project includes a comprehensive visual testing framework that ensures UI components render consistently across different browsers, viewports, and themes. The framework combines **Playwright** for full browser testing and **Storybook Vitest Integration** for fast component-level testing.

### Testing Approaches

Our visual testing strategy uses two complementary approaches:

#### 1. **Playwright Visual Tests** (`npm run test:visual`)
- **Purpose**: Full browser visual regression testing with pixel-perfect screenshot comparison
- **Technology**: Playwright with real browser engines (Chromium, Firefox, WebKit)
- **Speed**: Slower but comprehensive (full browser rendering)
- **Coverage**: Cross-browser compatibility, responsive behavior, user interactions
- **Output**: PNG screenshots and HTML reports

#### 2. **Storybook Vitest Integration** (`npm run test:storybook`)
- **Purpose**: Fast component-level testing with HTML snapshots using existing stories
- **Technology**: Vitest with jsdom environment + Storybook story composition
- **Speed**: Fast execution in Node.js environment
- **Coverage**: Component isolation, props variations, story compositions
- **Output**: HTML snapshots and test reports

### Command Differences

#### Core Test Commands

| Command | Purpose | Technology | Speed | Use Case |
|---------|---------|------------|-------|----------|
| `npm run test:visual` | Browser visual tests | Playwright | Slow | Cross-browser compatibility, interactions |
| `npm run test:storybook` | Component snapshots | Vitest + Storybook | Fast | Component regression, story validation |

#### UI Debug Commands

| Command | Purpose | Interface | Best For |
|---------|---------|-----------|----------|
| `npm run test:visual:ui` | Interactive Playwright UI | Browser-based Playwright UI | Debugging visual failures, updating screenshots |
| `npm run test:storybook:ui` | Interactive Vitest UI | Web-based Vitest dashboard | Debugging component tests, watching file changes |

#### Key Differences: `test:visual:ui` vs `test:storybook:ui`

**`npm run test:visual:ui` (Playwright UI)**
- Opens a browser-based interface for Playwright tests
- **Features**:
  - Visual test timeline and execution flow
  - Screenshot diff viewer (before/after)
  - Step-by-step test execution with DOM inspection
  - Browser devtools integration
  - Screenshot update capabilities
- **Best for**: Debugging visual regressions, updating reference screenshots
- **Requirements**: Storybook must be running (`npm run storybook`)

**`npm run test:storybook:ui` (Vitest UI)**
- Opens a web-based dashboard for Vitest component tests
- **Features**:
  - Live test running with file watching
  - Component tree view
  - HTML snapshot comparison
  - Coverage reports
  - Real-time test results
- **Best for**: Rapid component development, watching test changes
- **Requirements**: None (runs independently)

### Testing Architecture

```
tests/visual/
├── README.md                      # Detailed testing documentation
├── button.visual.spec.ts          # Playwright: Button cross-browser tests
├── resume-preview.visual.spec.ts  # Playwright: Resume theme tests
├── form-components.visual.spec.ts # Playwright: Form interaction tests
└── storybook.visual.test.tsx      # Vitest: Component snapshot tests
```

### Configuration Files

- **`playwright.config.ts`** - Multi-browser configuration, screenshot settings
- **`vitest.config.storybook.ts`** - Storybook integration, jsdom environment
- **`.storybook/vitest.setup.ts`** - Story composition setup

### Test Coverage

#### Playwright Visual Tests
- **Cross-Browser**: Chromium, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Responsive**: Mobile (375px), Tablet (768px), Desktop (1280px)
- **Interactions**: Hover states, focus states, disabled states
- **Themes**: Light/dark mode compatibility
- **Components**: Button variants, Resume themes, Form components

#### Storybook Integration Tests
- **Button Components**: All 8 variants with HTML snapshots
- **Resume Previews**: All 5 themes (Simple, Modern, Centered, Sidebar, Executive)
- **Story Interactions**: Click handlers, accessibility tests
- **Data Variations**: Minimal data, Executive profile, etc.

### Development Workflow

#### 1. **Quick Component Testing** (Development)
```bash
npm run test:storybook:ui
```
- Use during active development
- Fast feedback loop
- File watching enabled
- Component-focused testing

#### 2. **Cross-Browser Validation** (Pre-commit)
```bash
npm run test:visual
```
- Run before committing UI changes
- Ensures cross-browser compatibility
- Validates responsive behavior

#### 3. **Interactive Debugging** (Troubleshooting)
```bash
# For component issues
npm run test:storybook:ui

# For visual/browser issues
npm run storybook  # In terminal 1
npm run test:visual:ui  # In terminal 2
```

### Updating Visual References

#### Playwright Screenshots
```bash
# Update all screenshots
npm run test:visual -- --update-snapshots

# Update specific component
npm run test:visual -- --update-snapshots button.visual.spec.ts

# Update specific browser only
npm run test:visual -- --update-snapshots --project=chromium
```

#### Storybook Snapshots
```bash
# Update HTML snapshots (auto-prompted during test runs)
npm run test:storybook -- --update-snapshots
```

### CI/CD Integration

#### Automated Testing Pipeline
1. **Unit Tests**: `npm run test`
2. **Component Snapshots**: `npm run test:storybook`
3. **Visual Regression**: `npm run test:visual`

#### CI-Specific Features
- Parallel execution disabled for stability
- Screenshot artifacts saved on failures
- HTML reports generated for debugging
- Retry logic for flaky tests

### Troubleshooting

#### Common Issues

**Playwright Tests Failing**
```bash
# Check if Storybook is running
curl http://localhost:6006

# Start Storybook manually
npm run storybook

# Run with debug output
npm run test:visual:debug
```

**Storybook Tests Failing**
```bash
# Clear Vitest cache
npx vitest --clear-cache

# Run with UI for debugging
npm run test:storybook:ui
```

**Screenshot Differences**
```bash
# View differences in UI
npm run test:visual:ui

# Update if changes are intentional
npm run test:visual -- --update-snapshots
```

### Performance Tips

1. **Use `test:storybook` for rapid iteration** - 10x faster than Playwright
2. **Use `test:visual` for final validation** - Ensures production quality
3. **Run specific browsers** - `--project=chromium` for faster iteration
4. **Use UI modes for debugging** - Visual inspection of failures

### Best Practices

1. **Component Development**: Start with `test:storybook:ui`
2. **Feature Completion**: Validate with `test:visual`
3. **Bug Investigation**: Use appropriate UI mode for the test type
4. **CI Pipeline**: Run both test types for complete coverage
5. **Screenshot Updates**: Review changes carefully before updating

For detailed testing documentation and advanced configuration, see `tests/visual/README.md`.

## Code Analysis

This project uses [Repomix](https://github.com/yamadashy/repomix) for codebase analysis:

```bash
repomix --compress
```
