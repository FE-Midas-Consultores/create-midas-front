import { rename } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Renames the `gitignore` file to `.gitignore`.
 *
 * Npm ignores the `.gitignore` file by default.
 */
export async function renameGitignore(projectName: string) {
  const projectPath = join(process.cwd(), projectName)
  const gitignorePath = join(projectPath, 'gitignore')

  await rename(gitignorePath, join(projectPath, '.gitignore'))
}
