# Architecture

## Purpose

First Principles Atlas is designed as a decade-scale knowledge system. The repository starts as a platform and taxonomy scaffold, not as a collection of generated lessons.

## Repository Layers

- `app/`: Next.js App Router shell for the Nextra docs experience.
- `content/`: MDX source of truth for visible routes.
- `atlas/taxonomy.json`: canonical domain, category, track, and metadata map.
- `scripts/`: generation and validation tools.
- `templates/`: reusable MDX authoring templates.
- `tests/`: structural tests for the atlas contract.
- `.github/workflows/`: CI for validation, tests, and build.

## Stack Rationale

Nextra provides the documentation shell, file-based MDX routing, generated page maps, sidebar navigation, table of contents, and Pagefind-backed search. Next.js App Router provides the application foundation for future APIs, personalization, semantic search, and graph features.

Contentlayer is not installed in this seed. The same structured-content goal is handled through the taxonomy file and validation scripts. This avoids coupling the foundation to a dependency whose official Next integration documentation is older than the current Nextra and Next stack.

## Content Flow

```text
atlas/taxonomy.json
    -> scripts/generate-atlas.mjs
    -> content/**/*.mdx and content/**/_meta.js
    -> Nextra page map
    -> Next.js build
    -> Pagefind search index
    -> Vercel deployment
```

## Metadata Flow

Frontmatter is the contract for future indexing. The fields are deliberately stable:

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

Future semantic search, graph generation, and AI discovery should consume this metadata directly from MDX and taxonomy JSON.

## Future Extensions

- Add graph export as JSON from frontmatter relationships.
- Add embedding generation for semantic search.
- Add learning-path views from prerequisites and related topics.
- Add research-map pages that group open questions and opportunities.
- Add analytics after the public site exists and privacy expectations are clear.
