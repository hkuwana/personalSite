---
# テンプレート確認用。"_" で始まるフォルダは `npm run dev` でのみ表示され、公開されません。
title: "例示工業：外から見て、AIが効くところ"
date: "2026-11-04"
lang: ja
pair: _fixture
tags: ["製造業", "水処理"]
draft: true
company:
  name: "Example Industrial Co."
  name_ja: "例示工業株式会社"
  ticker: "0000"
  sector: "製造業・水処理"
  revenue_band: "3,000〜4,000億円"
view: outside
excerpt: "診断テンプレートの確認に使う架空の会社です。"
sources:
  - { title: "中期経営計画2027", url: "https://example.com/mtp-2027.pdf", date: "2025-05" }
  - { title: "統合報告書2025", url: "https://example.com/ir-2025.pdf", date: "2025-09" }
  - { title: "有価証券報告書 2024年度", url: "https://example.com/yuho-2024.pdf", date: "2025-06" }
video:
  url: "https://example.com/walkthrough.mp4"
  duration_s: 118
pdf: "./diagnostic-ja.pdf"
prompts: ["./prompts/01-ir-extraction.md", "./prompts/02-ai-leverage-map.md"]
skills_used: ["_fixture"]
verdict:
  pays_off: "サービス技術者の訪問報告書。月に数千件が手書きで作られ、クレームが来るまで誰も読みません。"
  check_first: "顧客拠点の薬注データがすでに一元化されているか、各プラントに分散したままか。"
  leave_alone: "プラント設計。中期経営計画がすでにシミュレーションに投資しており、判断そのものが価値です。"
reading_time_min: 4
otterd_case: "multifamily-underwriting"
---

## 効くところ

中期経営計画は、サービスの生産性を目標に掲げています [1]。ここはテンプレート確認用の仮の文章です。本番では、ひとつの業務がなぜAIに向いているかを、出典付きで説明します。

## 先に確かめること

統合報告書を引いた仮の段落です [2]。判断の前に、社内でしか分からない事実をひとつ挙げます。

## 手を出さないところ

有価証券報告書を引いた仮の段落です [3]。魅力的に見えても向いていない領域と、その理由を書きます。
