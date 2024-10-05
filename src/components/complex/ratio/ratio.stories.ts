import {StoryObj}                         from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'


const meta = {
  title: 'Components/Datatypes/Complex Type/Ratio',
  component: 'fhir-ratio',
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-ratio .data=${args.data}></fhir-ratio >`)

}

export default meta
type Story = StoryObj<ShellArgs>;

export const SimpleRatio: Story = {
  args: {
    data: {
      numerator: {
        value: '1'
      },
      denominator: {
        value: '128'
      }
    },
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  }
}

export const UnitCost: Story = {
  args: {
    data: {
      numerator: {
        value: '103.50',
        unit: 'US$',
        code: 'USD',
        system: 'urn:iso:std:iso:4217'
      },
      denominator: {
        value: '1',
        unit: 'day',
        code: 'day',
        system: 'http://unitsofmeasure.org'
      }
    },
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  }
}
