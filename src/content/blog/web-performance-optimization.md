---
title: "Web Performance Optimization: A Practical Guide"
date: 2023-12-10
readTime: 9 min read
excerpt: Speed matters. Learn practical techniques to optimize your web applications for better performance, from lazy loading to code splitting and beyond.
tags: [Performance, Web Development]
featured: false
---

Performance is a feature. A page that loads in 800ms feels like a different product from one that loads in 3s : even though "both work." This is a practical guide to the techniques that move the needle, in roughly the order I reach for them.

## Measure first

Don't optimize what you haven't measured. Tools, in order of usefulness:

- **Lighthouse** in Chrome DevTools. Five categories, scored 0–100. Run it on a throttled connection.
- **WebPageTest.org** for real-device, real-network testing. The filmstrip is invaluable.
- **Chrome Performance tab** for flame charts when something is slow but you don't know why.

Your three target metrics:

- **LCP (Largest Contentful Paint)** : under 2.5s. The thing the user came to see is on screen.
- **CLS (Cumulative Layout Shift)** : under 0.1. Nothing jumps around as it loads.
- **INP (Interaction to Next Paint)** : under 200ms. Clicks feel instant.

## Ship less JavaScript

The single biggest performance lever is shipping less code. Every kilobyte of JS costs more than the same kilobyte of HTML or CSS, because the browser has to parse and execute it.

- **Audit your bundle.** `vite-bundle-visualizer` or similar. Look for surprises.
- **Tree-shake aggressively.** Import `import { debounce } from 'lodash-es'`, not `import _ from 'lodash'`.
- **Code split by route.** Each page should only load the JS it needs.
- **Defer non-critical JS.** Analytics, chat widgets, ads : load them after the main content.

## Lazy load images

Above-the-fold images: eager.  
Below-the-fold images: `loading="lazy"`.

```html
<img src="hero.jpg" alt="..." />
<img src="story.jpg" alt="..." loading="lazy" />
```

This is built-in to the browser now. No library needed.

## Modern image formats

WebP is universally supported. AVIF is supported by 95% of browsers and is dramatically smaller for photographs.

```html
<picture>
	<source srcset="photo.avif" type="image/avif" />
	<source srcset="photo.webp" type="image/webp" />
	<img src="photo.jpg" alt="..." />
</picture>
```

The browser picks the first format it supports. The savings are often 50% over JPEG with no visible quality loss.

## Reserve space for content

Layout shift kills perceived performance. Always tell the browser how much space a thing will take:

```html
<img src="photo.jpg" width="800" height="600" alt="..." />
```

For dynamic content, use a skeleton with the correct dimensions. The page should look like the final layout from the first paint.

## Cache aggressively

For static assets, set a long `Cache-Control` and version the URL:

```
GET /assets/app.4f2c91.js
Cache-Control: public, max-age=31536000, immutable
```

The hash in the filename means you can cache for a year. When the file changes, the hash changes, the URL changes, the cache invalidates. Free.

## Use a CDN

A CDN puts your static assets close to the user geographically. For an international audience, this is a much bigger win than micro-optimizing your server.

## Preload critical resources

If your hero font is essential to first paint, preload it:

```html
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
```

Same for above-the-fold images and critical CSS. Be sparing : preloading everything is the same as preloading nothing.

## Server-side rendering (or static generation)

The fastest page is one that arrives as already-rendered HTML. If your framework supports SSR or SSG, use it for content pages. Hydration costs are real, but they're less expensive than a blank screen.

## Watch the third parties

The slowest 10% of any production site is usually third-party scripts: analytics, ads, chat, A/B testing, fingerprinting. Each one has a budget. If a vendor's script blocks first paint, replace them.

## A 30-minute audit you can do right now

1. Run Lighthouse on your homepage with mobile throttling.
2. Read the "Opportunities" section top-to-bottom.
3. Pick the three that look cheapest. Implement them.
4. Re-run Lighthouse.

You will probably gain 10–20 points of score from changes that took an afternoon. After that, every gain takes ten times the work.

## Conclusion

Performance optimization is rarely about clever tricks. It's about shipping less, measuring honestly, and caching aggressively. Do the boring stuff first. Save the clever stuff for when boring isn't enough.
