import { join } from 'node:path'

import { addNodeVersion } from '../utils/add-node-version.js'
import { copyFromTemplate } from '../utils/copy-from-template.js'
import { getPackageManger } from '../utils/get-package-manager.js'
import { getProjectName } from '../utils/get-project-name.js'
import { getTsPreference } from '../utils/get-ts-preference.js'
import { renameGitignore } from '../utils/rename-gitignore.js'
import { setupProject } from '../utils/setup-project.js'
import { showNextStepsMessage } from '../utils/show-next-steps-message.js'

export async function reactGenerator({ typescript }: { typescript?: boolean } = {}) {
  const packageManager = await getPackageManger()

  const projectName = await getProjectName()

  const includeTs = typescript ?? (await getTsPreference())

  await copyFromTemplate(includeTs ? 'react/ts' : 'react/js', projectName)

  await copyFromTemplate('README.md', join(projectName, 'README.md'))

  await renameGitignore(projectName)

  await addNodeVersion(projectName)

  await setupProject(packageManager, projectName)

  showNextStepsMessage(projectName)
}
