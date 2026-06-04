# First Principles Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Seed an empty GitHub repository with a scalable MDX/Nextra knowledge infrastructure for First Principles Atlas.

**Architecture:** Use Nextra 4 on Next.js App Router for the docs UI, `content/` for MDX source, `atlas/taxonomy.json` as the topic-tree source of truth, and local scripts/tests for generation and validation. Defer Contentlayer until compatibility and need are proven.

**Tech Stack:** Next.js, React, Nextra, Nextra Docs Theme, Pagefind, MDX, Node scripts, GitHub Actions, Vercel.

---

### Task 1: Add Failing Structure Test

**Files:**
- Create: `tests/atlas-structure.test.mjs`

- [x] **Step 1: Write a failing test**

The test should assert that taxonomy, generated content, templates, and architecture docs exist.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/*.test.mjs`

Expected: FAIL because `atlas/taxonomy.json` and generated content do not exist yet.

### Task 2: Scaffold Application Shell

**Files:**
- Create: `package.json`
- Create: `next.config.mjs`
- Create: `app/layout.jsx`
- Create: `app/[[...mdxPath]]/page.jsx`
- Create: `app/globals.css`
- Create: `mdx-components.jsx`
- Create: `jsconfig.json`

- [ ] **Step 1: Add Nextra/Next app files**
- [ ] **Step 2: Install dependencies**
- [ ] **Step 3: Run structure test again**

### Task 3: Add Taxonomy And Generator

**Files:**
- Create: `atlas/taxonomy.json`
- Create: `scripts/generate-atlas.mjs`
- Create: `templates/topic-template.mdx`

- [ ] **Step 1: Define all requested domains and topic tracks**
- [ ] **Step 2: Generate `content/` placeholders and `_meta.js` files**
- [ ] **Step 3: Verify generated files are stable**

### Task 4: Add Validation And Governance

**Files:**
- Create: `scripts/validate-atlas.mjs`
- Create: `README.md`
- Create: `CONTRIBUTING.md`
- Create: `docs/architecture.md`
- Create: `.github/workflows/ci.yml`
- Create: `vercel.json`
- Create: `.gitignore`

- [ ] **Step 1: Validate frontmatter and required sections**
- [ ] **Step 2: Document architecture and contribution workflow**
- [ ] **Step 3: Add CI commands**

### Task 5: Verify And Push

**Files:**
- Modify generated lockfile after install.

- [ ] **Step 1: Run `npm run validate:content`**
- [ ] **Step 2: Run `npm test`**
- [ ] **Step 3: Run `npm run build`**
- [ ] **Step 4: Start local app and verify in browser**
- [ ] **Step 5: Commit and push to `Suraj-creation/First-Principles-Atlas`**

