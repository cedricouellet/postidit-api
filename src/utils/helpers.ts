/**
 * If the given is null or undefined.
 * @param {any} value The value to check.
 * @return {boolean} True if the value is null or undefined, false otherwise.
 */
function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

export { isNullOrUndefined };
