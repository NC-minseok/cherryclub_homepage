# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint

# Access the development server at http://172.20.1.199:3000
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MySQL2 with connection pooling
- **Authentication**: JWT with refresh tokens
- **Animations**: Framer Motion + GSAP
- **UI Components**: React Hook Form, Slick Carousel, Swiper
- **State Management**: SWR for server state
- **Backend**: Next.js API routes with MySQL

## Project Architecture

### Directory Structure
```
src/
├── app/
│   ├── (route)/              # Route groups for pages
│   │   ├── home/             # Main page with _components, _data, _types, _hooks
│   │   ├── campus/           # Campus page
│   │   ├── join/             # Membership application
│   │   └── ...
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication endpoints
│   │   ├── users/            # User management
│   │   ├── home/             # Home page data endpoints
│   │   ├── utils/            # Database, JWT, Firebase utilities
│   │   └── ...
│   └── globals.css
└── shared/                   # Shared components and utilities
    ├── components/           # Reusable UI components
    └── hook/                # Custom hooks
```

### Page-Level Organization
Each route follows a consistent structure:
- `page.tsx` - Main page component
- `_components/` - Page-specific components
- `_data/` - Static data and configurations
- `_types/` - TypeScript type definitions
- `_hooks/` - Page-specific custom hooks

### API Architecture
- **Database**: MySQL connection pool (`src/app/api/utils/db.ts`)
- **Authentication**: JWT-based auth with refresh tokens
- **Security**: Input validation and SQL injection protection
- **Error Handling**: Consistent error responses across endpoints

## Key Technical Patterns

### Database Connection
- Uses MySQL2 connection pool for optimal performance
- Database utilities centralized in `src/app/api/utils/db.ts`

### Authentication System
- JWT-based authentication with access/refresh token pattern
- Auth utilities in `src/app/api/utils/jwt.ts`
- Email verification system for password reset

### Component Architecture
- Follows Cursor rules for clean, readable code
- Component composition over prop drilling
- Focused, single-responsibility components
- Named constants instead of magic numbers

### Animation System
- Custom GSAP animations in `useGsapAnimaions.ts`
- Framer Motion for component transitions
- Scroll-triggered animations with `useScrollAnimation.ts`

### Data Fetching
- SWR for client-side data fetching and caching
- Custom hooks for API interactions
- Consistent error handling patterns

## Environment Configuration

Required environment variables:
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - Database connection
- JWT secrets for authentication
- Firebase configuration for notifications

## Development Guidelines

### Code Style (from Cursor Rules)
- Use TypeScript for all new code
- Follow naming conventions: PascalCase for components, camelCase for utilities
- Abstract complex logic into dedicated components/HOCs
- Separate conditional rendering into distinct components
- Use descriptive names for complex conditions
- Organize code by feature/domain, not just by type

### API Development
- All API routes use Next.js App Router patterns
- Consistent error response format
- JWT authentication middleware patterns
- MySQL connection pooling for database operations

### Branch Strategy
- `main` - Production branch
- `develop` - Development environment
- `feature/[기능명]` - Feature branches
- `fix/[이슈명]` - Bug fix branches