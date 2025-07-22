import { note } from '@clack/prompts'
import colors from 'picocolors'

import { type PACKAGE_MANAGER } from '../constants/package-manager.js'

export function showNextStepsMessage(
  projectName: string,
  packageManager: keyof typeof PACKAGE_MANAGER,
) {
  const nextStepMessage =
    projectName === '.'
      ? `${colors.green(packageManager)} run dev

Check the node version in the ${colors.yellow('.node-version')} file`
      : `${colors.green('cd')} ${projectName}

${colors.green(packageManager)} run dev

Check the node version in the ${colors.yellow('.node-version')} file`

  note(nextStepMessage, 'Next steps:')
}
