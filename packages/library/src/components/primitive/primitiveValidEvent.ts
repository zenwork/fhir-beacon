import {PrimitiveType} from './type-converters'



export interface BknValidEvent extends Event {
  key: string
  value: unknown
  primitiveType: PrimitiveType
}

export class PrimitiveValidEvent extends Event implements BknValidEvent {
  public key: string

  public value: unknown

  public primitiveType: PrimitiveType

  constructor(key: string, value: unknown, type: PrimitiveType) {
    super('bkn-valid', {
      bubbles: true,
      composed: true
    })
    this.key = key
    this.value = value
    this.primitiveType = type

  }
}
