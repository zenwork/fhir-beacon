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
              + '*/*;q=0.5',
    'Cache-Control': 'no-cache',
    'Prefer': 'return=representation',
    'Cookie': 'session_id=abc123; other_cookie=value',
    '_Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    , 'Accept-Encoding': 'gzip, deflate, br, zstd'
    , 'Accept-Language': 'en,en-CA;q=0.8,en-US;q=0.5,fr-CH;q=0.3'
    , 'Connection': 'keep-alive'
    , 'Host': 'hl7.org'
    , 'Sec-Fetch-Dest': 'document'
    , 'Sec-Fetch-Mode': 'navigate'
    , 'Sec-Fetch-Site': 'none'
    , 'Sec-Fetch-User': '?1'
    , 'Sec-GPC': '1'
    , 'Upgrade-Insecure-Requests': '1'
    , 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:134.0) Gecko/20100101 Firefox/134.0'

  },
  redirect: 'follow'


}

const cache: { [key: string]: ResolveResponse } = {}

export async function fetchIt({
                                url,
                                options = defaultOptions,
                                retries = 3,
                                retryFactor = 1000,
                                debug = true
                              }: ResolveRequest): Promise<ResolveResponse> {

  if (cache[url]) {
    return cache[url]
  }

  for (let attempt = 1; attempt <= retries; attempt++) {

    const current = callCount++
    const id: string = String(current)

    try {

      const response: Response = await fetch(url, options)

      let d: string = ''

      if (response.status >= 200 && response.status < 300) {

        try {
          // biome-ignore lint/correctness/noConstantCondition: <explanation>
          if (response.bodyUsed || true) {

            d = await response.text()

            if (!d) {
              throwError(response, d, `Empty response`, undefined, true)
            }

            const parsedData = JSON.parse(d) as ResolveResponse
            if (parsedData instanceof Object) {
              logFetchRequest(id, response.status, response.statusText, 'n/a', url, debug)
              cache[url] = parsedData
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

          logFetchRequest(id, 'FAIL', 'MAX:' + error.status, '', url, error)
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
