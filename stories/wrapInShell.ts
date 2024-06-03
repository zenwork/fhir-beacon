import {html, TemplateResult} from 'lit'

export type ShellArgs = { data: {}, mode?: string, verbose?: boolean, showerror?: boolean, open?: boolean };

export function wrapInShell(fn: (args: ShellArgs) => TemplateResult) {

  return (args: ShellArgs) => {
    return html`
      <fhir-shell .mode=${args.mode} .showerror=${args.showerror} .verbose=${args.verbose} .open=${args.open}>
          ${fn(args)}
      </fhir-shell>`
  }
}
