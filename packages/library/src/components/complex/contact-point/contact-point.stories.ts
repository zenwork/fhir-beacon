import {StoryObj}                         from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {data}                             from './contact-point.story.data'


const path = 'Components/Datatypes/Complex Type/Contact Point'
const elementName = 'fhir-contact-point'

const meta = {
  title: path,
  component: elementName,
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-contact-point .data=${args.data} summary ?headless=${args.headless}></fhir-contact-point>`
  )
}

export default meta
type Story = StoryObj;

export const Display: Story = {
  args: {
    data,
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true,
    headless: true
  }
}

export const Structure: Story = {
  args: {
    data,
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: true
  }
}
