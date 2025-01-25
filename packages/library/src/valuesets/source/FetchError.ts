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

export function throwError(response: Response | FetchError,
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
