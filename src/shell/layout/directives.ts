export const hasSome = (data: Array<any> | null | undefined, verbose: boolean = false) => {
  return verbose || (Array.isArray(data) && data.length > 0)
}

export const hasOnlyOne = (data: Array<any> | null | undefined, verbose: boolean = false) => {
  return verbose || (Array.isArray(data) && data.length == 1)
}

export const hasNone = (data: Array<any> | null | undefined, verbose: boolean = false) => {
  return verbose || (!data || (Array.isArray(data) && data.length <= 0))
}

export const isDefined = (data: any | null | undefined, verbose: boolean = false) => {
  return verbose || data
}
