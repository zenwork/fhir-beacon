import {CodeSystemData, ValueSetData} from '../ValueSet.data'



let callCount = 0

export async function fetchAt(url: string,
                              options: object = {
                                       headers: {
                                         'Accept': 'application/fhir+json;q=1.0, '
                                                   + 'application/json+fhir;q=0.9, '
                                                   + 'application/json+fhir;q=0.9, '
                                                   + '*/*;q=0.5'
                                       },
                                       redirect: 'follow'

                                     },
                              retries = 1,
                              retryDelay = 1000): Promise<ValueSetData|CodeSystemData| unknown> {

  for (let attempt = 1; attempt <= retries; attempt++) {
    const current = callCount++
    const id: string = String(current)
    try {

      // const controller = new AbortController()
      const response = await fetch(url, options)
      // console.log(`fetching ${url} - attempt ${attempt} of ${retries}`)
      // const response = await axios.get<FhirElementData>(
      //   url,
      //   {
      //     timeout: 5000,
      //     maxRedirects: 10,
      //     headers: {
      //       'Accept': 'application/fhir+json;q=1.0, '
      //                 + 'application/json+fhir;q=0.9, '
      //                 + 'application/json+fhir;q=0.9, '
      //                 + '*/*;q=0.5'
      //     }
      //
      //   })
      // const fetchTimeout = setTimeout(() => {
      //   controller.abort()
      //   logRequest(id, 0, 'ABORT', '', url, new Error('Request aborted after 5 seconds'))
      //
      //   clearTimeout(fetchTimeout)
      // }, 5_000)


      let d: string = ''

      logRequest(id, response.status, response.statusText, 'n/a', url)

      if (response.status >= 200 && response.status < 300) {
        try {
          d = await response.text()

          if (!d) {
            throwError(response, d, `Empty response`, undefined, true)
          }

          return JSON.parse(d) as ValueSetData|CodeSystemData| unknown

        } catch (err: unknown) {

          if (err instanceof FetchError) {
            throw err
          }

          throwError(response, d, `Failed to parse response`, err, false)

        }

      }

      throwError(response, d, `Url not resolvable`)

    } catch (error) {

      if (error instanceof FetchError) {
        if (!error.retryable) throw error
        if (attempt === retries) {

          logRequest(id, 'FAIL', 'MAX', '', url, error)
          throw new FetchError(
            `failed after reties: ${retries} - ${error.message}`,
            error.url,
            error.status,
            error.statusText,
            error.body,
            error,
            false
          )
        }
      } else {


        const cause: unknown = error instanceof Error && 'cause' in error ? error.cause : 'unknown'
        logRequest(id, 'FAIL', String(error), '', url, cause)
        throw new FetchError(`unhandled reason: ${error instanceof Error ? error.message : String(error)}`,
                             url,
                             -1,
                             '',
                             '',
                             error instanceof Error ? error : new Error(String(error))
        )
      }

      await new Promise(res => setTimeout(res, retryDelay))
    }
  }
}

function throwError(response: Response | FetchError,
                    body: string,
                    message: string,
                    cause?: Error | unknown,
                    retryable: boolean = false): FetchError {
  throw new FetchError(
    message,
    (response instanceof FetchError) ? response.url : response.url,
    response.status,
    response.statusText,
    body,
    cause,
    retryable
  )
}

export class FetchError extends Error {
  constructor(message: string,
              public url: string,
              public status: number | string,
              public statusText: string,
              public body: string,
              public cause?: Error | unknown,
              public retryable = false) {
    super(message)
  }
}


function logRequest(id: string,
                    status: string | number,
                    statusText: string,
                    type: 'basic' | 'cors' | 'default' | 'error' | 'opaque' | 'opaqueredirect' | string,
                    url: string,
                    cause?: Error | unknown): void {

  const i: string = id.padStart(5, '0')
  const s: string = String(status).padStart(10, ' ')
  const st: string = String(statusText).padEnd(20, ' ')
  const ty: string = type.padStart(10, ' ')
  const u: string = url.padEnd(70)

  const message: string = `${i} - ${s} - ${st} - ${ty} - ${u} - ${cause ?? ''}`

  if (status === 200) console.log(`OK>>> ${message}`)
  if (status !== 200) console.error(`NOK>> ${message}`)
}
