import {StoryObj} from '@storybook/web-components'

const meta = {
  title: 'Components/Datatypes/Special Type/Narrative',
  component: 'fhir-narrative',
  argTypes: {
    mode: {
      options: ['display', 'structure', 'combined'],
      control: {type: 'radio'},
    },
    verbose: {
      options: [true, false],
      control: {type: 'radio'},
    },
    open: {
      options: [true, false],
      control: {type: 'radio'}
    }
  }
}

export default meta
type Story = StoryObj;

const narativeData = {
  status: 'generated',
  div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Medication</b><a name="med0310"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Medication &quot;med0310&quot; </p></div><p><b>code</b>: Oral Form Oxycodone (product) <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#430127000)</span></p><p><b>doseForm</b>: Tablet dose form (qualifier value) <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#385055001)</span></p><blockquote><p><b>ingredient</b></p><h3>Items</h3><table class="grid"><tr><td>-</td><td><b>Reference</b></td></tr><tr><td>*</td><td><a name="sub03"> </a><blockquote><p/><p><a name="sub03"> </a></p><p><b>instance</b>: false</p><h3>Codes</h3><table class="grid"><tr><td>-</td><td><b>Concept</b></td></tr><tr><td>*</td><td>Oxycodone (substance) <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#55452001)</span></td></tr></table></blockquote></td></tr></table><p><b>strength</b>: 5 mg<span style="background: LightGoldenRodYellow"> (Details: UCUM code mg = \'mg\')</span>/1(unit TAB from http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm)<span style="background: LightGoldenRodYellow"> (Details: http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm code TAB = \'Tablet\')</span></p></blockquote></div>'
}

export const NarrativeWithoutFormatting: Story = {
  args: {
    data: narativeData,
    mode: 'display',
    showerror: false,
    verbose: false
  }
}
export const NarrativeUsingCssPartsFormatting: Story = {
  args: {
    data: narativeData,
    mode: 'display',
    showerror: false,
    id: 'formatted',
    verbose: false,
    open: false
  }

}

/*

 */
