export const CodeSystemQuantityComparator = {
  resourceType: 'CodeSystem',
  id: 'quantity-comparator',
  url: 'http://hl7.org/fhir/quantity-comparator',
  version: '5.0.0',
  name: 'QuantityComparator',
  status: 'active',
  experimental: false,
  date: '2023-03-26T15:21:02+11:00',
  publisher: 'HL7 (FHIR Project)',
  description: 'How the Quantity should be understood and represented.',
  caseSensitive: true,
  valueSet: 'http://hl7.org/fhir/ValueSet/quantity-comparator',
  content: 'complete',
  concept: [
    { code: '\u003c', display: 'Less than', definition: 'The actual value is less than the given value.' },
        {
          code: '\u003c\u003d',
          display: 'Less or Equal to',
          definition: 'The actual value is less than or equal to the given value.'
        },
        {
          code: '\u003e\u003d',
          display: 'Greater or Equal to',
          definition: 'The actual value is greater than or equal to the given value.'
        },
        {
          code: '\u003e',
          display: 'Greater than',
          definition: 'The actual value is greater than the given value.'
        },
        {
          code: 'ad',
          display: 'Sufficient to achieve this total quantity',
          definition: 'The actual value is sufficient for the total quantity to equal the given value.'
        }
    ]
}
