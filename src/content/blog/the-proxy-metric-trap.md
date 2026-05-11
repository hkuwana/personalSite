---
title: "The Proxy-Metric Trap: Why Your LLM Eval Loop Is Probably Lying"
date: 2026-05-09
readTime: 6 min read
excerpt: A short, hard-earned post about the single most expensive mistake I see teams make with AI : letting another LLM judge the work. If you have a score function that's a prompt, this is for you.
tags: [AI, Evaluation, Experiments]
featured: true
---

A short, hard-earned post about the single most expensive mistake I see teams make with AI: letting another LLM judge the work.

If you have a "score function" anywhere in your stack and that score function is a prompt, this post is for you.

## The shape of the trap

The pitch is irresistible. You want to optimize *something soft*: a welcome message, an onboarding flow, an outreach email, a tone of voice. You can't measure it with a regex. You don't have enough users yet to A/B it. So you do the obvious thing:

> "I'll just have GPT-4 score the outputs and let the agent optimize."

The first time you run it, the scores go up. The outputs look great. You ship.

A month later: retention is flat, conversion is flat, the metric you actually care about has not moved a millimetre. What happened?

Your agent learned the judge's bias faster than it learned your users.

## Why this happens, in one paragraph

LLM judges are not measuring quality. They are measuring **distance to whatever pattern the judge prefers**. That pattern includes: verbosity, structure, hedging, helpful-assistant tone, certain rhetorical moves. None of these are the same as "this works for the person reading it." When you put an agent in a loop with such a judge, the agent finds the bias faster than a human ever could and climbs it. The score goes up. The product gets worse, or stays the same, dressed up in a more LLM-shaped costume.

This is not theoretical. We ran loops like this. They produced gorgeous "winners" that did not improve a single real metric. We deleted them.

## What a good metric actually looks like

Karpathy's autoresearch works because pre-training has the perfect scoring function: validation loss. It is:

- **cheap** : seconds to compute
- **deterministic** : same input, same output
- **fixed-time** : 5-minute budget per experiment
- **transferable** : the score at small scale predicts the score at large scale

Your candidate metric should pass all four tests. If your "score" is "ask GPT-4 to rate this from 1-10," it fails on **deterministic** (judges drift run to run, model to model), it fails on **fixed-time** (you pay per call), and it fails hard on **transferable** (a high LLM-score does not predict user behavior).

If three of the four are missing, you are not measuring. You are LARPing measurement.

## The four-step ladder before you reach for an LLM judge

This is the checklist I run every time someone proposes a new "scored loop":

### 1. Is there an event you already log when this works?

If your funnel has `signup_completed`, `first_message_sent`, `tutorial_finished`, `purchase_succeeded` : that is the metric. Don't build a fancy judge to predict the event. **Read the event.**

Cost: 30 lines of Node and an API key.

### 2. Can a regex or schema-validator tell you yes/no?

"The generated JSON parses." "The email subject is under 60 chars." "The greeting includes the user's first name." "JSON-LD validates against schema.org."

These are tiny scripts. They give you a real boolean. The agent cannot hill-climb a regex without actually fixing the thing.

Cost: 10 lines of Node.

### 3. Can a rule-based rubric produce a yes/no score?

Break "quality" into checklist items:

- Mentions creator's channel? (boolean)
- Asks one question, not three? (boolean)
- Stays under 12 words? (boolean)
- Avoids the phrase "as an AI"? (boolean)

Sum the booleans. That is a rubric score. It's still cheap. It's still deterministic. And critically, it's debuggable : when a score is wrong, you can point at the rule.

Cost: 50–200 lines of Node.

### 4. Can you A/B it with real users?

Even slow A/B is better than fast LLM-judging. Put two variants behind a flag. Send users to them. Read the outcome event. Let a bandit decide who wins.

Cost: a feature flag, a week, and patience.

### 5. (Only if 1–4 fail) Maybe an LLM judge

When you genuinely cannot get signal any other way, and the alternative is shipping blind, an LLM judge can play a small role. The rules:

- Document why steps 1–4 failed. In writing. To yourself.
- Hand-label ≥20 samples. Cross-check the judge against your labels. You want **≥80% agreement**. If you get less, fix the prompt or kill the judge.
- Cap the score's weight. If you also have real-user data, the real data has the final word.
- Re-validate the judge every model version bump. They drift.

If the judge is the *only* score in your loop : stop. Go back to step 1.

## The "but I have to optimize copy" objection

A common pushback: "I'm optimizing chat copy / outreach tone / marketing language. There is no clean metric."

Yes there is. It's just slow.

- Ship the change behind a flag.
- Tag the sessions with which variant they saw.
- Look at the downstream event you care about (replies, conversion, retention).
- Let a bandit do Thompson Sampling and shift traffic over weeks.

This is slower than a 5-minute LLM-judge loop. It is also the only way you find out if the change actually works. The autoresearch loops worth running are the slow honest ones, not the fast theatrical ones.

## A 15-minute audit you can run right now

Open the spreadsheet or scratchpad where you track "AI experiments." For each one:

1. **What's the score function?** Write it in one sentence. If you can't, the loop is unfalsifiable. Pause it.
2. **Is the score cheap, deterministic, and tied to real signal?** If no on any of those three : the loop is producing theatre. Mark it red.
3. **If you removed the loop tomorrow, would you lose any decision-quality?** If you'd lose nothing : it's dead weight. Kill it.

Most teams that do this discover half their "AI experimentation infrastructure" is theatre. The remaining half is where all the value is.

## The one-line takeaway

> If your score function is itself an LLM, you are not measuring : you are predicting an LLM's preferences. Make sure that's what you actually want before you put an agent in a loop with it.

The cheapest loops in autoresearch are also the most valuable: a regex, an event count, a Lighthouse score, a sitemap diff. The fancy LLM-judged loops feel like progress. They are usually drift.

Optimize for measurable. The rest is vibes.
