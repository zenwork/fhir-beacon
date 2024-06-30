const regex = /(\S)([A-Z])/g

export function asReadable(value: string): string {

  if (value) {
    return value
      .replace(regex, '$1 $2')
      .toLowerCase()
  }

  return value
}
