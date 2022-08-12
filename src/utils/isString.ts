// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isString(value: any): value is string {
  return Object.prototype.toString.call(value) === "[object String]";
}
