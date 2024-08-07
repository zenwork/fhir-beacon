import {html, TemplateResult} from 'lit'

import {DisplayMode} from '../src/types'

export type ShellArgs = { data: object, mode?: string, verbose?: boolean, showerror?: boolean, open?: boolean, summary?: boolean };

export function wrapInShell(fn: (args: ShellArgs) => TemplateResult) {

  return (args: ShellArgs) => {
    //TODO: all these defaults should be in the elements and primitive... not here
    if (args.mode === undefined) {
      args.mode = DisplayMode.display
    }
    if (args.summary === undefined) {
      args.summary = true
    }
    if (args.verbose === undefined) {
      args.verbose = false
    }
    if (args.open === undefined) {
      args.open = true
    }
    if (args.showerror === undefined) {
      args.showerror = false
    }
    return html`
      <fhir-shell .mode=${args.mode} .showerror=${args.showerror} .verbose=${args.verbose} .open=${args.open}>
          ${fn(args)}
      </fhir-shell>`
  }
}
