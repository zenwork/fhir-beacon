import {StoryObj} from '@storybook/web-components'
import './bundle'


let path = 'Components/Foundation/Bundle'
let elementName = 'fhir-bundle'
let data = {
  resourceType: 'Bundle',
  id: 'bundle-references',
  type: 'collection',
  entry: [
    {
      fullUrl: 'http://example.org/fhir/Patient/23',
      resource: {
        resourceType: 'Patient',
        id: '23',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Anonymous Patient</b> (no stated gender), DoB Unknown ( id:\u00a01234567)</p><hr/></div>'
        },
        identifier: [
          {
            system: 'http://example.org/ids',
            value: '1234567'
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:04121321-4af5-424c-a0e1-ed3aab1c349d',
      resource: {
        resourceType: 'Patient',
        id: 'temp',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Anonymous Patient</b> (no stated gender), DoB Unknown</p><hr/></div>'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Observation/123',
      resource: {
        resourceType: 'Observation',
        id: '123',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="123"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;123&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="broken-link.html">Patient/23</a></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: 'Patient/23'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Observation/124',
      resource: {
        resourceType: 'Observation',
        id: '124',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="124"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;124&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="broken-link.html">http://example.org/fhir/Patient/23</a></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: 'http://example.org/fhir/Patient/23'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Observation/12',
      resource: {
        resourceType: 'Observation',
        id: '12',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="12"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;12&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="broken-link.html">urn:uuid:04121321-4af5-424c-a0e1-ed3aab1c349d</a></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: 'urn:uuid:04121321-4af5-424c-a0e1-ed3aab1c349d'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Observation/14',
      resource: {
        resourceType: 'Observation',
        id: '14',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="14"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;14&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="broken-link.html">http://example.org/fhir-2/Patient/1</a></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: 'http://example.org/fhir-2/Patient/1'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir-2/Observation/14',
      resource: {
        resourceType: 'Observation',
        id: '14',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="14"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;14&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="broken-link.html">Patient/23</a></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: 'Patient/23'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Patient/45',
      resource: {
        resourceType: 'Patient',
        id: '45',
        meta: {
          versionId: '1'
        },
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Name 1</b> (no stated gender), DoB Unknown</p><hr/></div>'
        },
        name: [
          {
            text: 'Name 1'
          }
        ]
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Patient/45',
      resource: {
        resourceType: 'Patient',
        id: '45',
        meta: {
          versionId: '2'
        },
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Name 2</b> (no stated gender), DoB Unknown</p><hr/></div>'
        },
        name: [
          {
            text: 'Name 2'
          }
        ]
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Observation/47',
      resource: {
        resourceType: 'Observation',
        id: '47',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="47"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;47&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="broken-link.html">Patient/45/_history/2</a></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: 'Patient/45/_history/2'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Observation/48',
      resource: {
        resourceType: 'Observation',
        id: '48',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="48"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;48&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <span/></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          identifier: {
            system: 'http://example.org/ids',
            value: '1234567'
          }
        }
      }
    }
  ]
}

const meta = {
  title: path,
  component: elementName,
  argTypes: {
    mode: {options: ['display', 'structure', 'summary', 'combined'], control: {type: 'inline-radio'}},
    verbose: {options: [true, false], control: {type: 'inline-radio'}},
    showerror: {options: [true, false], control: {type: 'inline-radio'}},
    open: {options: [true, false], control: {type: 'inline-radio'}}
  }
}

export default meta
type Story = StoryObj;

export const Display: Story = {
  args: {
    data: data,
    mode: 'display'
  }
}

export const Structure: Story = {
  args: {
    data: data,
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: true
  }
}
