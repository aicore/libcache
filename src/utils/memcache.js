/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */

import memjs from 'memjs';
import {isString} from "./common.js";
import {isValidPutArguments} from "./validators.js";


const client = memjs.Client.create();

/** This is a description of the get function.
 *  This function helps to get value stored in MemCache
 * @param {String} key - key for which we need to get value
 * @return {Promise}  resolve promise to get return value
 *
 **/
export function get(key) {
    return new Promise((resolve, reject) => {
        if (!isString(key)) {
            reject(`Provide valid key`);
            return;
        }
        // noinspection JSIgnoredPromiseFromCall
        client.get(key, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(val));
        });
    });
}

/** This is a description of the deleteKey function.
 *  This function helps to delete key and value stored in MemCache
 * @param {String} key - key to be deleted
 * @return {Promise}  resolve promise to get return value
 *
 **/
export function deleteKey(key) {
    return new Promise((resolve, reject) => {
        if (!isString(key)) {
            reject(`Provide valid key`);
            return;
        }
        // noinspection JSIgnoredPromiseFromCall
        client.delete(key, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(val);
        });
    });
}

/** This is a description of the put value function.
 *  This function helps to put value to MemCache
 * @param {String} key - key for which we need to put value
 * @param  {Object} value - value to be put in MemCache
 * @param {Number} ttl - ttl value
 * @return {Promise}  resolve promise to get return value
 *
 **/
export function put(key, value, ttl) {
    return new Promise((resolve, reject) => {
        if (!isValidPutArguments(key, value, ttl)) {
            reject(`Please provide valid parameters`);
            return;
        }
        // noinspection JSIgnoredPromiseFromCall
        client.set(key, JSON.stringify(value), {expires: ttl}, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(val);
        });
    });
}

