/**
 * Delays execution for a specified amount of time.
 * @param {number} ms - The duration in milliseconds to delay execution. Defaults to 100ms if not provided
 * @return {Promise<void>} A Promise that resolves after the delay.
 */
export function aTimeout(ms: number = 100): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
