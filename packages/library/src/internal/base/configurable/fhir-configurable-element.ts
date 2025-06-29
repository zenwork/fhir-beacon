import {ContextConsumer}      from '@lit/context'
import {LitElement}           from 'lit'
import {property, state}      from 'lit/decorators.js'
import {DisplayMode}          from '../../../shell/displayMode'
import {DisplayConfig}        from '../../../shell/types'
import {toDisplayMode}        from '../../../utilities'
import {displayConfigContext} from '../../contexts'




export abstract class ConfigurableElement extends LitElement {

  @state()
  private declare displayConfig: DisplayConfig

  protected constructor() {
    super()
    new ContextConsumer(this,
                        {
                          context: displayConfigContext,
                          subscribe: true,
                          callback: (config: DisplayConfig) => {
                            this.displayConfig = config

                          }
                        })
  }

  protected declare _mode: DisplayMode
  /**
   * Retrieves the current display mode.
   *
   * Setting the attribute overrides context-provided property.
   *
   * @return {DisplayMode } The current display mode, resolved using the mode property,
   *                                  displayConfig.mode, or defaulting to false if none are available.
   */
  @property({ type: DisplayMode, converter: toDisplayMode, reflect: true })
  public get mode(): DisplayMode {return this._mode ?? this.displayConfig?.mode ?? DisplayMode.display}
  public set mode(value: DisplayMode) {this._mode = toDisplayMode(value)}

  private declare _showerror: boolean
  /**
   * Determines whether error messages should be displayed.
   *
   * Setting the attribute overrides context-provided property.
   *
   * @return {boolean} Returns true if error messages should be displayed; otherwise, returns false.
   */
  @property({ type: Boolean })
  public get showerror(): boolean {return this._showerror ?? this.displayConfig?.showerror ?? false}
  public set showerror(value: boolean) {this._showerror = value}

  private declare _input: boolean
  /**
   * Display primitive as an input field.
   *
   * Setting the attribute overrides context-provided property.
   *
   * @see Shell
   * @see Resource
   */
  @property({ type: Boolean })
  public get input(): boolean {return this._input ?? this.displayConfig?.input ?? false}
  public set input(value: boolean) {this._input = value}

  private declare _verbose: boolean
  /**
   * This property determines whether verbose mode is enabled.
   *
   * Setting the attribute overrides context-provided property.
   *
   * @return {boolean} Returns `true` if verbose mode is enabled, otherwise `false`.
   */
  @property({ type: Boolean })
  public get verbose(): boolean {return this._verbose ?? this.displayConfig?.verbose ?? false}
  public set verbose(value: boolean) {this._verbose = value}

  private declare _summaryonly: boolean
  /**
   * Only display value if the priitive also has the summary attribute
   *
   * Setting the attribute overrides context-provided property.
   *
   * @return {boolean} True if summary-only mode is enabled, otherwise false.
   */
  @property({ type: Boolean })
  public get summaryonly(): boolean {return this._summaryonly ?? this.displayConfig?.summaryonly ?? false}
  public set summaryonly(value: boolean) {this._summaryonly = value}

  private declare _open: boolean
  /**
   * Display the content of the component in an open state
   *
   * Setting the attribute overrides context-provided property.
   * @return {boolean} True if set to be open, otherwise false
   */
  @property({ type: Boolean })
  public get open(): boolean {return this._open ?? this.displayConfig?.open ?? false}
  public set open(value: boolean) {this._open = value}


  /**
   * @deprecated don't use this directly. Prefer config provided by method
   * todo: make this method private
   */
  protected getDisplayConfig(): DisplayConfig {
    return {
      source: 'resource',
      open: this.open,
      verbose: this.verbose,
      mode: this.mode,
      showerror: this.showerror,
      summaryonly: this.summaryonly,
      input: this.input
    }
  }

  protected config(): DisplayConfig {
    return {
      source: 'resource',
      open: this.open,
      verbose: this.verbose,
      mode: this.mode,
      showerror: this.showerror,
      summaryonly: this.summaryonly,
      input: this.input
    }
  }


}
