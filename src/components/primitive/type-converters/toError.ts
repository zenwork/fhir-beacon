import {toPrimitive} from './index'


export const toError: toPrimitive<string, string> = (value: string): string => {

  throw new Error(value ?? `Unable to render due to internal constraint`)
}
