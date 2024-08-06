import { cp } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Copies a specified template file/folder from the 'templates' directory
 * to a specified destination.
 *
 * @param templatePath - Path name of the template file/folder to copy.
 * @param destination - Destination path where the template file/folder
 * should be copied to, relative to the current working directory.
 */
export async function copyFromTemplate(templatePath: string, destination: string) {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const basePath = resolve(__dirname, './templates')

  await cp(join(basePath, templatePath), join(process.cwd(), destination), { recursive: true })
}
