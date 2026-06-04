# First Principles Atlas Design

## Objective

First Principles Atlas is a long-lived MDX knowledge infrastructure for first-principles learning, research mapping, and future original contributions. The initial repository should not contain educational material. It should contain the application shell, scalable content structure, metadata conventions, topic-tree placeholders, validation, and deployment-ready automation.

## Stack Decision

The presentation layer uses Next.js App Router with Nextra Docs Theme. Nextra 4 is App Router-native and supports a `content` directory, generated page maps, sidebar navigation, table of contents, and docs search. The content source of truth is MDX in Git.

The initial brief proposed Contentlayer. I am not making Contentlayer a runtime dependency in the first seed because the official Contentlayer docs still describe older/beta-era Next integration while Nextra 4 already owns MDX routing and page-map generation. Instead, the repository gets a typed content contract through:

- `atlas/taxonomy.json` as the source-of-truth topic tree.
- `scripts/generate-atlas.mjs` to generate placeholder MDX and `_meta.js` files.
- `scripts/validate-atlas.mjs` and tests to enforce metadata, required sections, taxonomy coverage, and route conventions.

This keeps the architecture portable, versionable, and ready for a future indexing layer without coupling the foundation to a fragile content compiler.

## Research Notes

- Nextra 4 only supports the Next.js App Router and provides a docs theme for Markdown-centered sites.
- Nextra's `content` directory is the right fit for a large manually-authored knowledge tree because it avoids `page.mdx` boilerplate and supports hot reloading.
- Nextra uses Pagefind for static search indexing after build, which is appropriate for the first version because it has no server dependency and scales well for static documentation.
- Next.js App Router supports MDX, but Nextra adds documentation UX and routing conventions on top.
- Contentlayer remains useful as a design reference for structured content, but it is deferred until it is clearly needed and compatibility is proven.

## Architecture

The repository is organized into five layers:

- Application shell: `app/`, `mdx-components.jsx`, `next.config.mjs`, and styling.
- Knowledge source: `content/` generated from taxonomy, then manually edited later.
- Taxonomy source: `atlas/taxonomy.json`, containing domains, categories, subcategories, difficulty, learning stage, tags, and relations.
- Quality gates: `scripts/validate-atlas.mjs`, Node tests, GitHub Actions.
- Governance docs: `README.md`, `CONTRIBUTING.md`, `docs/architecture.md`, `templates/topic-template.mdx`.

## Content Model

Every MDX placeholder uses frontmatter with:

- `title`
- `description`
- `domain`
- `category`
- `subcategory`
- `difficulty`
- `stage`
- `type`
- `status`
- `tags`
- `prerequisites`
- `related`
- `researchQuestions`

The body contains only reusable placeholder sections:

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

## Initial Scope

The seed includes all requested major domains:

- Computer Science
- Artificial Intelligence
- Cloud and Infrastructure
- Software Development
- Product and Startups
- Research

Computer Science includes deep Git and GitHub learning tracks with many ordered placeholder files. Other domains include index and roadmap placeholders for each requested topic, giving the repository a consistent structure without generating educational prose.

## Search And Future AI

Version 1 includes Pagefind full-text search. The metadata schema is designed so future work can add:

- Semantic embeddings
- Relationship graph generation
- Learning-path recommendations
- Dependency graph visualization
- AI-assisted discovery
- Research-map exploration

The future graph layer should read from MDX frontmatter and `atlas/taxonomy.json`, not from rendered UI.

## Testing

The project verifies:

- Taxonomy includes all required initial domains.
- Git and GitHub tracks are deep enough to be useful.
- Content files have valid frontmatter.
- Placeholder documents contain required standard sections.
- Nextra build completes and Pagefind index generation runs.

## Deployment

Vercel should connect to the GitHub repository. Every push to `main` triggers an automatic Vercel build. GitHub Actions runs validation, tests, and build before code is trusted.

