// extension.story.ts
import {StoryObj}                         from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {Extension}                        from './extension'
import * as data                          from './extension-simple.story.data'

// Register the custom element if it hasn't been registered yet
customElements.get('fhir-extension') || customElements.define('fhir-extension', Extension)

const meta = {
  title: 'Components/Datatypes/Special Type/Extension/Simple Extension (complex types)',
  component: 'fhir-extension',
  ...renderTemplateInShell(
    (args: ShellArgs) => html`
        <fhir-extension .data=${args.data} summary ?headless=${args.headless}></fhir-extension>`)

}

export default meta
type Story = StoryObj


export const CodeableConceptExtension: Story = {
  name: 'CodeableConcept Extension',
  args: {
    data: data.codeableConceptExtension
  }
}


export const AnnotationExtension: Story = {
  name: 'Annotation Extension',
  args: {
    data: data.annotationExtension
  }
}

export const AttachmentExtension: Story = {
  name: 'Attachment Extension',
  args: {
    data: data.attachmentExtension
  }
}

export const Base64BinaryExtension: Story = {
  name: 'Base64Binary Extension',
  args: {
    data: data.base64BinaryExtension
  }
}


export const CodingExtension: Story = {
  name: 'Coding Extension',
  args: {
    data: data.codingExtension
  }
}

export const ContactPointExtension: Story = {
  name: 'ContactPoint Extension',
  args: {
    data: data.contactPointExtension
  }
}

export const HumanNameExtension: Story = {
  name: 'HumanName Extension',
  args: {
    data: data.humanNameExtension
  }
}

export const IdentifierExtension: Story = {
  name: 'Identifier Extension',
  args: {
    data: data.identifierExtension
  }
}

export const InstantExtension: Story = {
  name: 'Instant Extension',
  args: {
    data: data.instantExtension
  }
}

export const IntegerExtension: Story = {
  name: 'Integer Extension',
  args: {
    data: data.integerExtension
  }
}


export const MoneyExtension: Story = {
  name: 'Money Extension',
  args: {
    data: data.moneyExtension
  }
}

export const PeriodExtension: Story = {
  name: 'Period Extension',
  args: {
    data: data.periodExtension
  }
}

export const QuantityExtension: Story = {
  name: 'Quantity Extension',
  args: {
    data: data.quantityExtension
  }
}

export const RangeExtension: Story = {
  name: 'Range Extension',
  args: {
    data: data.rangeExtension
  }
}

export const RatioExtension: Story = {
  name: 'Ratio Extension',
  args: {
    data: data.ratioExtension
  }
}

export const ReferenceExtension: Story = {
  name: 'Reference Extension',
  args: {
    data: data.referenceExtension
  }
}

export const SampledDataExtension: Story = {
  name: 'SampledData Extension',
  args: {
    data: data.sampledDataExtension
  }
}

export const SignatureExtension: Story = {
  name: 'Signature Extension',
  args: {
    data: data.signatureExtension
  }
}


export const TimingExtension: Story = {
  name: 'Timing Extension',
  args: {
    data: data.timingExtension
  }
}
