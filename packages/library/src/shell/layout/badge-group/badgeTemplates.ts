import {html, TemplateResult} from 'lit'



export enum BadgeType {resource, summary, constraint, required}

export function badgeTemplates(badges: { type: BadgeType, label: string }[]): TemplateResult[] {
  if (badges) {
    return badges.map(b => {
      switch (b.type) {
        case BadgeType.resource:
          return html`
              <sl-badge pill>${b.label}</sl-badge>`
        case BadgeType.summary:
          return html`
              <sl-badge pill style="--badge-border:var(--sl-color-blue-200);--badge-color:var(--sl-color-blue-300)">
                  ${b.label}
              </sl-badge>`
        case BadgeType.required:
          return html`
              <sl-badge pill
                        style="--badge-border:var(--sl-color-fuchsia-200);--badge-color:var(--sl-color-fuchsia-300)"
              >
                  ${b.label}
              </sl-badge>`
        case BadgeType.constraint:
          return html`
              <sl-badge pill style="--badge-border:var(--sl-color-red-200);--badge-color:var(--sl-color-red-300)">
                  ${b.label}
              </sl-badge>`
        default:
          throw new Error('unknown badge:' + b.type)
      }
    })
  }
  // console.log(new Error().stack)
  return [html``]
}
