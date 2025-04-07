/**
 * Creates a function that alternates between two background colors
 * and returns a formatting object for console output
 *
 * @param {string} bgColor1 - First background color (default: black)
 * @param {string} bgColor2 - Second background color (default: #333333 - dark gray)
 * @returns {Function} A function that returns formatted text with alternating backgrounds
 */
function createAlternatingColorizer(): Function {
  let isDark = true
  const width: number = 130

  /**
   * Returns a formatted string with alternating background color
   * @param {string} message - The message to format
   * @param {string} textColor - Optional text color (default: white)
   * @returns {string} The formatted message
   */
  return function colorize(message: string, textColor: string = 'white'): string {

    // Determine background color for this call
    const dark: string = '#cccccc'
    const light: string = '#333333'
    const bgColor = isDark ? dark : light

    message = message.padEnd(width, ' ')
    if (message.length > width) {
      const before: string = message.substring(0, width)
      const lines: string[] = []
      let after: string = ''.padEnd(78, ' ') + message.substring(width)
      while (after.length > width) {
        lines.push(after.substring(0, width))
        after = ''.padEnd(78, ' ') + after.substring(width)
      }
      lines.push(after.padEnd(width, ' '))


      message = before + '\n' + lines.join('\n').padEnd(width, ' ')
    }

    // Create the formatted message with escape codes for terminal
    const formattedMessage = `\x1b[48;2;${bgColor === dark
                                          ? '20;20;20'
                                          : '31;31;31'};38;2;${textColor === 'white'
                                                               ? '255;255;255'
                                                               : '255;0;0'}m${message}\x1b[0m`

    // Toggle for next call
    isDark = !isDark

    return formattedMessage
  }
}

// Create a colorizer
export const alternatingColor = createAlternatingColorizer()
