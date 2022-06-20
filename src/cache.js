import {put, get, deleteKey, close} from './utils/memcache.js';
import {isString} from "./utils/common.js";
import {isValidPutArguments} from "./utils/validators.js";

// @INCLUDE_IN_API_DOCS

/**
 * @module cache
 */

/** This function helps to  store value in Cache
 * @param {String} key - key to be put
 * @param {Object} value - value to be stored in the key
 * @param {Number} ttl - time in seconds
 * @return {Promise} promise which says put successful or not
 * @type {function}
 * */
export async function putToCache(key, value, ttl) {
    if (isValidPutArguments(key, value, ttl)) {
        return put(key, value, ttl);
    }
    return Promise.reject(`Please Verify parameters and its types. key is  ${key}` +
        ` and type of key is ${typeof key}  value is  ${value} type of value is ${typeof value}.` +
        ` ttl is  ${ttl} and typeof ttl is ${typeof ttl}`);
}

/** This is a description of the getValueFromCache function.
 *  This function helps to get value stored in Cache
 * @param {String} key - key to be fetched
 * @return {Promise} promise which  contains key
 * @type {function}
 * */
export async function getValueFromCache(key) {
    if (isString(key)) {
        return get(key);
    }
    return Promise.reject(`Please provide valid string as key`);
}

/** This is a description of the getValueFromCache function.
 *  This function helps to delete key value stored in Cache
 * @param {String} key - key to be deleted
 * @return {Promise} promise which  contains key
 * @type {function}
 * */
export async function deleteKeyFromCache(key) {

    if (isString(key)) {
        return deleteKey(key);
    }
    return Promise.reject(`Please provide valid string as key`);
}

/** This function helps to close open cache
 * @type {function}
 * */
export function closeCache() {
    close();
}
