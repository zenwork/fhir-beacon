import {Meta, StoryObj} from '@storybook/web-components'
import '../../src'
import {html}           from 'lit'
import {ShellArgs}      from '../../stories/wrapInShell'
import '../../demo-code/customisation/custom-components/custom-lit-element'
import '../../demo-code/customisation/custom-components/custom-element.js'


let path = 'Toolkit/Customisation/Custom Element'
let data = {
  resourceType: 'Medication',
  id: 'med0308',
  text: {
    status: 'generated',
    div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Medication</b><a name="med0308"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Medication &quot;med0308&quot; </p></div><p><b>code</b>: Percocet tablet <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.1.0/CodeSystem-v3-ndc.html">National drug codes</a>#63481-623-70)</span></p><p><b>marketingAuthorizationHolder</b>: <a name="mmanu"> </a></p><blockquote><p/><p><a name="mmanu"> </a></p><p><b>name</b>: Medication Manufacturer</p></blockquote><p><b>doseForm</b>: Tablet dose form (qualifier value) <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#385055001)</span></p><blockquote><p><b>ingredient</b></p><h3>Items</h3><table class="grid"><tr><td>-</td><td><b>Concept</b></td></tr><tr><td>*</td><td>Oxycodone HCl <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.1.0/CodeSystem-v3-rxNorm.html">RxNorm</a>#82063)</span></td></tr></table><p><b>strength</b>: 5 mg<span style="background: LightGoldenRodYellow"> (Details: UCUM code mg = \'mg\')</span>/1(unit TAB from http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm)<span style="background: LightGoldenRodYellow"> (Details: http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm code TAB = \'Tablet\')</span></p></blockquote><blockquote><p><b>ingredient</b></p><h3>Items</h3><table class="grid"><tr><td>-</td><td><b>Concept</b></td></tr><tr><td>*</td><td>Acetaminophen <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.1.0/CodeSystem-v3-rxNorm.html">RxNorm</a>#161)</span></td></tr></table><p><b>strength</b>: 325 mg<span style="background: LightGoldenRodYellow"> (Details: UCUM code mg = \'mg\')</span>/1(unit TAB from http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm)<span style="background: LightGoldenRodYellow"> (Details: http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm code TAB = \'Tablet\')</span></p></blockquote><h3>Batches</h3><table class="grid"><tr><td>-</td><td><b>LotNumber</b></td><td><b>ExpirationDate</b></td></tr><tr><td>*</td><td>658484</td><td>2020-07-31</td></tr></table></div>'
  },
  contained: [
    {
      resourceType: 'Organization',
      id: 'mmanu',
      name: 'ACME Pharma'
    }
  ],
  code: {
    coding: [
      {
        system: 'http://hl7.org/fhir/sid/ndc',
        code: '63481-623-70',
        display: 'Percocet tablet'
      }
    ]
  },
  marketingAuthorizationHolder: {
    reference: '#mmanu'
  },
  doseForm: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '385055001',
        display: 'Tablet dose form (qualifier value)'
      }
    ]
  },
  ingredient: [
    {
      item: {
        concept: {
          coding: [
            {
              system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
              code: '82063',
              display: 'Oxycodone HCl'
            }
          ]
        }
      },
      strengthRatio: {
        numerator: {
          value: 5,
          system: 'http://unitsofmeasure.org',
          code: 'mg'
        },
        denominator: {
          value: 1,
          system: 'http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm',
          code: 'TAB'
        }
      }
    },
    {
      item: {
        concept: {
          coding: [
            {
              system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
              code: '161',
              display: 'Acetaminophen'
            }
          ]
        }
      },
      strengthRatio: {
        numerator: {
          value: 325,
          system: 'http://unitsofmeasure.org',
          code: 'mg'
        },
        denominator: {
          value: 1,
          system: 'http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm',
          code: 'TAB'
        }
      }
    }
  ],
  batch: {
    lotNumber: '658484',
    expirationDate: '2020-07-31'
  }
}


const meta: Meta<ShellArgs> = {
  title: path,
  component: 'fhir-shell',
  subcomponents: { 'fhir-medication': 'fhir-medication' },
  argTypes: {},
  render: ({
             data,
             mode: mode = 'display',
             verbose: verbose = false,
             showerror: showerror = false,
             open: open = false,
             summary: summary = true
           }: ShellArgs) =>
    html`
      <!-- Theming change -->
      <style >
        :root {
          --sl-color-primary-700: var(--sl-color-purple-700);
        }
      </style >

      <fhir-shell >
        <!-- tell the component the name of the template that should be used-->
        <fhir-medication .data=${data} override-template="med">
          <!-- define the med template that will override the components default display. -->
          <!-- templates are a web standard that allow defining a template  -->
          <template id="med">
            <!-- styles defined here will me loaded into the shadow DOM and -->
            <style >
              h4 {
                color: var(--sl-color-primary-700);
                display: flex;
                align-items: center;
                column-gap: 0.5rem
              }

              .footer {
                color: var(--sl-color-primary-700)
              }

              sl-icon {
                font-size: 1.5rem;
                color: var(--sl-color-primary-700)
              }
            </style >
            <h3 >Medication Card</h3 >
            <sl-card class="card-header">
              <h4 slot="header">
                <sl-icon name="capsule-pill"></sl-icon >
                <fhir-primitive value-path="$.code.coding[0].display"></fhir-primitive >
              </h4 >
              <fhir-codeable-concept label="dose" data-path="$.doseForm"></fhir-codeable-concept >
              <fhir-primitive label="lot" value-path="$.batch.lotNumber"></fhir-primitive >
              <div class='footer' slot="footer">
                <custom-lit-element label="manufacturer" data-path="$.contained[0].name"></custom-lit-element >
                <custom-element ></custom-element >
              </div >
            </sl-card >
          </template >
        </fhir-medication >
      </fhir-shell >
    `
}

export default meta
type Story = StoryObj<ShellArgs>;


export const Display: Story = {
  args: {
    data
  }
}
