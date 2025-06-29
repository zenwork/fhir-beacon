import {StoryObj}                 from '@storybook/web-components'
import {getStorybookHelpers}      from '@wc-toolkit/storybook-helpers'
import {html}                     from 'lit'
import {Story}                    from '../../../../../../../../../../Library/Caches/deno/npm/registry.npmjs.org/@storybook/blocks/8.5.0'
import {DisplayMode}              from '../../../../shell'
import {Primitive, PrimitiveType} from '../../../primitive'
import * as data                  from '../extension-reference.story.data'

// Register the custom element if it hasn't been registered yet
customElements.get('fhir-primitive') || customElements.define('fhir-primitive', Primitive)
const { events, args, argTypes, template } = getStorybookHelpers('fhir-primitive')


function renderPrimitiveWithExtenstion(): any {
  return {
    render: (a: Primitive & typeof args) => html`
      <fhir-primitive 
        label="birth date" 
        .value=${a.value} 
        .type=${a.type}
        .extension=${a.extension} 
        .errormessage=${a.errormessage}
        .mode=${a.mode}
      ></fhir-primitive>
  `
  }
}


const meta = {
  title: 'Components/Datatypes/Special Type/Extension/Reference/Primitive/Example',
  component: 'fhir-primitive',
  argTypes,
  args,
  ...renderPrimitiveWithExtenstion(),
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
