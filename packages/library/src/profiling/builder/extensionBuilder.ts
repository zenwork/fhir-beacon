import { Basic } from "../../ResourceDef";
import { TemplateGenerator } from "../../internal";
import { DisplayMode } from "../../shell";
import {
	Context,
	ExtensionDef,
	ExtensionLocation,
	StructureDefinition,
} from "../definition";
import { Extension, Extensions } from "../profile.type";
import { BindingStrength } from "../util";
import { Builder, Decorateable, RenderBuilder } from "./builder.type";

export function extensionBuilder<T extends Decorateable>(
	key: string,
	def: Extension,
	extensionLocation: ExtensionLocation = { kind: "root", path: "extension" },
): RenderBuilder<T> {
	let context: Context<T> | null = null;
	let optional = false;
	let many = false;
	const extendRender = new Map<DisplayMode, TemplateGenerator<T>>();
	const overrideRender = new Map<DisplayMode, TemplateGenerator<T>>();

	const action: RenderBuilder<T> = {
		setCtx: (ctx: Context<T>) => {
			context = ctx;
		},
		build: () => {
			if (context) {
				const extensionDef: ExtensionDef = {
					defType: "extension",
					key: key,
					url: def.url,
					extensionLocation,
					label: def.label ?? def.key ?? key,
					display: def.display,
					description: def.description,
					valueType: def.valueType,
					valueTypeNarrowing: def.valueTypeNarrowing || [],
					isModifier: extensionLocation.kind === "modifier",
					isSummary: false,
					cardinality: extensionCardinality(optional, many),
					bindings: def.bindings ?? [],
					bindingStrength: def.bindingStrength ?? BindingStrength.Example,
					choice: undefined,
					subdefs: undefined,
					extendRender: extendRender,
					overrideRender: overrideRender,
				};

				context.def.set(extensionDef, key);
			} else {
				throw new Error("Context not set");
			}
		},
		optional: (): RenderBuilder<T> => {
			optional = true;
			return action;
		},
		required: (): RenderBuilder<T> => {
			optional = false;
			return action;
		},
		hasMany: (): RenderBuilder<T> => {
			many = true;
			return action;
		},
		extendRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => {
			extendRender.set(forMode, fn);
			return action;
		},
		overrideRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => {
			overrideRender.set(forMode, fn);
			return action;
		},
	};

	return action as unknown as RenderBuilder<T>;
}

export function complexExtensionBuilder<T extends Decorateable>(
	key: string,
	def: Extensions,
	extensionLocation: ExtensionLocation = { kind: "root", path: "extension" },
): RenderBuilder<T> {
	let context: Context<T> | null = null;
	let optional = false;
	let many = false;
	const extendRender = new Map<DisplayMode, TemplateGenerator<T>>();
	const overrideRender = new Map<DisplayMode, TemplateGenerator<T>>();

	const action: RenderBuilder<T> = {
		setCtx: (ctx: Context<T>) => {
			context = ctx;
		},
		build: () => {
			if (context) {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				const ctx: Context<any> = new Context(
					Basic,
					new StructureDefinition(Basic),
				);
				def.extensions.map((ext) => {
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					const builder: Builder<any> = extensionBuilder(ext.url, ext, {
						kind: "nested",
						path: "extension.extension",
					});
					builder.setCtx(ctx);
					builder.build();
				});

				const extensionDef: ExtensionDef = {
					defType: "extension",
					key: key,
					url: def.url,
					extensionLocation,
					label: def.label ?? key,
					display: def.display,
					description: def.description,
					valueType: undefined,
					valueTypeNarrowing: undefined,
					isModifier: extensionLocation.kind === "modifier",
					isSummary: false,
					cardinality: extensionCardinality(optional, many),
					bindings: [],
					bindingStrength: BindingStrength.Example,
					choice: undefined,
					subdefs: ctx.def.props,
					extendRender,
					overrideRender,
				};
				context.def.set(extensionDef);
			} else {
				throw new Error("Context not set");
			}
		},
		optional: (): RenderBuilder<T> => {
			optional = true;
			return action;
		},
		required: (): RenderBuilder<T> => {
			optional = false;
			return action;
		},
		hasMany: (): RenderBuilder<T> => {
			many = true;
			return action;
		},
		extendRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => {
			extendRender.set(forMode, fn);
			return action;
		},
		overrideRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => {
			overrideRender.set(forMode, fn);
			return action;
		},
	};

	return action;
}

export function primitiveExtensionBuilder<T extends Decorateable>(
	primitiveKey: string,
	url: string,
	def: Extension[],
): RenderBuilder<T> {
	let context: Context<T> | null = null;
	let optional = false;
	let many = false;
	const extendRender = new Map<DisplayMode, TemplateGenerator<T>>();
	const overrideRender = new Map<DisplayMode, TemplateGenerator<T>>();

	const action: RenderBuilder<T> = {
		setCtx: (ctx: Context<T>) => {
			context = ctx;
		},
		build: () => {
			if (context) {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				const ctx: Context<any> = new Context(
					Basic,
					new StructureDefinition(Basic),
				);
				def.map((ext) => {
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					const builder: Builder<any> = extensionBuilder(
						toFixedKey(ext.valueType),
						ext,
						{
							kind: "nested",
							path: "extension.extension",
						},
					);
					builder.setCtx(ctx);
					builder.build();
				});

				const extensionDef: ExtensionDef = {
					defType: "extension",
					key: `_${primitiveKey}`,
					url: url,
					extensionLocation: {
						kind: "primitive",
						path: `_${primitiveKey}.extension`,
						primitiveKey,
					},
					label: primitiveKey,
					display: undefined,
					description: undefined,
					valueType: "Extension",
					valueTypeNarrowing: undefined,
					isModifier: false,
					isSummary: false,
					cardinality: extensionCardinality(optional, many),
					bindings: [],
					bindingStrength: BindingStrength.Example,
					choice: undefined,
					subdefs: ctx.def.props,
					extendRender,
					overrideRender,
				};
				context.def.set(extensionDef);
			} else {
				throw new Error("Context not set");
			}
		},
		optional: (): RenderBuilder<T> => {
			optional = true;
			return action;
		},

		required: (): RenderBuilder<T> => {
			optional = false;
			return action;
		},

		hasMany: (): RenderBuilder<T> => {
			many = true;
			return action;
		},

		extendRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => {
			extendRender.set(forMode, fn);
			return action;
		},

		overrideRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => {
			overrideRender.set(forMode, fn);
			return action;
		},
	};

	return action;
}

function toFixedKey(type: string): string {
	const capitaliseFirstType: string =
		type.charAt(0).toUpperCase() + type.slice(1);
	const propKey: string = "value" + capitaliseFirstType;
	return propKey;
}

function extensionCardinality(optional: boolean, many: boolean): string {
	const min = optional ? "0" : "1";
	const max = many ? "*" : "1";
	return `${min}..${max}`;
}
