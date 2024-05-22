import {StoryObj} from '@storybook/web-components'
import '../../../../src/special/Reference'


const meta = {
  title: 'System/Datatype Components/Special Type/Reference',
  component: 'fhir-reference',
  argTypes: {
    mode: {
      options: ['display', 'structure', 'combined'],
      control: {type: 'radio'},
    },
    verbose: {
      options: [true, false],
      control: {type: 'radio'},
    },
    'showerror': {
      options: [true, false],
      control: {type: 'radio'}
    }
  }

}

export default meta
type Story = StoryObj;

let patientData = {
  reference: 'http://someserver/Patient/id01230',
  type: 'Patient',
  display: 'Jack Smith'
}

export const DisplayAndTypeAndReference: Story = {
  args: {
    data: patientData,
    mode: 'display',
    'showerror': false
  }
}

export const Reference: Story = {
  args: {
    data: {
      reference: 'http://fhir.hl7.org/svc/StructureDefinition/c8973a22-2b5b-4e76-9c66-00639c99e61b'
    },
    mode: 'display',
    'showerror': false
  }
}

export const ReferenceAndType: Story = {
  args: {
    data: {
      reference: 'http://fhir.hl7.org/svc/StructureDefinition/c8973a22-2b5b-4e76-9c66-00639c99e61b',
      type: 'StructureDefinition'
    },
    mode: 'display',
    'showerror': false
  }
}

export const Display: Story = {
  args: {
    data: {
      display: 'Dr. John Q. Public'
    },
    mode: 'display',
    'showerror': false
  }
}

export const DisplayAndType: Story = {
  args: {
    data: {
      type: 'Practitioner',
      display: 'Dr. John Q. Public'
    },
    mode: 'display',
    'showerror': false
  }
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
    'showerror': false
  }
}

export const Unknown: Story = {
  args: {
    data: {
      type: 'Practitioner'
    },
    mode: 'display',
    'showerror': false
  }
}

export const Structure: Story = {
  args: {
    data: patientData,
    mode: 'structure',
    'showerror': false,
    verbose: true,
    open: true
  }
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
  }
}
