import {StoryObj} from '@storybook/web-components'
import '../../../../src/resources/Medication'
import '../../../../src/resources/Substance'
import '../../../../src/index'

let title = 'System/Resource Components/Medication/Substance'
let component = 'fhir-substance'
let data = {
  resourceType: 'Substance',
  id: 'f205',
  text: {
    status: 'generated',
    div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Substance</b><a name="f205"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Substance &quot;f205&quot; </p></div><p><b>instance</b>: false</p><p><b>category</b>: Drug or Medicament <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.1.0/CodeSystem-substance-category.html">Substance Category Codes</a>#drug)</span></p><h3>Codes</h3><table class="grid"><tr><td>-</td><td><b>Concept</b></td></tr><tr><td>*</td><td>Amoxicillin + clavulanate potassium 875mg/125mg tablet (product) <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#392259005)</span></td></tr></table><p><b>description</b>: Augmentin 875</p><blockquote><p><b>ingredient</b></p><p><b>quantity</b>: 875 mg<span style="background: LightGoldenRodYellow"> (Details: UCUM code mg = \'mg\')</span>/1000 mg<span style="background: LightGoldenRodYellow"> (Details: UCUM code mg = \'mg\')</span></p><p><b>substance</b>: <a name="ingr1"> </a></p><blockquote><p/><p><a name="ingr1"> </a></p><p><b>instance</b>: false</p><h3>Codes</h3><table class="grid"><tr><td>-</td><td><b>Concept</b></td></tr><tr><td>*</td><td>Amoxicillin (substance) <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#372687004)</span></td></tr></table></blockquote></blockquote><blockquote><p><b>ingredient</b></p><p><b>quantity</b>: 125 mg<span style="background: LightGoldenRodYellow"> (Details: UCUM code mg = \'mg\')</span>/1000 mg<span style="background: LightGoldenRodYellow"> (Details: UCUM code mg = \'mg\')</span></p><p><b>substance</b>: <a name="ingr2"> </a></p><blockquote><p/><p><a name="ingr2"> </a></p><p><b>instance</b>: false</p><h3>Codes</h3><table class="grid"><tr><td>-</td><td><b>Concept</b></td></tr><tr><td>*</td><td>Clavulanate potassium (substance) <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#395938000)</span></td></tr></table></blockquote></blockquote></div>'
  },
  contained: [
    {
      resourceType: 'Substance',
      id: 'ingr1',
      instance: false,
      code: {
        concept: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '372687004',
              display: 'Amoxicillin (substance)'
            }
          ]
        }
      }
    },
    {
      resourceType: 'Substance',
      id: 'ingr2',
      instance: false,
      code: {
        concept: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '395938000',
              display: 'Clavulanate potassium (substance)'
            }
          ]
        }
      }
    }
  ],
  instance: false,
  category: [
    {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/substance-category',
          code: 'drug',
          display: 'Drug or Medicament'
        }
      ]
    }
  ],
  code: {
    concept: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '392259005',
          display: 'Amoxicillin + clavulanate potassium 875mg/125mg tablet (product)'
        }
      ]
    }
  },
  description: 'Augmentin 875',
  ingredient: [
    {
      quantity: {
        numerator: {
          value: 875,
          unit: 'mg',
          system: 'http://unitsofmeasure.org',
          code: 'mg'
        },
        denominator: {
          value: 1000,
          unit: 'mg',
          system: 'http://unitsofmeasure.org',
          code: 'mg'
        }
      },
      substanceReference: {
        reference: '#ingr1'
      }
    },
    {
      quantity: {
        numerator: {
          value: 125,
          unit: 'mg',
          system: 'http://unitsofmeasure.org',
          code: 'mg'
        },
        denominator: {
          value: 1000,
          unit: 'mg',
          system: 'http://unitsofmeasure.org',
          code: 'mg'
        }
      },
      substanceReference: {
        reference: '#ingr2'
      }
    }
  ]
}

const meta = {
  title,
  component,
  argTypes: {
    mode: {
      options: ['display', 'structure', 'combined'],
      control: {type: 'radio'}
    },
    showerror: {
      options: [true, false],
      control: {type: 'radio'}
    },
    verbose: {
      options: [true, false],
      control: {type: 'radio'}
    }
  }

}
export default meta

type Story = StoryObj;

export const Display: Story = {
  args: {
    data,
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  }
}

export const Structure: Story = {
  args: {
    data,
    mode: 'structure',
    showerror: true,
    verbose: false,
    open: true
  }
}


export const Narrative: Story = {
  args: {
    data,
    mode: 'narrative',
    showerror: false,
    verbose: false,
    open: true
  }
}
