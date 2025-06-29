import {Uuid}        from '../primitive.data'
import {toPrimitive} from './type-converters'



const uuidPattern = /urn:uuid:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
/**
 * Converts and validates a string to a URL object.
 *
 * @param {string} url - The string representing the URL.
 * @throws {TypeError} If the URL is not a valid URL.
 * @returns {URL} The URL object.
 */
export const toUuid: toPrimitive<string, Uuid> = (uuid: string): Uuid => {

  if (!uuidPattern.test(uuid) || uuid.length !== 45) {
    throw new TypeError(`must be a UUID (aka GUID) represented as a URI (RFC 4122 icon); e.g. urn:uuid:c757873d-ec9a-4326-a141-556f43239520`)
  }

  return uuid as Uuid
}
