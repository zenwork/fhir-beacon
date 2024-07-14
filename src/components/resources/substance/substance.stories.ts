import {StoryObj} from '@storybook/web-components'
import '../../../index'

const title = 'Components/Resources/Medication/Substance'
const component = 'fhir-substance'
const data = {
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

const data_f204 = {
  resourceType: 'Substance',
  id: 'f204',
  text: {
    status: 'generated',
    div: '\u003cdiv xmlns\u003d"http://www.w3.org/1999/xhtml"\u003e\u003cp\u003e\u003cb\u003eGenerated Narrative: Substance\u003c/b\u003e\u003ca name\u003d"f204"\u003e \u003c/a\u003e\u003c/p\u003e\u003cdiv style\u003d"display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"\u003e\u003cp style\u003d"margin-bottom: 0px"\u003eResource Substance \u0026quot;f204\u0026quot; \u003c/p\u003e\u003c/div\u003e\u003cp\u003e\u003cb\u003eidentifier\u003c/b\u003e: id: AB94687\u003c/p\u003e\u003cp\u003e\u003cb\u003einstance\u003c/b\u003e: true\u003c/p\u003e\u003cp\u003e\u003cb\u003ecategory\u003c/b\u003e: Chemical \u003cspan style\u003d"background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"\u003e (\u003ca href\u003d"http://terminology.hl7.org/5.1.0/CodeSystem-substance-category.html"\u003eSubstance Category Codes\u003c/a\u003e#chemical)\u003c/span\u003e\u003c/p\u003e\u003ch3\u003eCodes\u003c/h3\u003e\u003ctable class\u003d"grid"\u003e\u003ctr\u003e\u003ctd\u003e-\u003c/td\u003e\u003ctd\u003e\u003cb\u003eConcept\u003c/b\u003e\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003e*\u003c/td\u003e\u003ctd\u003eSilver nitrate 20% solution (product) \u003cspan style\u003d"background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"\u003e (\u003ca href\u003d"https://browser.ihtsdotools.org/"\u003eSNOMED CT\u003c/a\u003e#333346007)\u003c/span\u003e\u003c/td\u003e\u003c/tr\u003e\u003c/table\u003e\u003cp\u003e\u003cb\u003edescription\u003c/b\u003e: Solution for silver nitrate stain\u003c/p\u003e\u003cp\u003e\u003cb\u003eexpiry\u003c/b\u003e: 2018-01-01\u003c/p\u003e\u003cp\u003e\u003cb\u003equantity\u003c/b\u003e: 100 mL\u003cspan style\u003d"background: LightGoldenRodYellow"\u003e (Details: UCUM code mL \u003d \u0027mL\u0027)\u003c/span\u003e\u003c/p\u003e\u003c/div\u003e'

  },
  identifier: [{system: 'http://acme.org/identifiers/substances/lot', value: 'AB94687'}],
  instance: true,
  category: [
    {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/substance-category',
          code: 'chemical',
          display: 'Chemical'
        }
      ]
    }
  ],
  code: {
    concept: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '333346007',
          display: 'Silver nitrate 20% solution (product)'
        }
      ]
    }
  },
  description: 'Solution for silver nitrate stain',
  expiry: '2018-01-01',
  quantity: {value: 100, unit: 'mL', system: 'http://unitsofmeasure.org', code: 'mL'},
  meta: {
    tag: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/v3-ActReason',
        code: 'HTEST',
        display: 'test health data'
      }
    ]
  }
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

export const Display_f204: Story = {
  args: {
    data: data_f204,
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  }
}

export const Structure_f204: Story = {
  args: {
    data: data_f204,
    mode: 'structure',
    showerror: true,
    verbose: false,
    open: true
  }
}

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
