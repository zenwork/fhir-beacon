import {Instant} from '../primitive.data'



export type DateTimeFormatProps = {
  instant: Instant
  timeZoneName?: string
  dateSeparator?: string
  timeSeparator?: string
  monthFormat?: 'long' | 'medium' | 'short'
  order?: 'DMY' | 'MDY' | 'YMD'
  format?: '24h' | '12h'
  shape?: 'HMS' | 'HMSM' | undefined
}

export function asFormattedInstant({
                                     instant,
                                     timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone,
                                     dateSeparator = '.',
                                     timeSeparator = ':',
                                     order = 'DMY',
                                     monthFormat = 'short',
                                     format = '24h',
                                     shape = undefined
                                   }: DateTimeFormatProps): string {

  const shapeOverride = shape ?? getTimeShape(instant)

  // Create a date object
  const dateObj = new Date(instant)

  const locale: string = navigator.language || 'en-US'

  // Format the date parts using Intl.DateTimeFormat
  const formattedParts = new Intl.DateTimeFormat(
    locale,
    {
      dateStyle: monthFormat,
      timeStyle: 'full',
      timeZone: timeZoneName,
      hour12: format === '12h'
    }
  ).formatToParts(dateObj)


  const year = instant.split('-')[0] ?? getFormattedPart(formattedParts, 'year', format)
  const month = getFormattedPart(formattedParts, 'month', format)
  const day = getFormattedPart(formattedParts, 'day', format)

  let hour = getFormattedPart(formattedParts, 'hour', format)
  const minute = getFormattedPart(formattedParts, 'minute', format)
  const second = getFormattedPart(formattedParts, 'second', format)
  const milli = dateObj.getMilliseconds().toString().padStart(3, '0')
  const dayPeriod = getFormattedPart(formattedParts, 'dayPeriod', format)

  if (hour === '24') hour = '00'

  return formatDateTimeParts(order,
                             shapeOverride,
                             dateSeparator,
                             timeSeparator,
                             year,
                             month,
                             day,
                             hour,
                             minute,
                             second,
                             milli,
                             dayPeriod
  )
}


/** Determines the shape of the date based on its parts */
function getTimeShape(datetime: string): 'HMS' | 'HMSM' {
  if (datetime.includes('.')) return 'HMSM'
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
function formatDateTimeParts(
  order: 'DMY' | 'MDY' | 'YMD',
  shape: 'HMS' | 'HMSM',
  dateSep: string,
  timeSep: string,
  year: string,
  month: string,
  day: string,
  hour: string,
  minute: string,
  second: string,
  milli: string,
  dayPeroid: string
): string {

  let date: string = ''

  switch (order) {
    case 'DMY':
      date = `${day}${dateSep}${month}${dateSep}${year}`
      break
    case 'MDY':
      date = `${month}${dateSep}${day}${dateSep}${year}`
      break
    case 'YMD':
      date = `${year}${dateSep}${month}${dateSep}${day}`
      break
  }

  switch (shape) {
    case 'HMS':
      return `${date} ${hour}${timeSep}${minute}${timeSep}${second}${dayPeroid ? ' ' + dayPeroid : ''}`
    case 'HMSM':
      return `${date} ${hour}${timeSep}${minute}${timeSep}${second}.${milli}${dayPeroid ? ' ' + dayPeroid : ''}`
  }
}
