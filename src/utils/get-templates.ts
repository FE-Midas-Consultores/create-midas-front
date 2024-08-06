import { readdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Retrieves the list of template files from the templates directory.
 */
export async function getTemplates() {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const templatePath = resolve(__dirname, 'templates')
  const templateFolder = await readdir(templatePath)

  return templateFolder.reduce<{ label: string; value: string }[]>((acc, template) => {
    if (template !== 'README.md') {
      acc.push({
        label: template.replace(/^./, (char) => char.toUpperCase()),
        value: template,
      })
    }

    return acc
  }, [])
}
