import {Decimal} from '../components/primitive/primitive.data'



export function isWholeNumber(num: Decimal | number | undefined): boolean {
  if (num === undefined) return false
  if (typeof num === 'string') return parseFloat(num) === Math.round(parseFloat(num))
  return num === Math.round(num)
}
