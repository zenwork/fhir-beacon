// code
export type Code = string
const codeRegex = /^(\S+\s)?\S+$/
export const toCode = (code: string): Code => {
  let match = codeRegex.test(code)
  if (match) {
    return code as Code
  }
  throw new TypeError(`code must match [ ${codeRegex.toString()} ]`)
}

// url
export const toUrl = (url: string): URL => {
  if (URL.canParse(url)) {
    return new URL(url)
  }

  throw new TypeError(`URL must be a valid URL`)
}

type toFn<T> = (val: any) => T
export const validOrError = <T>(fn: toFn<T>, val: any): { val: T, err: null } | { val: null, err: string } => {
  try {
    return {val: fn(val), err: null}
  } catch (e: any) {
    return {val: null, err: e.toString()}
  }
}

export enum PrimitiveType {
  none = 'none',
  code = 'code',
  url = 'url'
}
