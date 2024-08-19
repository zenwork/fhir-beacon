import {toPrimitive} from './type-converters'

/**
 * Converts and validates a string to a URL object.
 *
 * @param {string} url - The string representing the URL.
 * @throws {TypeError} If the URL is not a valid URL.
 * @returns {URL} The URL object.
 */
export const toUrl: toPrimitive<string, URL> = (url: string): URL => {

  // test absolute url
  if (URL.canParse(url)) {
    return new URL(url)
  }

  const absoluteUrlRegex = new RegExp('^(?:[a-z]+:)?//', 'i')
  if (!absoluteUrlRegex.test(url)) {
    throw new TypeError(`URL must be valid`)
  }

  throw new TypeError(`URL must be valid`)
}
