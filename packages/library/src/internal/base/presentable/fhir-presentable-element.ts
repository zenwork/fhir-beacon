/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropertyValues, TemplateResult, html, nothing } from "lit";
import { property } from "lit/decorators.js";

import { OpenType } from "../../../OpenType";
import { mustRender } from "../../../components/mustRender";
import { asReadable } from "../../../components/primitive/./type-formatters/asReadable";
import { PrimitiveType } from "../../../components/primitive/type-converters/type-converters";
import { Defs, ExtensionDef, isExtensionDef } from "../../../profiling";
import { wrap } from "../../../shell";
import { DisplayMode } from "../../../shell/displayMode";
import { hasSome } from "../../../shell/layout/directives";
import { DisplayConfig } from "../../../shell/types";
import { hostStyles } from "../../../styles";
import { hasSameAncestor, isBlank } from "../../../utilities";
import { NoDataObject } from "../Decorate";
import { Decorated } from "../Decorate.types";
import { FhirElementData, FhirExtensionData } from "../FhirElement.type";
import { Rendering } from "../Rendering";
import { Templating } from "../Templating";
import { ValidationsImpl } from "../Validations.impl";
import { Validations, meta } from "../Validations.type";
import { FhirDataElement } from "../data/fhir-data-element";
import {
	EmptyResult,
	Generators,
	NullGenerators,
	TemplateGenerator,
} from "./fhir-presentable-element.data";
import { componentStyles } from "./fhir-presentable-element.styles";

export abstract class FhirPresentableElement<D extends FhirElementData>
	extends FhirDataElement<D>
	implements Rendering<D>, Templating<D>
{
	static styles = [hostStyles, componentStyles];

	@property()
	public label: string = "";

	@property({ type: Boolean })
	public summary: boolean = false;

	@property({ type: Boolean })
	public required: boolean = false;

	@property({ type: Boolean })
	public headless: boolean = false;

	@property({ type: Object, attribute: false })
	public extensionLabels: Record<string, string> = {};

	protected templateGenerators: Generators<D> = NullGenerators();

	public mustRender(): boolean {
		return (
			mustRender(
				this.extendedData,
				this.mode,
				this.verbose,
				this.summaryonly,
				this.summary,
			) || !!this.dataPath
		);
	}

	public abstract willRender(
		displayConfig: DisplayConfig,
		extendedData: Decorated<D> | null,
		changes: PropertyValues,
	): void;

	public override() {
		return false;
	}

	public renderOverride(
		_displayConfig: DisplayConfig,
		_data: D,
		_validations: Validations,
	): TemplateResult[] {
		return EmptyResult;
	}

	public abstract renderDisplay(
		config: DisplayConfig,
		data: Decorated<D>,
		validations: Validations,
	): TemplateResult[];

	/**
	 * Override this method to provide an alternate template when rendering editable display
	 * @param config
	 * @param data
	 * @param validations
	 */
	public renderEditableDisplay(
		config: DisplayConfig,
		data: Decorated<D>,
		validations: Validations,
	): TemplateResult[] {
		return this.renderDisplay(config, data, validations);
	}

	public abstract renderNarrative(
		displayConfig: DisplayConfig,
		data: Decorated<D>,
		validations: Validations,
	): TemplateResult[];

	public abstract renderStructure(
		config: DisplayConfig,
		data: Decorated<D>,
		validations: Validations,
	): TemplateResult[];

	public abstract hasRendered(
		displayConfig: DisplayConfig,
		extendedData: Decorated<D> | null,
		haveChanged: PropertyValues,
	): void;

	protected willUpdate(changes: PropertyValues) {
		super.willUpdate(changes);
		if (this.extendedData) {
			if (this.verbose) {
				this.extendedData[meta].hide = false;
			} else if (!this.verbose && isBlank(this.data)) {
				this.extendedData[meta].hide = true;
			}

			if (this.mustRender()) {
				this.willRender(this.config(), this.extendedData, changes);
				this.templateGenerators = NullGenerators();
				this.templateGenerators.structure.header.push(this.renderBaseElement);
				if (this.override()) {
					this.templateGenerators.override.body.push(this.renderOverride);
				} else {
					if (this.mode) {
						switch (this.mode) {
							case DisplayMode.debug:
								this.templateGenerators.debug.body.push(this.renderDebug);
								break;
							case DisplayMode.display:
								if (this.input) {
									// rendering fork only if renderEditableDisplay() is overridden
									this.templateGenerators.display.body.push(
										this.renderEditableDisplay,
									);
								} else {
									this.templateGenerators.display.body.push(this.renderDisplay);
									this.templateGenerators.display.footer.push(
										this.renderExtensionElement,
									);
								}
								break;
							case DisplayMode.narrative:
								this.templateGenerators.display.body.push(this.renderNarrative);
								this.templateGenerators.display.footer.push(
									this.renderExtensionElement,
								);
								break;
							case DisplayMode.override:
								// do nothing
								break;
							case DisplayMode.structure:
								// stop rendering in verbose mode due to theoretically infinite models.
								// ex: Identifier -> Reference -> Identifier -> and so on!
								if (this.verboseRequestedAndNotAllowed()) {
									this.templateGenerators.structure.body.push(() => [
										html`
                        <fhir-not-supported
                                variant="stop"
                                label=${this.label}
                                error="If rendered, '${this.label}' would render recursively for ever due to the fhir model definition."
                        ></fhir-not-supported>`,
									]);
								} else {
									this.templateGenerators.structure.body.push(
										this.renderStructure,
									);

									const extendedRender: TemplateGenerator<D> | undefined =
										this.profile?.extendRender?.get(DisplayMode.structure);
									if (extendedRender)
										this.templateGenerators.structure.body.push(extendedRender);

									this.templateGenerators.structure.footer.push(
										this.renderExtensionElement,
									);
								}
								break;
							default:
								this.templateGenerators.error.body.push(() => [
									html`
                      <fhir-error text="Unable to render the element ${this.type} ${JSON.stringify(this.config())}"></fhir-error>`,
								]);
						}
						if (this.profile?.props) {
							Array.from(this.profile.props.entries()).forEach(
								(prop: [string, Defs<D>]) => {
									const key = prop[0];
									const def = prop[1] as ExtensionDef;
									if (key.startsWith("_")) {
										// biome-ignore lint/suspicious/noExplicitAny: <explanation>
										const generator: TemplateGenerator<any> | undefined =
											def.extendRender?.get(this.mode);
										if (generator) {
											// @ts-ignore
											this.templateGenerators[this.mode].body.push(generator);
										}
									}
								},
							);
						}
					}
				}
			}
		}
	}

	protected getLabel() {
		if (this.label) {
			return this.label;
		}

		if (this.key && this.key !== "nokey") {
			if (this.mode != DisplayMode.display) {
				return asReadable(this.key, "lower");
			} else {
				return this.key;
			}
		}

		return this.type;
	}

	protected render(): TemplateResult | TemplateResult[] {
		const templates: TemplateResult[] = [html``];
		if (this.extendedData) {
			if (!this.extendedData[meta].hide && this.data === NoDataObject) {
				// SHOW THAT WE HAVE NO DATA
				return html`
            <fhir-not-supported variant="no-data"></fhir-not-supported>`;
			}

			if (this.extendedData[meta].hide && !this.verbose) return templates;

			switch (this.mode) {
				case DisplayMode.debug:
					templates.push(
						...this.templateGenerators.debug.body
							.map((g) =>
								g.call(
									this,
									this.config(),
									this.extendedData,
									new ValidationsImpl(this.extendedData),
								),
							)
							.flat(),
					);
					break;
				case DisplayMode.display:
					if (this.headless) {
						templates.push(
							...this.templateGenerators.display.header
								.map((g) =>
									g.call(
										this,
										this.config(),
										this.extendedData,
										new ValidationsImpl(this.extendedData),
									),
								)
								.flat(),
						);
						templates.push(
							...this.templateGenerators.display.body
								.map((g) =>
									g.call(
										this,
										this.config(),
										this.extendedData,
										new ValidationsImpl(this.extendedData),
									),
								)
								.flat(),
						);
						templates.push(
							...this.templateGenerators.display.footer
								.map((g) =>
									g.call(
										this,
										this.config(),
										this.extendedData,
										new ValidationsImpl(this.extendedData),
									),
								)
								.flat(),
						);
					} else {
						templates.push(html`
                <fhir-wrapper
                        .label=${this.getLabel()}
                        ?summary=${this.summary}
                        ?summaryonly=${this.config().summaryonly}
                >

                    ${this.templateGenerators.display.header
											.map((g) =>
												g.call(
													this,
													this.config(),
													this.extendedData,
													new ValidationsImpl(this.extendedData),
												),
											)
											.flat()}

                    ${this.templateGenerators.display.body
											.map((g) =>
												g.call(
													this,
													this.config(),
													this.extendedData,
													new ValidationsImpl(this.extendedData),
												),
											)
											.flat()}

                    ${this.templateGenerators.display.footer
											.map((g) =>
												g.call(
													this,
													this.config(),
													this.extendedData,
													new ValidationsImpl(this.extendedData),
												),
											)
											.flat()}
                </fhir-wrapper>
            `);
					}
					break;
				case DisplayMode.narrative:
					templates.push(
						...this.templateGenerators.display.header
							.map((g) =>
								g.call(
									this,
									this.config(),
									this.extendedData,
									new ValidationsImpl(this.extendedData),
								),
							)
							.flat(),
					);
					templates.push(
						...this.templateGenerators.display.body
							.map((g) =>
								g.call(
									this,
									this.config(),
									this.extendedData,
									new ValidationsImpl(this.extendedData),
								),
							)
							.flat(),
					);
					templates.push(
						...this.templateGenerators.display.footer
							.map((g) =>
								g.call(
									this,
									this.config(),
									this.extendedData,
									new ValidationsImpl(this.extendedData),
								),
							)
							.flat(),
					);
					break;
				case DisplayMode.override:
					templates.push(
						...this.templateGenerators.override.body
							.map((g) =>
								g.call(
									this,
									this.config(),
									this.extendedData,
									new ValidationsImpl(this.extendedData),
								),
							)
							.flat(),
					);
					break;
				case DisplayMode.structure:
					if (
						mustRender(
							this.data,
							this.mode,
							this.verbose,
							this.summaryonly,
							this.summary,
						)
					) {
						if (this.headless) {
							templates.push(html`
                  <div class="frontmatter">
                      ${this.templateGenerators.structure.header
												.map((g) =>
													g.call(
														this,
														this.config(),
														this.extendedData,
														new ValidationsImpl(this.extendedData),
													),
												)
												.flat()}
                  </div>

                  ${this.templateGenerators.structure.body
										.map((g) =>
											g.call(
												this,
												this.config(),
												this.extendedData,
												new ValidationsImpl(this.extendedData),
											),
										)
										.flat()}

                  ${this.templateGenerators.structure.footer
										.map((g) =>
											g.call(
												this,
												this.config(),
												this.extendedData,
												new ValidationsImpl(this.extendedData),
											),
										)
										.flat()}
              `);
						} else {
							templates.push(html`
                  <fhir-wrapper variant="details"
                                label=${this.getLabel()}
                                badge-resource=${asReadable(this.type)}
                                badge-profile=${this.profile?.type.profileName}
                                ?open=${this.open}
                                ?badge-summary=${this.summary}
                                ?badge-required=${this.required}
                                ?summary=${this.summary}
                                ?summaryonly=${this.config().summaryonly}
                  >
                      <div class="frontmatter">
                          ${this.templateGenerators.structure.header
														.map((g) =>
															g.call(
																this,
																this.config(),
																this.extendedData,
																new ValidationsImpl(this.extendedData),
															),
														)
														.flat()}
                      </div>

                      ${this.templateGenerators.structure.body
												.map((g) =>
													g.call(
														this,
														this.config(),
														this.extendedData,
														new ValidationsImpl(this.extendedData),
													),
												)
												.flat()}

                      ${this.templateGenerators.structure.footer
												.map((g) =>
													g.call(
														this,
														this.config(),
														this.extendedData,
														new ValidationsImpl(this.extendedData),
													),
												)
												.flat()}
                  </fhir-wrapper>
              `);
						}
					}
					break;
			}
		}
		return templates;
	}

	protected updated(_changedProperties: PropertyValues) {
		super.updated(_changedProperties);
		if (this.mustRender()) {
			this.hasRendered(this.config(), this.extendedData, _changedProperties);
		}
	}

	private renderBaseElement(
		_config: DisplayConfig,
		data: Decorated<D>,
		_validations: Validations,
	): TemplateResult[] {
		if (data) {
			return [
				html`
            <fhir-primitive label="id" .value=${data.id} .type=${PrimitiveType.id}></fhir-primitive>
        `,
			];
		}

		return EmptyResult;
	}

	private renderExtensionElement(
		config: DisplayConfig,
		data: Decorated<D>,
		validations: Validations,
	): TemplateResult[] {
		if (data) {
			const labelMap = this.profileExtensionLabels();
			const rootExtensions = ((data.extension ??
				[]) as FhirExtensionData<OpenType>[]).filter((extension) =>
				this.shouldRenderGenericExtension(extension, "root"),
			);
			const modifierExtensions = (((data as Record<string, unknown>)
				.modifierExtension ?? []) as FhirExtensionData<OpenType>[]).filter(
				(extension) => this.shouldRenderGenericExtension(extension, "modifier"),
			);

			return [
				html`
            ${
							hasSome(rootExtensions)
								? html`
                    ${this.renderExtensionGroups(
											config,
											rootExtensions,
											labelMap,
											validations,
											"root",
										)}

                `
								: nothing
						}
            ${this.renderProfilePrimitiveExtensions(data, validations, labelMap)}
            ${
							hasSome(modifierExtensions)
								? html`
                    ${this.renderExtensionGroups(
											config,
											modifierExtensions,
											labelMap,
											validations,
											"modifier",
										)}

                `
								: nothing
						}
        `,
			];
		}

		return EmptyResult;
	}

	private renderExtensionGroups(
		config: DisplayConfig,
		extensions: FhirExtensionData<OpenType>[],
		labelMap: Record<string, string>,
		validations: Validations,
		kind: "root" | "modifier",
	): TemplateResult[] {
		if (config.mode !== DisplayMode.display) {
			return [
				wrap<FhirExtensionData<OpenType>>({
					key: kind === "modifier" ? "modifierExtension" : "extension",
					collection: extensions,
					generator: (d, l, k, _i) =>
						this.renderExtension(
							d,
							kind === "modifier" ? `modifier: ${l}` : l,
							k,
							labelMap,
							validations,
							kind,
						),
					config,
				}),
			];
		}

		const groups = new Map<string, FhirExtensionData<OpenType>[]>();
		for (const extension of extensions) {
			const label = this.extensionLabel(extension, labelMap, kind);
			groups.set(label, [...(groups.get(label) ?? []), extension]);
		}

		return Array.from(groups.entries()).map(([label, groupedExtensions]) => {
			if (groupedExtensions.length === 1) {
				if (hasNestedExtensions(groupedExtensions[0])) {
					return html`
              <fhir-wrapper label=${label} ?summary=${true} ?summaryonly=${config.summaryonly}>
                  ${this.renderExtension(
										groupedExtensions[0],
										label,
										extensionKey(groupedExtensions[0], 0),
										labelMap,
										validations,
										kind,
									)}
              </fhir-wrapper>
          `;
				}

				return this.renderExtension(
					groupedExtensions[0],
					label,
					extensionKey(groupedExtensions[0], 0),
					labelMap,
					validations,
					kind,
				);
			}

			return html`
          <fhir-wrapper label=${label} ?summary=${true} ?summaryonly=${config.summaryonly}>
              ${groupedExtensions.map((extension, index) => {
								const instanceLabel = `${index + 1}`;
								return html`
                    <fhir-wrapper label=${instanceLabel} ?summary=${true} ?summaryonly=${config.summaryonly}>
                        ${this.renderExtension(
													extension,
													instanceLabel,
													extensionKey(extension, index),
													labelMap,
													validations,
													kind,
												)}
                    </fhir-wrapper>
                `;
							})}
          </fhir-wrapper>
      `;
		});
	}

	private renderExtension(
		extension: FhirExtensionData<OpenType>,
		label: string,
		key: string,
		labelMap: Record<string, string>,
		validations: Validations,
		kind: "root" | "modifier",
	): TemplateResult {
		return html`
        <fhir-extension key=${key}
                        .label=${label}
                        .data=${extension}
                        .labelMap=${labelMap}
                        .extensionLabels=${labelMap}
                        .errors=${validations.sliceForFQK({
													path: [
														{ node: kind === "modifier" ? "modifierExtension" : "extension" },
														{ node: extension.url },
													],
												})}
                        summary
                        headless
                        ?modifier=${kind === "modifier"}
                        ?showerror=${this.showerror}
        ></fhir-extension>`;
	}

	private extensionLabel(
		extension: FhirExtensionData<OpenType>,
		labelMap: Record<string, string>,
		kind: "root" | "modifier",
	): string {
		const prefix = kind === "modifier" ? "Modifier: " : "";
		if (extension.url && labelMap[extension.url]) {
			return `${prefix}${labelMap[extension.url]}`;
		}

		if (!extension.url) return `${prefix}${extension.id ?? "n/a"}`;
		const separatorIdx = Math.max(
			extension.url.lastIndexOf("#"),
			extension.url.lastIndexOf("/"),
		);
		return `${prefix}${asReadable(extension.url.substring(separatorIdx + 1))}`;
	}

	private renderProfilePrimitiveExtensions(
		data: Decorated<D>,
		validations: Validations,
		labelMap: Record<string, string>,
	): TemplateResult[] {
		const primitiveDefs = this.profileExtensionDefs("primitive").filter(
			(def) => !def.extendRender?.get(this.mode),
		);
		if (primitiveDefs.length === 0) return EmptyResult;

		return primitiveDefs.flatMap((def) => {
			if (def.extensionLocation.kind !== "primitive") return EmptyResult;
			const primitiveData = (data as Record<string, unknown>)[
				`_${def.extensionLocation.primitiveKey}`
			] as { extension?: FhirExtensionData<OpenType>[] } | undefined;
			const extensions = (primitiveData?.extension ?? []).filter((extension) =>
				this.extensionMatchesDef(extension, def),
			);
			if (extensions.length === 0) return EmptyResult;

			return extensions.map(
				(extension, index) => html`
            ${this.renderPrimitiveExtension(
							extension,
							`${def.key}-${index}`,
							labelMap,
							validations,
						)}
        `,
			);
		});
	}

	private renderPrimitiveExtension(
		extension: FhirExtensionData<OpenType>,
		key: string,
		labelMap: Record<string, string>,
		validations: Validations,
	): TemplateResult {
		return html`
        <fhir-extension key=${key}
                        .label=${this.extensionLabel(extension, labelMap, "root")}
                        .data=${extension}
                        .labelMap=${labelMap}
                        .extensionLabels=${labelMap}
                        .errors=${validations.sliceForFQK({
													path: [
														{ node: "extension" },
														{ node: extension.url },
													],
												})}
                        summary
                        headless
                        ?showerror=${this.showerror}
        ></fhir-extension>`;
	}

	private shouldRenderGenericExtension(
		extension: FhirExtensionData<OpenType>,
		kind: "root" | "modifier",
	): boolean {
		const def = this.profileExtensionDefs(kind).find((candidate) =>
			this.extensionMatchesDef(extension, candidate),
		);
		return !def?.extendRender?.get(this.mode);
	}

	private extensionMatchesDef(
		extension: FhirExtensionData<OpenType>,
		def: ExtensionDef,
	): boolean {
		if (extension.url === def.url) return true;
		return Array.from(def.subdefs?.values() ?? []).some(
			(subdef) => isExtensionDef(subdef) && subdef.url === extension.url,
		);
	}

	private profileExtensionDefs(
		kind: ExtensionDef["extensionLocation"]["kind"],
	): ExtensionDef[] {
		return Array.from(this.profile?.props.values() ?? []).filter(
			(def): def is ExtensionDef =>
				isExtensionDef(def) && def.extensionLocation.kind === kind,
		);
	}

	private profileExtensionLabels(): Record<string, string> {
		const labels: Record<string, string> = {};
		const visit = (defs: Iterable<Defs<D>>) => {
			for (const def of defs) {
				if (!isExtensionDef(def)) continue;
				const label = def.display ?? def.label;
				if (label) labels[def.url] = label;
				if (def.subdefs) visit(def.subdefs.values());
			}
		};

		visit(this.profile?.props.values() ?? []);
		return { ...labels, ...this.extensionLabels };
	}

	/**
	 * Render formatted JSON data for debugging purposes
	 * @protected
	 */
	private renderDebug(_: DisplayConfig, data: Decorated<D>): TemplateResult[] {
		if (data || this.verboseRequestedAndAllowed()) {
			return [
				html`
            <article part="element">
                ${
									this.headless
										? nothing
										: html`
                    <header part="label">${this.getLabel()}</header>`
								}
                <section part="value">
                    <fhir-debug .data=${data}></fhir-debug>
                </section>
            </article>
        `,
			];
		}

		return EmptyResult;
	}

	private verboseRequestedAndAllowed() {
		return this.verbose && !this.hasIdenticalAncestor(this);
	}

	private verboseRequestedAndNotAllowed() {
		return this.verbose && this.hasIdenticalAncestor(this);
	}

	private hasIdenticalAncestor(child: HTMLElement | null) {
		return hasSameAncestor(child);
	}
}

function hasNestedExtensions(extension: FhirExtensionData<OpenType>): boolean {
	return (extension.extension?.length ?? 0) > 0;
}

function extensionKey(
	extension: FhirExtensionData<OpenType>,
	index: number,
): string {
	return `${extension.url ?? extension.id ?? "extension"}-${index}`;
}
