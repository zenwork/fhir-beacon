export function pluralize(word: string): string {

  // Regular patterns for different pluralization rules
  const pluralRules: { [key: string]: RegExp } = {
    ies: /(?<=[^aeiou])y$/i,
    oes: /(o)$/i,
    shes: /(sh)$/i,
    ches: /(ch)$/i,
    xes: /(x)$/i,
    ses: /(s)$/i,
    zes: /(z)$/i,
    ves: /(f|fe)$/i
  }

  // Applying the pluralization rules
  if (pluralRules['ies'].test(word)) {
    return word.replace(pluralRules['ies'], 'ies')
  }

  for (const [suffix, regex] of Object.entries(pluralRules)) {
    if (suffix === 'ies') continue // already handled
    if (regex.test(word)) {
      if (suffix !== 'ves') return word + 'es'
      return word.replace(pluralRules['ves'], 'ves')
    }
  }

  // Default pluralization rule
  return word + 's'
}
