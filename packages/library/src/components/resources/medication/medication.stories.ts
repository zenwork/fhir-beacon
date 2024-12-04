import {Meta, StoryObj}                                 from '@storybook/web-components'
import {html}                                           from 'lit'
import {renderTemplateInShell, ShellArgs}               from '../../../../stories/storybook-utils'
import {data_310, data_319, frontPageData, synthiaData} from './medication.story.data'


const meta: Meta<ShellArgs> = {
  title: 'Components/Resources/Medication/Medication',
  component: 'fhir-medication',
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-medication .data=${args.data}></fhir-medication>
  `)
}

export default meta
type Story = StoryObj<ShellArgs>;

export const Med0310Display: Story = {
  args: {
    data: data_310,
    mode: 'display',
    showerror: true,
    verbose: false,
    open: true
  }
}

export const Med0310Structure: Story = {
  args: {
    data: data_310,
    mode: 'structure',
    showerror: true,
    verbose: false,
    open: true
  }
}


export const Med0310Narrative: Story = {
  args: {
    data: data_310,
    mode: 'narrative'
  }
}


export const Med0319Display: Story = {
  args: {
    data: data_319,
    mode: 'display',
    showerror: true,
    verbose: false,
    open: true
  }
}

export const Med0319Structure: Story = {
  args: {
    data: synthiaData,
    mode: 'structure',
    showerror: true,
    verbose: false,
    open: true
  }
}

export const FrontPageDemo: Story = {
  args: {
    data: frontPageData,
    mode: 'display',
    summaryonly: false,
    showerror: false,
    verbose: false,
    open: true,
    headless: true,
    input: true
  },
  render: (args: ShellArgs) =>
    html`<h3 style="color:var(--sl-color-primary-900); padding: 0;margin: 0">Medication</h3>
    <fhir-medication
            .data=${args.data}
            .mode=${args.mode}
            ?summaryonly=${args.summaryonly}
            ?showerror=${args.showerror}
            ?verbose=${args.verbose}
            ?open=${args.open}
            ?headless=${args.headless}
            ?input=${args.input}
    >
    </fhir-medication>
    `

}
