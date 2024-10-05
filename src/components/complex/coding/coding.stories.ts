import {Meta, StoryObj}                   from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'

type CustomArgs = {
  data: object,
  mode?: string,
  verbose?: boolean,
  showerror?: boolean,
  open?: boolean,
  summaryonly?: boolean
};

const meta: Meta<CustomArgs> = {
  title: 'Components/Datatypes/Complex Type/Coding',
  component: 'fhir-shell',
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-coding .data=${args.data} summary></fhir-coding >`)
}

export default meta
type Story = StoryObj<CustomArgs>;

export const DisplayableValue: Story = {
  args: {
    data: {
      system: 'http://hl7.org/fhir/sid/icd-10',
      code: 'G44.1',
      display: 'Vascular headache, not elsewhere classified'
    }
  }
}

export const NoDisplayableValue: Story = {
  args: {
    data: {
      system: 'http://hl7.org/fhir/sid/icd-10',
      code: 'G44.1'
    }
  }
}

export const ShowStructureWithErrors: Story = {
  args: {
    data: {
      id: '123-456',
      extension: [],
      version: '1.0',
      system: 'hl7.org/fhir/sid/icd-10',
      code: 'not a valid code',
      display: 'Vascular headache, not elsewhere classified'
    },
    mode: 'structure',
    verbose: false,
    showerror: true,
    open: true
  }
}
