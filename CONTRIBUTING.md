# Contributing To First Principles Atlas

This repository is a knowledge system, not a content dump. Contributions should improve structure, clarity, correctness, or research quality.

## Working With The Atlas

1. Edit `atlas/taxonomy.json` when adding or reorganizing domains, topics, or tracks.
2. Run `npm run generate:atlas` to create missing placeholder routes and update Nextra metadata.
3. Fill MDX sections manually only after research.
4. Run `npm run validate:content`.
5. Run `npm test`.
6. Run `npm run build` before opening a pull request.

## Content Standards

Every real topic page should answer the template sections from first principles. Prefer precise definitions, explicit assumptions, design trade-offs, limitations, alternatives, and references over broad summaries.

## Metadata Standards

Each topic page must include frontmatter for domain, category, difficulty, learning stage, tags, prerequisites, related topics, and research questions. These fields are future inputs for semantic search, graph views, and learning path generation.

## Scope Standards

Avoid adding large prose batches. The first priority is coherent structure. Educational content should arrive incrementally, with reviewable sources and clear relationships.
