import {StoryObj}                         from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {data, data2, data3, data4}        from './meta.story.data'


const meta = {
  title: 'Components/Datatypes/Special Type/Meta',
  component: 'fhir-meta',
  ...renderTemplateInShell(
    (args: ShellArgs) => html`
        <fhir-meta .data=${args.data} summary ?headless=${args.headless}></fhir-meta>`)

}

export default meta
type Story = StoryObj;


export const Display: Story = {
  args: {
    data: data2,
    mode: 'display',
    showerror: true,
    verbose: false,
    open: true,
    headless: true
  }
}

export const Structure: Story = {
  args: {
    data: data2,
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: true
  }
}

export const Data: Story = {
  args: {
    data: data,
    mode: 'display',
    showerror: true,
    verbose: false,
    open: true,
    headless: true
  }
}

export const Data3: Story = {
  args: {
    data: data3,
    mode: 'display',
    showerror: true,
    verbose: false,
    open: true,
    headless: true
  }
}

export const Data4: Story = {
  args: {
    data: data4,
    mode: 'display',
    showerror: true,
    verbose: false,
    open: true,
    headless: true
  }
}
