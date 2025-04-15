/**
 * Formats HTML string by properly indenting, wrapping, and cleaning unnecessary whitespace
 * while preserving meaningful newlines.
 *
 * @param {string} htmlString - The HTML string to format
 * @param {Object} [options] - Formatting options
 * @param {number} [options.indentSize=2] - Number of spaces per indentation level
 * @param {number} [options.maxLineLength=80] - Maximum line length before wrapping
 * @param {boolean} [options.preserveCommentIndentation=true] - Whether to preserve indentation in comments
 * @returns {string} - The formatted HTML string
 */
export function formatHtml(htmlString: string,
                           options: { indentSize?: number, maxLineLength?: number, preserveCommentIndentation?: boolean } = {}): string {
  const {
    indentSize = 2,
    maxLineLength = 80,
    preserveCommentIndentation = true
  } = options

  // Pre-process: normalize line breaks and remove excessive whitespace
  let html = htmlString.trim()
                       .replace(/\r\n/g, '\n')
                       .replace(/\t/g, ' '.repeat(indentSize))
                       .replace(/\s+</g, '<')
                       .replace(/>\s+/g, '>')

  // Preserve content in preformatted tags
  const preBlocks: any[] = []
  html = html.replace(/(<pre(?:\s[^>]*)?>)([\s\S]*?)(<\/pre>)/gi, (match: any, open: any, content: any, close: any) => {
    preBlocks.push(content)
    return `${open}__PRE_BLOCK_${preBlocks.length - 1}__${close}`
  })

  // Preserve content in script and style tags
  const scriptStyleBlocks: any[] = []
  html = html.replace(/(<(script|style)(?:\s[^>]*)?>)([\s\S]*?)(<\/\2>)/gi, (match: any, open: any, tag: any, content: any, close: any) => {
    scriptStyleBlocks.push(content)
    return `${open}__SCRIPT_STYLE_BLOCK_${scriptStyleBlocks.length - 1}__${close}`
  })

  // Preserve content in comments
  const commentBlocks: any[] = []
  html = html.replace(/<!--([\s\S]*?)-->/g, (match: any, content: string) => {
    commentBlocks.push(preserveCommentIndentation ? content : content.trim())
    return `<!--__COMMENT_BLOCK_${commentBlocks.length - 1}__-->`
  })

  // Add newlines between elements for better formatting
  html = html
    .replace(/>\s*</g, '>\n<')
    .replace(/(<\/[^>]+>)(?![\s\n])/g, '$1\n')
    .replace(/([^>\s])\s*(<[^\/])/g, '$1\n$2')

  // Format the indentation
  const lines = html.split('\n')
  let formattedLines = []
  let indentLevel = 0
  let currentLine = ''

  const selfClosingTags = /^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)[\s>]/i
  const voidElements = /^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/i

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    // Handle indentation for closing tags
    if (line.startsWith('</') && indentLevel > 0) {
      indentLevel--
    }

    // Start building the current line with proper indentation
    currentLine = ' '.repeat(indentLevel * indentSize) + line

    // Add the line to our formatted output
    formattedLines.push(currentLine)

    // Adjust indent level for the next line
    if (!line.startsWith('</') &&
        line.includes('<') &&
        !line.includes('/>') &&
        !selfClosingTags.test(line) &&
        !line.endsWith('</') &&
        !voidElements.test(line)) {
      // Only increment if this is an opening tag and not self-closing
      if (line.lastIndexOf('<') > line.lastIndexOf('</')) {
        indentLevel++
      }
    }
  }

  // Restore preserved content
  html = formattedLines.join('\n')

  // Restore comments
  html = html.replace(/<!--__COMMENT_BLOCK_(\d+)__-->/g, (match: any, index: number) => {
    return `<!--${commentBlocks[index]}-->`
  })

  // Restore script and style blocks
  html = html.replace(/<(script|style)(?:\s[^>]*)?>__SCRIPT_STYLE_BLOCK_(\d+)__<\/\1>/gi, (match: any, tag: any, index: number) => {
    return `<${tag}>\n${scriptStyleBlocks[index].trim()}\n</${tag}>`
  })

  // Restore pre blocks
  html = html.replace(/<pre(?:\s[^>]*)?>__PRE_BLOCK_(\d+)__<\/pre>/gi, (match: any, index: number) => {
    return `<pre>${preBlocks[index]}</pre>`
  })

  return html
}
