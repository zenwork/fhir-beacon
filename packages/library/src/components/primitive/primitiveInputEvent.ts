import {PrimitiveType} from './type-converters'

export interface BknInputEvent extends Event {
  key: string
  oldValue: unknown
  newValue: unknown
  primitiveType: PrimitiveType
}

export class PrimitiveInputEvent extends Event implements BknInputEvent {

  public key: string

  public oldValue: unknown

  public newValue: unknown

  public primitiveType: PrimitiveType

  constructor(key: string, oldValue: unknown, newValue: unknown, type: PrimitiveType) {
    super('bkn-input', {
      bubbles: true,
      composed: true
    })
    this.key = key
    this.oldValue = oldValue
    this.newValue = newValue
    this.primitiveType = type

  }
}
