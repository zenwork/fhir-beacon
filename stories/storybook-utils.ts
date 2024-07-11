import {Meta, StoryObj} from '@storybook/web-components'
import {TemplateResult} from 'lit'
import {ShellArgs}      from './wrapInShell'

export const createMeta = (): Meta => {

  return {
    argTypes: {
      mode: { options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'], control: { type: 'inline-radio' } },
      verbose: { options: [false, true], control: { type: 'boolean' } },
      showerror: { options: [false, true], control: { type: 'boolean' } },
      open: { options: [false, true], control: { type: 'boolean' } }
    }
  } as Meta

}

export const createShellMeta = (component: (args: ShellArgs) => TemplateResult): Meta<ShellArgs> => {

  return {
    component: 'fhir-shell',
    argTypes: {
      mode: { options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'], control: { type: 'inline-radio' } },
      verbose: { options: [false, true], control: { type: 'boolean' } },
      showerror: { options: [false, true], control: { type: 'boolean' } },
      open: { options: [false, true], control: { type: 'boolean' } }
    },
    render: (args: ShellArgs) => component(args)

  } as Meta<ShellArgs>

}


export const getDisplay = (): StoryObj => {
  return {
    args: {
      mode: 'display',
      showerror: false,
      verbose: false,
      open: true
    }
  }
}
