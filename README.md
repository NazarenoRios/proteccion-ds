# Design System

A comprehensive design system built with React, TypeScript, and Storybook.

## Features

- 🎨 Component library with Storybook
- 📝 TypeScript support
- 🚀 Vite for fast development
- 🎯 ESLint and Prettier for code quality
- 🐳 Docker support
- 📱 Responsive design
- 🎭 Chromatic for visual testing
- 🔍 Accessibility support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Start Storybook:

```bash
npm run storybook
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook
- `npm run chromatic` - Run Chromatic visual testing
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Docker

Build and run with Docker:

```bash
docker build -t design-system .
docker run -p 6006:6006 design-system
```

## Project Structure

```
src/
  ├── components/     # React components
  │   ├── atoms/     # Basic building blocks
  │   ├── molecules/ # Combinations of atoms
  │   └── organisms/ # Complex components
  ├── styles/        # Global styles and themes
  ├── utils/         # Utility functions
  └── types/         # TypeScript type definitions
```

## Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## License

MIT
