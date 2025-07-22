import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

import { text } from '@clack/prompts'

import { handleCancelPrompt } from './handle-cancel-prompt.js'
import { handleFolderConflict } from './handle-folder-conflict.js'

function isValidProjectName(projectName: string) {
  return projectName === '.' || /^[a-zA-Z0-9_-]+$/.test(projectName)
}

async function hasConflict(projectName: string) {
  const cwdFiles = await readdir(process.cwd(), { withFileTypes: true })

  if (projectName === '.') {
    return cwdFiles.some((file) => file.name !== '.git')
  }

  if (!existsSync(projectName)) return false

  const projectPath = join(process.cwd(), projectName)
  const projectPathFiles = await readdir(projectPath, { withFileTypes: true })

  return projectPathFiles.some((file) => file.name !== '.git')
}

/**
 * Prompts the user to enter a project name, validates it, and ensures
 * there is no conflict with existing directory names in the current
 * working directory.
 */
export async function getProjectName(projectName?: string) {
  const hasProjectName = typeof projectName === 'string' && isValidProjectName(projectName)

  const hasConflictDir = hasProjectName ? await hasConflict(projectName) : false

  if (hasProjectName && hasConflictDir) {
    return handleFolderConflict(projectName)
  }

  const answer =
    projectName ??
    handleCancelPrompt(
      await text({
        message: 'What is your project named?',
        validate: (value) => {
          if (value === '.') return

          if (!isValidProjectName(value)) {
            return 'Project name can only contain letters, numbers, hyphens, and underscores'
          }
        },
      }),
    )

  const hasAnswerConflict = await hasConflict(answer)

  if (hasAnswerConflict) {
    return handleFolderConflict(answer)
  }

  return answer
}
