import { select } from '@clack/prompts'

import { PACKAGE_MANAGER } from '../constants/package-manager.js'

import { handleCancelPrompt } from './handle-cancel-prompt.js'

/**
 * Determines the package manager being used based on the user agent string.
 *
 * The function checks the `npm_config_user_agent` environment variable to
 * identify the package manager. It will return `null` if the package manager
 * cannot be determined.
 */
export function getUserPackageManger(): keyof typeof PACKAGE_MANAGER | null {
  const userAgent = process.env.npm_config_user_agent

  if (userAgent?.includes('bun')) {
    return 'bun'
  }

  if (userAgent?.includes('pnpm')) {
    return 'pnpm'
  }

  if (userAgent?.includes('yarn')) {
    return 'yarn'
  }

  if (userAgent?.includes('npm')) {
    return 'npm'
  }

  return null
}

/**
 * Retrieves the package manager used by the user or prompts the user
 * to select one if it cannot be detected.
 */
export async function getPackageManger() {
  const packageManager = getUserPackageManger()

  return (
    packageManager ??
    handleCancelPrompt(
      (await select({
        message: 'Which package manager do you want to use?',
        options: Object.entries(PACKAGE_MANAGER).map(([label, value]) => ({
          label,
          value,
        })),
      })) as keyof typeof PACKAGE_MANAGER,
    )
  )
}
