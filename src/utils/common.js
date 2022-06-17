/** This is a description of the isString function.
 *  This function checks if object is sting or not
 * @param {Object} str - Take any Object
 * @return {boolean}  - true if it is a string false otherwise
 * */
export function isString(str) {
    return str && (typeof str === 'string' || str instanceof String);
}

/** This is a description of the isNumber function.
 *  This function checks if object is Number or not
 * @param {Object} number - Take any Object
 * @return {boolean}  - true if it is a Number false otherwise
 * */

export function isNumber(number) {
    return number && (typeof number === 'number' || number instanceof Number);
}
