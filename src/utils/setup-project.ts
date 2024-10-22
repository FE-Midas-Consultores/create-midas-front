import { spinner as createSpinner } from '@clack/prompts'

import { execCmd } from './exec-command.js'
import { sleep } from './sleep.js'

/**
 * Setup a project by initializing git and installing dependencies
 */
export async function setupProject(packageManager: string, projectPath: string) {
  const spinner = createSpinner()

  spinner.start()

  try {
    // check if git is already initialized
    await execCmd('git rev-parse --is-inside-work-tree', { cwd: projectPath })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    spinner.message('Initializing Git 🚀')

    await sleep()
    await execCmd('git init -b main', { cwd: projectPath })
  }

  spinner.message('Installing dependencies 📦')

  await execCmd(`${packageManager} install`, { cwd: projectPath })

  spinner.stop('Dependencies have been installed ✅')
}
