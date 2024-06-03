import {StoryObj}               from '@storybook/web-components'
import './reference'
import '../../../../index'
import {html}                   from 'lit'
import {ShellArgs, wrapInShell} from '../../../../stories/wrapInShell'

const render = wrapInShell((args) => html`
    <fhir-reference .data=${args.data}></fhir-reference>`)

const meta = {
  title: 'Components/Datatypes/Special Type/Reference',
  component: 'fhir-reference',
  argTypes: {
    mode: {
      options: ['display', 'structure', 'summary', 'combined'],
      control: {type: 'inline-radio'}
    },
    verbose: {
      options: [true, false],
      control: {type: 'inline-radio'}
    },
    showerror: {
      options: [true, false],
      control: {type: 'inline-radio'}
    },
    open: {
      options: [true, false],
      control: {type: 'inline-radio'}
    }
  }

}

export default meta
type Story = StoryObj<ShellArgs>;

let patientData = {
  reference: 'http://someserver/Patient/id01230',
  type: 'Patient',
  display: 'Jack Smith'
}

export const DisplayAndTypeAndReference: Story = {
  args: {
    data: patientData,
    mode: 'display',
    showerror: false
  }
}

export const Reference: Story = {
  args: {
    data: {
      reference: 'http://fhir.hl7.org/svc/StructureDefinition/c8973a22-2b5b-4e76-9c66-00639c99e61b'
    },
    mode: 'display',
    showerror: false
  },
  render
}

export const ReferenceAndType: Story = {
  args: {
    data: {
      reference: 'http://fhir.hl7.org/svc/StructureDefinition/c8973a22-2b5b-4e76-9c66-00639c99e61b',
      type: 'StructureDefinition'
    },
    mode: 'display',
    showerror: false
  },
  render
}

export const Display: Story = {
  args: {
    data: {
      display: 'Dr. John Q. Public'
    },
    mode: 'display',
    showerror: false
  },
  render
}

export const DisplayAndType: Story = {
  args: {
    data: {
      type: 'Practitioner',
      display: 'Dr. John Q. Public'
    },
    mode: 'display',
    showerror: false
  },
  render
}

export const Identifier: Story = {
  args: {
    data: {
      identifier:
        {
          system: 'http://hl7.org/fhir/sid/us-ssn',
          value: '000111111'
        }
    },
    mode: 'display',
    showerror: false
  },
  render
}

export const Unknown: Story = {
  args: {
    data: {
      type: 'Practitioner'
    },
    mode: 'display',
    showerror: false
  },
  render
}

export const Structure: Story = {
  args: {
    data: patientData,
    mode: 'structure',
    showerror: false,
    verbose: true,
    open: true
  },
  render
}

export const WithExtension: Story = {
  args: {
    data: {
      extension: [
        {
          url: 'http://example.org/fhir/StructureDefinition/participation-agreement',
          valueUri: 'http://example.org/phr/documents/patient/general/v1'
        }
      ], ...patientData
    },
    mode: 'display'
  },
  render
}
