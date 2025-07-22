import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { execCmd } from './exec-command.js'

/**
 * Adds the Node.js LTS version to the project's `.node-version` file.
 * In case there is an error, it will fallback to the current user's Node.js version.
 */
export async function addNodeVersion(projectName: string) {
  try {
    const response = await fetch('https://nodejs.org/dist/index.json')

    const data = (await response.json()) as {
      lts: string | boolean
      version: string
      security: boolean
    }[]

    const latestLts = data.find((nodeVersion) => Boolean(nodeVersion.lts) && nodeVersion.security)

    if (!latestLts) throw new Error('No LTS version found')

    await writeFile(join(process.cwd(), projectName, '.node-version'), latestLts.version, 'utf8')
  } catch (_error) {
    const { stdout: nodeVersion } = await execCmd('node -v')

    await writeFile(
      join(process.cwd(), projectName, '.node-version'),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      nodeVersion.split('.')[0]!,
      'utf8',
    )
  }
}
