import {afterEach, describe, expect, it, Mock, vi} from 'vitest'
import {ValueSetIncludeExcludeData}                from '../ValueSet.data'
// directory
import {resolveIncludesOrExclude}                  from './ResolveValueSet'


// Begin testing resolveIncludesOrExclude
describe('ResolveValueSet', () => {

  const fetch: Mock = vi.fn()

  vi.mock('./Fetch', () => {
    return {
      fetchWithRetry: fetch // Mock fetchWithRetry
    }
  })

  describe('resolveIncludesOrExclude', () => {

    afterEach(() => {
      // Reset mocks after each test to ensure no spillover state
      vi.clearAllMocks()
    })

    it('should resolve nothing when nothing passed', async () => {
      // const segment: ValueSetIncludeExcludeData[] = [
      //   {
      //     modifierExtension: [],
      //     system: 'http://example.com/system',
      //     concept: [
      //
      //       { modifierExtension: [], designation: [], code: '001', display: 'Test Code 1' },
      //       { modifierExtension: [], designation: [], code: '002', display: 'Test Code 2' }
      //     ],
      //     filter: []
      //   }
      // ]

      const skipUrl = vi.fn().mockReturnValue(false)
      const result = await resolveIncludesOrExclude([], 'include', false, skipUrl)

      expect(result).toEqual([])
      expect(skipUrl).not.toHaveBeenCalled() // skipUrl should not be called in this case
    })

    it('should skip url when skip function passes', async () => {
      const segment: ValueSetIncludeExcludeData[] = [
        {
          modifierExtension: [],
          valueSet: ['http://example.com/valueset'],
          concept: [],
          filter: []
        }
      ]

      const skipUrl = vi.fn().mockReturnValue(true)
      const result = await resolveIncludesOrExclude(segment, 'include', false, skipUrl)

      expect(result).toEqual([[]])
      expect(skipUrl).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledTimes(0)
    })

    /*  it('should fetch data when system URL is provided', async () => {


     const mockFetchedData: ResolvedValue[][] = [
     [
     { code: 'A', display: 'Fetched Code A', definition: 'a' },
     { code: 'B', display: 'Fetched Code B', definition: 'b' }
     ]
     ]

     (fetchWithRetry as unknown as vi.Mock).mockResolvedValue(mockFetchedData)

     const segment = [
     { system: 'http://example.com/system' }
     ]

     const skipUrl = vi.fn().mockReturnValue(false) // No skipping
     const result = await resolveIncludesOrExclude(segment, 'include', false, skipUrl)

     expect(result).toEqual([
     [
     { code: 'A', display: 'Fetched Code A', definition: 'n/a' },
     { code: 'B', display: 'Fetched Code B', definition: 'n/a' }
     ]
     ])
     expect(fetchWithRetry).toHaveBeenCalledWith('https://example.com/system', undefined, 1, 1000)
     expect(skipUrl).toHaveBeenCalledWith('http://example.com/system')
     })

     it('should skip fetch when skipUrl returns true', async () => {
     const segment = [
     { system: 'http://example.com/system' }
     ]
     const skipUrl = vi.fn().mockReturnValue(true)
     const result = await resolveIncludesOrExclude(segment, 'include', false, skipUrl)

     expect(result).toEqual([[]]) // No fetch, no results
     expect(skipUrl).toHaveBeenCalledWith('http://example.com/system')
     expect(fetchWithRetry).not.toHaveBeenCalled()
     })

     it('should resolve nested ValueSet includes using fetch', async () => {
     const mockFetchedData = {
     compose: {
     include: [
     {
     concept: [
     { code: 'Nested1', display: 'Fetched Nested Code 1' },
     { code: 'Nested2', display: 'Fetched Nested Code 2' }
     ]
     }
     ]
     }
     }

     ;(fetchWithRetry as unknown as vi.Mock).mockResolvedValue(mockFetchedData)

     const segment = [
     { valueSet: ['http://example.com/valueset'] }
     ]
     const skipUrl = vi.fn().mockReturnValue(false)
     const result = await resolveIncludesOrExclude(segment, 'include', false, skipUrl)

     expect(result).toEqual([
     [
     { code: 'Nested1', display: 'Fetched Nested Code 1', definition: 'n/a' },
     { code: 'Nested2', display: 'Fetched Nested Code 2', definition: 'n/a' }
     ]
     ])
     expect(fetchWithRetry).toHaveBeenCalledWith('https://example.com/valueset', undefined, 1, 1000)
     expect(skipUrl).toHaveBeenCalledWith('http://example.com/valueset')
     })

     it('should reject when the system throws an error', async () => {
     ;(fetchWithRetry as unknown as vi.Mock).mockRejectedValue(new Error('Fetch error'))

     const segment = [
     { system: 'http://example.com/system' }
     ]
     const skipUrl = vi.fn().mockReturnValue(false)

     await expect(resolveIncludesOrExclude(segment, 'include', false, skipUrl)).rejects.toThrow('Fetch error')
     expect(fetchWithRetry).toHaveBeenCalled()
     })*/
  })
})
