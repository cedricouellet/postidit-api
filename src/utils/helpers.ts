/**
 * If the given is null or undefined.
 * @param {any} value The value to check.
 * @return {boolean} True if the value is null or undefined, false otherwise.
 */
function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

/**
 * Convert a string to a number.
 * @param {string} value The value to convert.
 * @return {number | null} The converted value or undefined.
 */
function toNumber(value: string | undefined): number | null {
  const parsed = Number(value);
  return isNaN(parsed) ? null : parsed;
}

export { isNullOrUndefined, toNumber };
