import {StoryObj} from '@storybook/web-components'
import {argtypes} from '../../../../stories/storybook-utils'
import {data}     from './observation.story.data'



const path = 'Components/Resources/Observation/Observation'
const elementName = 'fhir-observation'

const meta = {
  title: path,
  component: elementName,
  ...argtypes()
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
    verbose: true,
    open: false,
    headless: true
  }
}

export const WithErrors: Story = {
  args: {
    data: {
      ...data,
      status: 'not found',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/observation-category',
              code: 'vital-signss',
              display: 'Vital Signs'
            }
          ]
        }
      ],
      dataAbsentReason: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/data-absent-reason',
            code: 'null',
            display: 'null'
          }
        ],
        text: 'null'
      }
    },
    showerror: true,
    verbose: true,
    open: true,
    headless: true
  }
}
