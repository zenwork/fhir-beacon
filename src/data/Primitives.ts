// code
export type Code = string
const codeRegex = /^(\S+\s)?\S+$/
export const toCode = (code: string): Code => {
  let match = codeRegex.test(code)
  if (match) {
    return code as Code
  }
  throw new TypeError(`code must match ${codeRegex.toString()}: ${code}`)
}

// url
export const toUrl = (url: string): URL => {
  if (URL.canParse(url)) {
    return new URL(url)
  }

  throw new TypeError(`URL must be a valid URL: ${url}}`)
}
