---
title: Modern CSS Techniques Every Developer Should Know
date: 2023-12-20
readTime: 7 min read
excerpt: From CSS Grid and Flexbox to custom properties and container queries, explore the modern CSS features that make building responsive layouts easier than ever.
tags: [CSS, Frontend, Design]
featured: false
---

CSS has quietly become one of the most powerful tools in a frontend developer's kit. The features that shipped over the last few years removed entire categories of hacks. Here are the ones worth learning first.

## CSS Custom Properties

Variables in CSS. The bedrock of any modern design system.

```css
:root {
	--accent: #5b8bff;
	--radius-md: 0.5rem;
}

.button {
	background: var(--accent);
	border-radius: var(--radius-md);
}
```

The magic is that they cascade and respond to media queries. You can swap an entire theme by re-declaring a handful of properties under a `[data-theme="dark"]` selector.

## Container Queries

Media queries respond to the viewport. Container queries respond to the *element*. That difference is enormous for any component that gets reused at different sizes.

```css
.card-container {
	container-type: inline-size;
}

@container (min-width: 400px) {
	.card {
		grid-template-columns: 1fr 2fr;
	}
}
```

A card next to a wide sidebar can lay out one way; the same card in a narrow column lays out another. Components become genuinely portable.

## CSS Grid for Layout

Flexbox is for arranging items along an axis. Grid is for arranging items in two dimensions. Most layouts that used to need nested flex containers collapse into a single grid declaration.

```css
.layout {
	display: grid;
	grid-template-columns: 240px 1fr;
	grid-template-rows: auto 1fr auto;
	min-height: 100vh;
}
```

Pair it with `grid-template-areas` for layouts that read like ASCII art.

## :has() : The Parent Selector

Possibly the most-requested CSS feature ever. Style a parent based on its children:

```css
.card:has(img) {
	padding-top: 0;
}

form:has(input:invalid) button[type="submit"] {
	opacity: 0.5;
}
```

This deletes an enormous category of "add a class with JavaScript" patterns.

## Logical Properties

Instead of `margin-left`, write `margin-inline-start`. Instead of `padding-top`, write `padding-block-start`. The result: layouts that mirror automatically for right-to-left languages without a separate stylesheet.

```css
.card {
	padding-inline: 1rem;
	margin-block: 2rem;
}
```

## Color Functions

`color-mix()` lets you blend colors in any color space, finally giving us the "tint by 10%" operation that designers actually want.

```css
.button:hover {
	background: color-mix(in srgb, var(--accent), white 15%);
}
```

## Aspect Ratio

Locking aspect ratio without padding-hacks:

```css
.video-thumbnail {
	aspect-ratio: 16 / 9;
}
```

## Conclusion

The CSS of 2024 is closer to a real layout system than the CSS of 2014. Most "I need a JavaScript library for this" needs are now native one-liners. Re-learn the language : it's much better than you remember.
