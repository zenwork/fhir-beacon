export class BeaconElementError implements Error {
  name: string = 'BeaconStateError'

  stack?: string | undefined

  message: string

  private element: string

  constructor(element: string, msg: string) {
    this.element = element
    this.message = msg
  }
}
