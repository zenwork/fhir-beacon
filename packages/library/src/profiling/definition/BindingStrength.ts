export class BindingStrength {

  static Required = new BindingStrength('required')
  static Extensible = new BindingStrength('extensible')
  static Preferred = new BindingStrength('preferred')
  static Example = new BindingStrength('example')

  readonly value: string

  constructor(value: string) {
    this.value = value
  }
  /**
   * Get all available binding strength values
   * @returns {BindingStrength[]} Array of all binding strength values
   */
  static values(): BindingStrength[] {
    return Object.values(this).filter(value => value instanceof BindingStrength)
  }
  /**
   * Get all available binding strength values as strings
   * @returns {string[]} Array of all binding strength values as strings
   */
  static valueStrings(): string[] {
    return this.values().map(v => v.toString())
  }
  /**
   * Check if a value is a valid binding strength
   * @param {unknown} value - The value to check
   * @returns {boolean} True if the value is a valid binding strength
   */
  static isValid(value: unknown): boolean {
    return this.valueStrings().includes(String(value))
  }
  /**
   * Get a binding strength by its string value
   * @param {string} value - The string value to look up
   * @returns {BindingStrength|undefined} The binding strength value or undefined if not found
   */
  static fromString(value: string): BindingStrength | undefined {
    return this.values().find(v => v.toString() === value)
  }
  /**
   * Get binding strengths that start with the given prefix
   * @param {string} prefix - The prefix to filter by
   * @returns {BindingStrength[]} Array of binding strength values starting with the given prefix
   */
  static getByPrefix(prefix: string): BindingStrength[] {
    return this.values().filter(resource =>
                                  resource.toString().startsWith(prefix)
    )
  }
  toString() {
    return this.value
  }
  valueOf() {
    return this.value
  }
}

export const { Required, Extensible, Example, Preferred } = BindingStrength
