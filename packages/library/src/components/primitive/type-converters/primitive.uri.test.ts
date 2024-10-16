import {describe, test} from 'vitest'
import {toUri}          from './toUri'

describe('Primitives', () => {
  test('should parse a URI', async () => {
    toUri('https://john.doe@www.example.com:1234/forum/questions/?tag=networking&order=newest#top')
    toUri('https://john.doe@www.example.com:1234/forum/questions/?tag=networking&order=newest#:~:text=whatever')
    toUri('ldap://[2001:db8::7]/c=GB?objectClass?one')
    toUri('mailto:John.Doe@example.com')
    toUri('news:comp.infosystems.www.servers.unix')
    toUri('tel:+1-816-555-1212')
    toUri('telnet://192.0.2.16:80/')
    toUri('urn:oasis:names:specification:docbook:dtd:xml:4.1.2')
  })
})
