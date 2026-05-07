import { toPrimitive } from "./type-converters";

const TRUE_VALUES = [true, "true"];
const FALSE_VALUES = [false, "false"];

const isTrueValue = (value: unknown): boolean => (TRUE_VALUES as unknown[]).includes(value);
const isFalseValue = (value: unknown): boolean => (FALSE_VALUES as unknown[]).includes(value);

export const toBoolean: toPrimitive<unknown, boolean> = (
	value: unknown,
): boolean => {
	if (isTrueValue(value)) {
		return true;
	}
	if (isFalseValue(value)) {
		return false;
	}
	throw new TypeError(`value should be true or false: ${value}`);
};
