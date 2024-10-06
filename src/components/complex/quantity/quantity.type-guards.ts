import {hasNone}                               from '../../../utilities/hasNone'
import {DateTime, FhirString}                  from '../../primitive/primitive.data'
import {toDatetime}                            from '../../primitive/type-converters/toDatetime'
import {valueOrError}                          from '../../primitive/type-converters/type-converters'
import {DeceasedBoolean}                       from '../../resources/patient/patient.data'
import {ReferenceData}                         from '../../special/reference/reference.data'
import {AuthorFhirString, AuthorReferenceData} from '../annotation/annotation.data'
import {QuantityData, SimpleQuantityData}      from './quantity.data'

export function isQuantity(quantity: QuantityData | SimpleQuantityData): quantity is QuantityData {
  return (quantity as QuantityData).comparator !== undefined
}

export function isSimpleQuantity(quantity: QuantityData | SimpleQuantityData): quantity is SimpleQuantityData {
  return !('comparator' in quantity)
}


export function isBoolean(val: unknown): val is DeceasedBoolean {
  return typeof val === 'boolean'
}

export function isDeceasedDateTime(val: unknown): val is DeceasedBoolean {
  const valOrErr = valueOrError(toDatetime, val as DateTime)
  return !!valOrErr.err
}

export function isAuthorReference(val: ReferenceData | FhirString): val is AuthorReferenceData {
  return typeof val !== 'string' && !hasNone(val, ['reference', 'type', 'identifier', 'display'])
}

export function isAuthorFhirString(val: ReferenceData | FhirString): val is AuthorFhirString {
  return typeof val === 'string'
}
