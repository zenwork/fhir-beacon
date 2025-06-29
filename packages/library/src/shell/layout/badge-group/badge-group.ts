import {LitElement, PropertyValues, TemplateResult} from 'lit'
import {customElement, property, state}             from 'lit/decorators.js'
import {hostStyles}                                 from '../../../styles'
import {isBlank}                                    from '../../../utilities'
import {componentStyles}                            from './badge-group-styles'
import {badgeTemplates, BadgeType}                  from './badgeTemplates'



@customElement('fhir-badge-group')
export class BadgeGroup extends LitElement {
  static styles = [hostStyles, componentStyles]

  @property({ type: String })
  public resource: string = ''

  @property({ type: Boolean })
  public summary: boolean = false

  @property({ type: Boolean })
  public constraint: boolean = false

  @property({ type: Boolean })
  public required: boolean = false

  @property({ type: String })
  public profile: string = ''

  @state()
  declare public badges: { label: string, type: BadgeType }[]


  protected willUpdate(changes: PropertyValues) {
    super.willUpdate(changes)

    if (changes.has('resource')
        || changes.has('summary')
        || changes.has('constraint')
        || changes.has('required')
        || changes.has('profile')
    ) {
      this.badges = []

      if (this.summary) {
        this.badges.push({ label: '∑', type: BadgeType.summary })
      }

      if (this.constraint) {
        this.badges.push({ label: 'C', type: BadgeType.constraint })
      }

      if (this.required) {
        this.badges.push({ label: 'R', type: BadgeType.required })
      }

      if (!isBlank(this.resource)) {
        this.badges.push({ label: this.resource, type: BadgeType.resource })
      }

      if (!isBlank(this.profile)) {
        this.badges.push({ label: this.profile, type: BadgeType.profile })
      }
    }
  }

  protected render(): TemplateResult[] {
    return badgeTemplates(this.badges)
  }

}
