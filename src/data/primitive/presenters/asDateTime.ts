import {DateTime} from '../structures'

export const asDateTime = (val:DateTime):string =>{
  return (val as string).replace(/T/g, ' ').replace(/[+]/g, ' tz:') as string
}
