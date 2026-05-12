---
title: "From Chat to Cron: Setting Up Claude as an Overnight Research Assistant"
date: 2026-05-07
readTime: 8 min read
excerpt: For people who've used Claude in a chat window and wondered : can it just keep going on its own? Yes. Here is what to give it and what to take away.
tags: [AI, Claude, Tutorial]
featured: false
---

For people who've used Claude in a chat window and wondered: *can it just keep going on its own?*

Yes. The trick is knowing what to give it (a clear job, a way to score itself, files it's allowed to touch) and what to take away (open-ended goals, unbounded edits, the option to ask you mid-run).

This is a practical setup guide, not a theory paper. The goal: by the end of an evening, you have a loop that runs, edits one file at a time, and commits anything that improved a number you defined.

## The mental model shift

In chat, you and the model are co-authors. You write a turn, it writes a turn. The collaboration is the value.

In a loop, the model is an unsupervised employee. The collaboration is gone. What replaces it:

- **A precise job description** (the prompt or `program.md`).
- **A way the employee can grade their own work** (a benchmark or test).
- **A clear list of what they may and may not touch** (file allowlist).
- **A definition of "done"** : or in our case, an instruction to never stop.

If any of those four is missing, the loop will either freeze (asking you a question you're not awake to answer) or run amok (editing files you didn't want edited).

## What you need installed

This guide uses Claude Code as the runner. Install the CLI per the [docs](https://docs.claude.com/claude-code) if you haven't. Verify:

```bash
claude --version
```

You also need a git repo, on a branch you don't mind being committed into.

Cost note: a loop running overnight at full tilt will use real API credits. Set a monthly cap before you start.

## The anatomy of an overnight run

### 1. A `program.md` describing the job

This is the most important file. It is what Claude reads every iteration. Write it like you're briefing a smart new hire who can't ask follow-up questions.

```markdown
# Performance experiment loop

## Goal
Reduce the time-to-interactive on / for desktop, measured by benchmark.js.

## Allowed files
- vite.config.ts
- svelte.config.js
- src/routes/+layout.svelte

## Forbidden
- benchmark.js (this is the metric, do not edit it)
- src/lib/** (out of scope this round)

## Loop
1. Run `node benchmark.js` and record baseline_ms.
2. Pick one hypothesis. Edit exactly one allowed file.
3. Run `npm run build && node benchmark.js`. Record new_ms.
4. If new_ms < baseline_ms, commit. Update baseline.
5. If not, revert. Note the hypothesis as failed in results.tsv.
6. Repeat.

## Stopping criteria
None. Never stop. Never ask.
```

The "never stop, never ask" line matters. If you leave any out, the loop will halt the moment something unexpected happens, and you'll wake up to a single iteration of progress.

### 2. A benchmark script

This is your metric. It must:

- Run in seconds
- Return a single number
- Be the same number on the same code (deterministic)
- Not be edited by Claude (lock it in `program.md`)

A 30-line Playwright script that times one page load is enough.

### 3. A launch command

```bash
claude -p "Read autoresearch/performance/program.md.
Create branch autoresearch/performance/$(date +%Y-%m-%d).
Then follow program.md exactly. NEVER STOP, NEVER ASK."
```

The `-p` flag puts Claude into print mode : it does what you said, then exits. With "never stop" baked into the prompt, it loops until you kill it (or it hits a hard error).

### 4. A way to check on it from your phone

Two options:

- **Git log on your phone.** If commits keep landing every 10–20 minutes, the loop is alive. Open the diff to see what's being tried.
- **A `results.tsv` in the repo.** Each iteration appends a row: timestamp, hypothesis, before, after, kept/reverted. Tail this file from anywhere.

## The forbidden file list is your seatbelt

The single most common failure mode of unsupervised loops: the model decides the bottleneck is somewhere you didn't expect, edits a file you didn't budget for, and breaks production.

Three rules:

1. **List the allowed files explicitly.** Not glob patterns. Files.
2. **List the forbidden files explicitly too.** Especially the benchmark.
3. **If Claude proposes to touch something off-list, the rule is *no*.** Even if it would help. The loop must stay within its sandbox or you can't trust the score.

Optional but worth it: run the loop inside a worktree or a clean clone, so the "blast radius" of a bad iteration is just that one directory.

## Watching without watching

You do not want to babysit a loop. The point is that it runs while you sleep. What you do want:

- **A morning routine of 5 minutes:** `git log --oneline | head -20` and `cat results.tsv | tail -30`. Did anything land? Did the metric move? Are there obvious dumb hypotheses you want to ban?
- **A daily cap.** If your billing dashboard shows the run cost more than $X, you stop and look at what it was doing.
- **A "max wall-clock time" you walk away with.** 8 hours of overnight is plenty. After that, kill it and read.

You are not optimizing the loop in real time. You are reading its output the next morning, and deciding whether to refine `program.md` for the next night. That's the actual collaboration.

## What to run this on, first

Don't pick "make my product better." That's not a loop, that's a wish.

Good first loops:

- **Bundle size.** Metric = output of `du -b dist/`. Allowed files = build config. Goal: reduce the number.
- **Test runtime.** Metric = wall-clock of `npm test`. Allowed files = test setup, mock factories. Goal: shrink the number without dropping coverage.
- **Lighthouse score on /.** Metric = JSON output of `lighthouse https://localhost:5173`. Allowed files = layout, image components.

Each of these has a cheap, deterministic, locally-runnable score. That's what makes them loop-able.

Bad first loops:

- "Make the copy on the landing page convert better." (No local score.)
- "Improve the onboarding." (Score is your users, who are not awake at 3am to be A/B-tested.)
- "Refactor the codebase." (No objective metric. The loop will hill-climb arbitrary aesthetics.)

If a loop topic doesn't have a clean number, it's not a loop topic. Yet. Maybe a chat session, maybe a feature flag and a bandit. Not an overnight run.

## Common gotchas

**Context bleed.** Long-running loops can lose track of what they've already tried. Have them append every attempt to `results.tsv` with a one-line summary. Tell them to read it before proposing the next hypothesis.

**Rate limits.** Long runs hit them. Build in retries with exponential backoff. If the API is unreachable for >10 minutes, exit cleanly.

**Infinite "thinking".** Some loops can get stuck in analysis without an edit. The fix: in `program.md`, require an actual file change every N minutes.

**Cost.** If you don't cap, you can spend a hundred dollars overnight without noticing. Set a hard cap in your Anthropic dashboard. Re-set it monthly.

**Hot branches.** Run the loop on its own branch. Never on `main`. If something goes wrong, you delete the branch. No cleanup required.

## Your first 60-minute experiment

Tonight, before you sleep:

1. Pick a metric on your project that you can measure in 5 seconds with a script.
2. Write `program.md`: goal, allowed files, forbidden files, the 6-step loop.
3. Write the benchmark script. Verify it returns a number.
4. Run `claude -p "Read program.md. Loop. Never stop, never ask."` in a tmux session.
5. Walk away.
6. In the morning, read `git log` and `results.tsv`.

You will be surprised by something. Either it landed three real improvements and you're impressed, or it looped on one bad hypothesis all night, or it crashed at iteration 4 because of a rate limit.

All three outcomes are useful. The point isn't that this loop is good : it's that *you now have the mechanic*. From here, every refinement is an edit to `program.md`.

## What this is not

This setup is not how you optimize user-facing copy, onboarding flow, or anything that requires a real human reading the output. Those need feature flags, real traffic, and patience.

This setup *is* how you optimize anything with a real, local, fast, deterministic metric : performance, bundle size, test speed, build time, code-coverage. That covers a surprising amount of engineering work, and a loop will out-grind any human who tries to do it by hand.

The shift in mindset: stop thinking about Claude as a smarter autocomplete, and start thinking about it as an unsupervised employee. Then ask: would you let an unsupervised employee touch this code with these instructions? If yes, loop it. If no, sharpen the instructions until yes.
