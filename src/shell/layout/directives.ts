export const hasSome = <T>(data: Array<any> | null | undefined) => {
  return Array.isArray(data) && data.length > 0
}

export const hasOnlyOne = <T>(data: Array<any> | null | undefined) => {
  return Array.isArray(data) && data.length == 1
}

export const hasNone = <T>(data: Array<any> | null | undefined) => {
  return !data || (Array.isArray(data) && data.length <= 0)
}
