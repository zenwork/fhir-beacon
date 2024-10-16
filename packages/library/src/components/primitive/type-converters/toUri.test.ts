import {describe, expect, it} from 'vitest'
import {toUri}                from './toUri'

describe('toUri', () => {
  it('should parse a valid URL string to a URL object', () => {
    const testCases = [
      'https://john.doe@www.example.com:1234/forum/questions/?tag=networking&order=newest#top',
      'https://john.doe@www.example.com:1234/forum/questions/?tag=networking&order=newest#:~:text=whatever',
      'ldap://[2001:db8::7]/c=GB?objectClass?one',
      'mailto:John.Doe@example.com',
      'news:comp.infosystems.www.servers.unix',
      'tel:+1-816-555-1212',
      'telnet://192.0.2.16:80/',
      'urn:oasis:names:specification:docbook:dtd:xml:4.1.2'
    ]

    testCases.forEach((url) => {
      const result = toUri(url)
      expect(result).toBe((new URL(url)).href)
    })
  })

  it('should throw an error for an invalid URL string', () => {
    const invalidTestCases = [
      'invalid-url',
      'another invalid url string',
      '//missing-scheme.com'
    ]

    invalidTestCases.forEach((url) => {
      expect(() => toUri(url)).toThrow(TypeError)
    })
  })
})
