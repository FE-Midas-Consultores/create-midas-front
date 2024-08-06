import { join } from 'node:path'

import { spinner as createSpinner, note } from '@clack/prompts'
import colors from 'picocolors'

import { addNodeVersion } from '../utils/add-node-version.js'
import { copyFromTemplate } from '../utils/copy-from-template.js'
import { execCmd } from '../utils/exec-command.js'
import { getPackageManger } from '../utils/get-package-manager.js'
import { getProjectName } from '../utils/get-project-name.js'
import { getTsPreference } from '../utils/get-ts-preference.js'
import { replaceFiles } from '../utils/read-files.js'
import { renameGitignore } from '../utils/rename-gitignore.js'
import { sleep } from '../utils/sleep.js'

export async function reactGenerator({ typescript }: { typescript?: boolean } = {}) {
  const packageManager = await getPackageManger()

  const spinner = createSpinner()

  const projectName = await getProjectName()

  const projectPath = join(process.cwd(), projectName)

  const includeTs = typescript ?? (await getTsPreference())

  await copyFromTemplate(includeTs ? 'react/ts' : 'react/js', projectName)

  await copyFromTemplate('README.md', join(projectName, 'README.md'))

  await renameGitignore(projectName)

  await replaceFiles(projectName)

  await addNodeVersion(projectName)

  spinner.start('Initializing Git 🚀')
  await sleep()

  await execCmd('git init -b main', { cwd: projectPath })

  spinner.message('Installing dependencies 📦')

  await execCmd(`${packageManager} install`, { cwd: projectPath })

  spinner.stop('Dependencies have been installed ✅')

  const nextStepsMessage = `${colors.green('cd')} ${projectName}

Check the node version in the ${colors.yellow('.node-version')} file`

  note(nextStepsMessage, 'Next steps:')
}
