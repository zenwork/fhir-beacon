import {StoryObj}                         from '@storybook/web-components'
import './sampled-data'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'



const data = {
  origin: {
    value: "0",
    unit: "μV",
    system: "http://unitsofmeasure.org",
    code: "uV"
  },
  period: "2",
  factor: "2.5",
  dimensions: "1",
  data: "-4 -13 -18 -18 -18 -17 -16 -16 -16 -16 -16 -17 -18 -18 -18"
}

const meta = {
  title: 'Components/Datatypes/Complex Type/Sampled Data',
  component: 'fhir-sampled-data',
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-sampled-data .data=${args.data} summary ?headless=${args.headless}></fhir-sampled-data>`)

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
