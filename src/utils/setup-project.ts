import { join } from 'node:path'

import { spinner as createSpinner } from '@clack/prompts'

import { type PACKAGE_MANAGER } from '../constants/package-manager.js'

import { execCmd } from './exec-command.js'
import { replaceFiles } from './read-files.js'
import { sleep } from './sleep.js'

/**
 * Setup a project by initializing git and installing dependencies
 *
 * @param packageManager - The package manager to use.
 * @param projectName - The name of the project.
 */
export async function setupProject(
  packageManager: keyof typeof PACKAGE_MANAGER,
  projectName: string,
) {
  const projectPath = join(process.cwd(), projectName)
  const spinner = createSpinner()

  spinner.start('Setting up project 🚧')

  await replaceFiles(projectName)

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
