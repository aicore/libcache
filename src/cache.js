import {put, get, deleteKey} from './utils/memcache.js';
import {isString} from "./utils/common.js";
import {isValidPutArguments} from "./utils/validators.js";


/** This function helps to  store value in Cache
 * @param {String} key - key to be put
 * @param {Object} value - value to be stored in the key
 * @param {Number} ttl - time in seconds
 * @return {Promise} promise which says put successful or not
 * */
export async function putToCache(key, value, ttl) {
    if (isValidPutArguments(key, value, ttl)) {
        return put(key, value, ttl);
    }
    return Promise.reject(`Please provide valid key ${key} valid value ${value} and ttl ${ttl}`);
}

/** This is a description of the getValueFromCache function.
 *  This function helps to get value stored in Cache
 * @param {String} key - key to be fetched
 * @return {Promise} promise which  contains key
 * */
export async function getValueFromCache(key) {
    if (isString(key)) {
        return get(key);
    }
    return Promise.reject(`Please provide valid  string as key`);
}

/** This is a description of the getValueFromCache function.
 *  This function helps to delete key value stored in Cache
 * @param {String} key - key to be deleted
 * @return {Promise} promise which  contains key
 * */
export async function deleteKeyFromCache(key) {

    if (isString(key)) {
        return deleteKey(key);
    }
    return Promise.reject(`Please provide valid string as key`);
}
