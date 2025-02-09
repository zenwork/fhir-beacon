import {DateTime}           from '../primitive.data'
import {asFormattedDate}    from './asFormattedDate'
import {asFormattedInstant} from './asFormattedInstant'
import {asFormattedTime}    from './asFormattedTime'



export type DateTimeFormatProps = {
  datetime: DateTime
  timeZoneName?: string
  dateSeparator?: string
  timeSeparator?: string
  monthFormat?: 'long' | 'medium' | 'short'
  order?: 'DMY' | 'MDY' | 'YMD'
  format?: '24h' | '12h',
  shape?: 'HMS' | 'HMSM' | undefined
}

export function asFormattedDateTime({
                                      datetime,
                                      timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone,
                                      dateSeparator = '.',
                                      timeSeparator = ':',
                                      order = 'DMY',
                                      monthFormat = 'short',
                                      format = '24h',
                                      shape = 'HMS'
                                    }: DateTimeFormatProps): string {

  const parts: string[] = datetime.split('T')
  const timePart: string = parts[1] ?? ''
  const hasTimezone: boolean = timePart.includes('Z') || timePart.includes('+') || timePart.includes('-')
  const hasTime: boolean = !!timePart

  if (hasTime && hasTimezone) {

    return asFormattedInstant({
                                instant: datetime,
                                timeZoneName,
                                dateSeparator,
                                timeSeparator,
                                order,
                                format,
                                monthFormat,
                                shape
                              })
  }

  if (hasTime) {
    const date: string = asFormattedDate({ date: parts[0], separator: dateSeparator, order, monthFormat })
    const time: string = asFormattedTime({
                                           time: parts[1],
                                           hourSeparator: timeSeparator,
                                           minuteSeparator: timeSeparator,
                                           format,
                                           shape: shape as 'H' | 'HM' | 'HMS' | undefined
                                         })
    return `${date} ${time}`
  }

  return asFormattedDate({ date: datetime, separator: dateSeparator, order, monthFormat })
}
