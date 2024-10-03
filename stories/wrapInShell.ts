import {html, TemplateResult} from 'lit'
import {ifDefined} from 'lit-html/directives/if-defined.js'


export type ShellArgs = { data: object, mode?: string, verbose?: boolean, showerror?: boolean, open?: boolean, summary?: boolean };

export function wrapInShell(fn: (args: ShellArgs) => TemplateResult) {

  return (args: ShellArgs) => {
    return html`
        <fhir-shell
                .mode=${ifDefined(args.mode)}
                ?showerror=${args.showerror}
                ?verbose=${args.verbose}
                ?open=${args.open ?? true}
        >
            ${fn(args)}
        </fhir-shell >`
  }
}
