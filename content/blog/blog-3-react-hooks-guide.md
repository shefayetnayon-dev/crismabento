# React Hooks Explained: useState, useEffect, and useContext with Examples

**Meta Description:** A practical guide to React Hooks — useState, useEffect, and useContext — with clear code examples. Perfect for developers transitioning from class components to functional components.

**Tags:** React, React Hooks, JavaScript, Frontend Development, useState, useEffect  
**Reading Time:** 12 min  
**Published:** March 11, 2025

---

## Introduction

React Hooks revolutionized how we write React components. Introduced in React 16.8, Hooks let you use **state and lifecycle features in functional components** — no class components required.

In this post, we'll explore the three most essential Hooks with real, practical examples.

---

## 1. useState — Managing Local State

`useState` lets you add reactive state to functional components.

### Syntax

```javascript
const [state, setState] = useState(initialValue);
```

### Example: Counter Component

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>➕ Increment</button>
      <button onClick={() => setCount(count - 1)}>➖ Decrement</button>
      <button onClick={() => setCount(0)}>🔄 Reset</button>
    </div>
  );
}

export default Counter;
```

### Example: Form Input with useState

```jsx
import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email:    '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 2. useEffect — Side Effects & Lifecycle

`useEffect` runs side effects after render — like fetching data, subscribing to events, or updating the DOM.

### Syntax

```javascript
useEffect(() => {
  // Side effect code here
  return () => {
    // Optional cleanup
  };
}, [dependencies]);
```

### Dependency Array Behavior

| Dependency Array | When Effect Runs |
|---|---|
| Not provided | After **every** render |
| `[]` (empty) | Only on **mount** (once) |
| `[value]` | When `value` changes |

### Example: Fetch Data on Mount

```jsx
import { useState, useEffect } from 'react';

function PostList() {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res  = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []); // Empty array = run once on mount

  if (loading) return <p>Loading...</p>;
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
```

### Example: Event Listener with Cleanup

```jsx
import { useState, useEffect } from 'react';

function WindowSize() {
  const [size, setSize] = useState({
    width:  window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup: remove listener when component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <p>Window size: {size.width} x {size.height}</p>
  );
}
```

---

## 3. useContext — Sharing State Globally

`useContext` lets you share state across components without prop drilling.

### Step 1: Create the Context

```jsx
// ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for convenience
export const useTheme = () => useContext(ThemeContext);
```

### Step 2: Wrap Your App

```jsx
// App.js
import { ThemeProvider } from './ThemeContext';
import Dashboard from './Dashboard';

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
```

### Step 3: Consume the Context Anywhere

```jsx
// Dashboard.js
import { useTheme } from './ThemeContext';

function Dashboard() {
  const { theme, toggleTheme } = useTheme();

  const styles = {
    background: theme === 'light' ? '#ffffff' : '#1a1a2e',
    color:      theme === 'light' ? '#000000' : '#ffffff',
    padding:    '2rem',
    minHeight:  '100vh',
  };

  return (
    <div style={styles}>
      <h1>Welcome to the Dashboard</h1>
      <p>Current theme: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>Toggle Theme 🌓</button>
    </div>
  );
}
```

---

## Quick Reference Cheatsheet

```javascript
// State
const [value, setValue] = useState(initialValue);

// Effect on mount only
useEffect(() => { /* ... */ }, []);

// Effect on dependency change
useEffect(() => { /* ... */ }, [dep1, dep2]);

// Effect with cleanup
useEffect(() => {
  const sub = subscribe();
  return () => sub.unsubscribe();
}, []);

// Context
const value = useContext(MyContext);
```

---

## Conclusion

React Hooks make your components more concise, readable, and easier to test. Here's a quick summary:

- **`useState`** — local state management
- **`useEffect`** — side effects and lifecycle methods
- **`useContext`** — global state without prop drilling

Mastering these three hooks covers 80% of real-world React use cases. Once you're comfortable, explore `useReducer`, `useMemo`, and `useCallback` for more advanced scenarios.

---

**Further Reading:**
- [React Docs: Hooks Reference](https://react.dev/reference/react)
- [React Docs: Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
