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
   * Get all available FHIR resource names
   * @returns {FhirResourceNameEnum[]} Array of all resource names
   */
  static values() {
    return Object.values(this).filter(value => value instanceof BindingStrength)
  }
  /**
   * Get all available FHIR resource names as strings
   * @returns {string[]} Array of all resource names as strings
   */
  static valueStrings() {
    return this.values().map(v => v.toString())
  }
  /**
   * Check if a string is a valid FHIR resource name
   * @param {string} value - The string to check
   * @returns {boolean} True if the value is a valid resource name
   */
  static isValid(value) {
    return this.valueStrings().includes(value)
  }
  /**
   * Get an enum by its string value
   * @param {string} value - The string value to look up
   * @returns {FhirResourceNameEnum|undefined} The enum value or undefined if not found
   */
  static fromString(value) {
    return this.values().find(v => v.toString() === value)
  }
  /**
   * Get resource names by category (resources that start with the same prefix)
   * @param {string} prefix - The prefix to filter by
   * @returns {FhirResourceNameEnum[]} Array of resource enum values starting with the given prefix
   */
  static getByPrefix(prefix) {
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
