/**
 * Checks if a value is empty.
 *
 * This function considers the following values as empty:
 * - `null`
 * - `undefined`
 * - Empty strings
 * - Empty arrays
 * - Empty objects (i.e., objects with no own properties)
 *
 * Numbers are considered non-empty (including `0`), and other data types
 * like booleans and functions are also considered non-empty.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is empty, false otherwise.
 *
 * @example
 * const isEmptyString = isEmptyCheck(''); // true
 * const isEmptyArray = isEmptyCheck([]); // true
 * const isEmptyObject = isEmptyCheck({}); // true
 * const isEmptyNull = isEmptyCheck(null); // true
 * const isEmptyUndefined = isEmptyCheck(undefined); // true
 * const isEmptyNumber = isEmptyCheck(0); // false
 */
export function isEmptyCheck(value) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (typeof value === "number") {
    return false; // Numbers are not considered empty
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false; // Default case for other data types (e.g., boolean, function)
}

/**
 * Validates an email address using a regular expression.
 *
 * The regular expression used checks for:
 * - Non-whitespace characters before and after '@'
 * - A valid domain with at least one '.' character
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 *
 * @example
 * const isValidEmail = isValidEmailCheck('example@example.com'); // true
 * const isInvalidEmail = isValidEmailCheck('invalid-email'); // false
 */
export function isValidEmailCheck(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a full name to ensure it contains only alphabets and spaces.
 *
 * This function uses a regular expression to check that the name contains only:
 * - Uppercase and lowercase letters
 * - Spaces
 *
 * @param {string} name - The full name to validate.
 * @returns {boolean} - Returns true if the name is valid, false otherwise.
 *
 * @example
 * const isValidName = isValidateName('John Doe'); // true
 * const isInvalidName = isValidateName('John123'); // false
 */
export function isValidateName(name) {
  const validRegex = /^[A-Za-z\s]+$/;
  return validRegex.test(name);
}

/**
 * Validates a phone number based on its format and length.
 *
 * This function checks if the phone number contains only:
 * - Digits
 * - Spaces
 * - Hyphens
 * - Parentheses
 *
 * It also ensures that the length of the phone number is between 10 and 12 characters.
 *
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} - Returns true if the phone number is valid, false otherwise.
 *
 * @example
 * const isValidPhoneNumber = isValidPhoneNumber('123-456-7890'); // true
 * const isInvalidPhoneNumber = isValidPhoneNumber('123'); // false
 */
export function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^[0-9\s\-()+]+$/;
  const minLength = 10;
  const maxLength = 12;
  const isValidLength =
    phoneNumber.length >= minLength && phoneNumber.length <= maxLength;
  return phoneRegex.test(phoneNumber) && isValidLength;
}

export function isNullAddress(address) {
  const nullAddress = "0x0000000000000000000000000000000000000000";
  return address.toLowerCase() === nullAddress;
}
