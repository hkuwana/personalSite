---
title: "Rollback Discipline: When Your Shipped Winner Stops Winning"
date: 2026-04-28
readTime: 6 min read
excerpt: A symmetric rollback protocol for experiments that turned out to regress. Three dimensions, one week of patience, and one rule you'll be tempted to break.
tags: [AI, Experiments, Process]
featured: false
---

Every team that runs A/B tests eventually ships a "winner" that wasn't. The bandit recommended it, the dashboard agreed, you promoted it to default, and three weeks later retention is down, support tickets are up, and someone is asking the obvious question: was this the change?

Yes. Roll it back. That's the easy part. The hard part is the *discipline* of how you roll back, because the wrong reflex turns a recovery into another mistake.

This is the protocol. It mirrors the promotion checklist, deliberately.

## The wrong reflex

When you suspect a regression, the temptation is to:

1. Flip the default back, immediately.
2. Delete the bad arm from the bandit so it stops being explored.
3. Find someone to blame, or yourself to blame.
4. Forget about it once the dashboard recovers.

All four are wrong, in subtle ways. Let's walk through what to do instead.

## The three-dimensional rollback

A promotion required three confirmations: runtime wiring, signal, and docs parity. A rollback restores all three.

### 1. Runtime: flip the default back, today

Yes, immediately. Don't wait. The point of a feature flag is that this is a one-line operation.

Two things to verify after the flip:

- **The flip actually deployed.** Look at the next batch of events. Are they carrying the previous arm's tag? If yes, you're back. If no, the flag wasn't wired right, and you have a worse problem than a regression.
- **The blast radius.** Was anything else changed alongside the original promotion? A composer parameter, an env var, a different default elsewhere? Find them all. Flip them all.

### 2. Signal: give the rollback three nights before you celebrate

You're not done when the flag is flipped. You're done when the metric recovers, and a recovery takes time. The bandit needs to see new data under the reverted default. New users need to flow through.

Three nights, minimum:

- Night 1: traffic shifts back to the old default. Watchdog and bandit start seeing it.
- Night 2: enough data to see whether the regressing metric is starting to recover.
- Night 3: enough data to be confident the recovery isn't a one-night fluke.

In those three nights, *do not change anything else*. Resist the urge to "also try a fix." If you change two variables at once, the regression analysis becomes uninterpretable. One variable. Three nights.

### 3. Docs: write the why down, in detail

Open the experiment tracker. Find the row where you logged "promoted on {date}." Add a "Rolled back on {date}" row.

In the description:

- **What regression you saw.** With numbers.
- **Why the stability verdict missed it.** This is the most valuable line you'll write all month. What signal *should* have caught this and didn't? Was your success criterion too narrow? Was the cohort that suffered too small to move the aggregate? Did the bandit promote on a weekday-only spike?
- **What guardrail you're adding for next time.** "We'll also gate promotion on watchdog P1 count staying flat." "We'll require ≥5% of stable sessions to come from {cohort X}."

That third bullet is the actual deliverable of the rollback. The regression is information. Don't waste it by just reverting and moving on.

## The rule you'll be tempted to break

When you roll back, do *not* delete the bad arm from the bandit immediately.

Leave it. Let it run at reduced weight for at least a week.

The reason: if the bad arm wins again, on a different cohort, in a different week, that's signal worth investigating. Maybe the arm is actually good for power users and bad for new ones. Maybe it works on mobile and fails on desktop. Maybe it's seasonal.

Deleting the arm closes off all of that information. You'll never know.

Yes, it feels good to delete the bad arm. Don't. Let it sit in the corner for a week. Then decide.

## A short worked example

The hypothetical: you promoted `socratic` (an arm that uses Socratic questioning in onboarding) to default. Two weeks in, retention drops 3 points and support tickets mention "the bot doesn't help me get started."

**Day 0** (you notice):  
Flip default back to `control` in the composer. Verify new sessions carry `prompt_variant: control`.

**Day 1–3:**  
Bandit and watchdog see new sessions. Day 1 retention metric still includes the bad cohort's tail; don't read into it. Day 2: starting to recover. Day 3: recovery is clear.

**Day 4:**  
Open experiment tracker. New row:

> Rolled back `socratic` on {date}. Observed -3pt retention and +18% "doesn't help me get started" tickets over the 14 days after promotion. Bandit STABLE verdict missed it because: success criterion was "session duration ≥ 180s," which the Socratic style actually improves (users spend more time confused). Adding new guardrail: promotion gated on `tutorial_completed` rate, not just session duration. The arm itself remains in the bandit at reduced weight for one week to see if it wins on advanced-user cohort.

**Day 11:**  
Review the `socratic` arm's performance over the week. If it's winning only on a specific cohort, fork the bandit per-cohort. If it's losing across the board, retire it now.

Notice: the rollback itself took five minutes. The discipline around it took eleven days. That's normal. The five-minute part is the cheap part.

## The blame question

Who picked the bad arm? Whose fault is this?

This is almost never the right question. The bandit recommended it. The stability check passed. The promotion checklist was followed. The signal turned out to be misleading. Calling that "someone's fault" is a misread of how the system works.

The right question is: **what's our next guardrail?**

The guardrail isn't a person. It's a check. Every rollback should ship one new check. Over the years, your promotion process gets more checks, fewer regressions, and the team gets less defensive : because the system gets better, not because people stop making mistakes.

If you find yourself in a meeting where the topic is "who's to blame," gently redirect: "What's the guardrail we're adding?"

## The healthy team pattern

Teams that handle rollbacks well share three habits:

1. **Public rollback notes.** The "what went wrong, what's the new guardrail" gets shared. Not in a recriminatory way : as institutional learning.
2. **Time-boxed waiting.** Three nights, not three weeks. Patience is a discipline, but so is closure. Stretching the rollback window indefinitely is its own dysfunction.
3. **No silent reverts.** Every rollback is logged. Even if it was painful. The experiments you *secretly* rolled back are the ones you'll repeat the mistake on.

If your team currently silently reverts experiments and never writes anything down, the cheapest thing you can do this week is start a one-table doc called "Experiments rolled back" and back-fill it for the last six months. The shape of that table tells you a lot about your decision quality.

## The takeaway

Rollback is not failure. It's the second half of the experiment. Promotion is "we believed this," rollback is "we believed wrong, here's what we learned." Both rows belong in the tracker. Both are healthy. The unhealthy version is a tracker with only promotions.

A good experiment process has roughly as many "rolled back" entries as "still default" entries. If you only have promotions in your history, you're not running enough experiments, or you're not looking honestly enough at the results.
