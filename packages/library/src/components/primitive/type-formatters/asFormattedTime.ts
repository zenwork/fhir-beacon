import {FhirDate, Time} from '../primitive.data'



export type TimeFormatProps = {
  time: Time
  hourSeparator?: string
  minuteSeparator?: string,
  format?: '24h' | '12h',
  shape?: 'H' | 'HM' | 'HMS' | undefined
}

export function asFormattedTime({
                                  time,
                                  hourSeparator = ':',
                                  minuteSeparator = ':',
                                  format = '24h',
                                  shape = undefined
                                }: TimeFormatProps): string {

  const timeParts = parseTimeParts(time)
  const timeShape: 'H' | 'HM' | 'HMS' = getShape(timeParts)
  const shapeOverride = shape && shape.length < timeShape.length ? shape : timeShape

  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone


  // Create a date object
  const dateObj = new Date(1970, 0, 1,
                           Number.parseInt(timeParts[0]),
                           timeParts[1] ? Number.parseInt(timeParts[1]) : 0,
                           timeParts[2] ? Number.parseInt(timeParts[2]) : 0
  )

  // Format the date parts using Intl.DateTimeFormat
  const formattedParts = new Intl.DateTimeFormat(navigator.language, {
    timeStyle: 'medium',
    timeZone: localTimeZone,
    hour12: format !== '24h'
  }).formatToParts(dateObj)

  const hour = getFormattedPart(formattedParts, 'hour', format)
  const minute = getFormattedPart(formattedParts, 'minute', format)
  const second = getFormattedPart(formattedParts, 'second', format)
  const dayPeriod = getFormattedPart(formattedParts, 'dayPeriod', format)

  return formatTimeParts(shapeOverride, hourSeparator, minuteSeparator, hour, minute, second, dayPeriod)
}


/** Parses the date parts from the input string */
function parseTimeParts(date: FhirDate): string[] {
  return date.split(':')
}

/** Determines the shape of the date based on its parts */
function getShape(parts: string[]): 'H' | 'HM' | 'HMS' {
  if (parts.length === 1) return 'H'
  if (parts.length === 2) return 'HM'
  return 'HMS'
}

/** Formats individual date parts using Intl.DateTimeFormat */
function getFormattedPart(parts: Intl.DateTimeFormatPart[],
                          type: string,
                          format: '24h' | '12h',
                          fallback: string = ''): string {
  return parts.find(part => part.type === type)?.value.padStart((format === '24h' ? 2 : 0), '0') ?? fallback
}

/** Formats the date according to the shape and order */
function formatTimeParts(
  shape: 'H' | 'HM' | 'HMS',
  hourSeparator: string,
  minuteSeparator: string,
  hours: string,
  minutes: string,
  seconds: string,
  dayPeriod: string
): string {
  switch (shape) {
    case 'HMS':
      return `${hours}${hourSeparator}${minutes}${minuteSeparator}${seconds}${dayPeriod ? ' ' + dayPeriod : ''}`
    case 'HM':
      return `${hours}${hourSeparator}${minutes}${dayPeriod ? ' ' + dayPeriod : ''}`
    case 'H':
      return `${hours}${dayPeriod ? ' ' + dayPeriod : ''}`
  }
}
