import { isCancel, cancel } from '@clack/prompts'

/**
 * Handles a cancelable prompt response.
 *
 * If the response indicates a cancellation, the function cancels the
 * operation with a message and exits the process. Otherwise, it returns
 * the provided value.
 *
 * @example
 *
 * const projectName = handleCancelPrompt(
 *  await text({ message: "What is your project named?" })
 * );
 */
export function handleCancelPrompt<T>(value: T | symbol) {
  if (isCancel(value)) {
    cancel('create-midas-front aborted')

    process.exit(0)
  }

  return value
}
