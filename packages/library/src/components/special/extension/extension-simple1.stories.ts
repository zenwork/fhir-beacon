import {StoryObj}                         from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {Extension}                        from './extension'
import * as data                          from './extension-simple.story.data'

// Register the custom element if it hasn't been registered yet
customElements.get('fhir-extension') || customElements.define('fhir-extension', Extension)

const meta = {
  title: 'Components/Datatypes/Special Type/Extension/Simple Extension (primitive types)',
  component: 'fhir-extension',
  ...renderTemplateInShell(
    (args: ShellArgs) => html`
        <fhir-extension .data=${args.data} summary ?headless=${args.headless}></fhir-extension>`)

}

export default meta
type Story = StoryObj


export const StringValueExtension: Story = {
  name: 'String Value Extension',
  args: {
    data: data.stringExtension
  }
}

export const BooleanValueExtension: Story = {
  name: 'Boolean Value Extension',
  args: {
    data: data.booleanExtension
  }
}

export const CodeableConceptExtension: Story = {
  name: 'CodeableConcept Extension',
  args: {
    data: data.codeableConceptExtension
  }
}

export const idExtension: Story = {
  name: 'Id Extension',
  args: {
    data: data.idExtension
  }
}

export const dateExtension: Story = {
  name: 'date Extension',
  args: {
    data: data.dateExtension
  }
}

export const dateTimeExtension: Story = {
  name: 'DateTime Extension',
  args: {
    data: data.datetimeExtension
  }
}

export const decimalExtension: Story = {
  name: 'decimal Extension',
  args: {
    data: data.decimalExtension
  }
}

export const postiveIntExtension: Story = {
  name: 'postive int Extension',
  args: {
    data: data.positiveIntExtension
  }
}

export const uriExtension: Story = {
  name: 'uri Extension',
  args: {
    data: data.uriExtension
  }
}

export const CanonicalExtension: Story = {
  name: 'Canonical Extension',
  args: {
    data: data.canonicalExtension
  }
}


export const CodeExtension: Story = {
  name: 'Code Extension',
  args: {
    data: data.codeExtension
  }
}

export const MarkdownExtension: Story = {
  name: 'Markdown Extension',
  args: {
    data: data.markdownExtension
  }
}

export const TimeExtension: Story = {
  name: 'Time Extension',
  args: {
    data: data.timeExtension
  }
}


export const UnsignedIntExtension: Story = {
  name: 'UnsignedInt Extension',
  args: {
    data: data.unsignedIntExtension
  }
}

export const UrlExtension: Story = {
  name: 'Url Extension',
  args: {
    data: data.urlExtension
  }
}

export const UuidExtension: Story = {
  name: 'Uuid Extension',
  args: {
    data: data.uuidExtension
  }
}
