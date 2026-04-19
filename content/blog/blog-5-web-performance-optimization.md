# 10 Web Performance Optimization Techniques Every Developer Should Know

**Meta Description:** Boost your website speed with these 10 proven web performance optimization techniques. Includes lazy loading, code splitting, caching, and more — with real code examples.

**Tags:** Web Performance, Optimization, Core Web Vitals, JavaScript, CSS, Frontend Development  
**Reading Time:** 11 min  
**Published:** March 11, 2025

---

## Introduction

A slow website kills conversions. Studies show that a **1-second delay in page load time can reduce conversions by 7%**. Google also uses page speed as a ranking signal, making web performance both a UX and SEO priority.

In this guide, we'll cover 10 actionable techniques — with code — to make your website blazing fast.

---

## 1. Lazy Load Images

Don't load images the user hasn't scrolled to yet. Use the native `loading="lazy"` attribute.

```html
<!-- ❌ Loads all images immediately -->
<img src="hero.jpg" alt="Hero image">

<!-- ✅ Defers loading until the image enters the viewport -->
<img src="hero.jpg" alt="Hero image" loading="lazy" width="800" height="600">
```

For JavaScript-based lazy loading:

```javascript
// Using Intersection Observer API
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img  = entry.target;
      img.src    = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
```

```html
<img data-src="photo.jpg" src="placeholder.jpg" alt="Photo" class="lazy">
```

---

## 2. Minify CSS, JS, and HTML

Remove whitespace, comments, and unnecessary characters from your files.

**Before (15.2 KB):**
```css
/* Main navigation styles */
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
}
```

**After minified (0.8 KB):**
```css
.navigation{display:flex;justify-content:space-between;align-items:center;padding:1rem 2rem;background-color:#fff}
```

Use tools like **Vite**, **Webpack**, or **esbuild** to automate this in your build pipeline:

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify:        'esbuild', // Fast minification
    cssMinify:     true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split vendor code
        },
      },
    },
  },
});
```

---

## 3. Code Splitting

Don't ship your entire JavaScript bundle upfront. Split it into chunks and load only what's needed.

```javascript
// React: Lazy load components with React.lazy
import { lazy, Suspense } from 'react';

// ❌ Always loaded — even if user never visits /dashboard
// import Dashboard from './Dashboard';

// ✅ Only loads when the user navigates to /dashboard
const Dashboard = lazy(() => import('./Dashboard'));
const Settings  = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings"  element={<Settings />}  />
      </Routes>
    </Suspense>
  );
}
```

---

## 4. Use Modern Image Formats

Switch from PNG/JPG to **WebP** or **AVIF** for 25–50% smaller file sizes.

```html
<!-- Use <picture> for format fallbacks -->
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img     src="hero.jpg"   alt="Hero image" width="1200" height="600">
</picture>
```

Convert images via CLI:

```bash
# Convert to WebP
cwebp -q 80 input.png -o output.webp

# Convert to AVIF (using imagemagick)
magick input.jpg -quality 50 output.avif
```

---

## 5. Implement Caching with Cache-Control Headers

Tell browsers how long to cache static assets.

```javascript
// Express.js: Set caching headers
const express = require('express');
const app     = express();

// Cache static assets for 1 year
app.use('/static', express.static('public', {
  maxAge:   '1y',
  immutable: true,
}));

// Cache API responses for 5 minutes
app.get('/api/products', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.json(products);
});

// Never cache HTML (so users always get latest version)
app.use((req, res, next) => {
  if (req.path.endsWith('.html') || req.path === '/') {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  next();
});
```

---

## 6. Preload Critical Resources

Tell the browser to fetch important resources earlier.

```html
<head>
  <!-- Preload critical font -->
  <link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>

  <!-- Preload hero image -->
  <link rel="preload" href="/images/hero.webp" as="image">

  <!-- Preload critical CSS -->
  <link rel="preload" href="/css/critical.css" as="style">

  <!-- Prefetch next page (user likely to visit) -->
  <link rel="prefetch" href="/dashboard">

  <!-- DNS prefetch for third-party domains -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
</head>
```

---

## 7. Defer Non-Critical JavaScript

Don't block rendering with scripts that aren't needed immediately.

```html
<!-- ❌ Blocks HTML parsing -->
<script src="analytics.js"></script>

<!-- ✅ Downloads in parallel, executes after HTML parsed -->
<script src="app.js" defer></script>

<!-- ✅ Downloads in parallel, executes immediately when downloaded -->
<script src="analytics.js" async></script>
```

---

## 8. Optimize CSS Delivery

Inline critical CSS and defer the rest to eliminate render-blocking.

```html
<head>
  <!-- Inline critical above-the-fold styles -->
  <style>
    body { margin: 0; font-family: Inter, sans-serif; }
    .hero { background: #1a1a2e; color: white; padding: 4rem 2rem; }
    .hero h1 { font-size: 3rem; margin: 0; }
  </style>

  <!-- Load rest of CSS non-blocking -->
  <link
    rel="preload"
    href="/css/main.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  >
  <noscript>
    <link rel="stylesheet" href="/css/main.css">
  </noscript>
</head>
```

---

## 9. Use a Content Delivery Network (CDN)

A CDN serves your assets from servers closest to the user, dramatically reducing latency.

```javascript
// next.config.js — Configure CDN for Next.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production'
    ? 'https://cdn.yourdomain.com'
    : '',

  images: {
    domains: ['cdn.yourdomain.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
```

---

## 10. Measure with Core Web Vitals

You can't improve what you don't measure. Use the **Web Vitals** library to track your scores.

```javascript
// Install: npm install web-vitals
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const { name, value, rating } = metric;

  console.log(`${name}: ${value.toFixed(2)} (${rating})`);

  // Send to your analytics endpoint
  fetch('/api/vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, value, rating }),
  });
}

onCLS(sendToAnalytics);  // Cumulative Layout Shift
onFID(sendToAnalytics);  // First Input Delay
onLCP(sendToAnalytics);  // Largest Contentful Paint
onFCP(sendToAnalytics);  // First Contentful Paint
onTTFB(sendToAnalytics); // Time to First Byte
```

### Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|---|---|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5s | 2.5s – 4s | > 4s |
| FID (First Input Delay) | ≤ 100ms | 100 – 300ms | > 300ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | 0.1 – 0.25 | > 0.25 |

---

## Performance Optimization Checklist

- ✅ Lazy load images and components
- ✅ Minify CSS, JS, and HTML
- ✅ Implement code splitting
- ✅ Use WebP/AVIF image formats
- ✅ Set proper Cache-Control headers
- ✅ Preload critical resources
- ✅ Defer non-critical scripts
- ✅ Inline critical CSS
- ✅ Use a CDN
- ✅ Monitor Core Web Vitals

---

## Conclusion

Web performance is not a one-time task — it's an ongoing process. Start with the quick wins (lazy loading, minification, modern image formats) and gradually implement the more advanced techniques.

Consistently hitting **90+ scores on Google PageSpeed Insights** will improve both your user experience and your search engine rankings.

---

**Tools to Use:**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [Bundlephobia](https://bundlephobia.com/) — Check npm package sizes
