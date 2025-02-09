import {FhirDate} from '../primitive.data'



export type DateFormatProps = {
  date: FhirDate,
  separator?: string,
  monthFormat?: 'long' | 'medium' | 'short',
  order?: 'DMY' | 'MDY' | 'YMD'
}

export function asFormattedDate({
                                  date,
                                  separator = '.',
                                  order = 'DMY',
                                  monthFormat = 'short'
                                }: DateFormatProps): string {


  const inputParts: string[] = date.split('-')
  const shape: 'Y' | 'YM' | 'YMD' = inputParts.length === 1 ? 'Y' : inputParts.length === 2 ? 'YM' : 'YMD'
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const dateObj: Date = new Date(
    Number.parseInt(inputParts[0]),
    inputParts[1] ? Number.parseInt(inputParts[1]) - 1 : 0,
    inputParts[2] ? Number.parseInt(inputParts[2]) : 1
  )

  const formattedParts: Intl.DateTimeFormatPart[] = new Intl.DateTimeFormat(
    navigator.language,
    {
      dateStyle: monthFormat,
      timeStyle: 'short',
      timeZone: localTimeZone,
      hour12: false
    })
    .formatToParts(dateObj)


  const day: string = formattedParts.find(part => part.type === 'day')?.value ?? ''
  const month: string = formattedParts.find(part => part.type === 'month')?.value.padStart(2, '0') ?? ''
  const year: string = inputParts[0] ?? formattedParts.find(part => part.type === 'year')?.value ?? ''

  switch (order) {
    case 'DMY':
      switch (shape) {
        case 'Y':
          return `${year}`
        case 'YM':
          return `${month}${separator}${year}`
        case 'YMD':
          return `${day}${separator}${month}${separator}${year}`
      }
    case 'MDY':
      switch (shape) {
        case 'Y':
          return `${year}`
        case 'YM':
          return `${month}${separator}${year}`
        case 'YMD':
          return `${month}${separator}${day}${separator}${year}`
      }
    case 'YMD':
      switch (shape) {
        case 'Y':
          return `${year}`
        case 'YM':
          return `${year}${separator}${month}`
        case 'YMD':
          return `${year}${separator}${month}${separator}${day}`
      }
  }

}
