import {DateTime, FhirDate, Instant} from '../primitive.data'
import {PrimitiveType}               from '../type-converters'
import {asDecodedBase64}             from './asDecodedBase64'
import {asFormattedDate}             from './asFormattedDate'
import {asFormattedDateTime}         from './asFormattedDateTime'
import {asFormattedInstant}          from './asFormattedInstant'
import {asFormattedTime}             from './asFormattedTime'
import {asReadable}                  from './asReadable'



export type FormattingConfig = {
  monthFormat?: 'long' | 'medium' | 'short'
  dateSeparator?: string
  timeZoneName?: string
}

const config: FormattingConfig = {
  monthFormat: 'short',
  dateSeparator: '.',
  timeZoneName: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
}

export function format(text: unknown, type: PrimitiveType) {
  switch (type) {
    case PrimitiveType.date:
      return asFormattedDate({
                               date: text as FhirDate,
                               monthFormat: config.monthFormat,
                               separator: config.dateSeparator
                             })
    case PrimitiveType.datetime:
      return asFormattedDateTime({
                                   datetime: text as DateTime,
                                   monthFormat: config.monthFormat,
                                   dateSeparator: config.dateSeparator,
                                   timeZoneName: config.timeZoneName
                                 })
    case PrimitiveType.instant:
      return asFormattedInstant({
                                  instant: text as Instant,
                                  monthFormat: config.monthFormat,
                                  dateSeparator: config.dateSeparator,
                                  timeZoneName: config.timeZoneName
                                })
    case PrimitiveType.time:
      return asFormattedTime({ time: text as FhirDate })

    case PrimitiveType.uri_type:
      return asReadable(text as string)

    case PrimitiveType.base64:
      return asDecodedBase64(text as string)
    case PrimitiveType.boolean:
    case PrimitiveType.canonical:
    case PrimitiveType.code:
    case PrimitiveType.decimal:
    case PrimitiveType.fhir_string:
    case PrimitiveType.forced_error:
    case PrimitiveType.id:
    case PrimitiveType.integer:
    case PrimitiveType.integer64:
    case PrimitiveType.link:
    case PrimitiveType.markdown:
    case PrimitiveType.none:
    case PrimitiveType.positiveInt:
    case PrimitiveType.string_reference:
    case PrimitiveType.unsigned_int:
    case PrimitiveType.uri:
    case PrimitiveType.url:
    default:
      return text


  }
}
