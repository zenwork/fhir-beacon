import {FhirPrimitiveName} from 'FhirPrimitiveName'



/**
 * Enum class representing FHIR primitive datatypes
 */
export class FhirPrimitiveNameEnum {
  static base64Binary = new FhirPrimitiveNameEnum('base64Binary')
  static boolean = new FhirPrimitiveNameEnum('boolean')
  static canonical = new FhirPrimitiveNameEnum('canonical')
  static code = new FhirPrimitiveNameEnum('code')
  static date = new FhirPrimitiveNameEnum('date')
  static dateTime = new FhirPrimitiveNameEnum('dateTime')
  static decimal = new FhirPrimitiveNameEnum('decimal')
  static id = new FhirPrimitiveNameEnum('id')
  static instant = new FhirPrimitiveNameEnum('instant')
  static integer = new FhirPrimitiveNameEnum('integer')
  static integer64 = new FhirPrimitiveNameEnum('integer64')
  static markdown = new FhirPrimitiveNameEnum('markdown')
  static oid = new FhirPrimitiveNameEnum('oid')
  static positiveInt = new FhirPrimitiveNameEnum('positiveInt')
  static string = new FhirPrimitiveNameEnum('string')
  static time = new FhirPrimitiveNameEnum('time')
  static unsignedInt = new FhirPrimitiveNameEnum('unsignedInt')
  static uri = new FhirPrimitiveNameEnum('uri')
  static url = new FhirPrimitiveNameEnum('url')
  static uuid = new FhirPrimitiveNameEnum('uuid')
  static xhtml = new FhirPrimitiveNameEnum('xhtml')

  readonly value: FhirPrimitiveName

  constructor(value: FhirPrimitiveName) {
    this.value = value
  }

  /**
   * Get all available FHIR primitive datatype names
   * @returns {FhirPrimitiveNameEnum[]} Array of all primitive datatype names
   */
  static values() {
    return Object.values(this).filter(value => value instanceof FhirPrimitiveNameEnum)
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
   * @returns {FhirPrimitiveNameEnum|undefined} The enum value or undefined if not found
   */
  static fromString(value: string): FhirPrimitiveNameEnum | undefined {
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
Object.freeze(FhirPrimitiveNameEnum)

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
} = FhirPrimitiveNameEnum
