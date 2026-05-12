---
title: "The program.md Pattern: How to Brief an AI Like a Runbook"
date: 2026-05-01
readTime: 6 min read
excerpt: One file per AI task, structured like an oncall runbook. Goal, allowed files, forbidden files, loop, stopping criteria. This is what separates AI experiments that compound from AI experiments that drift.
tags: [AI, Claude, Writing]
featured: false
---

Most AI workflows die not because the model is bad, but because no one wrote down what the model was supposed to do. After the third "I asked it to refactor X but it ended up rewriting Y" incident, you start to suspect the problem isn't the AI.

The fix is borrowed from infrastructure: write a runbook. Not for humans, for the model. One per task. Keep it short. Keep it explicit. The convention I use is to name it `program.md` and put it next to the code it governs.

This post is the shape of that file, the reasons each section exists, and why this single change shifts AI work from chaos to compounding.

## Why "program," not "prompt"

A prompt is what you type when you want one thing. A program is what you write when you want the *same* thing, reliably, over time, by something that doesn't have memory.

`program.md` is the file the model reads at the start of every iteration. If you change the file, the program changes. If you don't, every run is the same run. That property : *idempotent re-runnability* : is what makes AI work compound instead of drift.

## The minimum viable program.md

```markdown
# {Name of the task in one line}

## Goal
{Two sentences. What's the desired state at the end? What's the *measurable*?}

## Allowed files
- {explicit path}
- {explicit path}

## Forbidden
- {explicit path}
- {explicit path}

## Loop
1. {first step, observable}
2. {second step, observable}
3. ...

## Stopping criteria
{When does this end? Or: "Never stop, never ask."}
```

That's it. Five sections. No prose. Read it in 30 seconds. Implement it in five minutes.

## Section-by-section, with the reasoning

### Name (one line)

Not the task description. The *name*. "Performance experiment loop." "Daily SEO monitor." "Translation key coverage check."

A file that doesn't have a short name doesn't have a clear scope. If you can't name it, you don't yet know what it does.

### Goal (two sentences)

Sentence 1: what state of the world should exist at the end of a run?  
Sentence 2: what *number* measures whether sentence 1 happened?

```markdown
## Goal
Reduce the time-to-interactive on / for desktop. Measured by `benchmark.js`, lower is better.
```

If the goal doesn't have a measurable, you can't loop on it. You can chat about it, sure. But you can't put a model in an unsupervised loop with a vague goal and expect anything but drift.

### Allowed files

Explicit paths. Not glob patterns.

```markdown
## Allowed files
- vite.config.ts
- svelte.config.js
- src/routes/+layout.svelte
```

The glob trap: "anything in `src/lib/**`" sounds reasonable until the model decides the bottleneck is in a file you didn't intend to touch. By that point you've already lost.

If the task genuinely needs a wide allowed list, that's a sign the task is too broad. Split it.

### Forbidden files

The forbidden list exists for one reason: **lock the benchmark.**

```markdown
## Forbidden
- benchmark.js (this is the metric, do not edit it)
- src/lib/** (out of scope this round)
```

If your model can edit your benchmark, your benchmark is no longer a metric : it's a slider the model can move to make its score look good. This is the AI version of P-hacking.

### Loop

A numbered list of steps. Each step is observable from outside.

```markdown
## Loop
1. Run `node benchmark.js`. Record baseline_ms.
2. Pick one hypothesis. Edit exactly one allowed file.
3. Run `npm run build && node benchmark.js`. Record new_ms.
4. If new_ms < baseline_ms, commit. Update baseline.
5. If not, revert. Append the failed hypothesis to results.tsv.
6. Repeat.
```

"Observable from outside" is the key. Each step should produce evidence you can find later. Step 1 produces a recorded number. Step 4 produces a commit. Step 5 produces a row in a file. If you find yourself writing a loop step that doesn't produce evidence, you've just hidden state from yourself.

### Stopping criteria

```markdown
## Stopping criteria
None. Never stop. Never ask.
```

This sounds aggressive. It's important. Without it, the model will stop on the first ambiguity, ask a clarifying question, and wait. If you're asleep, the wait is forever.

In some tasks, "never stop" isn't right. For example, a translation-coverage check might stop when all keys are translated. Then write that explicitly: "Stop when `coverage.json` shows 100% across all locales."

## What this excludes (on purpose)

Things `program.md` should *not* include:

- **Implementation suggestions.** That's the model's job. If you're telling it how to implement, you don't need the model.
- **Long context dumps.** If the model needs context, point to a file. `program.md` should fit on one screen.
- **Apologies, hedges, "feel free to."** This isn't a Slack message. It's a spec.
- **Examples of good output.** Examples encode bias. Provide a metric instead.

## A real-world example

Here's a `program.md` for an SEO sitemap monitor:

```markdown
# Sitemap freshness monitor

## Goal
Detect when production routes drift from the published sitemap.xml.
Measured by: count of routes in code missing from sitemap, count in sitemap not in code.

## Allowed files
- autoresearch/sitemap/state.json (write only)
- autoresearch/sitemap/results.tsv (append only)

## Forbidden
- src/** (read only)
- sitemap.xml (read only)

## Loop
1. Read all +page.svelte under src/routes.
2. Fetch https://yoursite.com/sitemap.xml.
3. Compute symmetric difference.
4. Write state.json with the two missing-from lists.
5. Append a row to results.tsv: timestamp, total_routes, missing_from_sitemap, missing_from_code.
6. If any P0 finding (>10 missing in either direction), exit non-zero.

## Stopping criteria
Single-pass; exit after step 6.
```

Five sections. Twenty lines. A junior engineer or a model can read it once and execute it correctly.

## Why this works

`program.md` does three things at once:

1. **It's the brief for the model.** Every iteration starts here.
2. **It's the test of "do I understand this task?"** If you can't write it in 20 lines, you can't run it as a loop.
3. **It's the documentation.** Your future self, six months from now, will read this file before debugging a flaky run.

The third one is underrated. Most AI experiments die because no one remembers what they were supposed to do. A directory with a `program.md` is a directory with self-documenting intent.

## The single behavior change

If you take nothing else from this post: **don't run an unsupervised AI task without writing the `program.md` first.**

The temptation is to "just try a prompt and see what happens." Sometimes that's the right move : exploratory chat is a perfectly fine mode. But the second you start running a thing on a loop, in a cron, overnight : write the file. The 5 minutes you spend writing it save 5 hours of "why did it do that?"

The pattern works for human collaborators too, by the way. The same five sections work for an intern's project brief. That's not a coincidence.
