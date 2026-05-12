---
title: "How to Tell If Your AI Is Actually Working"
date: 2026-05-05
readTime: 8 min read
excerpt: A primer for people who've added AI to their product or workflow and have a nagging feeling they have no idea whether it's helping. A 30-minute audit you can run this afternoon.
tags: [AI, Evaluation, Beginners]
featured: false
---

A primer for people who've added AI to their product, workflow, or codebase : and have a nagging feeling that they have no idea whether it's helping.

If that's you: it's not your fault. The AI industry has been allergic to honest measurement for two years. This post is a 30-minute audit you can do this afternoon to find out.

## The honest answer is "probably not, and you should check"

A pattern I see, often:

> "We added Claude/GPT to our pipeline. It feels faster. The team likes it. Output looks better."

Then we look at the actual numbers : cycle time, defect rate, retention, customer satisfaction, churn : and nothing has moved.

This is not a story about AI being bad. The tools are real. The "feels faster" is real. But the gap between *adopting a tool* and *the tool moving a business metric* is enormous, and the only way across it is measurement.

The good news: measurement is much easier than the AI-eval industry makes it sound. Most of what you need, you already have.

## The three questions

Before any audit, write down answers to these three. In one sentence each. Don't cheat.

### 1. What changed?

What's the specific thing AI is doing in your product or workflow? "We have an AI feature" is not an answer. "We added a Claude-powered support agent that handles tier-1 tickets" is.

### 2. What metric should move if it's working?

This is the hard one. It should be:

- A number, not a feeling.
- Tied to a real outcome, not an internal signal.
- Measurable without a 6-week instrumentation project.

For tier-1 tickets, candidates: average response time, resolution rate before escalation, customer satisfaction score, ticket reopen rate, hours of human time per week spent on tier-1.

Pick **one**. If you can't pick one, the project doesn't have a defined success condition.

### 3. By how much, by when?

"Tier-1 ticket resolution rate up by 5 points within 30 days of launch." Specific. Falsifiable. Time-boxed.

If you don't have answers to all three, you don't have an AI project. You have an AI craft project, which is fine, but please don't promise the board a number you never picked.

## The five-rung ladder of measurement

Roughly in order of effort. Climb only as high as you need to.

### Rung 1: An event you already log

Most products already emit events. If "the AI worked" maps onto an event you already track, the audit is two SQL queries away.

Example: you have `purchase_completed`. You added an AI recommendation system. Did purchases per session go up?

You don't need any new instrumentation. You need someone with database access and 15 minutes.

### Rung 2: A regex or schema check

Some AI outputs can be validated with a script. Examples:

- "The model returned valid JSON" : 5 lines.
- "The summary is under 200 words" : 3 lines.
- "The email has a greeting and a signoff" : 10 lines.

You don't need a fancy eval framework. You need a `tests/` folder and a CI step.

### Rung 3: A rule-based rubric

When "did it work" is more than one boolean, write the rubric down. Literally a checklist:

- Mentions the user by name
- Includes the order number
- Avoids the phrase "I'm sorry for the inconvenience"
- Resolves the question in ≤3 sentences

Each item is a boolean. Sum them. That sum is your score. It's deterministic. It's debuggable.

### Rung 4: A live A/B test

When the output quality really does need a human to assess, run two versions in front of real humans. Look at downstream behavior:

- Did they reply?
- Did they buy?
- Did they come back?
- Did they rate?

A/B testing is slow and you need volume, but the signal is real. A bandit can shift traffic toward the winner automatically over a few weeks.

### Rung 5: An LLM-as-judge eval

This is the rung the industry is obsessed with. It's the *last* one to try, not the first.

If you reach this rung, the rules are:

- Cross-validate the judge against ≥20 hand-labeled examples. Need ≥80% agreement.
- Cap the judge's weight if you also have real-user signal.
- Re-validate every model version bump.

If you find yourself building at rung 5 without first checking rungs 1–4, stop and check.

## The 30-minute audit

For each AI feature, integration, or workflow you have:

### Minute 0–5: name it

Write the one-sentence description. "Claude reviews PRs and writes a summary." "GPT-4 suggests product titles." Each one gets its own row in your audit doc.

### Minute 5–10: the metric question

For each row, write the single metric that should move if it's working. If you can't pick one in 5 minutes, write "❓" and move on. (Spoiler: those rows are usually the problems.)

### Minute 10–20: pull the number

For the rows with a clear metric, get the actual value. Compare it to the value before the AI was added.

Three categories of result:

- **Moved up clearly.** Keep it. Document the lift. Defend it next time someone proposes ripping it out.
- **Flat.** Have a hard conversation. Is the AI doing nothing? Is the metric wrong? Set a checkpoint 30 days out.
- **Moved down.** Roll it back today.

### Minute 20–30: kill list

What is the audit telling you to stop doing?

- Rows you couldn't even define a metric for : these are vibes, not features.
- Rows where the metric is flat after a fair window : ROI is zero.
- Rows where you find yourself wanting to argue with the number : that's the most important one. Argument means you don't trust the metric you picked. Fix the metric, not the AI.

Most teams discover that 20–30% of their AI work is producing measurable value, 50% is neutral, and 20% is actively backward.

## The signs you have an eval problem (not an AI problem)

- **The team can't agree on whether the AI is working.** You don't have a metric, you have a debate.
- **Every demo looks great but the dashboards never change.** Cherry-picking is the default state of un-measured AI.
- **The "score" is going up but business outcomes aren't.** Classic LLM-judge hill climb.
- **You're afraid to look at the number.** That fear is information. Look at the number.

## Working with humans on this

People feel ownership over the AI tools they introduced. If your audit suggests something should be turned off, that's a social problem more than a technical one. Moves that help:

- **Audit the *whole portfolio* at once, not just someone's pet.** Looking at everything makes the conversation about the framework, not the person.
- **Have the metric picked *before* you check the number.** "We agreed we'd judge this on resolution rate. Resolution rate didn't move." That's a much better conversation than "I went looking and found it's bad."
- **Make rollback cheap.** If turning off the AI feature is a 6-week project, no one will do it. If it's a flag flip, people will.
- **Celebrate the kills.** A team that publicly retires a useless AI feature is healthier than one that quietly leaves it on.

## What "good measurement" looks like

The aspiration is not "we have a sophisticated eval framework." It's:

> Every AI thing we ship has one number it should move. We check the number on a known cadence. When the number doesn't move, we either fix the metric or kill the feature.

That's it. No platform, no vendor, no offsite. Just the discipline of asking *what should move* and then *looking*.

## One-line takeaway

> Pick a metric, check the number, and be willing to kill the feature if the number doesn't move. The rest is decoration.

Measurement isn't a special AI skill. It's just engineering judgment applied to a hyped technology. You already have the skill. Use it on this.
