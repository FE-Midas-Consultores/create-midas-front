import { select } from '@clack/prompts'
import colors from 'picocolors'

import { type Template, TEMPLATES } from '../constants/templates.js'

import { handleCancelPrompt } from './handle-cancel-prompt.js'

function isValidTemplate(template: string): template is Template {
  return Object.keys(TEMPLATES).includes(template)
}

/**
 * Retrieves the template name based on the provided template argument.
 * If the template is not provided, the function prompts the user to select a template.
 */
export async function getTemplateName(template?: string) {
  return template && isValidTemplate(template)
    ? template
    : handleCancelPrompt(
        await select({
          message: template
            ? `Unknown template: ${colors.yellow(template)}. Please select a template:`
            : 'Please select a template:',
          options: Object.entries(TEMPLATES).map(([value, label]) => ({
            label,
            value: value as Template,
          })),
        }),
      )
}
