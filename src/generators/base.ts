import { select } from '@clack/prompts'

import { EXEC_GENERATOR } from '../constants/generators.js'
import { getTemplates } from '../utils/get-templates.js'
import { handleCancelPrompt } from '../utils/handle-cancel-prompt.js'

export async function baseGenerator() {
  const generator = handleCancelPrompt(
    (await select({
      message: 'Which generator do you want to run?',
      options: (await getTemplates()) as { label: string; value: keyof typeof EXEC_GENERATOR }[],
    })) as keyof typeof EXEC_GENERATOR,
  )

  await EXEC_GENERATOR[generator]()
}
