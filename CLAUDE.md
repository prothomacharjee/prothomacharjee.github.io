# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Prothom Acharjee, served by GitHub Pages from `master` (user site `prothomacharjee.github.io`). Plain static HTML/CSS/JS — no build step, package manager, framework, linter, or tests. Pushing to `master` deploys.

Preview: open `index.html` directly, via Laragon (repo lives under `C:\laragon\www`), or `npx http-server -p 8137`.

## Content source of truth

All text on the site (headline, summary, roles, dates, employment types, bullets, projects, skills, education) comes from the owner's "Master Career Profile" doc (`D:\Prothom\files\RESUME\Prothom Acharjee — Master Career Profile.docx`). Copy wording from it; don't invent or embellish. Rules from that doc that affect the site:
- Experience is "8 years" (since Sep 2018). Company is "Softic" (not "Softic OPC"); Chattala24 title is "IT Executive".
- Every role shows its type (Full-time / Remote · flexible hours / Contract · project-based / Part-time / Self-directed project).
- Never claim: OWASP, Kafka, RabbitMQ, Neo4j, AML, merchant payments, microservices, client idempotency keys. A double-entry transaction ledger is fine (built at Softic); never call it a double-entry accounting system. No .NET/C#/Vue/Angular/Flutter.
- The Softic platform is confidential: say "fintech transaction platform", never name it or its payment gateway vendors (say "crypto and fiat payment gateways"). `case-study.html` describes patterns only: no product, file or table names, no code. No Fiverr/Facebook links, HSC/SSC, full address, Services section.
- Massara (KoldaTech) is named only, never linked, until it launches.
- Pharmacy POS (Glorious IT) and the old pharmacy demo are one project. Navy Care has no link: it runs only on the Navy hospitals' internal network. Never state a Navy Care consultation count (there's no measured figure); say "open to all Navy personnel and their families". Magnetism Tech link must stay `http://` (its https fails). Rahamat & Associates link is off because the site was down (30 Oct 2026).
- From Jan 2027, Softic dates become "Nov 2023 – Dec 2026" and its bullets switch to past tense.

## Architecture

- `index.html` — the whole single page: hero → stats → `#about` → `#resume` → `#projects` → `#contact`. Resume is a WAI-ARIA tabs widget (Experience / Skills / Education); each role is a native `<details>` element.
- `case-study.html` (fintech) and `case-study-navy-care.html` — standalone case studies, listed in the `#case-studies` section (nav "Case Studies") and linked from their project cards. A new case study needs a `.case` card there and the nav link on its page. The ERP gets no case study: keep it a card, worded "multi-company ERP", never "multi-tenant SaaS". Same nav, theme script and `main.js`; its styles are the `.cs-*` block at the end of `style.css`.
- `assets/css/style.css` — hand-written "Soft Slate" theme; colors are CSS variables in `:root`. Mobile breakpoints at 900px and 760px.
- `assets/js/main.js` — vanilla JS: nav shadow, mobile menu, scroll-reveal + count-up (IntersectionObserver), resume tabs with arrow-key navigation.
- Elements with class `reveal` fade in on scroll. They are hidden only when `<html class="js">` is set (inline script in `<head>`), and `prefers-reduced-motion` disables all motion.
- Stats count-up: wrap the number in `<span data-count="N">`.
- Icons are an inline SVG sprite (Lucide paths) at the top of `<body>`; use `<svg class="ic"><use href="#i-name"/></svg>`. Add new icons as `<symbol>`s there. No icon font or kit.
- Light/dark theme: colors are CSS variables in `:root`, overridden by `[data-theme="dark"]` (and by `prefers-color-scheme` when JS is off). The inline `<head>` script picks the theme before paint (saved choice in localStorage, else OS setting); the nav button toggles it. New colors must be variables, defined in both themes.
- `assets/image/og.png` is the 1200×630 social preview; regenerate it if the headline or numbers change.
- Images in `assets/image/` (singular). Hero photo is `prothom-hero.webp`.
- CV button links to `assets/Prothom_Acharjee_Resume.pdf` — the owner exports it from the resume docx and drops it there.
