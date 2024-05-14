const regex = /(\S)([A-Z])/g

export function asReadable(camelCaseStr: string): string {

  return camelCaseStr
    .replace(regex, '$1 $2')
    .toLowerCase()
}
