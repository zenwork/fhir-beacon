import {DateTime} from '../primitive.data'

// TODO: diferentiate between display vs structure formatting
export const asDateTime = (val: DateTime): string => {
  return (val as string).replace(/T/g, ' ').replace(/Z/g, ' ').replace(/[+]/g, ' tz:') as string
}
