import { readdir } from 'node:fs/promises'

import { text, log } from '@clack/prompts'
import colors from 'picocolors'

import { handleCancelPrompt } from './handle-cancel-prompt.js'

/**
 * Prompts the user to enter a project name, validates it, and ensures
 * there is no conflict with existing directory names in the current
 * working directory.
 */
export async function getProjectName() {
  const projectName = handleCancelPrompt(
    await text({
      message: 'What is your project named?',
      validate: (value) => {
        if (/^$|[^a-zA-Z0-9_-]/g.test(value)) {
          return 'Project name can only contain letters, numbers, hyphens, and underscores'
        }
      },
    }),
  )

  const cwd = await readdir(process.cwd(), { withFileTypes: true })
  const hasFolderWithSameName = cwd.find((dir) => projectName === dir.name && dir.isDirectory())

  if (hasFolderWithSameName) {
    log.error(colors.red('🔴 A folder with the same name already exists 🔴'))

    return getProjectName()
  }

  return projectName
}
