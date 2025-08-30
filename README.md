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

- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Production build
- `npm run build:dev` - Development build  
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run coverage` - Generate test coverage report

## Code Analysis

This project uses [Repomix](https://github.com/yamadashy/repomix) for codebase analysis:

```bash
repomix --compress
```
