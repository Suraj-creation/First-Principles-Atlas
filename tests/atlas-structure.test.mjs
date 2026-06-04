import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'

const root = process.cwd()

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), 'utf8'))
}

test('taxonomy defines all requested first-pass domains', () => {
  const taxonomy = readJson('atlas/taxonomy.json')
  const domainSlugs = taxonomy.domains.map(domain => domain.slug)

  assert.deepEqual(domainSlugs, [
    'computer-science',
    'artificial-intelligence',
    'cloud-infrastructure',
    'software-development',
    'product-startups',
    'research'
  ])
})

test('git and github tracks are deep ordered learning structures', () => {
  const taxonomy = readJson('atlas/taxonomy.json')
  const computerScience = taxonomy.domains.find(domain => domain.slug === 'computer-science')
  const git = computerScience.children.find(topic => topic.slug === 'git')
  const github = computerScience.children.find(topic => topic.slug === 'github')

  assert.ok(git.track.length >= 40, 'Git track should have at least 40 placeholders')
  assert.ok(github.track.length >= 30, 'GitHub track should have at least 30 placeholders')
  assert.match(git.track[0].slug, /^00-/)
  assert.match(github.track[0].slug, /^00-/)
})

test('required repository foundation files exist', () => {
  const requiredFiles = [
    'README.md',
    'CONTRIBUTING.md',
    'docs/architecture.md',
    'templates/topic-template.mdx',
    'app/layout.jsx',
    'app/[[...mdxPath]]/page.jsx',
    'content/index.mdx',
    'content/_meta.js',
    '.github/workflows/ci.yml',
    'vercel.json'
  ]

  for (const file of requiredFiles) {
    assert.ok(existsSync(path.join(root, file)), `${file} should exist`)
  }
})

test('generated placeholder documents use the standard scaffold sections', () => {
  const gitIntro = readFileSync(
    path.join(root, 'content/computer-science/git/00-why-version-control.mdx'),
    'utf8'
  )

  for (const heading of [
    '## What are we learning?',
    '## Why does it matter?',
    '## What problem does it solve?',
    '## Prerequisites',
    '## Core concepts',
    '## Internal workings',
    '## Design decisions',
    '## Alternatives',
    '## Common misconceptions',
    '## References',
    '## Related topics',
    '## Open questions',
    '## Research opportunities'
  ]) {
    assert.ok(gitIntro.includes(heading), `${heading} should be present`)
  }
})

