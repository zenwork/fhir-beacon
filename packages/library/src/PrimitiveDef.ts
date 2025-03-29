import {PrimitiveName} from 'PrimitiveName'



/**
 * Enum class representing FHIR primitive datatypes
 */
export class PrimitiveDef {
  static base64Binary = new PrimitiveDef('base64Binary')
  static boolean = new PrimitiveDef('boolean')
  static canonical = new PrimitiveDef('canonical')
  static code = new PrimitiveDef('code')
  static date = new PrimitiveDef('date')
  static dateTime = new PrimitiveDef('dateTime')
  static decimal = new PrimitiveDef('decimal')
  static id = new PrimitiveDef('id')
  static instant = new PrimitiveDef('instant')
  static integer = new PrimitiveDef('integer')
  static integer64 = new PrimitiveDef('integer64')
  static markdown = new PrimitiveDef('markdown')
  static oid = new PrimitiveDef('oid')
  static positiveInt = new PrimitiveDef('positiveInt')
  static string = new PrimitiveDef('string')
  static time = new PrimitiveDef('time')
  static unsignedInt = new PrimitiveDef('unsignedInt')
  static uri = new PrimitiveDef('uri')
  static url = new PrimitiveDef('url')
  static uuid = new PrimitiveDef('uuid')
  static xhtml = new PrimitiveDef('xhtml')

  readonly value: PrimitiveName

  constructor(value: PrimitiveName) {
    this.value = value
  }

  /**
   * Get all available FHIR primitive datatype names
   * @returns {PrimitiveDef[]} Array of all primitive datatype names
   */
  static values() {
    return Object.values(this).filter(value => value instanceof PrimitiveDef)
  }
  /**
   * Get all available FHIR primitive datatype names as strings
   * @returns {string[]} Array of all primitive datatype names as strings
   */
  static valueStrings(): string[] {
    return this.values().map(v => v.toString())
  }
  /**
   * Check if a string is a valid FHIR primitive datatype name
   * @param {string} value - The string to check
   * @returns {boolean} True if the value is a valid primitive datatype name
   */
  static isValid(value: unknown): boolean {
    return this.valueStrings().includes(String(value))
  }
  /**
   * Get an enum by its string value
   * @param {string} value - The string value to look up
   * @returns {PrimitiveDef|undefined} The enum value or undefined if not found
   */
  static fromString(value: string): PrimitiveDef | undefined {
    return this.values().find(v => v.toString() === value)
  }

  toString() {
    return this.value
  }
  valueOf() {
    return this.value
  }
}

// Make the enum immutable
Object.freeze(PrimitiveDef)

export const {
  base64Binary,
  boolean,
  canonical,
  code,
  date,
  dateTime,
  decimal,
  id,
  instant,
  integer,
  integer64,
  markdown,
  oid,
  positiveInt,
  string,
  time,
  unsignedInt,
  uri,
  url,
  uuid,
  xhtml
} = PrimitiveDef
