import {StoryObj}                         from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'



const meta = {
  title: 'Components/Datatypes/Complex Type/Range',
  component: 'fhir-range',
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-range .data=${args.data} summary ?headless=${args.headless}></fhir-range>`)

}

export default meta
type Story = StoryObj<ShellArgs>;

export const Distance: Story = {
  args: {
    data:  {
      "low" : {
        "value" : "1.6",
        "unit" : "m"
      },
      "high" : {
        "value" : "1.9",
        "unit" : "m"
      }
    },
    mode: 'display',
    showerror: false,
    headless: true
  }
}

export const DistanceError: Story = {
  args: {
    data:  {
      "low" : {
        "value" : "1.6",
        "unit" : "m",
        comparator: '&gt;'
      },
      "high" : {
        "value" : "1.9",
        "unit" : "m"
      }
    },
    mode: 'display',
    showerror: false,
    headless: true
  }
}
