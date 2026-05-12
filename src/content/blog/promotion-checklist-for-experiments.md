---
title: "The Promotion Checklist: Shipping an Experiment Win Without Faking It"
date: 2026-04-25
readTime: 6 min read
excerpt: A bandit recommending "winner" is not a winner. Three independent dimensions you should check before you flip the default. Borrowed from Shisa's definition-of-done framing.
tags: [AI, Experiments, Process]
featured: false
---

The bandit says arm B has been winning for five nights straight. The posterior probability of "best" is 78%. The chart is monotonically up and to the right.

Do you ship it?

Most teams do, here. Most teams shouldn't. A pretty chart and a stability verdict are *necessary* to promote an experiment win, but they are not *sufficient*. A single missing dimension is enough to ship a regression and not notice for a month.

This is the checklist I run before flipping any default. Three dimensions. All three required. Borrowed from Shisa's definition-of-done framing.

## Why three dimensions

A bandit answers one question: *given my success criterion, which arm has the best posterior?*

That's a great answer to one question. It is not an answer to:

- "Is this arm actually being served to users?" (You'd be surprised how often promotion happens before traffic.)
- "Did we write down the hypothesis we're now claiming was correct?" (If you didn't, you can rationalize anything as a win.)
- "Is the success criterion still measuring what we care about?" (Goals drift. Metrics don't notice.)

Each dimension catches a different failure mode. Skip one, and the failure mode it would have caught is the one you'll have.

## Dimension 1: Runtime wiring

The winning arm has to actually be serving traffic, end-to-end, with events tagged correctly.

**Check:**

- Open analytics. Filter to the last 24h. Group `conversation_ended` (or whatever your terminal event is) by `prompt_variant` or whatever arm-tag field you use.
- The winning arm's session count should be visibly larger than the others. If all arms are roughly equal, your runtime is still in exploration mode, not exploitation.
- Click into a few sessions from the winner. Verify the events carry the correct tag.
- Look at the *composer* / *runtime* source for the arm. Does the parameter combination you defined in `ARMS` actually get rendered? Or is the composer ignoring one of the fields and silently falling back to defaults?

The last one is sneakier than it sounds. If your "high_challenge" arm is defined as `{ correctionStyle: 'inline', challenge: 'high', ... }` but the composer only honors `correctionStyle`, then "high_challenge" is identical to "control" in production, and any difference in metrics is pure noise.

**Failure mode this catches:** declaring a winner that was never actually different from the loser.

## Dimension 2: Signal

This is the dimension most teams remember. It's still worth being explicit about what "signal" actually means.

**Check:**

- The bandit's stability verdict is STABLE (not LEANING, not EXPLORING).
- The winning arm has ≥ N sessions, where N is high enough that you'd defend it to a stranger. Twenty is a common floor.
- The posterior probability of "best" is ≥ 70%.
- The success criterion is still the same one you defined when the experiment started. (If you redefined success mid-experiment, the experiment is invalid.)

**Failure mode this catches:** celebrating a one-night spike. Posteriors on thin data are wide; sampling can pick any arm. The stability window is the discipline that says "wait until the chart bores you."

The 70% number is a judgment call. The point isn't the exact threshold : the point is to write down a threshold *before* you check the number, and then honor it.

## Dimension 3: Docs parity

This is the dimension everyone skips. It's the most important.

**Check:**

- Open the experiment tracker. Find the row where you originally logged this experiment.
- Does it have: hypothesis (one sentence), success criterion (one sentence), start date, the arm names, the expected lift?
- Update the row: "promoted on {date}, observed lift = X% on metric Y."

If the original row is missing : because you started the bandit "informally" and never wrote it down : the experiment is unfinished. Don't promote until the row exists and is filled in.

Why does this matter? Three reasons:

1. **You can't be wrong if you didn't write down what you predicted.** Without a recorded hypothesis, every result is a "win," because you can always invent a story that fits.
2. **Future-you debugs the system using the tracker.** Six months from now, when retention dips and you're trying to find which experiments could be the cause, the tracker is the only document that maps "what changed when."
3. **Teams that write down hypotheses get better at making them.** The act of writing "I predict variant B will lift conversion by 8% because users prefer concrete value props" makes you face whether you actually believe it. Predictions that turn out wrong are the most useful predictions you'll ever make.

**Failure mode this catches:** experiments that drift into vibes-based decisions. If you can't articulate what would have falsified the win, the win is a story, not a finding.

## What it looks like all together

A real promotion, in the order it happens:

1. **Bandit says STABLE.** 5 nights consecutive, arm B winning. Posterior P(best) = 82%. Sessions on winner = 47.
2. **Runtime check.** Pull analytics: arm B is serving 60% of traffic now (bandit ramped it up). Events carry `prompt_variant: B`. Composer source shows all four arm parameters are rendered. Three sample sessions look right.
3. **Tracker check.** Row exists. Hypothesis: "B's tighter prompt will produce shorter, higher-quality completions, lifting `task_completed` by 5%+." Success criterion: "`task_completed` rate per session." Observed lift: 7.4%. Add "promoted on 2026-04-25, observed lift = 7.4%."
4. **Flip the default.** Composer config: `default_variant = 'B'`. Deploy.
5. **Verify post-deploy.** Next batch of events: all carry `prompt_variant: B` as the new floor. (Bandit will still nudge traffic to other arms for exploration; that's fine.)

Total elapsed: about an hour. Total decisions: one. But all the supporting checks are visible, in writing, and replayable.

## What promotion is *not*

A few common false-promotions to watch for:

- **"It looks better."** This is not a checklist item. If you can't point at a number, you're not promoting, you're rebranding.
- **"The team likes it."** Same.
- **"The stability verdict is STABLE so we're done."** No : you've cleared one dimension. Two to go.
- **"We'll write the tracker entry later."** No, you won't.
- **"It's only one parameter change, do we really need all this?"** Yes. Because the next one is "only one parameter change" too. And the one after. The checklist is what prevents a year of "only one parameter changes" from compounding into an unauditable mess.

## The healthy team test

You can tell whether a team has a real promotion discipline by asking one question:

> "When was the last time the bandit said STABLE and you didn't promote?"

If the answer is "never," the checklist is a rubber stamp. The whole point of the three dimensions is that some experiments should fail the check. Maybe runtime wiring isn't right yet. Maybe the tracker entry doesn't exist. Maybe the success criterion drifted.

A team that has *declined to promote* a stable winner, at least once in the last quarter, has a real process. A team that has never declined doesn't.

## The one-line takeaway

> STABLE is necessary. STABLE plus runtime plus docs is sufficient. Don't promote on any one alone.

Most experiment regressions come from skipping a dimension. The checklist is fifteen minutes. It is the cheapest insurance you'll ever buy on your product.
