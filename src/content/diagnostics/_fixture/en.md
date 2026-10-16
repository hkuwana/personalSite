---
# Template fixture. Folders starting with "_" render in `npm run dev` only and never ship.
# The company is fictional; replace every field when writing a real diagnostic.
title: "Example Industrial: where AI pays off from the outside"
date: "2026-11-04"
lang: en
pair: _fixture
tags: ["Industrials", "Water treatment"]
draft: true
company:
  name: "Example Industrial Co."
  name_ja: "例示工業株式会社"
  ticker: "0000"
  sector: "Industrial / water treatment"
  revenue_band: "¥300–400bn"
view: outside
excerpt: "A fictional company used to check the diagnostic template."
sources:
  - { title: "Mid-term management plan 2027", url: "https://example.com/mtp-2027.pdf", date: "2025-05" }
  - { title: "Integrated report 2025", url: "https://example.com/ir-2025.pdf", date: "2025-09" }
  - { title: "Annual securities report FY2024", url: "https://example.com/yuho-2024.pdf", date: "2025-06" }
video:
  url: "https://example.com/walkthrough.mp4"
  duration_s: 118
pdf: "./diagnostic-en.pdf"
prompts: ["./prompts/01-ir-extraction.md", "./prompts/02-ai-leverage-map.md"]
skills_used: []
verdict:
  pays_off: "Service technicians' visit reports: thousands a month, written by hand, read by nobody until a claim arrives."
  check_first: "Whether chemical dosing data from customer sites is already centralised, or still sits in each plant."
  leave_alone: "Plant design. The mid-term plan already funds simulation tools here, and judgement is the product."
reading_time_min: 4
otterd_case: "multifamily-underwriting"
---

## Pays off

The mid-term plan names service productivity as a target [1]. This is placeholder text for the template fixture: it stands where the memo explains, with citations, why one workflow is a good fit for AI.

## Check first

A second placeholder paragraph, citing the integrated report [2]. It names the one fact a reader would need from inside the company before committing.

## Leave alone

A third placeholder paragraph, citing the securities report [3]. It explains why one tempting area is a poor fit.
