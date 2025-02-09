import {FhirDate}        from '../primitive.data'
import {PrimitiveType}   from '../type-converters'
import {asFormattedDate} from './asFormattedDate'



export function format(text: unknown, type: PrimitiveType) {
  switch (type) {
    case PrimitiveType.date:
    case PrimitiveType.datetime:
      return asFormattedDate({ date: text as FhirDate })


    case PrimitiveType.base64:
    case PrimitiveType.boolean:
    case PrimitiveType.canonical:
    case PrimitiveType.code:
    case PrimitiveType.decimal:
    case PrimitiveType.fhir_string:
    case PrimitiveType.forced_error:
    case PrimitiveType.id:
    case PrimitiveType.instant:
    case PrimitiveType.integer:
    case PrimitiveType.integer64:
    case PrimitiveType.link:
    case PrimitiveType.markdown:
    case PrimitiveType.none:
    case PrimitiveType.positiveInt:
    case PrimitiveType.string_reference:
    case PrimitiveType.time:
    case PrimitiveType.unsigned_int:
    case PrimitiveType.uri:
    case PrimitiveType.uri_type:
    case PrimitiveType.url:
    default:
      return text


  }
}
