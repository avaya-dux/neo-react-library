// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
export function isString(value: any): value is string {
	return Object.prototype.toString.call(value) === "[object String]";
}
