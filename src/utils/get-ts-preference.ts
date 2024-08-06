import { confirm } from '@clack/prompts'

import { handleCancelPrompt } from './handle-cancel-prompt.js'

export async function getTsPreference() {
  return handleCancelPrompt(
    await confirm({
      message: 'Does your project use TypeScript?',
      initialValue: true,
    }),
  )
}
