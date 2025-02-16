import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import {ifDefined}      from 'lit-html/directives/if-defined.js'

import {PrimitiveType} from '../../../../src/components/primitive/type-converters/type-converters'



const meta = {
  title: 'Components/Datatypes/Primitive Type/All',
  component: 'fhir-primitive'
} satisfies Meta


function renderPrimitive({ value, errorValue, type, choices, variant }: {
  value: unknown,
  errorValue: unknown,
  type: PrimitiveType,
  choices?: any,
  variant?: string
}): any {

  return html`
      <fhir-primitive label="raw" .value=${value} .type=${PrimitiveType.none}></fhir-primitive>
      <br>
      ${ifDefined(variant)
        ? html`
              <fhir-primitive label="converted"
                              .value=${value}
                              .type=${type}
                              .variant=${variant}
                              .choices=${choices}
              ></fhir-primitive>`
        : html`
              <fhir-primitive label="converted" .value=${value} .type=${type} .choices=${choices}></fhir-primitive>`}
      <br>
      <fhir-primitive label="input" .value=${value} .type=${type} .choices=${choices} input></fhir-primitive>
      <br>
      <fhir-primitive label="error" .value=${errorValue} .type=${type} showerror></fhir-primitive>
  `
}


export default meta
type Story = StoryObj;

export const base64: Story = {
  render: () => renderPrimitive({
                                  value: 'VGhpcyBpcyBCYXNlNjQgZW5jb2RlZCB2YWx1ZS4uLiBub3cgZGVjb2RlZA==',
                                  errorValue: 'something else',
                                  type: PrimitiveType.base64
                                })
}

export const boolean: Story = {
  render: () => renderPrimitive({ value: 'true', errorValue: 'yes', type: PrimitiveType.boolean, variant: 'checkbox' })
}

export const canonical: Story = {
  render: () => renderPrimitive({
                                  value: 'http://hl7.org/fhir/ValueSet/my-valueset|0.8',
                                  errorValue: 'not a uri',
                                  type: PrimitiveType.canonical
                                })
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

    return renderPrimitive({ value: 'registered', errorValue: 'register', type: PrimitiveType.code, choices: choices })
  }


}

export const date: Story = {
  render: () => renderPrimitive({ value: '2006-11-23', errorValue: '11/23/2006', type: PrimitiveType.date })
}

export const dateTime: Story = {
  render: () => renderPrimitive({
                                  value: '1971-12-31T23:59:59.999',
                                  errorValue: '23-NOV-2025 1:30',
                                  type: PrimitiveType.datetime
                                })
}

export const decimal: Story = {
  render: () => renderPrimitive({ value: '1.0000000', errorValue: 'one hundred', type: PrimitiveType.decimal })
}

export const fhir_string: Story = {
  render: () => renderPrimitive({
                                  value: 'Unicode text less than 1\'048\'576 char long 😎',
                                  errorValue: { val: 'text' },
                                  type: PrimitiveType.fhir_string
                                })
}

export const id: Story = {
  render: () => renderPrimitive({ value: 'abc-123', errorValue: 'abc-' + '123'.repeat(21), type: PrimitiveType.id })
}

export const instant: Story = {
  render: () => renderPrimitive({
                                  value: '2015-12-31T23:28:17.239-05:00',
                                  errorValue: '1971-12-31T23:59:59.999',
                                  type: PrimitiveType.instant
                                })
}

export const integer: Story = {
  render: () => renderPrimitive({ value: 1234, errorValue: 10.002, type: PrimitiveType.integer })
}

export const link: Story = {
  render: () => renderPrimitive({ value: 'https://example.com', errorValue: 'foo/bar/baz', type: PrimitiveType.link })
}

export const markdown: Story = {
  render: () => renderPrimitive({
                                  value: '# title \n ## Section \n\n This is a sentence',
                                  errorValue: ' ',
                                  type: PrimitiveType.markdown
                                })
}

export const none: Story = {
  render: () => renderPrimitive({ value: 'foo bar', errorValue: 1234, type: PrimitiveType.none })
}

export const positiveInt: Story = {
  render: () => renderPrimitive({ value: 1234, errorValue: -1234.5, type: PrimitiveType.positiveInt })
}

export const stringReference: Story = {
  render: () => renderPrimitive({
                                  value: 'Patient',
                                  errorValue: 'Professional',
                                  type: PrimitiveType.string_reference,
                                  choices: [
                                    { value: 'Patient', display: 'Patient' },
                                    { value: 'Practitioner', display: 'Practitioner' },
                                    { value: 'Medication', display: 'Medication' },
                                    { value: 'Substances', display: 'Substances' }
                                  ]
                                })
}

export const time: Story = {
  render: () => renderPrimitive({ value: '23:59:59', errorValue: '24:00:00', type: PrimitiveType.time })
}

export const unsignedInt: Story = {
  render: () => renderPrimitive({ value: 123456, errorValue: '+123456', type: PrimitiveType.unsigned_int })
}

export const uri: Story = {
  render: () => renderPrimitive({
                                  value: 'urn:uuid:53fefa32-fcbb-4ff8-8a92-55ee120877b7',
                                  errorValue: 'htpp://foo/bar baz-123',
                                  type: PrimitiveType.uri
                                })
}

export const url: Story = {
  render: () => renderPrimitive({
                                  value: 'http://server/resource/53fefa32-fcbb-4ff8-8a92-55ee120877b7',
                                  errorValue: 'foo/bar/baz-123',
                                  type: PrimitiveType.url
                                })
}

export const uriType: Story = {
  render: () => renderPrimitive({
                                  value: 'AdministrableProductDefinition',
                                  errorValue: 'Aspirin',
                                  type: PrimitiveType.uri_type,
                                  choices: [
                                    { value: 'Patient', display: 'Patient' },
                                    { value: 'Practitioner', display: 'Practitioner' },
                                    { value: 'Medication', display: 'Medication' },
                                    { value: 'Substances', display: 'Substances' }
                                  ]
                                })
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
