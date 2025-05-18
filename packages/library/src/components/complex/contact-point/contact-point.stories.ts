import {StoryObj}                                            from '@storybook/web-components'
import {getStorybookHelpers}                                 from '@wc-toolkit/storybook-helpers'
import {html}                                                from 'lit'
import {renderTemplateInShell, ShellArgs}                    from '../../../../stories/storybook-utils'
import {ContactPointData}                                    from '../../../components/index'
import {ContactPoint, DatatypeDef}                           from '../../../DatatypeDef'
import {code}                                                from '../../../PrimitiveDef'
import {define, extend, profile, slice, StructureDefinition} from '../../../profiling/index'
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
      ...data,
      '_use': {
        extension: [
          {
            url: 'https://fhir.ch/ig/ch-core/StructureDefinition-ch-ext-ech-46-emailcategory.html',
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
                          'https://fhir.ch/ig/ch-core/StructureDefinition-ch-ext-ech-46-emailcategory.html',
                          [
                            {
                              url: 'https://fhir.ch/ig/ch-core/StructureDefinition-ch-ext-ech-46-emailcategory.html',
                              valueType: 'CodeableConcept'
                            }
                          ])
                      ]
                    }),
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: true,
    useProfile: true
  }
}
