import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { test } from 'node:test'

const root = process.cwd()
const require = createRequire(import.meta.url)

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), 'utf8'))
}

function listMdxFiles(directory) {
  const entries = readdirSync(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...listMdxFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath)
    }
  }

  return files
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

test('phase two deep Git and GitHub learning pages are routed', () => {
  const taxonomy = readJson('atlas/taxonomy.json')
  const computerScience = taxonomy.domains.find(domain => domain.slug === 'computer-science')
  const git = computerScience.children.find(topic => topic.slug === 'git')
  const github = computerScience.children.find(topic => topic.slug === 'github')
  const gitSlugs = git.track.map(topic => topic.slug)
  const githubSlugs = github.track.map(topic => topic.slug)

  for (const slug of [
    '46-deep-git-github-learning-roadmap',
    '47-workflow-reasoning-and-recovery-playbooks',
    '48-git-internals-from-filesystem-to-replication'
  ]) {
    assert.ok(gitSlugs.includes(slug), `${slug} should be in the Git track`)
    assert.ok(existsSync(path.join(root, 'content/computer-science/git', `${slug}.mdx`)))
  }

  for (const slug of [
    '33-github-collaboration-platform-mental-model',
    '34-ai-native-git-and-github-futures',
    '35-git-and-github-reference-library'
  ]) {
    assert.ok(githubSlugs.includes(slug), `${slug} should be in the GitHub track`)
    assert.ok(existsSync(path.join(root, 'content/computer-science/github', `${slug}.mdx`)))
  }
})

test('phase three Git and Bitbucket end-to-end pages are routed', () => {
  const taxonomy = readJson('atlas/taxonomy.json')
  const computerScience = taxonomy.domains.find(domain => domain.slug === 'computer-science')
  const git = computerScience.children.find(topic => topic.slug === 'git')
  const bitbucket = computerScience.children.find(topic => topic.slug === 'bitbucket')
  const gitSlugs = git.track.map(topic => topic.slug)
  const bitbucketSlugs = bitbucket.track.map(topic => topic.slug)

  for (const slug of [
    '49-complete-git-end-to-end-field-guide',
    '50-advanced-git-workflow-systems'
  ]) {
    assert.ok(gitSlugs.includes(slug), `${slug} should be in the Git track`)
    assert.ok(existsSync(path.join(root, 'content/computer-science/git', `${slug}.mdx`)))
  }

  assert.ok(bitbucket.track.length >= 8, 'Bitbucket track should cover the full platform loop')

  for (const slug of [
    '00-why-bitbucket-exists',
    '01-bitbucket-platform-mental-model',
    '02-repositories-branches-and-pull-requests',
    '03-branch-permissions-merge-checks-and-review',
    '04-bitbucket-pipelines-deployments-and-secrets',
    '05-jira-governance-security-and-migration',
    '06-advanced-bitbucket-operating-model',
    '07-bitbucket-reference-library'
  ]) {
    assert.ok(bitbucketSlugs.includes(slug), `${slug} should be in the Bitbucket track`)
    assert.ok(existsSync(path.join(root, 'content/computer-science/bitbucket', `${slug}.mdx`)))
  }
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

test('homepage and computer science landing page surface authored Git platform tracks', () => {
  const home = readFileSync(path.join(root, 'content/index.mdx'), 'utf8')
  const computerScience = readFileSync(path.join(root, 'content/computer-science/index.mdx'), 'utf8')

  for (const phrase of [
    'Featured Learning Tracks',
    '/computer-science/git/49-complete-git-end-to-end-field-guide',
    '/computer-science/github/33-github-collaboration-platform-mental-model',
    '/computer-science/bitbucket/00-why-bitbucket-exists'
  ]) {
    assert.ok(home.includes(phrase), `homepage should surface ${phrase}`)
  }

  for (const phrase of [
    'Version Control And Collaboration',
    '/computer-science/git',
    '/computer-science/github',
    '/computer-science/bitbucket',
    'GitHub',
    'Bitbucket'
  ]) {
    assert.ok(computerScience.includes(phrase), `computer science landing page should surface ${phrase}`)
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

test('mdx placeholders use mdx-safe comments', () => {
  const files = listMdxFiles(path.join(root, 'content'))

  for (const file of files) {
    const source = readFileSync(file, 'utf8')
    assert.equal(source.includes('<!--'), false, `${path.relative(root, file)} has an HTML comment`)
  }
})

test('phase two deep pages cover workflows, internals, AI frontiers, and references', () => {
  const files = [
    'content/computer-science/git/46-deep-git-github-learning-roadmap.mdx',
    'content/computer-science/git/47-workflow-reasoning-and-recovery-playbooks.mdx',
    'content/computer-science/git/48-git-internals-from-filesystem-to-replication.mdx',
    'content/computer-science/github/33-github-collaboration-platform-mental-model.mdx',
    'content/computer-science/github/34-ai-native-git-and-github-futures.mdx',
    'content/computer-science/github/35-git-and-github-reference-library.mdx'
  ]
  const combined = files.map(file => readFileSync(path.join(root, file), 'utf8')).join('\n')

  for (const phrase of [
    'Common beginner confusion',
    'Workflow decision table',
    'Recovery playbooks',
    'Object database',
    'Index file',
    'Packfiles',
    'Protocol v2',
    'Pull requests',
    'Branch protection',
    'AI-native improvements',
    'Comprehensive reference library'
  ]) {
    assert.ok(combined.includes(phrase), `${phrase} should be covered in Phase 2 pages`)
  }
})

test('phase three Git and Bitbucket pages cover advanced workflows and platform operations', () => {
  const files = [
    'content/computer-science/git/49-complete-git-end-to-end-field-guide.mdx',
    'content/computer-science/git/50-advanced-git-workflow-systems.mdx',
    'content/computer-science/bitbucket/00-why-bitbucket-exists.mdx',
    'content/computer-science/bitbucket/01-bitbucket-platform-mental-model.mdx',
    'content/computer-science/bitbucket/02-repositories-branches-and-pull-requests.mdx',
    'content/computer-science/bitbucket/03-branch-permissions-merge-checks-and-review.mdx',
    'content/computer-science/bitbucket/04-bitbucket-pipelines-deployments-and-secrets.mdx',
    'content/computer-science/bitbucket/05-jira-governance-security-and-migration.mdx',
    'content/computer-science/bitbucket/06-advanced-bitbucket-operating-model.mdx',
    'content/computer-science/bitbucket/07-bitbucket-reference-library.mdx'
  ]
  const combined = files.map(file => readFileSync(path.join(root, file), 'utf8')).join('\n')

  for (const file of files) {
    const source = readFileSync(path.join(root, file), 'utf8')
    assert.equal(source.includes('Content will be written manually'), false, `${file} should contain authored content`)
  }

  for (const phrase of [
    'Advanced Git workflows',
    'Workflow decision matrix',
    'Stacked branches',
    'Release trains',
    'Monorepo operations',
    'Sparse checkout',
    'Partial clone',
    'rerere',
    'Bitbucket Cloud',
    'Workspaces',
    'Projects',
    'Pull requests',
    'Branch permissions',
    'Merge checks',
    'Bitbucket Pipelines',
    'Deployments',
    'Variables and secrets',
    'Jira integration',
    'Code Insights',
    'Bitbucket Data Center',
    'Comprehensive Bitbucket references'
  ]) {
    assert.ok(combined.includes(phrase), `${phrase} should be covered in Phase 3 pages`)
  }
})

test('react-aria package exports required by Nextra resolve to installed files', () => {
  const packageJsonPath = require.resolve('react-aria/package.json')
  const packageRoot = path.dirname(packageJsonPath)
  const requiredExports = [
    'dist/exports/index.mjs',
    'dist/exports/FocusRing.mjs',
    'dist/exports/FocusScope.mjs',
    'dist/exports/useFocusRing.mjs',
    'dist/exports/usePress.mjs',
    'dist/exports/useKeyboard.mjs',
    'dist/exports/Focusable.mjs'
  ]

  for (const exportPath of requiredExports) {
    assert.ok(
      existsSync(path.join(packageRoot, exportPath)),
      `react-aria ${exportPath} should be installed`
    )
  }
})
