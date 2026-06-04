import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const layoutPath = path.join(root, 'node_modules', 'nextra-theme-docs', 'dist', 'layout.js')
const headPath = path.join(root, 'node_modules', 'nextra', 'dist', 'client', 'components', 'head.js')

async function patchFile(filePath, transforms) {
  let source = await readFile(filePath, 'utf8')
  let changed = false

  for (const [from, to] of transforms) {
    if (source.includes(from)) {
      source = source.replace(from, to)
      changed = true
    }
  }

  if (changed) {
    await writeFile(filePath, source, 'utf8')
  }
}

await patchFile(layoutPath, [
  [
    '} = LayoutPropsSchema.safeParse(themeConfig);',
    '} = LayoutPropsSchema.safeParse({ children, ...themeConfig });'
  ],
  [
    'if (error) { console.error("LAYOUT_SCHEMA_ISSUES", JSON.stringify(error.issues, null, 2)); throw z.prettifyError(error); }',
    'if (error) {\n      throw z.prettifyError(error);\n    }'
  ]
])

await patchFile(headPath, [
  [
    'if (error) { console.error("HEAD_SCHEMA_ISSUES", JSON.stringify(error.issues, null, 2)); throw z.prettifyError(error); }',
    'if (error) {\n      throw z.prettifyError(error);\n    }'
  ]
])

console.log('Patched Nextra docs layout validation for current package output.')
