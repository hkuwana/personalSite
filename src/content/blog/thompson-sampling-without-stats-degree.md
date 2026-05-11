---
title: "Thompson Sampling Without a Stats Degree"
date: 2026-05-03
readTime: 7 min read
excerpt: A working developer's intro to multi-armed bandits for product A/B tests. Includes the 30-line Node implementation, why it beats classical A/B in most real situations, and the failure modes nobody warns you about.
tags: [AI, Experiments, Tutorial]
featured: false
---

You have three versions of an onboarding flow. You'd like to know which converts best. Classical advice: "Run an A/B test, gather n users, compute p-values, declare a winner." Reality: by the time you've gathered n users, your three flows have been three meetings and someone already shipped a fourth.

There is a better default for product teams: **Thompson Sampling**. It's a multi-armed bandit algorithm that decides where to send traffic *as data comes in*, so the winning variant gets more share as the experiment runs. No p-values. No fixed sample size. Thirty lines of code.

This post is what I wish someone had given me before I wrote my first bandit.

## The intuition

Imagine three slot machines. You don't know the payout rate of any of them. You can either:

- **Pure exploration.** Pull each machine equally often forever. Maximises information, minimises money.
- **Pure exploitation.** Find the best one early and only pull that. Maximises short-term winnings, but if you got unlucky on the first few pulls of the *actually-best* machine, you'll miss it forever.

Thompson Sampling is the elegant middle: it pulls each machine with probability proportional to *its belief that this machine is the best*. As you accumulate data, belief sharpens. The best machine gets pulled more. The worst, less. The exploration/exploitation trade-off resolves itself.

For "machines," read: variants of your onboarding copy, your prompt, your CTA button, your model temperature.

## The math, in one paragraph

For each arm (variant), maintain two counters:

- `successes` : how many times this arm "won" (a user converted, a session reached 8 messages, whatever your success criterion is)
- `failures` : how many times this arm didn't win

At decision time, for each arm, sample a random number from a `Beta(successes + 1, failures + 1)` distribution. The arm whose sample is highest wins this round.

That's it. The Beta distribution naturally produces wide samples when you have little data (so under-explored arms get a chance), and tight samples when you have lots of data (so the winner consistently wins).

## The code, in JavaScript

```js
function sampleBeta(alpha, beta) {
	// Gamma sampling trick: Beta(a, b) = X / (X+Y) where X~Gamma(a), Y~Gamma(b)
	const x = sampleGamma(alpha);
	const y = sampleGamma(beta);
	return x / (x + y);
}

function sampleGamma(shape) {
	// Marsaglia & Tsang for shape >= 1; sufficient when we add 1 to counts
	const d = shape - 1 / 3;
	const c = 1 / Math.sqrt(9 * d);
	while (true) {
		let x, v;
		do {
			x = gaussian();
			v = 1 + c * x;
		} while (v <= 0);
		v = v * v * v;
		const u = Math.random();
		if (u < 1 - 0.0331 * x * x * x * x) return d * v;
		if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
	}
}

function gaussian() {
	const u = 1 - Math.random();
	const v = Math.random();
	return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function pickArm(arms) {
	let best = null;
	let bestScore = -Infinity;
	for (const [name, { successes, failures }] of Object.entries(arms)) {
		const score = sampleBeta(successes + 1, failures + 1);
		if (score > bestScore) {
			bestScore = score;
			best = name;
		}
	}
	return best;
}
```

In production you'd want to use a library (`simple-statistics` has Beta sampling) but the above is enough to understand and run.

## Wiring it into a product

The pattern:

1. Each user session is assigned an arm. Stamp the session with the arm name.
2. When the session ends, you know whether it succeeded by your criterion (long enough, deep enough, converted, whatever).
3. Each night, a script:
   - Pulls the last 24h of sessions.
   - Tallies success/failure per arm.
   - Updates the arm counters in a state file.
   - Samples once per arm, picks the winner, writes the recommendation.
4. Your runtime reads the recommendation file and weights traffic accordingly. (Or assigns arms with weighted-random based on the posteriors directly.)

Notice: there's no statistical test, no p-value, no "is the difference significant?" The Beta posterior *is* the significance. When one arm dominates, sampling rarely picks the others.

## What "success" should be

This is the part everyone gets wrong on their first bandit.

Bad success criteria:

- "User clicked the button." (One-shot, doesn't reflect downstream value.)
- "User said yes in a survey." (Self-report is unreliable.)
- "An LLM judge rated this 8/10." (See: the proxy-metric trap.)

Good success criteria:

- "Session duration ≥ 180 seconds AND message count ≥ 8."
- "User returned within 7 days."
- "Purchase completed in this session."
- "Email reply received within 48 hours."

The criterion should be:

- **Boolean.** Yes-or-no per session. Bandit math is built on Bernoulli outcomes.
- **Cheap.** Computed from data you already have.
- **Tied to value.** Moving this number should mean the product got better.

## The stability problem

Thompson Sampling on thin data is volatile. With 5 sessions per arm, posteriors are wide and recommendations flip nightly. This is fine for the math : the algorithm is doing exactly what it should : but it's a disaster for human decision-making, because you'll have meetings about a winner that changes by Friday.

The fix: record the recommendation every night in a TSV, and only consider an arm "STABLE" if:

- It has been recommended for ≥5 consecutive nights, AND
- The winner has ≥20 success-eligible sessions, AND
- Its posterior probability of being best is ≥ 70%.

Until all three hold, the bandit's recommendation is *information*, not a *decision*. Run, don't promote.

## Failure modes nobody warns you about

**1. Reward delay.** If conversion happens 7 days after the session, your bandit is making decisions on stale arms. Either define a faster proxy success, or hold the bandit's recommendations for 7 days before consuming them.

**2. Drift.** If your user mix changes (e.g., a marketing campaign brings in a new cohort), an arm that was winning may stop winning, and your bandit will take time to notice. Periodically reset the counters to ~10% of current, so old data doesn't dominate forever.

**3. Arm explosion.** Six arms is plenty. Twelve arms means each arm gets too few sessions per night to learn anything. If you want to test six factors, find a way to express it as one parameter at a time, not the Cartesian product.

**4. Reward hacking.** If your success criterion is gameable, the bandit will find the game. "Session duration" is a classic example: any arm that confuses the user keeps them in-session longer.

**5. Confounded arms.** If two of your "arms" are actually the same prompt with a typo, the bandit will detect no difference and split traffic forever. Make arms different in ways you can defend in a sentence.

## When to use it, when not to

**Use Thompson Sampling when:**

- You have a continuous stream of users you can route between variants.
- Success can be measured per session, in under a week, as a boolean.
- The cost of running a "losing" arm is low.
- You don't have a clean statistical sample size in mind anyway.

**Don't use it when:**

- The decision is one-shot and high-stakes (a redesign launch).
- The variants are large, expensive engineering investments where you'd want a real A/B.
- You need to *prove* a winner to a stakeholder who wants p-values. (Bandit results are believable but not formally significance-tested.)

## A weekend project

Take the lowest-stakes variant decision you have on your product. Write three arms. Implement the 30-line bandit above. Stamp sessions. Run it for two weeks.

You will, with very high probability, end up with one of two outcomes:

- One arm is clearly winning by week two. You'll have learned which.
- All three arms are statistically indistinguishable. You'll have learned that too (and saved yourself shipping a "winner" that wasn't).

Both outcomes are wins. The losing scenario : where you ran a bandit and learned nothing : almost doesn't exist, because *learning nothing is itself information*.
