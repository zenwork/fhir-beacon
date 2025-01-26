export function logFetchRequest(id: string,
                                status: string | number,
                                statusText: string,
                                type: 'basic' | 'cors' | 'default' | 'error' | 'opaque' | 'opaqueredirect' | string,
                                url: string,
                                cause?: Error | unknown, debug: boolean = false): void {

  const i: string = id.padStart(5, '0')
  const s: string = String(status).padStart(10, ' ')
  const st: string = String(statusText).padEnd(20, ' ')
  const ty: string = type.padStart(10, ' ')
  const u: string = url.padEnd(70)

  const message: string = `${i} - ${s} - ${st} - ${ty} - ${u} - ${cause ?? ''}`

  if (status === 200 && debug) console.log(`OK>>> ${message}`)
  if (status !== 200) console.error(`NOK>> ${message}`)
}
