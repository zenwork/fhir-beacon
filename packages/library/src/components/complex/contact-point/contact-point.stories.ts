import {StoryObj}                                            from '@storybook/web-components'
import {getStorybookHelpers}                                 from '@wc-toolkit/storybook-helpers'
import {html}                                                from 'lit'
import {renderTemplateInShell, ShellArgs}                    from '../../../../stories/storybook-utils'
import {ContactPointData}                                    from '../../../components/index'
import {ContactPoint, DatatypeDef}                           from '../../../DatatypeDef'
import {code}                                                from '../../../PrimitiveDef'
import {define, extend, profile, slice, StructureDefinition} from '../../../profiling/index'
import {DisplayMode}                                         from '../../../shell'
import {data}                                                from './contact-point.story.data'



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
    data: {
      meta: {
        profile: ['http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-contactpoint-ech-46-phone']
      },
      ...data,
      extension: [
        {
          url: 'http://hl7.org/fhir/StructureDefinition/iso21090-TEL-address',
          valueUri: 'tel:+15556755745'
        }
      ],
      '_use': {
        extension: [
          {
            url: 'http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-ech-46-phonecategory',
            valueCodeableConcept: {
              coding: [{ code: 'email' }]
            }
          }
        ]
      }
    },
    profile: profile({
                       type: new DatatypeDef('ContactPoint', 'CHCoreContactPointECH46Phone'),
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
                          ['phone']
                        ),
                        extend.primitive<ContactPointData>(
                          'use',
                          'redundant-url',
                          [
                            {
                              key: 'phoneCategory',
                              url: 'https://fhir.ch/ig/ch-core/5.0.0/StructureDefinition-ch-ext-ech-46-phonecategory.html',
                              valueType: 'CodeableConcept',
                              bindings: [
                                { value: '1', display: 'PrivatePhone' },
                                { value: '2', display: 'PrivateMobile' },
                                { value: '3', display: 'PrivateFax' },
                                { value: '4', display: 'PrivateInternetVoice' },
                                { value: '5', display: 'BusinessCentral' },
                                { value: '6', display: 'BusinessDirect' },
                                { value: '7', display: 'BusinessMobile' },
                                { value: '8', display: 'BusinessFax' },
                                { value: '9', display: 'BusinessInternetVoice' },
                                { value: '10', display: 'Pager' }
                              ]
                            }
                          ])
                              .extendRender(DisplayMode.display,
                                            (_config, data) =>
                                              ([
                                                html`
                                                    <fhir-extension key="_use"
                                                                    label="_use"
                                                                    .data=${(data as any)._use.extension[0]}
                                                    ></fhir-extension>`
                                              ]))
                              .extendRender(DisplayMode.structure,
                                            (_config, data) =>
                                              ([
                                                html`
                                                    <fhir-extension key="_use"
                                                                    label="_use"
                                                                    .data=${(data as any)._use.extension[0]}
                                                    ></fhir-extension>`
                                              ]))
                      ]
                    }),
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: true,
    useProfile: true
  }
}
