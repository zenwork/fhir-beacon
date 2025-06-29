import {StoryObj}                         from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {Extension}                        from './extension'
import * as data                          from './extension-complex.story.data'

// Register the custom element if it hasn't been registered yet
customElements.get('fhir-extension') || customElements.define('fhir-extension', Extension)

const meta = {
  title: 'Components/Datatypes/Special Type/Extension/More Examples',
  component: 'fhir-extension',
  ...renderTemplateInShell(
    (args: ShellArgs) => html`
        <fhir-extension .data=${args.data} summary ?headless=${args.headless}></fhir-extension>`)

}

export default meta
type Story = StoryObj


export const complexExtension: Story = {
  name: 'Complex Extension',
  args: {
    data: data.complexExtension
  }
}
