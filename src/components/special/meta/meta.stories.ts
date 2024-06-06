import {StoryObj} from '@storybook/web-components'
import '../../../../src/index'
import {html}     from 'lit'

type CustomArgs = { data: {}, mode?: string, verbose?: boolean, showerror?: boolean, open?: boolean };

const meta = {
  title: 'Components/Datatypes/Special Type/Meta',
  component: 'fhir-meta',
  argTypes: {
    mode: { options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'], control: { type: 'inline-radio' } },
    verbose: { options: [false, true], control: { type: 'boolean' } },
    showerror: { options: [false, true], control: { type: 'boolean' } },
    open: { options: [false, true], control: { type: 'boolean' } }
  },
  render: ({data, mode: mode = 'display', verbose: verbose = false, showerror: showerror = false, open: open = false}: CustomArgs) =>
    html`
      <fhir-shell .mode=${mode} .verbose=${verbose} .showerror=${showerror} .open=${open}>
        <fhir-meta .data=${data} summary></fhir-meta >
      </fhir-shell >
    `

}

export default meta
type Story = StoryObj;


const data = {
  tag: [
    {
      system: 'http://terminology.hl7.org/CodeSystem/v3-ActReason',
      code: 'HTEST',
      display: 'test health data'
    }
  ]
}

const data2 = {
  versionId: '1',
  lastUpdated: '2014-08-18T01:43:30Z',
  security: [
    {system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode', code: 'TBOO', display: 'taboo'}
  ],
  tag: [
    {
      system: 'http://terminology.hl7.org/CodeSystem/v3-ActReason',
      code: 'HTEST',
      display: 'test health data'
    }
  ]
}

const data3 = {versionId: '1', lastUpdated: '2019-08-07T10:49:22Z'}

const data4 = {
  lastUpdated: '2014-08-18T01:43:30Z',
  tag: [
    {
      system: 'http://terminology.hl7.org/CodeSystem/v3-ActReason',
      code: 'HTEST',
      display: 'test health data'
    }
  ]
}

export const Display: Story = {
  args: {
    data: data2,
    mode: 'display',
    showerror: true,
    verbose: false,
    open: true
  }
}

export const Structure: Story = {
  args: {
    data: data2,
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: true
  }
}

export const Data: Story = {
  args: {
    data: data,
    mode: 'display',
    showerror: true,
    verbose: false,
    open: true
  }
}

export const Data3: Story = {
  args: {
    data: data3,
    mode: 'display',
    showerror: true,
    verbose: false,
    open: true
  }
}

export const Data4: Story = {
  args: {
    data: data4,
    mode: 'display',
    showerror: true,
    verbose: false,
    open: true
  }
}
