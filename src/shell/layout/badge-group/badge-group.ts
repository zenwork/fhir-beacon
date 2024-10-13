import {LitElement, PropertyValues, TemplateResult} from 'lit'
import {customElement, property, state}             from 'lit/decorators.js'
import {hostStyles}                                 from '../../../styles'
import {isBlank}                                    from '../../../utilities'
import {componentStyles}                            from './badge-group-styles'
import {badgeTemplates, BadgeType}                  from './badgeTemplates'

@customElement('fhir-badge-group')
export class BadgeGroup extends LitElement {
  static styles = [hostStyles, componentStyles]

  @property({ type: String, attribute: 'badge-resource' })
  public badgeResource: string = ''

  @property({ type: Boolean, attribute: 'badge-summary' })
  public badgeSummary: boolean = false

  @property({ type: Boolean, attribute: 'badge-constraint' })
  public badgeConstraint: boolean = false

  @state()
  declare public badges: { label: string, type: BadgeType }[]


  protected willUpdate(changes: PropertyValues) {
    super.willUpdate(changes)

    if (changes.has('badgeResource') || changes.has('badgeSummary') || changes.has('badgeConstraint')) {
      this.badges = []

      if (this.badgeSummary) {
        this.badges.push({ label: '∑', type: BadgeType.summary })
      }

      if (this.badgeConstraint) {
        this.badges.push({ label: 'C', type: BadgeType.constraint })
      }

      if (!isBlank(this.badgeResource)) {
        this.badges.push({ label: this.badgeResource, type: BadgeType.resource })
      }
    }
  }

  protected render(): TemplateResult[] {
    return badgeTemplates(this.badges)
  }

}
