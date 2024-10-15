import {ArgTypes, Meta}       from '@storybook/web-components'
import {html, TemplateResult} from 'lit'
import {ifDefined}            from 'lit-html/directives/if-defined.js'

export type ShellArgs = {
  data: object,
  mode?: string,
  verbose?: boolean,
  showerror?: boolean,
  open?: boolean,
  summaryonly?: boolean
  headless?: boolean,
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
const argTypes: Partial<ArgTypes<ShellArgs>> = {
  data: {
    table: {
      disable: true
    }
  },
  mode: {
    description: 'display mode',
    options: ['display', 'structure', 'debug'],
    control: { type: 'inline-radio' },
    defaultValue: 'display',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'display' }
    }
  },
  verbose: {
    description: 'show all properties defined in FHIR specification',
    options: [false, true],
    control: { type: 'boolean' },
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      // @ts-ignore
      defaultValue: { summary: false }
    }
  },
  summaryonly: {
    description: 'show properties marked as summary in the FHIR specification',
    options: [false, true],
    control: { type: 'boolean' },
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      // @ts-ignore
      defaultValue: { summary: false }
    }
  },
  open: {
    description: 'display collapsable structures as open',
    options: [false, true], control: { type: 'boolean' },
    defaultValue: false,
    if: { arg: 'mode', eq: 'structure' },
    table: {
      type: { summary: 'boolean' },
      // @ts-ignore
      defaultValue: { summary: false }
    }
  },
  showerror: {
    description: 'display detailed error messages',
    options: [false, true], control: { type: 'boolean' },
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      // @ts-ignore
      defaultValue: { summary: false }
    }
  },
  headless: {
    description: 'do not display the element header',
    options: [false, true], control: { type: 'boolean' },
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      // @ts-ignore
      defaultValue: { summary: false }
    }
  }
}


export function wrapInShell(fn: (args: ShellArgs) => TemplateResult) {

  return (args: ShellArgs) => {
    return html`
        <fhir-shell
                .mode=${ifDefined(args.mode)}
                ?showerror=${args.showerror}
                ?verbose=${args.verbose}
                ?open=${args.open ?? true}
                ?summaryonly=${args.summaryonly}
        >
            ${fn(args)}
        </fhir-shell >`
  }
}

export const argtypes = (): Meta => {
  return {
    argTypes
  }

}
export const renderTemplate = (component: (args: ShellArgs) => TemplateResult): Meta<ShellArgs> => {
  return {
    argTypes,
    render: (args: ShellArgs) => component(args)
  }
}


export const renderTemplateInShell = (component: (args: ShellArgs) => TemplateResult): Meta<ShellArgs> => {
  return {
    component: 'fhir-shell',
    argTypes,
    render: wrapInShell(component)
  }
}
