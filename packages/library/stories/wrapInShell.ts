import {html, TemplateResult} from 'lit'
import {ifDefined} from 'lit-html/directives/if-defined.js'
import {ShellArgs} from './storybook-utils'


/**
 *
 * @param fn
 * @deprecated
 */
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
