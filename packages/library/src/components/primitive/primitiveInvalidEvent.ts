import {PrimitiveType} from './type-converters'

export interface BknInvalidEvent extends Event {
  key: string
  value: unknown
  primitiveType: PrimitiveType
  errormessage: string
}

export class PrimitiveInvalidEvent extends Event implements BknInvalidEvent {
  public key: string

  public value: unknown

  public primitiveType: PrimitiveType

  public errormessage: string

  constructor(key: string, value: unknown, type: PrimitiveType, errormessage: string) {
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
