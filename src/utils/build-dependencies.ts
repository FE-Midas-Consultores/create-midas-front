import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { type EXEC_GENERATOR } from '../constants/generators.js'
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

/**
 * Merges and writes project dependencies into the `package.json` file
 * based on the selected generator and whether TypeScript is used.
 */
export async function buildDependencies({
  generator,
  projectName,
  typescript = false,
}: {
  generator: keyof typeof EXEC_GENERATOR
  projectName: string
  typescript?: boolean
}) {
  const projectPath = join(process.cwd(), projectName)

  const pkgJson = JSON.parse(await readFile(join(projectPath, 'package.json'), 'utf8')) as Record<
    string,
    string
  >

  const mergedPkgJson = {
    ...pkgJson,
    dependencies: {
      ...packages.base.dependencies,
      ...packages.react.dependencies,
      ...(generator === 'next' ? packages.next.dependencies : {}),
      ...(typescript ? packages.ts.dependencies : {}),
    },
    devDependencies: {
      ...packages.base.devDependencies,
      ...packages.react.devDependencies,
      ...(generator === 'next' ? packages.next.devDependencies : {}),
      ...(typescript ? packages.ts.devDependencies : {}),
      ...(generator === 'react' ? packages.vite.devDependencies : {}),
    },
  }

  await writeFile(
    join(projectPath, 'package.json'),
    `${JSON.stringify(mergedPkgJson, null, 2)}\n`,
    'utf8',
  )
}
