import {StoryObj} from '@storybook/web-components'
import '../../src/resources/Medication'

const meta = {
  title: 'Resources/Medication/Medication',
  component: 'fhir-medication',
  argTypes: {
    mode: {
      options: ['display', 'structure', 'combined'],
      control: {type: 'radio'},
    },
    verbose: {
      options: [true, false],
      control: {type: 'radio'},
    },
    showerror: {
      options: [true, false],
      control: {type: 'radio'}
    }
  }

}

export default meta
type Story = StoryObj;

let medicationData = {
  resourceType: 'Medication',
  id: 'med0310',
  text: {
    status: 'generated',
    div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Medication</b><a name="med0310"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Medication &quot;med0310&quot; </p></div><p><b>code</b>: Oral Form Oxycodone (product) <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#430127000)</span></p><p><b>doseForm</b>: Tablet dose form (qualifier value) <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#385055001)</span></p><blockquote><p><b>ingredient</b></p><h3>Items</h3><table class="grid"><tr><td>-</td><td><b>Reference</b></td></tr><tr><td>*</td><td><a name="sub03"> </a><blockquote><p/><p><a name="sub03"> </a></p><p><b>instance</b>: false</p><h3>Codes</h3><table class="grid"><tr><td>-</td><td><b>Concept</b></td></tr><tr><td>*</td><td>Oxycodone (substance) <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#55452001)</span></td></tr></table></blockquote></td></tr></table><p><b>strength</b>: 5 mg<span style="background: LightGoldenRodYellow"> (Details: UCUM code mg = \'mg\')</span>/1(unit TAB from http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm)<span style="background: LightGoldenRodYellow"> (Details: http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm code TAB = \'Tablet\')</span></p></blockquote></div>'
  },
  contained: [
    {
      resourceType: 'Substance',
      id: 'sub03',
      instance: false,
      code: {
        concept: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '55452001',
              display: 'Oxycodone (substance)'
            }
          ]
        }
      }
    }
  ],
  code: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '430127000',
        display: 'Oral Form Oxycodone (product)'
      }
    ]
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
        reference: {
          reference: '#sub03'
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
    }
  ]
}

export const Med0310Display: Story = {
  args: {
    data: medicationData,
    mode: 'display',
    showerror: true,
    verbose: false,
    open: true
  }
}

export const Med0310Structure: Story = {
  args: {
    data: medicationData,
    mode: 'structure',
    showerror: true,
    verbose: false,
    open: true
  }
}


export const Med0310Narrative: Story = {
  args: {
    data: medicationData,
    mode: 'narrative'
  }
}
