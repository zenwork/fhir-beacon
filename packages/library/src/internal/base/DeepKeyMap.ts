import {matches}           from './Validations.impl'
import {FullyQualifiedKey} from './Validations.type'



/**
 * AI Generated code
 */
export class DeepKeyMap<K, V> {
  #entries: { key: K, value: V }[] = []
  #matcher: ((k1: K, k2: K) => boolean) | undefined

  constructor(entries: [K, V][] = [], matcher?: (k1: K, k2: K) => boolean) {
    this.#matcher = matcher
    this.#entries.push(...entries.map(e => ({ key: e[0] as K, value: e[1] as V })))
  }

  /**
   * Compares two keys using deep equality. Replace this
   * implementation with a library like `lodash.isEqual` or `fast-deep-equal`
   * for more robust checks.
   */
  deepEquals(obj1: K, obj2: K): boolean {
    if (this.#matcher) {
      return this.#matcher(obj1, obj2)
    }

    if (obj1 === obj2) return true

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      return false
    }

    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) return false

    for (const key of keys1) {
      // @ts-ignore
      if (!keys2.includes(key) || !this.deepEquals(obj1[key], obj2[key])) {
        return false
      }
    }

    return true
  }

  /**
   * Sets a value in the DeepKeyMap.
   * @param {Object} key - The object key.
   * @param {any} value - The value to associate with the key.
   */
  set(key: K, value: V) {
    for (const entry of this.#entries) {
      if (this.deepEquals(entry.key, key)) {
        entry.value = value
        return
      }
    }
    this.#entries.push({ key, value })
  }

  /**
   * Gets the value associated with a deeply equal key.
   * @param {Object} key - The object key.
   * @returns {any} - The associated value, or `undefined` if not found.
   */
  get(key: K) {
    for (const entry of this.#entries) {
      if (this.deepEquals(key, entry.key)) {
        return entry.value
      }
    }
    return undefined
  }

  /**
   * Deletes a key-value pair based on deep equality.
   * @param {Object} key - The object key.
   * @returns {boolean} - True if an entry was deleted, false otherwise.
   */
  delete(key: K) {
    const index = this.#entries.findIndex(entry => this.deepEquals(entry.key, key))
    if (index > -1) {
      this.#entries.splice(index, 1)
      return true
    }
    return false
  }

  /**
   * Checks if a deeply equal key exists.
   * @param {Object} key - The object key.
   * @returns {boolean} - True if the key exists, false otherwise.
   */
  has(key: K) {
    return this.#entries.some(entry => this.deepEquals(entry.key, key))
  }

  /**
   * Returns all key-value pairs as entries.
   */
  entries(): [K, V][] {
    return this.#entries.map(e => [e.key, e.value])
  }

  keys(): K[] {
    return [...this.#entries.map(e => e.key)]
  }
}

export class FqkMap extends DeepKeyMap<FullyQualifiedKey, string[]> {
  constructor(entries: [FullyQualifiedKey, string[]][] = []) {
    super(entries, matches)
  }
}
