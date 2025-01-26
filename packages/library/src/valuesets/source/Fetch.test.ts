import {beforeEach, describe, expect, it, Mock, vi} from 'vitest'
import {CodeSystemData, ValueSetData}               from '../ValueSet.data'
import {fetchIt}                                    from './Fetch'
import {FetchError}                                 from './FetchError'



describe('fetchWithRetry', () => {
  const originalFetch = global.fetch

  const url = 'https://example.com/api'

  beforeEach(() => {
    global.fetch = originalFetch
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it.skip('should successfully return a parsed response when fetch succeeds', async () => {
    const mockFetch2 = vi.fn()
    global.fetch = mockFetch2

    const mockResponse = { message: 'success' }
    mockFetch2.mockResolvedValue(createResponse(200, url, mockResponse))

    const result = await fetchIt({ url: url, options: {}, retries: 5, retryFactor: 50 })

    expect(mockFetch2).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockResponse)
  })

  it('should retry the specified number of times if fetch fails', async () => {
    const mockFetch = vi.fn()
    global.fetch = mockFetch

    mockFetch.mockRejectedValue(new FetchError('Network error', '', -1, '', '', undefined, true))

    await expect(fetchIt({ url: url, options: {}, retries: 3, retryFactor: 50 })).rejects.toThrow('Network error')
    expect(mockFetch).toHaveBeenCalledTimes(3) // Retries 3 times
  })

  it('should throw FetchError for non-OK response and then stop retries', async () => {
    const mockFetch = vi.fn()
    global.fetch = mockFetch
    mockFetch.mockResolvedValue({
                                               ok: false,
                                               url,
                                               status: 500,
                                               statusText: 'Internal Server Error',
                                               text: vi.fn().mockResolvedValueOnce('Error response')
                                             })

    await expect(fetchIt({ url: url, options: {}, retries: 5, retryFactor: 50 })).rejects.toThrow(FetchError)

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it.skip('should handle retries with delay between attempts', async () => {
    const mockFetch = vi.fn()
    // Mock fetch to fail twice, then succeed
    mockFetch
      .mockRejectedValueOnce(new FetchError('Network error', '', -1, '', '', undefined, true))
      .mockRejectedValueOnce(new FetchError('Network error', '', -1, '', '', undefined, true))
      .mockResolvedValueOnce(createResponse(200, url, { message: 'success' }))
    global.fetch = mockFetch

    const result = await fetchIt({ url: url, options: {}, retries: 3, retryFactor: 50 }) // Custom delay of 50ms
    expect(mockFetch).toHaveBeenCalledTimes(3) // Retries twice, succeeds on the third attempt
    expect(result).toEqual({ message: 'success' })
  })

  it('should throw FetchError when response JSON parsing fails', async () => {
    const mockFetch = vi.fn()
    global.fetch = mockFetch
    mockFetch.mockResolvedValue(createResponse(200, url, 'Invalid JSON String'))


    await expect(fetchIt({ url: url, options: {}, retries: 5, retryFactor: 50 })).rejects.toThrow(FetchError)

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('should throw FetchError when OK but body empty', async () => {
    const mockFetch = vi.fn()
    global.fetch = mockFetch
    mockFetch.mockResolvedValue(createResponse(202, url, null))

    await expect(fetchIt({ url: url, options: {}, retries: 5, retryFactor: 50 })).rejects.toThrow(FetchError)

    expect(mockFetch).toHaveBeenCalledTimes(1)

  })

  it('should return data as json', async () => {
    const mockFetch = vi.fn()
    global.fetch = mockFetch
    mockFetch.mockResolvedValue(createResponse(200,
                                                            'https://example.com/api',
                                                            { resourceType: 'ValueSet' })
    )

    const data: ValueSetData | CodeSystemData | unknown = await fetchIt({
                                                                          url: url,
                                                                          options: {},
                                                                          retries: 5,
                                                                          retryFactor: 50
                                                                        })

    expect(data).toStrictEqual({ resourceType: 'ValueSet' })

  })
})


export function createResponse(status: number, url: string, body: object | string | null = null): {
  ok: boolean
  status: number
  statusText: string
  url: string
  json: Mock
  text: Mock
  bodyUsed: boolean
} {
  return {
    ok: (status >= 200 && status < 300),
    status: status,
    statusText: (status >= 200 && status < 300) ? 'OK' : 'NOK',
    url,
    json: vi.fn().mockResolvedValue(body),
    text: vi.fn().mockResolvedValue(JSON.stringify(body)),
    bodyUsed: !!body
  }
}
