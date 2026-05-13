import { Extend, Extension, Extensions } from "../profile.type";
import { Decorateable, RenderBuilder } from "./builder.type";
import {
	complexExtensionBuilder,
	extensionBuilder,
	primitiveExtensionBuilder,
} from "./extensionBuilder";

export const extend: Extend = {
	withOne: <T extends Decorateable>(
		key: string,
		extension: Extension,
	): RenderBuilder<T> => extensionBuilder(key, extension),
	withModifier: <T extends Decorateable>(
		key: string,
		extension: Extension,
	): RenderBuilder<T> =>
		extensionBuilder(key, extension, {
			kind: "modifier",
			path: "modifierExtension",
		}),
	withModifierComplex: <T extends Decorateable>(
		key: string,
		extensions: Extensions,
	): RenderBuilder<T> =>
		complexExtensionBuilder(key, extensions, {
			kind: "modifier",
			path: "modifierExtension",
		}),
	withComplex: <T extends Decorateable>(
		key: string,
		extensions: Extensions,
	): RenderBuilder<T> => complexExtensionBuilder(key, extensions),
	primitive: <T extends Decorateable>(
		primtiveKey: string,
		url: string,
		extensions: Extension[],
	): RenderBuilder<T> =>
		primitiveExtensionBuilder(primtiveKey, url, extensions),
};
