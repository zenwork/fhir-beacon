import {StoryObj}                         from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'


const meta = {
  title: 'Components/Datatypes/Complex Type/Quantity',
  component: 'fhir-quantity',
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-quantity .data=${args.data} summary ?headless=${args.headless}></fhir-quantity>`)

}

export default meta
type Story = StoryObj<ShellArgs>;

export const DisplayableTime: Story = {
  args: {
    data: {
      value: '25',
      unit: 'sec',
      system: 'http://unitsofmeasure.org',
      code: 's'
    },
    mode: 'display',
    showerror: false,
    headless: true
  }
}

export const AmountOfPrescribedMedicine: Story = {
  args: {
    data: {
      value: '40000',
      comparator: '&gt;',
      unit: 'ug/L',
      system: 'http://unitsofmeasure.org',
      code: 'ug'
    },
    mode: 'display',
    showerror: false,
    headless: true
  }
}

export const AmountOfPrescribedMedicine2: Story = {
  args: {
    data: {
      value: '3',
      unit: 'capsules',
      system: 'http://snomed.info/sct',
      code: '385049006'
    },
    mode: 'display',
    showerror: false,
    headless: true
  }
}

export const Money: Story = {
  args: {
    data: {
      value: '100',
      unit: 'US$',
      system: 'urn:iso:std:iso:4217',
      code: 'USD'
    },
    mode: 'display',
    showerror: false,
    headless: true
  }
}

export const Simple: Story = {
  args: {
    data: {
      value: '1'
    },
    mode: 'display',
    showerror: false,
    headless: true
  }
}

export const ShowStructWithErrors: Story = {
  args: {
    data: {
      value: 'abc',
      unit: 'sec',
      system: 'http://unitsofmeasure.org',
      code: 's'
    },
    mode: 'structure',
    showerror: true,
    open: true
  }
}

export const Distance: Story = {
  args: {
    data: {
      value: '100',
      unit: 'kilometers',
      system: 'http://unitsofmeasure.org',
      code: 'km'
    },
    mode: 'structure',
    showerror: true,
    open: true
  }
}
export const Age: Story = {
  args: {
    data: {
      value: '18',
      unit: 'months',
      system: 'http://unitsofmeasure.org',
      code: 'mo'
    },
    mode: 'structure',
    showerror: true,
    open: true
  }
}

export const Duration: Story = {
  args: {
    data: {
      value: '0',
      unit: 'milliseconds',
      system: 'http://unitsofmeasure.org',
      code: 'ms'
    },
    mode: 'structure',
    showerror: true,
    open: true
  }
}

export const Count: Story = {
  args: {
    data: {
      value: '1',
      code: '1'
    },
    mode: 'structure',
    showerror: true,
    open: true
  }
}
