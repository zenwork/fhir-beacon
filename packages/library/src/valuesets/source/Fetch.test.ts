import {afterEach, describe, expect, it, vi} from 'vitest'
import {FetchError, fetchWithRetry}          from './Fetch'



describe('fetchWithRetry', () => {
  const url = 'https://example.com/api'

  afterEach(() => {
    // Clear all mocks after each test
    vi.restoreAllMocks()
  })

  it('should successfully return a parsed response when fetch succeeds', async () => {
    const mockResponse = { message: 'success' }
    global.fetch = vi.fn().mockResolvedValueOnce({
                                                   ok: true,
                                                   text: vi.fn().mockResolvedValueOnce(JSON.stringify(mockResponse))
                                                 })

    const result = await fetchWithRetry(url, {}, 5, 50)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockResponse)
  })

  it('should retry the specified number of times if fetch fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new FetchError('Network error', '', -1, '', '', undefined, true))

    await expect(fetchWithRetry(url, {}, 3, 50)).rejects.toThrow('Network error')
    expect(fetch).toHaveBeenCalledTimes(3) // Retries 3 times
  })

  it('should throw FetchError for non-OK response and then stop retries', async () => {
    global.fetch = vi.fn().mockResolvedValue({
                                               ok: false,
                                               url,
                                               status: 500,
                                               statusText: 'Internal Server Error',
                                               text: vi.fn().mockResolvedValueOnce('Error response')
                                             })

    await expect(fetchWithRetry(url, {}, 5, 50)).rejects.toThrow(FetchError)

    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should handle retries with delay between attempts', async () => {
    const mockFetch = vi.fn()
    // Mock fetch to fail twice, then succeed
    mockFetch
      .mockRejectedValueOnce(new FetchError('Network error', '', -1, '', '', undefined, true))
      .mockRejectedValueOnce(new FetchError('Network error', '', -1, '', '', undefined, true))
      .mockResolvedValueOnce({
                               ok: true,
                               text: vi.fn().mockResolvedValueOnce(JSON.stringify({ message: 'success' }))
                             })
    global.fetch = mockFetch

    const result = await fetchWithRetry(url, {}, 3, 50) // Custom delay of 50ms
    expect(fetch).toHaveBeenCalledTimes(3) // Retries twice, succeeds on the third attempt
    expect(result).toEqual({ message: 'success' })
  })

  it('should throw FetchError when response JSON parsing fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
                                               ok: true,
                                               url,
                                               status: 200,
                                               statusText: 'OK',
                                               text: vi.fn().mockResolvedValueOnce('Invalid JSON String')
                                             })

    await expect(fetchWithRetry(url, {}, 5, 50)).rejects.toThrow(FetchError)

    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should throw FetchError when OK but body empty', async () => {
    global.fetch = vi.fn().mockResolvedValue({
                                               ok: true,
                                               url,
                                               status: 0,
                                               statusText: '',
                                               text: vi.fn().mockResolvedValueOnce('')
                                             })

    await expect(fetchWithRetry(url, {}, 5, 50)).rejects.toThrow(FetchError)

    expect(fetch).toHaveBeenCalledTimes(5)

  })
})
