import {Meta, StoryObj} from '@storybook/web-components'


import {html} from 'lit'


import {PrimitiveType} from '../../../../src/components/primitive/type-converters/type-converters'



const meta = {
  title: 'Components/Datatypes/Primitive Type/All',
  component: 'fhir-primitive'
} satisfies Meta


function renderPrimitive(value: unknown, errorValue: unknown, type: PrimitiveType, choices?: any): any {
  return html`
      <fhir-primitive label="raw" .value=${value} .type=${PrimitiveType.none}></fhir-primitive>
      <fhir-primitive label="converted" .value=${value} .type=${type}></fhir-primitive>
      <fhir-primitive label="input" .value=${value} .type=${type} .choices=${choices} input></fhir-primitive>
      <fhir-primitive label="error" .value=${errorValue} .type=${type} showerror></fhir-primitive>
  `
}


export default meta
type Story = StoryObj;

export const base64: Story = {
  render: () => renderPrimitive('VGhpcyBpcyBCYXNlNjQgZW5jb2RlZCB2YWx1ZS4uLiBub3cgZGVjb2RlZA==',
                                'something else',
                                PrimitiveType.base64)
}

export const boolean: Story = {
  render: () => renderPrimitive('true', 'yes', PrimitiveType.boolean)
}

export const canonical: Story = {
  render: () => renderPrimitive('http://hl7.org/fhir/ValueSet/my-valueset|0.8', 'not a uri', PrimitiveType.canonical)
}

export const code: Story = {
  render: () => {
    const choices = [
      {
        'value': 'registered',
        'display': 'Registered'
      },
      {
        'value': 'preliminary',
        'display': 'Preliminary'
      },
      {
        'value': 'final',
        'display': 'Final'
      },
      {
        'value': 'amended',
        'display': 'Amended'
      },
      {
        'value': 'cancelled',
        'display': 'Cancelled'
      },
      {
        'value': 'entered-in-error',
        'display': 'Entered in Error'
      },
      {
        'value': 'unknown',
        'display': 'Unknown'
      }
    ]

    return renderPrimitive('registered', 'register', PrimitiveType.code, choices)
  }


}

export const date: Story = {
  render: () => renderPrimitive('2006-11-23', '11/23/2006', PrimitiveType.date)
}

export const dateTime: Story = {
  render: () => renderPrimitive('1971-12-31T23:59:59.999', '23-NOV-2025 1:30', PrimitiveType.datetime)
}

export const decimal: Story = {
  render: () => renderPrimitive('1.0000000', 'one hundred', PrimitiveType.decimal)
}

export const fhir_string: Story = {
  render: () => renderPrimitive('Unicode text less than 1\'048\'576 char long 😎',
                                { val: 'text' },
                                PrimitiveType.fhir_string)
}

export const id: Story = {
  render: () => renderPrimitive('abc-123', 'abc-' + '123'.repeat(21), PrimitiveType.id)
}

export const instant: Story = {
  render: () => renderPrimitive('2015-12-31T23:28:17.239-05:00', '1971-12-31T23:59:59.999', PrimitiveType.instant)
}

export const integer: Story = {
  render: () => renderPrimitive(1234, 10.002, PrimitiveType.integer)
}

export const link: Story = {
  render: () => renderPrimitive('https://example.com', 'foo/bar/baz', PrimitiveType.link)
}

export const markdown: Story = {
  render: () => renderPrimitive('# title \n ## Section \n\n This is a sentence', ' ', PrimitiveType.markdown)
}

export const none: Story = {
  render: () => renderPrimitive('foo bar', 1234, PrimitiveType.none)
}

export const positiveInt: Story = {
  render: () => renderPrimitive(1234, -1234.5, PrimitiveType.positiveInt)
}

export const stringReference: Story = {
  render: () => renderPrimitive('Patient', 'Professional', PrimitiveType.string_reference, [
    { value: 'Patient', display: 'Patient' },
    { value: 'Practitioner', display: 'Practitioner' },
    { value: 'Medication', display: 'Medication' },
    { value: 'Substances', display: 'Substances' }
  ])
}

export const time: Story = {
  render: () => renderPrimitive('23:59:59', '24:00:00', PrimitiveType.time)
}

export const unsignedInt: Story = {
  render: () => renderPrimitive(123456, '+123456', PrimitiveType.unsigned_int)
}

export const uri: Story = {
  render: () => renderPrimitive('urn:uuid:53fefa32-fcbb-4ff8-8a92-55ee120877b7',
                                'htpp://foo/bar baz-123',
                                PrimitiveType.uri)
}

export const url: Story = {
  render: () => renderPrimitive('http://server/resource/53fefa32-fcbb-4ff8-8a92-55ee120877b7',
                                'foo/bar/baz-123',
                                PrimitiveType.url)
}

export const uriType: Story = {
  render: () => renderPrimitive('AdministrableProductDefinition', 'Aspirin', PrimitiveType.uri_type, [
    { value: 'Patient', display: 'Patient' },
    { value: 'Practitioner', display: 'Practitioner' },
    { value: 'Medication', display: 'Medication' },
    { value: 'Substances', display: 'Substances' }
  ])
}

/*
 |           |              |                  |              |
 |-----------|--------------|------------------|--------------|
 | base64    | decimal      | link             | unsigned_int |
 | boolean   | fhir_string  | markdown         | uri          |
 | canonical | forced_error | none             | uri_type     |
 | code      | id           | positiveInt      | url          |
 | date      | instant      | string_reference |              |
 | datetime  | integer      | time             |              |
 */
