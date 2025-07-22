import { join } from 'node:path'

import { addNodeVersion } from '../utils/add-node-version.js'
import { buildDependencies } from '../utils/build-dependencies.js'
import { copyFromTemplate } from '../utils/copy-from-template.js'
import { getPackageManger } from '../utils/get-package-manager.js'
import { getProjectName } from '../utils/get-project-name.js'
import { getTemplateName } from '../utils/get-template.js'
import { renameGitignore } from '../utils/rename-gitignore.js'
import { setupProject } from '../utils/setup-project.js'
import { showNextStepsMessage } from '../utils/show-next-steps-message.js'

export async function createProject({ name, template }: { name?: string; template?: string } = {}) {
  const packageManager = await getPackageManger()

  const projectName = await getProjectName(name)
  const selectedTemplate = await getTemplateName(template)

  await copyFromTemplate(selectedTemplate, projectName)
  await buildDependencies({ template: selectedTemplate, projectName })
  await copyFromTemplate('README.md', join(projectName, 'README.md'))
  await renameGitignore(projectName)
  await addNodeVersion(projectName)
  await setupProject(packageManager, projectName)

  showNextStepsMessage(projectName, packageManager)
}
