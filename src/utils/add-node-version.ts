import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { execCmd } from './exec-command.js'

/**
 * Adds the Node.js user current major version to `.node-version` file.
 */
export async function addNodeVersion(projectName: string) {
  const { stdout: nodeVersion } = await execCmd('node -v')

  await writeFile(
    join(process.cwd(), projectName, '.node-version'),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    nodeVersion.split('.')[0]!,
    'utf8',
  )
}
