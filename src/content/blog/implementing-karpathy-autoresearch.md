---
title: "Implementing Karpathy's Autoresearch: A README-Style Guide"
date: 2026-05-11
readTime: 12 min read
excerpt: A practical, opinionated walkthrough for adding an autoresearch directory to your own product : the kind that wakes up at night, checks real signals, and tells you what to fix in the morning.
tags: [AI, AutoResearch, Claude, Experiments]
featured: true
---

A practical, opinionated walkthrough for adding an `autoresearch/` directory to your own product : the kind that wakes up at night, checks real signals, and tells you what to fix in the morning.

This is the version I wish I'd had before I built mine. It is shaped after the [karpathy/autoresearch](https://github.com/karpathy/autoresearch) pattern, but adapted for product code, not pre-training research. If you ship a website, a SaaS, an app : this is for you.

## What you'll have at the end

A directory inside your repo, e.g.

```
autoresearch/
├── README.md                 # the spec (you'll read this on call 4am)
├── run-all.js                # one orchestrator, runs everything
├── watchdog/                 # reads real user pain from analytics
├── bandit/                   # Thompson Sampling A/B tests
├── lighthouse-performance/   # perf regression guard
├── seo/                      # sitemap + IndexNow freshness
├── i18n/                     # translation coverage
├── keywords/                 # blog content gaps
├── structured-data/          # JSON-LD validation
└── performance/              # (optional) Claude-CLI overnight experiments
```

Most of these are **monitoring loops** : Node scripts that read a signal and report. One of them, `performance/`, is an **experiment loop** : Claude can edit code, run a benchmark, keep it if it's faster, revert otherwise. No LLM scoring anywhere. Score must be cheap, deterministic, and tied to real signal.

## The shape of Karpathy's idea

> "Any metric reasonably efficient to evaluate… with more efficient proxy metrics." : Karpathy

Karpathy's setup works because LLM pre-training has an **ideal** scoring function. Validation loss is:

- **cheap** : a few minutes
- **deterministic** : same data, same result
- **fixed-time** : 5-minute budget per experiment
- **transferable** : score at small scale predicts large scale

So you can launch dozens of experiments overnight, every score is comparable, and the agent climbs a real gradient.

Your product probably has none of these. That's why naive ports of autoresearch fail. The clue is in the metric: if you can't score a candidate in 30 seconds with a script, you can't autoresearch the thing yet.

## The trap (read this first)

The seductive idea: "I'll have GPT-4 judge my outputs, and the agent will optimize the score."

Here is what actually happens:

| Karpathy's setup            | Naive product-copy port                         |
| --------------------------- | ----------------------------------------------- |
| Cheap, deterministic metric | GPT-4o judge : slow, $$, noisy, drifts          |
| Fixed 5-min time budget     | Simulated conversation : variable, unstable     |
| Score transfers to prod     | LLM judge ≠ real user behavior                  |
| Ceiling is clear            | No ceiling; agent hill-climbs to the judge bias |

The agent will get amazing scores against your judge. Your users won't notice. Your judge has biases (verbosity, formality, structure) and the agent finds them faster than humans can. You'll ship the "winner", retention will not budge, and you'll be confused.

We had `composer/`, `onboarding/`, and `outreach/` loops paired with LLM judges. We removed them all. The signal was theatre.

## The proxy-metric decision tree

Walk this top-to-bottom every time you want a new loop. **Stop at the first "yes":**

1. **Is there an analytics event that fires when this feature works?** → Read it directly. Watchdog or bandit pattern.
2. **Is there a file-level property you can compute without an LLM?** (char count, regex, JSON-LD validates, i18n key exists) → 10 lines of Node.
3. **Can a rule-based script compute a yes/no rubric?** (greeting includes name, turn < 12 words, message mentions creator's channel) → Rules as code. Accumulate booleans.
4. **Can you A/B the change and read real user outcomes?** → Ship behind a flag, let bandit do Thompson Sampling. Slow but real.
5. **Only if 1–4 all fail:** consider an LLM judge. Document why 1–4 failed. Cross-validate against ≥20 hand-labeled samples (need ≥80% agreement). Cap the score's weight so real signal has the final word.

If your loop is at step 5 by default, you are about to waste two weeks. Go back to step 1.

## The monitoring loop pattern

A monitoring loop is a Node script that reads one signal and writes a JSON state file. That's it. No LLM. No agent. Cron-friendly.

Skeleton:

```js
// autoresearch/seo/seo-monitor.js
import fs from 'node:fs';

const STATE = 'autoresearch/seo/seo-monitor-state.json';

async function main() {
	const sitemap = await fetch('https://yoursite.com/sitemap.xml').then((r) => r.text());
	const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

	const findings = [];
	if (urls.length < 50) findings.push({ severity: 'P1', msg: 'Sitemap looks thin' });

	const prior = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : {};
	const next = { lastRun: new Date().toISOString(), urlCount: urls.length, findings };

	fs.writeFileSync(STATE, JSON.stringify(next, null, 2));
	printDiff(prior, next);
}

main();
```

Rules I follow:

- **State files are versioned.** Commit them after a run. Diff is the report.
- **Severity tags are P0–P3.** A pager-style scale forces you to be honest about urgency.
- **Findings include a fix hint.** "Sitemap is thin : run `npm run build:sitemap`."
- **One signal per loop.** Two signals is two loops.

## The bandit pattern (real A/B tests with no humans involved)

For decisions where signal isn't a one-shot check : e.g., "which onboarding copy converts better?" : a script-based bandit handles it.

Each "arm" is a hypothesis. Each session is observed by analytics. Thompson Sampling decides where to send traffic. Over time, the winner gets more share. No PM meetings, no p-value debates.

```js
const ARMS = {
	control: { hypothesis: 'Baseline' },
	high_challenge: { hypothesis: 'Advanced users want sparring not cheerleading' },
	warm_support: { hypothesis: 'Low-confidence users need safety first' }
};

// Each night:
// 1) Pull last 24h of sessions, tagged with which arm served them
// 2) Compute success = (duration ≥ 180s) AND (messages ≥ 8)
// 3) Update Beta(α, β) posteriors per arm
// 4) Sample from each posterior; recommend the arm with highest sample
// 5) Write recommendation to state file
// 6) Emit a stability verdict
```

The verdict is the discipline:

- **STABLE** : same arm recommended ≥5 nights in a row, ≥20 sessions on winner. Promotable.
- **LEANING** : majority but not unanimous. Keep running.
- **EXPLORING** : recommendation is flipping. Do not promote.

Thompson Sampling on thin data flips daily. The stability window keeps you from celebrating noise.

## The experiment loop pattern (advanced, optional)

This is the one Claude actually drives. You only do this if you have:

- A **deterministic local benchmark** that finishes in seconds
- A clearly bounded set of files Claude is allowed to edit
- The discipline to revert anything that doesn't improve the metric

For example, `autoresearch/performance/`:

- Benchmark = Playwright timing of "navigate to /, render hero, click CTA"
- Allowed files: `vite.config.ts`, `svelte.config.js`, layout files
- Loop: hypothesize → edit one file → build → benchmark → keep if faster, revert otherwise → commit

Launch:

```bash
claude -p "Read autoresearch/performance/program.md and autoresearch/performance/benchmark.js.
Create branch autoresearch/performance/$(date +%Y-%m-%d).
Run baseline, then loop forever:
hypothesize → edit one allowed file → build+bench → keep if score_ms drops, revert otherwise.
Commit every kept change. NEVER STOP, NEVER ASK."
```

The metric here meets all four Karpathy criteria: cheap, deterministic, fixed-budget, and transferable. That's the only reason it works.

## Stability and promotion discipline

Bandit verdicts tell you what's winning. Promoting that winner to "the new default" requires three independent confirmations:

| Dimension          | What to check                                                                       | Where                                       |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------- |
| **Runtime wiring** | The winning arm is actually serving traffic. Events carry its tag.                  | Analytics : winner's `sessions_seen` rises. |
| **Signal**         | STABLE verdict for ≥5 nights, ≥20 winner sessions, posterior win-probability ≥ 70%. | Bandit state file, history TSV.             |
| **Docs parity**    | Experiment tracker has hypothesis, observed lift, and "promoted on {date}".         | `docs/experiment-tracker.md`.               |

If any column is empty, keep running. A pretty graph alone is not a promotion.

Rollback is symmetric: revert runtime, give bandit 3 nights at the old default, update docs with what went wrong. Don't delete the losing arm immediately : leave it for a week of reduced exploration. If it wins on a different cohort, that's information.

## File structure as spec

The folder layout *is* the contract. Each loop is a directory. Inside:

```
loop-name/
├── program.md         # what this loop is for, in one screen
├── state.json         # the most recent reading (versioned, diff = report)
├── loop-script.js     # the actual code
└── results.tsv        # history, append-only
```

`program.md` matters more than you think. It is the file Claude (or your future self) reads at 2am when something's broken. Write it like a runbook: the one signal, the threshold, the action on red.

## Common failure modes

- **LLM-as-judge for product copy.** It feels productive. It is hill-climbing. Delete it.
- **Promoting on a single good night.** Bandit flips on thin data. Wait for the stability verdict.
- **No rollback path.** If you can't revert the default in 5 minutes, you can't experiment.
- **Adding a 10th loop before the first 3 are stable.** Loops that don't run for a week are dead code.
- **Skipping the state-file diff.** The diff *is* the report. Read it. Or no one reads the loop.
- **Letting Claude edit the benchmark.** The benchmark is the metric. Lock it.

## Where to start (this week)

You don't need ten loops. You need one that survives a week of nightly runs.

1. Pick one signal you already track. (Lighthouse score. Sitemap URL count. PostHog event count.)
2. Write a 30-line Node script. Read the signal. Write a state JSON. Commit it.
3. Add a cron or a GitHub Action. Run it nightly.
4. After a week, read your state diffs. Anything change? Is the change actionable?
5. If yes : add a second loop. If no : tighten the first one, don't add more.

The discipline of *reading the output every morning* is what separates autoresearch from cargo-cult automation. Build the habit before you build the system.
