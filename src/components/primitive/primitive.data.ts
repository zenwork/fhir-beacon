// many of these have special formatting rules that apply to them

export type Id = string
export type Instant = string

/**
 * Valid FHIR code
 * @typedef {string} Code
 */
export type Code = string

/**
 * Marker type to distinguish a URL object that has passed the FHIR URI requirements
 */
export type URI = URL

/**
 * Represents a decimal number with maximum of 18 digits.
 */
export type Decimal = number

export type Canonical = URI

export type Language = string

export type XHTML = string

export type DateTime = string

export type Markdown = string
