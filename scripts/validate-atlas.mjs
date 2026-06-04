import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const taxonomy = JSON.parse(await readFile(path.join(root, 'atlas', 'taxonomy.json'), 'utf8'))
const contentRoot = path.join(root, 'content')

const allowedDifficulties = new Set(taxonomy.difficulties)
const allowedStages = new Set(taxonomy.stages)
const requiredMetadata = [
  'title',
  'description',
  'domain',
  'category',
  'difficulty',
  'stage',
  'type',
  'status',
  'tags',
  'prerequisites',
  'related',
  'researchQuestions'
]

async function listMdx(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await listMdx(fullPath)))
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath)
    }
  }

  return files
}

function assert(condition, message, errors) {
  if (!condition) {
    errors.push(message)
  }
}

function validateMetadata(file, data, errors) {
  if (data.type === 'system') {
    return
  }

  for (const field of requiredMetadata) {
    assert(data[field] !== undefined, `${file}: missing frontmatter field "${field}"`, errors)
  }

  assert(data.status === 'scaffold', `${file}: status must be "scaffold" for generated placeholders`, errors)
  assert(allowedDifficulties.has(data.difficulty), `${file}: invalid difficulty "${data.difficulty}"`, errors)
  assert(allowedStages.has(data.stage), `${file}: invalid stage "${data.stage}"`, errors)
  assert(Array.isArray(data.tags), `${file}: tags must be an array`, errors)
  assert(Array.isArray(data.prerequisites), `${file}: prerequisites must be an array`, errors)
  assert(Array.isArray(data.related), `${file}: related must be an array`, errors)
  assert(Array.isArray(data.researchQuestions), `${file}: researchQuestions must be an array`, errors)
}

function validateSections(file, content, data, errors) {
  if (data.type === 'system') {
    return
  }

  for (const section of taxonomy.requiredSections) {
    assert(content.includes(`## ${section}`), `${file}: missing required section "${section}"`, errors)
  }
}

function validateTaxonomy(errors) {
  const domainSlugs = taxonomy.domains.map(domain => domain.slug)
  assert(domainSlugs.length === new Set(domainSlugs).size, 'taxonomy: domain slugs must be unique', errors)

  for (const domain of taxonomy.domains) {
    const topicSlugs = domain.children.map(topic => topic.slug)
    assert(
      topicSlugs.length === new Set(topicSlugs).size,
      `taxonomy: topic slugs must be unique in ${domain.slug}`,
      errors
    )

    for (const topic of domain.children) {
      if (topic.track) {
        const trackSlugs = topic.track.map(item => item.slug)
        assert(
          trackSlugs.length === new Set(trackSlugs).size,
          `taxonomy: track slugs must be unique in ${domain.slug}/${topic.slug}`,
          errors
        )
      }
    }
  }
}

const errors = []
validateTaxonomy(errors)

for (const filePath of await listMdx(contentRoot)) {
  const relative = path.relative(root, filePath)
  const source = await readFile(filePath, 'utf8')
  const parsed = matter(source)
  validateMetadata(relative, parsed.data, errors)
  validateSections(relative, parsed.content, parsed.data, errors)
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log('Atlas content validation passed.')
