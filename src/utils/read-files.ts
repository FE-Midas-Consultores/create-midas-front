import { readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Reads all files in a project directory and replaces the
 * '{{ PROJECT_NAME }}' string with the project name in each file.
 *
 * @param  projectName - The name of the project.
 */
export function replaceFiles(projectName: string) {
  const projectPath = join(process.cwd(), projectName)

  return addProjectName(projectName, projectPath)
}

/**
 * Recursive function that adds the project name to each
 * file containing the '{{ PROJECT_NAME }}' string.
 * @param projectName - The name of the project.
 * @param path - The path of the directory or file to process.
 */
async function addProjectName(projectName: string, path: string) {
  const files = await readdir(path, { withFileTypes: true })

  await Promise.all(
    files.map(async (file) => {
      const filePath = join(path, file.name)

      if (file.isDirectory()) {
        await addProjectName(projectName, filePath)
      } else {
        const data = await readFile(filePath, 'utf8')

        if (data.includes('{{ PROJECT_NAME }}')) {
          const replacedFile = data.replace('{{ PROJECT_NAME }}', projectName)

          await writeFile(filePath, replacedFile, 'utf8')
        }
      }
    }),
  )
}
