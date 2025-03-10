import {Meta, StoryObj}                       from '@storybook/web-components'
import {html}                                 from 'lit'
import {ifDefined}                            from 'lit-html/directives/if-defined.js'
import {CodeIds}                              from '../../../../src/codes/types'
import {renderTemplateInShell, ShellArgs}     from '../../../../stories/storybook-utils'
import {decorate, Decorated, ValidationsImpl} from '../../../internal'
import {Choices}                              from '../../../valuesets/ValueSet.data'
import {CodeableConceptData}                  from './codeable-concept.data'



const meta: Meta<ShellArgs> = {
  title: 'Components/Datatypes/Complex Type/Codeable Concept',
  component: 'fhir-shell',
  subcomponents: { codeableConcept: 'fhir-codeable-concept' },
  ...renderTemplateInShell(
    (args: ShellArgs) => {
      return html`
          <fhir-codeable-concept key="codeable concept"
                                 label="codeable concept"
                                 .data=${args.data}
                                 summary
                                 ?headless=${args.headless}
          ></fhir-codeable-concept>`
    })

}

export default meta
type Story = StoryObj<ShellArgs>;

export const SimpleHeadacheCode: Story = {
  args: {
    data: {
      coding: [
        {
          system: 'http://hl7.org/fhir/sid/icd-10',
          code: 'R51'
        },
        {
          system: 'http://snomed.info/sct',
          code: '25064002',
          display: 'Headache',
          userSelected: 'true'
        }
      ],
      text: 'general headache'
    },
    headless: true
  }
}

export const Structure: Story = {
  args: {
    data: {
      coding: [
        {
          system: 'http://hl7.org/fhir/sid/icd-10',
          code: 'R51'
        },
        {
          system: 'http://snomed.info/sct',
          code: '25064002',
          display: 'Headache',
          userSelected: 'true'
        }
      ],
      text: 'general headache'
    },
    mode: 'structure',
    verbose: true,
    open: true
  }
}


export const WithError: Story = {
  args: {
    data: {
      coding: [
        {
          system: 'http://hl7.org/fhir/sid/ex-icd-10-procedures',
          code: '123000'
        }
      ]
    },
    mode: 'display',
    showerror: true,
    open: true
  },
  render: (args: ShellArgs) => {

    const [validations, concept, _choices] = prepare(args.data as CodeableConceptData, 'cs-icd-10-procedures')

    return html`
        <fhir-shell
                .mode=${ifDefined(args.mode)}
                ?showerror=${args.showerror}
                ?verbose=${args.verbose}
                ?open=${args.open ?? true}
                ?summaryonly=${args.summaryonly}
                ?input=${args.input}
        >
            <fhir-codeable-concept label="codeable concept with binding on 'cs-icd-10-procedures'"
                                   key="procedure"
                                   .data=${concept}
                                   summary
                                   ?headless=${args.headless}
                                   .errors=${validations.sliceForFQK({ path: [{ node: '_root' }] })}
            ></fhir-codeable-concept>
        </fhir-shell>

    `
  }
}

function prepare(data: CodeableConceptData, bindingId: CodeIds):
  [ValidationsImpl<CodeableConceptData>, Decorated<CodeableConceptData>, Choices] {

  const concept: Decorated<CodeableConceptData> = decorate('_root', data, undefined)
  const validations = new ValidationsImpl(concept)
  validations.inspectCodeableConcept({ node: '_root', concept: concept, bindingId: bindingId })
  return [validations, concept, validations.choices(bindingId)]

}
