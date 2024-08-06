/**
 * Pauses the execution for a specified number of milliseconds.
 *
 * @param time - The number of milliseconds to sleep. Defaults 1000ms
 */
export function sleep(time = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time))
}
