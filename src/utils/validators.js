import {isNumber, isString} from "./common.js";

/** This is a description of the put value function.
 *  This function helps to put value to MemCache
 * @param {String} key - key for which we need to put value
 * @param  {Object} value - value to be put in MemCache
 * @param {Number} ttl - ttl value
 * @return {boolean}   true if all arguments are valid false otherwise
 *
 **/
export function isValidPutArguments(key, value, ttl) {
    if (!isString(key)) {
        const errMessage = `Please provide valid key`;
        console.error(errMessage);
        return false;
    }
    if (!value) {
        const errMessage = `Please provide valid value for key ${key}`;
        console.error(errMessage);
        return false;
    }
    if (!isNumber(ttl)) {
        const errMessage = `Please provide valid ttl for key ${key} and value ${value}`;
        console.error(errMessage);
        return false;
    }
    return true;
}
