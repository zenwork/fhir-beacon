import {FullyQualifiedKey} from '../../internal'
import {PrimitiveType}     from './type-converters'



export interface BknInvalidEvent extends Event {
  key: FullyQualifiedKey
  value: unknown
  primitiveType: PrimitiveType
  errormessage: string
}

export class PrimitiveInvalidEvent extends Event implements BknInvalidEvent {
  public key: FullyQualifiedKey

  public value: unknown

  public primitiveType: PrimitiveType

  public errormessage: string

  constructor(key: FullyQualifiedKey, value: unknown, type: PrimitiveType, errormessage: string) {

    super('bkn-invalid', {
      bubbles: true,
      composed: true
    })

    this.key = key
    this.value = value
    this.primitiveType = type
    this.errormessage = errormessage

  }
}
