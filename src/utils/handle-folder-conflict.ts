import { readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

import { cancel, select, spinner as createSpinner } from '@clack/prompts'

import { handleCancelPrompt } from './handle-cancel-prompt.js'
import { sleep } from './sleep.js'

export async function handleFolderConflict(projectName: string) {
  const answer = handleCancelPrompt(
    await select({
      message: 'This folder is not empty. What would you like to do?',
      options: [
        { label: 'Delete files and continue', value: 'delete' },
        { label: 'Cancel operation', value: 'cancel' },
      ],
    }),
  )

  if (answer === 'cancel') {
    cancel('Operation cancelled')

    process.exit(0)
  }

  const path = projectName === '.' ? process.cwd() : join(process.cwd(), projectName)

  const spinner = createSpinner()

  spinner.start('Cleaning up 🧹')
  await sleep()

  for (const file of readdirSync(path)) {
    if (file === '.git') continue

    rmSync(join(path, file), { recursive: true, force: true })
  }

  spinner.stop('Cleaned up ✅')

  return projectName
}
