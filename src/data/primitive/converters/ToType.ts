import {FhirTypes}   from '../../codesystems'
import {toPrimitive} from './index'


type Type = string
export const toType: toPrimitive<string, Type> = (value: string): Type => {

  console.log(value)
  if (value && FhirTypes.find(f => f.code === value)) return value as Type

  throw new TypeError(`${value} is not of type an accepted type`)
}
