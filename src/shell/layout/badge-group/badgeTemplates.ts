import {html, TemplateResult} from 'lit'

export enum BadgeType {resource, summary, constraint}

export function badgeTemplates(badges: { type: BadgeType, label: string }[]): TemplateResult[] {
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
      case BadgeType.constraint:
        return html`
            <sl-badge pill style="--badge-border:var(--sl-color-red-200);--badge-color:var(--sl-color-red-300)">
                ${b.label}
            </sl-badge>`

    }
  })
}
