import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { type Template } from '../constants/templates.js'
import basePackageJson from '../dependencies/base/package.json' with { type: 'json' }
import nextPackageJson from '../dependencies/next/package.json' with { type: 'json' }
import reactPackageJson from '../dependencies/react/package.json' with { type: 'json' }
import tsPackageJson from '../dependencies/typescript/package.json' with { type: 'json' }
import vitePackageJson from '../dependencies/vite/package.json' with { type: 'json' }

const packages = {
  react: reactPackageJson,
  base: basePackageJson,
  next: nextPackageJson,
  ts: tsPackageJson,
  vite: vitePackageJson,
}

const dependencies: Record<Template, (keyof typeof packages)[]> = {
  next: ['base', 'react', 'next'],
  'next-ts': ['base', 'react', 'next', 'ts'],
  react: ['base', 'react', 'vite'],
  'react-ts': ['base', 'react', 'vite', 'ts'],
}

/**
 * Merges and writes project dependencies into the `package.json`
 * file based on the selected template.
 */
export async function buildDependencies({
  template: generator,
  projectName,
}: {
  template: Template
  projectName: string
}) {
  const projectPath = join(process.cwd(), projectName)

  const pkgJson = JSON.parse(await readFile(join(projectPath, 'package.json'), 'utf8')) as Record<
    string,
    string
  >

  const projectDeps = dependencies[generator].reduce<
    Record<'dependencies' | 'devDependencies', Record<string, string>>
  >(
    (acc, dep) => {
      Object.assign(acc.dependencies, packages[dep].dependencies)
      Object.assign(acc.devDependencies, packages[dep].devDependencies)

      return acc
    },
    { dependencies: {}, devDependencies: {} },
  )

  const mergedPkgJson = {
    ...pkgJson,
    dependencies: { ...projectDeps.dependencies },
    devDependencies: { ...projectDeps.devDependencies },
  }

  await writeFile(
    join(projectPath, 'package.json'),
    `${JSON.stringify(mergedPkgJson, null, 2)}\n`,
    'utf8',
  )
}
