---
title: "Getting Started with Svelte 5: A Complete Guide"
date: 2024-01-15
readTime: 8 min read
excerpt: Explore the new features in Svelte 5, including runes, fine-grained reactivity, and improved performance. This comprehensive guide will help you understand and leverage the power of Svelte 5 in your projects.
tags: [Svelte, JavaScript, Tutorial]
featured: true
---

Svelte 5 introduces a revolutionary new way to handle reactivity in your applications. With the introduction of runes, Svelte has evolved from a compiler-based framework to something even more powerful and intuitive.

## What are Runes?

Runes are special symbols that tell Svelte how to handle reactivity. The most important ones are:

- `$state` : Declares reactive state
- `$derived` : Creates computed values
- `$effect` : Runs side effects when dependencies change
- `$props` : Declares component props

## Creating Reactive State

In Svelte 5, you create reactive state using the `$state` rune:

```js
let count = $state(0);

function increment() {
	count++;
}
```

## Derived Values

When you need values that depend on other reactive values, use `$derived`:

```js
let count = $state(0);
let doubled = $derived(count * 2);
```

## Side Effects

The `$effect` rune replaces the old `$:` reactive statements for side effects:

```js
$effect(() => {
	console.log('Count changed:', count);
});
```

## Why This Matters

These changes make Svelte more predictable and easier to reason about. The explicit nature of runes means you always know exactly what's reactive and what isn't.

## Conclusion

Svelte 5 represents a significant step forward for the framework. The new runes system provides more explicit control over reactivity while maintaining the simplicity that makes Svelte so approachable.
