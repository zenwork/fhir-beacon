import {StoryObj}                                    from '@storybook/web-components'
import {getStorybookHelpers}                         from '@wc-toolkit/storybook-helpers'
import {html}                                        from 'lit'
import {renderTemplateInShell, ShellArgs}            from '../../../../stories/storybook-utils'
import {ContactPointData}                            from '../../../components/index'
import {ContactPoint, DatatypeDef}                   from '../../../DatatypeDef'
import {code}                                        from '../../../PrimitiveDef'
import {define, profile, slice, StructureDefinition} from '../../../profiling/index'
import {data}                                        from './contact-point.story.data'



const { events, args, argTypes, template } = getStorybookHelpers('fhir-contact-point')



const path = 'Components/Datatypes/Complex Type/Contact Point'
const elementName = 'fhir-contact-point'

const meta = {
  title: path,
  component: elementName,
  ...renderTemplateInShell((args: ShellArgs) =>
                             html`
                                 <fhir-contact-point .data=${args.data}
                                                     .profile=${args.useProfile ? args.profile : undefined}
                                                     summary
                                                     ?headless=${args.headless}
                                                     ?showerror=${args.showerror}
                                                     ?verbose=${args.verbose}
                                                     ?open=${args.open}
                                 ></fhir-contact-point>`
  )
}

export default meta
type Story = StoryObj;

export const Display: Story = {
  args: {
    data,
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true,
    headless: true
  }
}

export const Structure: Story = {
  args: {
    data,
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: true
  }
}

const base: StructureDefinition<ContactPointData> = profile({
                                                             type: ContactPoint,
                                                             props: [
                                                               define.oneOf('system', code).optional()
                                                             ]
                                                           })

export const Profile: Story = {
  args: {
    data,
    profile: profile({
                      type: new DatatypeDef('ContactPoint', 'CHCoreContactPointECH46Email'),
                      base,
                      props: [
                        slice.constraint(
                          ['system'],
                          [
                            (data: ContactPointData, fixedValue: string) => ({
                              success: data.system === fixedValue,
                              message: `Must be fixed value:${fixedValue}`
                            })
                          ],
                          ['email']
                        ),
                        /*extend.withSimple('use',
                         profile(
                         {
                         type: Extension,
                         props: [
                         define.oneOf('valueCodeableConcept', CodeableConcept)
                         .boundBy({
                         system: 'http://fhir.ch/ig/ch-core/ValueSet/ech-46-emailcategory',
                         id: 'ECH46EmailCategory',
                         name: 'eCH-0046 Email Category',
                         type: 'ValueSet',
                         valid: true,
                         choices: [{ value: '1', display: 'private' }, { value: '2', display: 'business' }]
                         }, BindingStrength.Extensible)
                         ]
                         }
                         )
                         )*/
                      ]
                    }),
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: true,
    useProfile: true
  }
}
