import {StoryObj} from '@storybook/web-components'
import {html}     from 'lit'

const meta = {
  title: 'Toolkit/Layout/SystemChoice'
}

export default meta
type Story = StoryObj;

export const Simple: Story = {
  render: () => html`
      <fhir-system-choice .value=${'foo'}
                          .valuesets=${[{ value: 'foo', label: 'a Foo' }, { value: 'bar', label: 'a Bar' }]}
                          .codingsystems=${[{ value: 'baz', label: 'a Baz' }, { value: 'buzz', label: 'a Buz' }]}
                          ?overridable=${false}
                          label="the label"
      >
      </fhir-system-choice>
  `
}

export const Override: Story = {
  render: () => html`
      <fhir-system-choice .value=${'foo'}
                          .valuesets=${[{ value: 'foo', label: 'a Foo' }, { value: 'bar', label: 'a Bar' }]}
                          .codingsystems=${[{ value: 'baz', label: 'a Baz' }, { value: 'buzz', label: 'a Buz' }]}
                          ?overridable=${true}
      >
          <fhir-label slot="label" text="the label"></fhir-label>
      </fhir-system-choice>
  `
}
