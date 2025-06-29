const camelCasePattern = /([a-z])([A-Z])/g
const allCapsToCamelCasePattern = /([A-Z]+)([A-Z][a-z])/g
const mixedAlphaNumericPattern1 = /([a-zA-Z])(\d)/g
const mixedAlphaNumericPattern2 = /(\d)([a-zA-Z])/g
const removeExtraSpacesPattern = /([A-Z0-9])(?![a-z])( )(?![A-Z][a-z])/g
const dollarSignPattern = /(\$)([A-Z0-9])/g
const leadingUnderscorePattern = /^_/g
const underscoresPattern = /_/g
const kebabCasePattern = /-/g


export function asReadable(text: string, to: 'none' | 'lower' | 'upper' = 'none'): string {
  if (!text) return text

  const readable = cleanUpString(splitAlphaNumeric(splitAllCapsToCamelCase(splitAllSpecialCase(text))))

  switch (to) {
    case 'none':
      return readable
    case 'lower':
      return readable.toLowerCase()
    case 'upper':
      return readable.toUpperCase()
  }
}


function splitAllSpecialCase(str: string): string {
  return str.replace(camelCasePattern, '$1 $2')
            .replace(kebabCasePattern, '_')
}


function splitAllCapsToCamelCase(str: string): string {
  return str.replace(allCapsToCamelCasePattern, '$1 $2')
}


function splitAlphaNumeric(str: string): string {
  return str.replace(mixedAlphaNumericPattern1, '$1 $2')
            .replace(mixedAlphaNumericPattern2, '$1 $2')
}


function cleanUpString(str: string): string {
  return str.replace(removeExtraSpacesPattern, '$1')
            .replace(dollarSignPattern, '$1 $2')
            .replace(leadingUnderscorePattern, '')
            .replace(underscoresPattern, ' ')

}
