import * as http from 'node:http'



http.globalAgent.maxSockets = 100

export async function fetchWithRetry(url: string,
                                     options = {},
                                     retries = 5,
                                     retryDelay = 1000): Promise<Response | undefined> {

  for (let attempt = 1; attempt <= retries; attempt++) {

    try {

      const response = await fetch(url, options)

      let txt: string = 'n/a'

      if (response.ok) {
        try {
          txt = await response.text()

          if (!txt || txt.length === 0) {
            throwError(response, txt, `Empty response`, undefined, true)
          }

          return JSON.parse(txt)

        } catch (err: unknown) {

          if (err instanceof FetchError) {
            throw err
          }

          throwError(response, txt, `Failed to parse response`, err, false)

        }

      }

      throwError(response, txt, `Url not resolvable`)

    } catch (error) {

      if (error instanceof FetchError) {
        if (!error.retryable) throw error
        if (attempt === retries) {
          throwError(error, error.body, `failed after reties: ${retries} - ${error.message}`, error)
        }
      } else {

        throw new FetchError(`unhandled reason: ${error}`,
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
    response.url,
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
              public status: number,
              public statusText: string,
              public body: string,
              public cause?: Error | unknown,
              public retryable = false) {
    super(message)
  }
}
