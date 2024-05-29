import {QuantityData, SimpleQuantityData} from './quantity.data'

export function isQuantity(quantity: QuantityData | SimpleQuantityData): quantity is QuantityData {
  return (quantity as QuantityData).comparator !== undefined
}

export function isSimpleQuantity(quantity: QuantityData | SimpleQuantityData): quantity is SimpleQuantityData {
  // @ts-ignore
  return quantity['comparator'] === undefined
}
