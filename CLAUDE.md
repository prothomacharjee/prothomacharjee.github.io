# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Prothom Acharjee, served by GitHub Pages from `master` (user site `prothomacharjee.github.io`). Plain static HTML/CSS/JS — no build step, package manager, framework, linter, or tests. Pushing to `master` deploys.

Preview: open `index.html` directly, via Laragon (repo lives under `C:\laragon\www`), or `npx http-server -p 8137`.

## Content source of truth

All text on the site (headline, summary, roles, dates, employment types, bullets, projects, skills, education) comes from the owner's "Master Career Profile" doc (`D:\Prothom\files\RESUME\Prothom Acharjee — Master Career Profile.docx`). Copy wording from it; don't invent or embellish. Rules from that doc that affect the site:
- Experience is "8 years" (since Sep 2018). Company is "Softic" (not "Softic OPC"); Chattala24 title is "IT Executive".
- Every role shows its type (Full-time / Remote · flexible hours / Contract · project-based / Part-time / Self-directed project).
- Never claim: OWASP, Kafka, RabbitMQ, Neo4j, AML, double-entry accounting, merchant payments, microservices. No .NET/C#/Vue/Angular/Flutter. No Fiverr/Facebook links, HSC/SSC, full address, Services section.
- Massara (KoldaTech) is named only, never linked, until it launches.
- Pharmacy project link stays off until its public demo login is removed.
- From Jan 2027, Softic dates become "Nov 2023 – Dec 2026" and its bullets switch to past tense.

## Architecture

- `index.html` — the whole single page: hero → stats → `#about` → `#resume` → `#projects` → `#contact`. Resume is a WAI-ARIA tabs widget (Experience / Skills / Education); each role is a native `<details>` element.
- `assets/css/style.css` — hand-written "Soft Slate" theme; colors are CSS variables in `:root`. Mobile breakpoints at 900px and 760px.
- `assets/js/main.js` — vanilla JS: nav shadow, mobile menu, scroll-reveal + count-up (IntersectionObserver), resume tabs with arrow-key navigation.
- Elements with class `reveal` fade in on scroll. They are hidden only when `<html class="js">` is set (inline script in `<head>`), and `prefers-reduced-motion` disables all motion.
- Stats count-up: wrap the number in `<span data-count="N">`.
- Icons are Font Awesome via the owner's kit script (v5 class names like `fas fa-...`, `fab fa-...`). Font is Inter from Google Fonts.
- Images in `assets/image/` (singular). Hero photo is `prothom-hero.webp` (compressed from `prothom2.webp`).
- CV button links to `assets/Prothom_Acharjee_Resume.pdf` — the owner exports it from the resume docx and drops it there.
