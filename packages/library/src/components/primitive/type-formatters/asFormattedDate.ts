import {FhirDate} from '../primitive.data'



export type DateFormatProps = {
  date: FhirDate
  separator?: string
  monthFormat?: 'long' | 'medium' | 'short'
  order?: 'DMY' | 'MDY' | 'YMD'
}

export function asFormattedDate({
                                  date,
                                  separator = '.',
                                  order = 'DMY',
                                  monthFormat = 'short'
                                }: DateFormatProps): string {

  const dateParts = parseDateParts(date)
  const shape = getShape(dateParts)
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Create a date object
  const dateObj = new Date(
    Number.parseInt(dateParts[0]),
    dateParts[1] ? Number.parseInt(dateParts[1]) - 1 : 0,
    dateParts[2] ? Number.parseInt(dateParts[2]) : 1
  )

  // Format the date parts using Intl.DateTimeFormat
  const formattedParts = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: monthFormat,
    timeStyle: 'short',
    timeZone: localTimeZone,
    hour12: false
  }).formatToParts(dateObj)

  const year = dateParts[0] ?? getFormattedPart(formattedParts, 'year')
  const month = getFormattedPart(formattedParts, 'month')
  const day = getFormattedPart(formattedParts, 'day')

  return formatDateParts(shape, order, separator, year, month, day)
}


/** Parses the date parts from the input string */
function parseDateParts(date: FhirDate): string[] {
  return date.split('-')
}

/** Determines the shape of the date based on its parts */
function getShape(parts: string[]): 'Y' | 'YM' | 'YMD' {
  if (parts.length === 1) return 'Y'
  if (parts.length === 2) return 'YM'
  return 'YMD'
}

/** Formats individual date parts using Intl.DateTimeFormat */
function getFormattedPart(parts: Intl.DateTimeFormatPart[], type: string, fallback: string = ''): string {
  return parts.find(part => part.type === type)?.value.padStart(2, '0') ?? fallback
}

/** Formats the date according to the shape and order */
function formatDateParts(
  shape: 'Y' | 'YM' | 'YMD',
  order: 'DMY' | 'MDY' | 'YMD',
  separator: string,
  year: string,
  month: string,
  day: string
): string {
  switch (order) {
    case 'DMY':
      if (shape === 'Y') return year
      if (shape === 'YM') return `${month}${separator}${year}`
      return `${day}${separator}${month}${separator}${year}`
    case 'MDY':
      if (shape === 'Y') return year
      if (shape === 'YM') return `${month}${separator}${year}`
      return `${month}${separator}${day}${separator}${year}`
    case 'YMD':
      if (shape === 'Y') return year
      if (shape === 'YM') return `${year}${separator}${month}`
      return `${year}${separator}${month}${separator}${day}`
  }
}
