import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import {Primitive}      from '../../../src/components/primitive/primitive'
import '../../../src/components/primitive/primitive'
import '../../../node_modules/@shoelace-style/shoelace/dist/shoelace.js'

const meta = {
  title: 'Toolkit/Primitive Elements/Value Element'
} satisfies Meta<typeof Primitive>

export default meta
type Story = StoryObj;

export const ValueElement: Story = {
  render: () => html`
    <h2 >Value</h2 >
    <fhir-wrapper >
      <h3 >typical</h3 >
      <fhir-value text="John Smith"></fhir-value >
      <h3 >link</h3 >
      <fhir-value text="John Smith" link="http://foo.com/patient/1234"></fhir-value >
      <h3 >long value</h3 >
      <fhir-value text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida."></fhir-value >
      <h3 >fixed-width variant on long value</h3 >
      <fhir-value text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida." variant="fixed-width"></fhir-value >
      <h3 >hide overflow variant on long value</h3 >
      <fhir-value text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida." variant="hide-overflow"></fhir-value >
    </fhir-wrapper >
  `
}
