# First Principles Atlas

First Principles Atlas is a structure-first knowledge infrastructure for long-term technical learning and research. The repository is intentionally scaffolded before it contains educational material.

The goal is to keep knowledge portable, versioned, searchable, connected, and ready for future semantic discovery.

## What Exists Now

- Next.js App Router with Nextra Docs Theme.
- MDX content source under `content/`.
- Source-of-truth taxonomy in `atlas/taxonomy.json`.
- Generated placeholder topic trees for all initial domains.
- Deep Git and GitHub learning-track scaffolds.
- Reusable topic template in `templates/topic-template.mdx`.
- Content validation, tests, GitHub Actions, and Vercel build configuration.

## Commands

```bash
npm install
npm run generate:atlas
npm run validate:content
npm test
npm run build
npm run dev
```

## Content Rule

Do not add educational prose casually. New content should be manually researched and should preserve the standard first-principles template:

- What are we learning?
- Why does it matter?
- What problem does it solve?
- Prerequisites
- Core concepts
- Internal workings
- Design decisions
- Alternatives
- Common misconceptions
- References
- Related topics
- Open questions
- Research opportunities

## Deployment

Connect this repository to Vercel. The included `vercel.json` uses `npm run check`, so each deployment validates content, runs tests, builds the Next.js site, and generates the Pagefind search index.
