import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { execaCommandSync, type SyncResult, type SyncOptions } from 'execa'
import colors from 'picocolors'
import { describe, test, beforeAll, afterEach, expect } from 'vitest'

const CLI_PATH = join(__dirname, '..', '..', 'build', 'index.js')

const projectName = 'test-app'
const projectPath = join(__dirname, projectName)
const projectPathWithSubDir = join(__dirname, 'subdir', projectName)

const template = 'react-ts'

const templateFiles = readdirSync(join(__dirname, '..', '..', 'build', 'templates', template))
  .map((file) => (file === 'gitignore' ? '.gitignore' : file))
  .sort()

const runCli = <SO extends SyncOptions>(args: string[], options?: SO): SyncResult<SO> => {
  return execaCommandSync(`node ${CLI_PATH} ${args.join(' ')}`, options)
}

const createNonEmptyDir = (overridePath?: string) => {
  const newNonEmptyDir = overridePath ?? projectPath

  mkdirSync(newNonEmptyDir, { recursive: true })

  const pkgJson = join(newNonEmptyDir, 'package.json')

  writeFileSync(pkgJson, '{ "foo": "bar" }')
}

const clearDirectories = () => {
  if (existsSync(projectPath)) {
    rmSync(projectPath, { recursive: true, force: true })
  }

  if (existsSync(projectPathWithSubDir)) {
    rmSync(projectPathWithSubDir, { recursive: true, force: true })
  }
}

const MESSAGES = {
  PROJECT_NAME: 'What is your project named?',
  TEMPLATE: 'Please select a template:',
  UNKNOWN_TEMPLATE: (template: string) =>
    `Unknown template: ${colors.yellow(template)}. Please select a template:`,
  EMPTY_DIR: 'This folder is not empty. What would you like to do?',
  INSTALLING: 'Setting up project',
} as const

describe('Create Santux CLI', () => {
  beforeAll(() => clearDirectories())
  afterEach(() => clearDirectories())

  test('should prompt for the project name if not provided', () => {
    const { stdout } = runCli([])

    expect(stdout).toContain(MESSAGES.PROJECT_NAME)
  })

  test('should prompt for the template if not provided and the target dir is current directory', () => {
    mkdirSync(projectPath, { recursive: true })

    const { stdout } = runCli(['.'], { cwd: projectPath })

    expect(stdout).toContain(MESSAGES.TEMPLATE)
  })

  test('should prompt for the template if not provided', () => {
    const { stdout } = runCli([projectName])

    expect(stdout).toContain(MESSAGES.TEMPLATE)
  })

  test('should prompt for the template on providing an invalid value for --template', () => {
    const unknownTemplate = 'unknown'
    const { stdout } = runCli([projectName, '--template', unknownTemplate])

    expect(stdout).toContain(MESSAGES.UNKNOWN_TEMPLATE(unknownTemplate))
  })

  test('should prompt to override a non-empty directory', () => {
    createNonEmptyDir()

    const { stdout } = runCli([projectName], { cwd: __dirname })

    expect(stdout).toContain(MESSAGES.EMPTY_DIR)
  })

  test('should prompt to override a non-empty subdirectory', () => {
    createNonEmptyDir(projectPathWithSubDir)

    const { stdout } = runCli([`subdir/${projectName}`], { cwd: __dirname })

    expect(stdout).toContain(MESSAGES.EMPTY_DIR)
  })

  test('should successfully create a project', () => {
    const { stdout } = runCli([projectName, '--template', template], {
      cwd: __dirname,
      timeout: 1000,
      reject: false,
    })

    const generatedFiles = readdirSync(projectPath)
      .filter((file) => file !== '.node-version' && file !== 'README.md')
      .sort()

    expect(stdout).toContain(MESSAGES.INSTALLING)
    expect(templateFiles).toEqual(generatedFiles)
  })
})
