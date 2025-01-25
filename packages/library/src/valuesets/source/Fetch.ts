import {CodeSystemData, ValueSetData} from '../ValueSet.data'
import {FetchError, throwError}       from './FetchError'
import {logFetchRequest}              from './LogFetchRequest'



let callCount = 0

type Options = RequestInit

type ResolveRequest = {
  url: string,
  options?: Options,
  retries?: number,
  retryFactor?: number,
  debug?: boolean
}

type ResolveResponse = ValueSetData | CodeSystemData | unknown

const defaultOptions: Options = {
  headers: {
    'Accept': 'application/fhir+json;q=1.0, '
              + 'application/json+fhir;q=0.9, '
              + 'application/json+fhir;q=0.9, '
              + '*/*;q=0.5'
  },
  redirect: 'follow'

}

export async function fetchIt({
                                url,
                                options = defaultOptions,
                                retries = 5,
                                retryFactor = 1000,
                                debug = false
                              }: ResolveRequest): Promise<ResolveResponse> {


  for (let attempt = 1; attempt <= retries; attempt++) {

    const current = callCount++
    const id: string = String(current)

    try {

      const response: Response = await fetch(url, options)

      let d: string = ''

      if (response.status >= 200 && response.status < 300) {
        try {
          if (response.bodyUsed) {

            d = await response.text()

            if (!d) {
              throwError(response, d, `Empty response`, undefined, true)
            }

            const parsedData = JSON.parse(d) as ResolveResponse
            if (parsedData instanceof Object) {
              logFetchRequest(id, response.status, response.statusText, 'n/a', url, debug)
              return parsedData
            } else {

              logFetchRequest(id, response.status, response.statusText, 'n/a', url, debug)
              throwError(response, d, `body not JSON object`, undefined, false)
            }
          }

          logFetchRequest(id, response.status, response.statusText, 'n/a', url, debug)
          throwError(response, d, `Empty response`, undefined, true)

        } catch (err: unknown) {

          if (err instanceof FetchError) {
            throw err
          }

          logFetchRequest(id, response.status, response.statusText, 'n/a', url, debug)
          throwError(response, d, `Failed to parse response`, err, false)

        }

      }

      logFetchRequest(id, response.status, response.statusText, 'n/a', url, debug)
      throwError(response, d, `Url not resolvable`)

    } catch (error) {

      if (error instanceof FetchError) {
        if (!error.retryable) throw error
        if (attempt === retries) {

          logFetchRequest(id, 'FAIL', 'MAX', '', url, error)
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
        logFetchRequest(id, 'FAIL', String(error), '', url, cause, debug)
        throw new FetchError(`unhandled reason: ${error instanceof Error ? error.message : String(error)}`,
                             url,
                             -1,
                             '',
                             '',
                             error instanceof Error ? error : new Error(String(error))
        )
      }

      await new Promise(res => setTimeout(res, attempt * retryFactor))
    }

  }
}
