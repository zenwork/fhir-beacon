import {StoryObj}                 from '@storybook/web-components'
import {getStorybookHelpers}      from '@wc-toolkit/storybook-helpers'
import {html}                     from 'lit'
import {ShellArgs}                from '../../../../../stories/storybook-utils'
import {DisplayMode}              from '../../../../shell'
import {Primitive, PrimitiveType} from '../../../primitive'
import * as data                  from '../extension-reference.story.data'

// Register the custom element if it hasn't been registered yet
customElements.get('fhir-primitive') || customElements.define('fhir-primitive', Primitive)
const { events, args, argTypes, template } = getStorybookHelpers('fhir-primitive')


function renderPrimitiveWithExtenstion(): any {
  return {
    render: (args: ShellArgs<{ value: any, type: any, extension: any, error: string }>) => html`
      <fhir-primitive 
        label="birth date" 
        .value=${args.data.value} 
        .type=${args.data.type}
        .extension=${args.data.extension} 
        .errormessage=${args.data.error}
        .mode=${args.mode}
      ></fhir-primitive>
  `
  }
}


const meta = {
  title: 'Components/Datatypes/Special Type/Extension/Reference/Primitive/Example',
  component: 'fhir-primitive',
  argTypes,
  args,
  render: (args: any) => template(args),
  parameters: {
    actions: {
      handles: events
    }
  }

}


export default meta
type Story = StoryObj<Primitive & typeof args>;

export const displayBirthDayExtension: Story = {
  name: 'Display',
  args: {
    key: 'birthDate',
    value: data.primitiveExtension.birthDate,
    // @ts-ignore
    extension: data.primitiveExtension._birthDate,
    type: PrimitiveType.date

  }

}

export const structureBirthDayExtension: Story = {
  name: 'Structure',
  args: {
    key: 'birthDate',
    value: data.primitiveExtension.birthDate,
    // @ts-ignore
    extension: data.primitiveExtension._birthDate,
    type: PrimitiveType.date,
    mode: DisplayMode.structure
  }

}
