import {Markdown}    from '../primitive.data'
import {toPrimitive} from './index'

const regex = /^[\s\S]+$/


/**
 * Converts a string to a DateTime value.
 *
 * @param {string} value - The string value to convert.
 * @returns {Markdown} - The converted DateTime value.
 * @throws {TypeError} - If the value is not a valid date time.
 */
export const toMarkdown: toPrimitive<string, Markdown> = (value: string): Markdown => {

  if (!regex.test(value)) {
    throw new TypeError(`is not a valid markdown`)
  }

  return value as Markdown

}
