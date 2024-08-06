import { exec } from 'node:child_process'
import { promisify } from 'node:util'

/**
 * Promisified version of the exec function from
 * the 'child_process' module.
 */
export const execCmd = promisify(exec)
