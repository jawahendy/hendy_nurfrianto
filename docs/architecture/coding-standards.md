# Coding Standards & Conventions

## Overview

This document outlines the coding standards, conventions, and best practices for the Hendy Nurfrianto Portfolio project. Following these guidelines ensures code consistency, maintainability, and quality across the codebase.

## Table of Contents

1. [General Principles](#general-principles)
2. [TypeScript Standards](#typescript-standards)
3. [React & Next.js Conventions](#react--nextjs-conventions)
4. [Styling Standards](#styling-standards)
5. [File & Folder Organization](#file--folder-organization)
6. [Naming Conventions](#naming-conventions)
7. [Code Formatting](#code-formatting)
8. [Comments & Documentation](#comments--documentation)
9. [Git Practices](#git-practices)
10. [Performance Best Practices](#performance-best-practices)
11. [Accessibility Standards](#accessibility-standards)

## General Principles

### Code Quality Principles

1. **DRY (Don't Repeat Yourself)**: Avoid code duplication by creating reusable components and utilities
2. **KISS (Keep It Simple, Stupid)**: Write simple, understandable code
3. **YAGNI (You Aren't Gonna Need It)**: Don't add functionality until it's necessary
4. **Single Responsibility**: Each function/component should do one thing well
5. **Composition Over Inheritance**: Favor component composition

### Code Review Standards

- All code changes should be reviewed before merging
- Code must pass linting checks
- Code must build without errors or warnings
- Follow the style guide consistently

## TypeScript Standards

### TypeScript Configuration

**Strict Mode**: Always enabled (`strict: true` in `tsconfig.json`)

```typescript
// ✅ Good - Type safety enforced
interface User {
  name: string;
  email: string;
  age?: number;
}

// ❌ Bad - Avoid 'any'
const user: any = getData();
```

### Type Annotations

**Explicit Types**: Use explicit types for function parameters and return values

```typescript
// ✅ Good
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

// ✅ Good - Inferred return type is acceptable for simple cases
function getFullName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`;
}

// ❌ Bad - No type annotations
function process(data) {
  return data.map(item => item.value);
}
```

### Interface vs Type

**Prefer Interfaces** for object shapes, **Types** for unions and complex types

```typescript
// ✅ Good - Interface for objects
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
}

// ✅ Good - Type for unions
type Status = 'idle' | 'loading' | 'success' | 'error';

// ✅ Good - Type for complex compositions
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};
```

### Avoid 'any'

**Never Use 'any'**: Use `unknown` if type is truly unknown

```typescript
// ✅ Good
function processData(data: unknown): string {
  if (typeof data === 'string') {
    return data;
  }
  return JSON.stringify(data);
}

// ❌ Bad
function processData(data: any): string {
  return data.toString();
}
```

### Utility Types

Leverage TypeScript utility types:

```typescript
// ✅ Good - Using built-in utility types
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
type UserWithoutEmail = Omit<User, 'email'>;
type UserNameAndEmail = Pick<User, 'name' | 'email'>;
```

## React & Next.js Conventions

### Component Structure

**Functional Components**: Always use functional components with hooks

```typescript
// ✅ Good - Functional component with TypeScript
interface HomePageProps {
  title: string;
}

const HomePage: React.FC<HomePageProps> = ({ title }) => {
  return <h1>{title}</h1>;
};

export default HomePage;
```

### Client vs Server Components

**Default to Server Components** (Next.js 14 App Router)

```typescript
// ✅ Good - Server Component (default)
// app/page.tsx
export default function Page() {
  return <div>Server Component</div>;
}

// ✅ Good - Client Component (when needed)
// components/InteractiveButton.tsx
'use client';

export default function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Use 'use client' only when:**
- Using React hooks (useState, useEffect, etc.)
- Using browser APIs
- Using event handlers
- Using animations (Framer Motion)

### Component Props

**Explicit Prop Types**: Always define prop interfaces

```typescript
// ✅ Good
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
```

### Hooks Usage

**Rules of Hooks**: Follow React's rules of hooks

```typescript
// ✅ Good
const MyComponent = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    // Side effect
  }, [state]);

  return <div>{state}</div>;
};

// ❌ Bad - Conditional hook usage
const MyComponent = ({ condition }) => {
  if (condition) {
    const [state, setState] = useState(0); // ❌ Conditional
  }
  return <div>Content</div>;
};
```

### Custom Hooks

**Naming**: Prefix with 'use'

```typescript
// ✅ Good
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```

### Component Export

**Default Export** for pages and main components, **Named Export** for utilities

```typescript
// ✅ Good - Default export for components
const HomePage = () => <div>Home</div>;
export default HomePage;

// ✅ Good - Named export for utilities
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// ✅ Good - Export both component and types
export interface ButtonProps { /* ... */ }
export const Button = () => { /* ... */ };
```

## Styling Standards

### Tailwind CSS

**Utility-First Approach**: Use Tailwind utility classes

```typescript
// ✅ Good
<div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>

// ❌ Bad - Inline styles (avoid unless necessary)
<div style={{ display: 'flex', padding: '16px' }}>
  <h1 style={{ fontSize: '24px' }}>Title</h1>
</div>
```

### Class Name Composition

**Use cn() utility** for conditional and merged classes

```typescript
import { cn } from '@/lib/utils';

// ✅ Good
<button className={cn(
  "px-4 py-2 rounded",
  variant === 'primary' && "bg-blue-500 text-white",
  variant === 'secondary' && "bg-gray-200 text-gray-900",
  disabled && "opacity-50 cursor-not-allowed"
)} />

// ❌ Bad - String concatenation
<button className={`px-4 py-2 rounded ${variant === 'primary' ? 'bg-blue-500' : ''}`} />
```

### CSS Variables

**Use CSS Variables** for theme values

```css
/* ✅ Good - Using CSS variables */
:root {
  --primary: 220 90% 56%;
  --background: 0 0% 100%;
}

.button {
  background: hsl(var(--primary));
}
```

### Responsive Design

**Mobile-First Approach**: Default styles for mobile, use breakpoints for larger screens

```typescript
// ✅ Good
<div className="w-full md:w-1/2 lg:w-1/3">
  <p className="text-sm md:text-base lg:text-lg">Responsive text</p>
</div>
```

### Component Variants

**Use CVA** (Class Variance Authority) for variant-based styling

```typescript
import { cva } from 'class-variance-authority';

// ✅ Good
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3",
        lg: "h-10 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

## File & Folder Organization

### Directory Structure

**Feature-Based Organization**: Group by feature/domain

```
components/
├── Home/           # Feature grouping
│   ├── index.tsx
│   ├── Desktop.tsx
│   └── Mobile.tsx
└── ui/             # Generic UI components
    ├── button.tsx
    └── carousel.tsx
```

### File Naming

| File Type | Convention | Example |
|-----------|-----------|---------|
| React Components | PascalCase.tsx | `Button.tsx`, `HomePage.tsx` |
| Utilities | camelCase.ts | `utils.ts`, `mergeOpenGraph.ts` |
| Pages (App Router) | lowercase/page.tsx | `app/skill/page.tsx` |
| Layouts | lowercase/layout.tsx | `app/layout.tsx` |
| Types | PascalCase.ts | `User.ts`, `ApiTypes.ts` |
| Constants | UPPER_CASE.ts | `ROUTES.ts`, `CONFIG.ts` |

### Index Files

**Use index.tsx** for main exports to simplify imports

```typescript
// components/Home/index.tsx
export { default } from './HomePage';

// Usage
import HomePage from '@/components/Home'; // ✅ Clean import
```

## Naming Conventions

### Variables & Functions

```typescript
// ✅ Good - camelCase
const userName = 'John';
const isActive = true;
const getUserData = () => {};

// ❌ Bad
const user_name = 'John';
const UserName = 'John';
```

### Constants

```typescript
// ✅ Good - UPPER_SNAKE_CASE for true constants
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;

// ✅ Good - camelCase for config objects
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
};
```

### Components

```typescript
// ✅ Good - PascalCase
const UserProfile = () => {};
const NavigationBar = () => {};

// ❌ Bad
const userProfile = () => {};
const navigation_bar = () => {};
```

### Booleans

**Prefix with is, has, should, can**

```typescript
// ✅ Good
const isLoading = true;
const hasPermission = false;
const shouldRender = true;
const canEdit = false;

// ❌ Bad
const loading = true;
const permission = false;
```

### Event Handlers

**Prefix with 'handle' or 'on'**

```typescript
// ✅ Good
const handleClick = () => {};
const handleSubmit = () => {};
const onUserLogin = () => {};

// ❌ Bad
const click = () => {};
const userLogin = () => {};
```

## Code Formatting

### Line Length

**Maximum 100 characters** per line (enforced by ESLint)

### Indentation

**2 spaces** for indentation (TypeScript/JavaScript standard)

### Semicolons

**Omit semicolons** (ASI - Automatic Semicolon Insertion)

```typescript
// ✅ Good (project style - no semicolons)
const name = 'John'
const age = 25

// Also acceptable (with semicolons for clarity in some cases)
const items = [1, 2, 3];
```

**Note**: Project currently uses semicolons inconsistently. Choose one style and enforce it.

### Quotes

**Single quotes** for strings, **double quotes** for JSX attributes

```typescript
// ✅ Good
const name = 'John'
const element = <div className="container">Content</div>

// ❌ Bad
const name = "John"
const element = <div className='container'>Content</div>
```

### Arrow Functions

**Always use arrow functions** for consistency

```typescript
// ✅ Good
const add = (a: number, b: number) => a + b

const Component = () => {
  return <div>Content</div>
}

// ❌ Bad
function add(a, b) {
  return a + b
}
```

### Destructuring

**Use destructuring** for props and objects

```typescript
// ✅ Good
const { name, email, age } = user
const HomePage = ({ title, subtitle }: Props) => {}

// ❌ Bad
const name = user.name
const email = user.email
const HomePage = (props: Props) => {
  return <h1>{props.title}</h1>
}
```

### Template Literals

**Use template literals** for string concatenation

```typescript
// ✅ Good
const greeting = `Hello, ${name}!`
const url = `/api/users/${userId}`

// ❌ Bad
const greeting = 'Hello, ' + name + '!'
const url = '/api/users/' + userId
```

## Comments & Documentation

### When to Comment

**Comment WHY, not WHAT**

```typescript
// ✅ Good - Explains why
// Use a timeout to prevent rate limiting from the API
setTimeout(fetchData, 1000)

// ❌ Bad - States the obvious
// Set timeout to 1000ms
setTimeout(fetchData, 1000)
```

### JSDoc for Functions

**Document public APIs and complex functions**

```typescript
/**
 * Merges OpenGraph metadata with default values
 * @param og - Partial OpenGraph configuration
 * @returns Complete OpenGraph metadata object
 */
export function mergeOpenGraph(og?: Partial<OpenGraph>): OpenGraph {
  // Implementation
}
```

### TODO Comments

**Format**: `// TODO: Description`

```typescript
// TODO: Implement error boundary
// TODO: Add loading state
// FIXME: Memory leak in useEffect
```

### Component Documentation

```typescript
/**
 * Primary button component with variants
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({ ... }) => { ... }
```

## Git Practices

### Commit Messages

**Format**: `type(scope): subject`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(home): add portfolio carousel
fix(button): resolve hover state issue
docs(readme): update installation instructions
refactor(utils): simplify cn function
```

### Branch Naming

**Format**: `type/description`

```
feat/add-contact-form
fix/button-hover-state
docs/update-architecture
refactor/simplify-home-component
```

### Pull Requests

- Clear title describing the change
- Description of what changed and why
- Reference related issues
- Screenshots for UI changes

## Performance Best Practices

### Component Optimization

**Use React.memo** for expensive components

```typescript
// ✅ Good
const ExpensiveComponent = React.memo(({ data }) => {
  // Expensive rendering logic
  return <div>{data}</div>
})
```

**Use useCallback** for stable function references

```typescript
// ✅ Good
const handleClick = useCallback(() => {
  console.log('Clicked')
}, [])
```

**Use useMemo** for expensive calculations

```typescript
// ✅ Good
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value)
}, [data])
```

### Image Optimization

**Use Next.js Image component**

```typescript
import Image from 'next/image'

// ✅ Good
<Image
  src="/image/profile.jpg"
  alt="Profile"
  width={500}
  height={500}
  priority
/>

// ❌ Bad
<img src="/image/profile.jpg" alt="Profile" />
```

### Dynamic Imports

**Lazy load heavy components**

```typescript
// ✅ Good
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
```

### Bundle Size

- Minimize dependencies
- Use tree-shaking friendly imports
- Analyze bundle with `next build --analyze`

## Accessibility Standards

### Semantic HTML

**Use semantic elements**

```typescript
// ✅ Good
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
<main>
  <article>Content</article>
</main>

// ❌ Bad
<div className="nav">
  <div className="list">
    <div className="item"><div onClick={goHome}>Home</div></div>
  </div>
</div>
```

### ARIA Attributes

```typescript
// ✅ Good
<button aria-label="Close modal" onClick={onClose}>
  <X />
</button>

<div role="alert" aria-live="polite">
  {errorMessage}
</div>
```

### Keyboard Navigation

**Ensure keyboard accessibility**

```typescript
// ✅ Good
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Interactive element
</div>
```

### Alt Text

**Always provide alt text for images**

```typescript
// ✅ Good
<Image src="/logo.png" alt="Company Logo" />

// ❌ Bad
<Image src="/logo.png" alt="" />
```

## Error Handling

### Try-Catch Blocks

```typescript
// ✅ Good
async function fetchUserData(userId: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) throw new Error('Failed to fetch user')
    return await response.json()
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}
```

### Error Boundaries

```typescript
// ✅ Good - Use error boundaries for component errors
<ErrorBoundary fallback={<ErrorFallback />}>
  <UserProfile />
</ErrorBoundary>
```

## Testing (Future)

### Test File Naming

- Component tests: `ComponentName.test.tsx`
- Utility tests: `utilityName.test.ts`

### Test Structure

```typescript
describe('Button', () => {
  it('should render with children', () => {
    // Arrange
    const text = 'Click me'

    // Act
    render(<Button>{text}</Button>)

    // Assert
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
```

## Conclusion

These coding standards ensure:
- **Consistency**: Uniform code style across the project
- **Maintainability**: Easy to understand and modify
- **Quality**: High-quality, bug-free code
- **Performance**: Optimized for speed and efficiency
- **Accessibility**: Inclusive for all users

**All team members must follow these standards.** When in doubt, refer to this document or discuss with the team.

---

**Last Updated**: 2025-11-03
**Version**: 1.0
