import { note } from '@clack/prompts'
import colors from 'picocolors'

export function showNextStepsMessage(projectName: string) {
  const nextStepMessage =
    projectName === '.'
      ? `Check the node version in the ${colors.yellow('.node-version')} file`
      : `${colors.green('cd')} ${projectName}

Check the node version in the ${colors.yellow('.node-version')} file`

  note(nextStepMessage, 'Next steps:')
}
