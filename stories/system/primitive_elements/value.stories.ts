import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'

const meta = {
  title: 'Toolkit/Primitive Elements/Value Element'
} satisfies Meta

export default meta
type Story = StoryObj;

export const ValueElement: Story = {
  render: () => html`
    <h2 >Value</h2 >
    <fhir-wrapper >
      <h3 >simple value</h3 >
      <fhir-value text="John Smith"></fhir-value >
      <h3 >link value</h3 >
      <fhir-value text="John Smith" link="http://foo.com/patient/1234"></fhir-value >
      <h3 >placeholder value</h3 >
      <fhir-value text="" placeholder="missing value"></fhir-value >
      <h3 >prefix and suffix value</h3 >
      <fhir-value text="100">
        <span slot="before">></span >
        <span slot="after">%</span >
      </fhir-value >
      <h3 >long value value</h3 >
      <fhir-value text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida."></fhir-value >
      <h3 >fixed-width variant on long value</h3 >
      <fhir-value text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida." variant="fixed-width"></fhir-value >
      <h3 >hide overflow variant on long value</h3 >
      <fhir-value id="debug-target" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Tellus in hac habitasse platea. Posuere urna nec tincidunt praesent semper feugiat nibh. Tortor pretium viverra suspendisse potenti nullam ac tortor. Fusce id velit ut tortor pretium viverra suspendisse potenti. Enim eu turpis egestas pretium aenean pharetra. Non consectetur a erat nam at lectus. Amet est placerat in egestas erat imperdiet sed." variant="hide-overflow"></fhir-value >
    </fhir-wrapper >
  `
}
