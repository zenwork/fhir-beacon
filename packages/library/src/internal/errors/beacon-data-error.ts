export class BeaconDataError implements Error {
  name: string = 'BeaconDataError'

  message: string

  stack?: string | undefined

  constructor(msg: string) {
    this.message = msg
  }

}
