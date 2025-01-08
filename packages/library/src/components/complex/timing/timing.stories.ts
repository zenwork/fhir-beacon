import {StoryObj}                         from '@storybook/web-components'
import './timing'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'



const data = {
  "repeat" : {
    "boundsPeriod" : {
      "start" : "2015-07-01T13:00:00"
    },
    "frequency" : "2",
    "period" : "1",
    "periodUnit" : "d"
  }
}

const meta = {
  title: 'Components/Datatypes/Complex Type/Timing',
  component: 'fhir-timing',
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-timing .data=${args.data} summary ?headless=${args.headless}></fhir-timing>`)

}

export default meta
type Story = StoryObj<ShellArgs>;


export const Display: Story = {
  args: {
    data,
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true,
    headless:false
  }
}

export const Structure: Story = {
  args: {
    data,
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: false,
    headless:true

  }
}
