// many of these have special formatting rules that apply to them

export type Base64Binary = string
export type FhirBoolean = boolean
/**
 * Valid FHIR code
 * @typedef {string} Code
 */
export type Code = string
export type Canonical = URI
/**
 * Represents a decimal number with maximum of 18 digits.
 */
export type Decimal = number
export type DateTime = string
export type FhirDate = string
export type FhirString = string
export type Id = string
export type Instant = string
export type Integer = number
export type Integer64 = bigint
export type Language = string
export type Link = string
export type Markdown = string
export type PositiveInt = number
export type Ref = string
export type Time = string
export type UnsignedInt = number
/**
 * Marker type to distinguish a URL object that has passed the FHIR URI requirements
 * TODO: rename to Uri
 */
export type URI = string
export type Url = string
export type Uuid = string
export type XHTML = string
