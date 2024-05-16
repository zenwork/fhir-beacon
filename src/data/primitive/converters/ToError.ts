import {toPrimitive} from './index'


export const toError: toPrimitive<string, string> = (value: string): string => {

  throw new Error(`Unable to render do to internal constraint`)
}
