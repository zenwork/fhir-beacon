/**
 * @description base64Binary Type: A stream of bytes
 * - code: base64Binary
 */
export type Base64Binary = string

/**
 * @description boolean Type: Value of "true" or "false"
 * - code: boolean
 */
export type Boolean = string

/**
 * @description canonical type: A URI that is a reference to a canonical URL on a FHIR resource
 * - code: canonical
 */
export type Canonical = string

/**
 * @description code type: A string which has at least one character and no leading or trailing whitespace and where
 *   there is no whitespace other than single spaces in the contents
 * - code: code
 */
export type Code = string

/**
 * @description date Type: A date or partial date (e.g. just year or year + month). There is no UTC offset. The format
 *   is a union of the schema types gYear, gYearMonth and date.  Dates SHALL be valid dates.
 * - code: date
 */
export type Date = string

/**
 * @description dateTime Type: A date, date-time or partial date (e.g. just year or year + month).  If hours and
 *   minutes are specified, a UTC offset SHALL be populated. The format is a union of the schema types gYear,
 *   gYearMonth, date and dateTime. Seconds must be provided due to schema type constraints but may be zero-filled and
 *   may be ignored.                 Dates SHALL be valid dates.
 * - code: dateTime
 */
export type DateTime = string

/**
 * @description decimal Type: A rational number with implicit precision
 * - code: decimal
 */
export type Decimal = string

/**
 * @description id type: Any combination of letters, numerals, "-" and ".", with a length limit of 64 characters.
 *   (This might be an integer, an unprefixed OID, UUID or any other identifier pattern that meets these constraints.)
 *   Ids are case-insensitive.
 * - code: id
 */
export type Id = string

/**
 * @description instant Type: An instant in time - known at least to the second
 * - code: instant
 */
export type Instant = string

/**
 * @description integer Type: A whole number
 * - code: integer
 */
export type Integer = string

/**
 * @description integer64 Type: A very large whole number
 * - code: integer64
 */
export type Integer64 = string

/**
 * @description markdown type: A string that may contain Github Flavored Markdown syntax for optional processing by a
 *   mark down presentation engine
 * - code: markdown
 */
export type Markdown = string

/**
 * @description oid type: An OID represented as a URI
 * - code: oid
 */
export type Oid = string

/**
 * @description positiveInt type: An integer with a value that is positive (e.g. >0)
 * - code: positiveInt
 */
export type PositiveInt = string

/**
 * @description string Type: A sequence of Unicode characters
 * - code: string
 */
export type String = string

/**
 * @description time Type: A time during the day, with no date specified
 * - code: time
 */
export type Time = string

/**
 * @description unsignedInt type: An integer with a value that is not negative (e.g. >= 0)
 * - code: unsignedInt
 */
export type UnsignedInt = string

/**
 * @description uri Type: String of characters used to identify a name or a resource
 * - code: uri
 */
export type Uri = string

/**
 * @description url type: A URI that is a literal reference
 * - code: url
 */
export type Url = string

/**
 * @description uuid type: A UUID, represented as a URI
 * - code: uuid
 */
export type Uuid = string

/**
 * @description xhtml Type definition
 * - code: xhtml
 */
export type Xhtml = string
