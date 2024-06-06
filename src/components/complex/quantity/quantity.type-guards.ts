import {DateTime}                         from '../../primitive/primitive.data'
import {valueOrError}                     from '../../primitive/type-converters'
import {toDatetime}                       from '../../primitive/type-converters/toDatetime'
import {DeceasedBoolean}                  from '../../resources/patient/patient.data'
import {QuantityData, SimpleQuantityData} from './quantity.data'

export function isQuantity(quantity: QuantityData | SimpleQuantityData): quantity is QuantityData {
  return (quantity as QuantityData).comparator !== undefined
}

export function isSimpleQuantity(quantity: QuantityData | SimpleQuantityData): quantity is SimpleQuantityData {
  // @ts-ignore
  return quantity['comparator'] === undefined
}


export function isDeceasedBoolean(val: unknown): val is DeceasedBoolean {
  return typeof val === 'boolean'
}

export function isDeceasedDateTime(val: unknown): val is DeceasedBoolean {
  let valOrErr = valueOrError(toDatetime, val as DateTime)
  return !!valOrErr.err
}
