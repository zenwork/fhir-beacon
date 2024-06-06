import {Meta, StoryObj} from '@storybook/web-components'
import '../../../../src/index'
import {html}           from 'lit'
import {ShellArgs}      from '../../../../stories/wrapInShell'

const meta: Meta<ShellArgs> = {
  title: 'Components/Resources/Medication/Medication',
  component: 'fhir-medication',
  argTypes: {
    mode: {
      options: ['display', 'display_summary', 'structure', 'structure_summary', 'narrative', 'debug'],
      control: {type: 'radio'},
    },
    verbose: {
      options: [true, false],
      control: {type: 'boolean'}
    },
    showerror: {
      options: [true, false],
      control: {type: 'boolean'}
    },
    open: {
      options: [true, false],
      control: {type: 'boolean'}
    }
  }

}

export default meta
type Story = StoryObj<ShellArgs>;

const data_310 = {
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

const data_319 = {
  resourceType: 'Medication',
  id: 'med0319',
  text: {
    status: 'generated',
    div: '\u003cdiv xmlns\u003d"http://www.w3.org/1999/xhtml"\u003e\u003cp\u003e\u003cb\u003eGenerated Narrative: Medication\u003c/b\u003e\u003ca name\u003d"med0319"\u003e \u003c/a\u003e\u003c/p\u003e\u003cdiv style\u003d"display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"\u003e\u003cp style\u003d"margin-bottom: 0px"\u003eResource Medication \u0026quot;med0319\u0026quot; \u003c/p\u003e\u003c/div\u003e\u003cp\u003e\u003cb\u003edoseForm\u003c/b\u003e: Ointment \u003cspan style\u003d"background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"\u003e (\u003ca href\u003d"https://browser.ihtsdotools.org/"\u003eSNOMED CT\u003c/a\u003e#385101003)\u003c/span\u003e\u003c/p\u003e\u003cblockquote\u003e\u003cp\u003e\u003cb\u003eingredient\u003c/b\u003e\u003c/p\u003e\u003ch3\u003eItems\u003c/h3\u003e\u003ctable class\u003d"grid"\u003e\u003ctr\u003e\u003ctd\u003e-\u003c/td\u003e\u003ctd\u003e\u003cb\u003eConcept\u003c/b\u003e\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003e*\u003c/td\u003e\u003ctd\u003eSalicylic Acid (substance) \u003cspan style\u003d"background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"\u003e (\u003ca href\u003d"https://browser.ihtsdotools.org/"\u003eSNOMED CT\u003c/a\u003e#387253001)\u003c/span\u003e\u003c/td\u003e\u003c/tr\u003e\u003c/table\u003e\u003cp\u003e\u003cb\u003estrength\u003c/b\u003e: 5 g\u003cspan style\u003d"background: LightGoldenRodYellow"\u003e (Details: UCUM code g \u003d \u0027g\u0027)\u003c/span\u003e/100 g\u003cspan style\u003d"background: LightGoldenRodYellow"\u003e (Details: UCUM code g \u003d \u0027g\u0027)\u003c/span\u003e\u003c/p\u003e\u003c/blockquote\u003e\u003cblockquote\u003e\u003cp\u003e\u003cb\u003eingredient\u003c/b\u003e\u003c/p\u003e\u003ch3\u003eItems\u003c/h3\u003e\u003ctable class\u003d"grid"\u003e\u003ctr\u003e\u003ctd\u003e-\u003c/td\u003e\u003ctd\u003e\u003cb\u003eConcept\u003c/b\u003e\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003e*\u003c/td\u003e\u003ctd\u003eHydrocortisone (substance) \u003cspan style\u003d"background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"\u003e (\u003ca href\u003d"https://browser.ihtsdotools.org/"\u003eSNOMED CT\u003c/a\u003e#396458002)\u003c/span\u003e\u003c/td\u003e\u003c/tr\u003e\u003c/table\u003e\u003cp\u003e\u003cb\u003estrength\u003c/b\u003e: 1 g\u003cspan style\u003d"background: LightGoldenRodYellow"\u003e (Details: UCUM code g \u003d \u0027g\u0027)\u003c/span\u003e/100 g\u003cspan style\u003d"background: LightGoldenRodYellow"\u003e (Details: UCUM code g \u003d \u0027g\u0027)\u003c/span\u003e\u003c/p\u003e\u003c/blockquote\u003e\u003cblockquote\u003e\u003cp\u003e\u003cb\u003eingredient\u003c/b\u003e\u003c/p\u003e\u003ch3\u003eItems\u003c/h3\u003e\u003ctable class\u003d"grid"\u003e\u003ctr\u003e\u003ctd\u003e-\u003c/td\u003e\u003ctd\u003e\u003cb\u003eConcept\u003c/b\u003e\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003e*\u003c/td\u003e\u003ctd\u003eWhite Petrolatum (substance) \u003cspan style\u003d"background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"\u003e (\u003ca href\u003d"https://browser.ihtsdotools.org/"\u003eSNOMED CT\u003c/a\u003e#126066007)\u003c/span\u003e\u003c/td\u003e\u003c/tr\u003e\u003c/table\u003e\u003cp\u003e\u003cb\u003estrength\u003c/b\u003e: 94 g\u003cspan style\u003d"background: LightGoldenRodYellow"\u003e (Details: UCUM code g \u003d \u0027g\u0027)\u003c/span\u003e/100 g\u003cspan style\u003d"background: LightGoldenRodYellow"\u003e (Details: UCUM code g \u003d \u0027g\u0027)\u003c/span\u003e\u003c/p\u003e\u003c/blockquote\u003e\u003c/div\u003e'

  },
  doseForm: {
    coding: [{system: 'http://snomed.info/sct', code: '385101003', display: 'Ointment'}],
    text: 'Ointment'
  },
  ingredient: [
    {
      item: {
        concept: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '387253001',
              display: 'Salicylic Acid (substance)'
            }
          ]
        }
      },
      strengthRatio: {
        numerator: {value: 5, system: 'http://unitsofmeasure.org', code: 'g'},
        denominator: {value: 100, system: 'http://unitsofmeasure.org', code: 'g'}
      }
    },
    {
      item: {
        concept: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '396458002',
              display: 'Hydrocortisone (substance)'
            }
          ]
        }
      },
      strengthRatio: {
        numerator: {value: 1, system: 'http://unitsofmeasure.org', code: 'g'},
        denominator: {value: 100, system: 'http://unitsofmeasure.org', code: 'g'}
      }
    },
    {
      item: {
        concept: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '126066007',
              display: 'White Petrolatum (substance)'
            }
          ]
        }
      },
      strengthRatio: {
        numerator: {value: 94, system: 'http://unitsofmeasure.org', code: 'g'},
        denominator: {value: 100, system: 'http://unitsofmeasure.org', code: 'g'}
      }
    }
  ],
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
    data: data_319,
    mode: 'structure',
    showerror: true,
    verbose: false,
    open: true
  }
}

export const FrontPageDemo: Story = {
  args: {
    data: {
      resourceType: 'Medication',
      id: 'med0307',
      text: {
        status: 'generated',
        div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Medication</b><a name="med0307"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Medication &quot;med0307&quot; </p></div><p><b>code</b>: Novolog 100u/ml <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.1.0/CodeSystem-v3-ndc.html">National drug codes</a>#0169-7501-11)</span></p><p><b>marketingAuthorizationHolder</b>: <a name="mmanu"> </a></p><blockquote><p/><p><a name="mmanu"> </a></p><p><b>name</b>: Medication Manufacturer</p></blockquote><p><b>doseForm</b>: Injection solution (qualifier value) <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#385219001)</span></p><blockquote><p><b>ingredient</b></p><h3>Items</h3><table class="grid"><tr><td>-</td><td><b>Concept</b></td></tr><tr><td>*</td><td>Insulin Aspart (substance) <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#325072002)</span></td></tr></table><p><b>strength</b>: 100 U<span style="background: LightGoldenRodYellow"> (Details: UCUM code U = \'U\')</span>/1 mL<span style="background: LightGoldenRodYellow"> (Details: UCUM code mL = \'mL\')</span></p></blockquote><h3>Batches</h3><table class="grid"><tr><td>-</td><td><b>LotNumber</b></td><td><b>ExpirationDate</b></td></tr><tr><td>*</td><td>12345</td><td>2019-10-31</td></tr></table></div>'
      },
      contained: [
        {
          resourceType: 'Organization',
          id: 'mmanu',
          name: 'Medication Manufacturer'
        }
      ],
      code: {
        coding: [
          {
            system: 'http://hl7.org/fhir/sid/ndc',
            code: '0169-7501-11',
            display: 'Novolog 100u/ml'
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
            code: '385219001',
            display: 'Injection solution (qualifier value)'
          }
        ]
      },
      ingredient: [
        {
          item: {
            concept: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '325072002',
                  display: 'Insulin Aspart (substance)'
                }
              ]
            }
          },
          strengthRatio: {
            numerator: {
              value: 100,
              system: 'http://unitsofmeasure.org',
              code: 'U'
            },
            denominator: {
              value: 1,
              system: 'http://unitsofmeasure.org',
              code: 'mL'
            }
          }
        }
      ],
      batch: {
        lotNumber: '12345',
        expirationDate: '2019.10-31'
      }
    },
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  },
  render: (args: ShellArgs) =>
    html`<h3 style="color:var(--sl-color-primary-900); padding: 0;margin: 0">Medication</h3>
    <fhir-medication
            .data=${args.data}
            .mode=${args.mode}
            .showerror=${args.showerror}
            .verbose=${args.verbose}
            .open=${args.open}>
    </fhir-medication>
    `

}
