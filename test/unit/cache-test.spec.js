/*global describe, it*/
import mockedFunctions from './setup-mocks.js';
import * as chai from 'chai';
import {deleteKeyFromCache, getValueFromCache, putToCache} from "../../src/cache.js";

let expect = chai.expect;

describe('This will test src/cache.js', function () {

    it('getValueFromCache should pass', async function () {
        mockedFunctions.memjs.client.get = function (key, callback) {
            callback(null, '"world"');
        };
        const retVal = await getValueFromCache('hello');
        expect(retVal).to.eql('world');
    });
    it('getValueFromCache should fail for null',
        async function () {

            let isExceptionOccurred = false;
            try {
                await getValueFromCache(null);
            } catch (e) {
                expect(e).to.eql('Please provide valid string as key');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });

    it('getValueFromCache should fail for Number as key',
        async function () {

            let isExceptionOccurred = false;
            try {
                await getValueFromCache(1);
            } catch (e) {
                expect(e).to.eql('Please provide valid string as key');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });
    it('getValueFromCache should fail for boolean as key',
        async function () {

            let isExceptionOccurred = false;
            try {
                await getValueFromCache(true);
            } catch (e) {
                expect(e).to.eql('Please provide valid string as key');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });
    it('getValueFromCache should fail for Object as key',
        async function () {

            let isExceptionOccurred = false;
            try {
                await getValueFromCache({});
            } catch (e) {
                expect(e).to.eql('Please provide valid string as key');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });

    it('deleteKeyFromCache should pass', async function () {
        mockedFunctions.memjs.client.delete = function (key, callback) {
            callback(null, true);
        };
        const retVal = await deleteKeyFromCache('hello');
        expect(retVal).to.eql(true);
    });
    it('deleteKeyFromCache should fail for null as key',
        async function () {

            let isExceptionOccurred = false;
            try {
                await deleteKeyFromCache(null);
            } catch (e) {
                expect(e).to.eql('Please provide valid string as key');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });
    it('deleteKeyFromCache should fail for Number as key',
        async function () {

            let isExceptionOccurred = false;
            try {
                await deleteKeyFromCache(1);
            } catch (e) {
                expect(e).to.eql('Please provide valid string as key');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });
    it('deleteKeyFromCache should fail for boolean as key',
        async function () {

            let isExceptionOccurred = false;
            try {
                await deleteKeyFromCache(true);
            } catch (e) {
                expect(e).to.eql('Please provide valid string as key');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });
    it('deleteKeyFromCache should fail for object as key',
        async function () {

            let isExceptionOccurred = false;
            try {
                await deleteKeyFromCache({});
            } catch (e) {
                expect(e).to.eql('Please provide valid string as key');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });

    it('putToCache should pass for string value', async function () {
        mockedFunctions.memjs.client.set = function (key, value, ttl, callback) {
            callback(null, true);
        };
        const retVal = await putToCache('hello', 'world', 1000);
        expect(retVal).to.eql(true);
    });
    it('putToCache should pass for Object value', async function () {
        mockedFunctions.memjs.client.set = function (key, value, ttl, callback) {
            callback(null, true);
        };
        const retVal = await putToCache('hello', {}, 1000);
        expect(retVal).to.eql(true);
    });

    it('putToCache should pass for boolean value', async function () {
        mockedFunctions.memjs.client.set = function (key, value, ttl, callback) {
            callback(null, true);
        };
        const retVal = await putToCache('hello', true, 1000);
        expect(retVal).to.eql(true);
    });
    it('putToCache should fail for null as key',
        async function () {

            let isExceptionOccurred = false;
            try {
                await putToCache(null, 'world', 1000);
            } catch (e) {
                expect(e).to.eql('Please Verify parameters and its types. key is  null and type of key is object' +
                    '  value is  world type of value is string. ttl is  1000 and typeof ttl is number');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });

    it('putToCache should fail for number as key',
        async function () {

            let isExceptionOccurred = false;
            try {
                await putToCache(1, 'world', 1000);
            } catch (e) {
                expect(e).to.eql('Please Verify parameters and its types. key is  1 and type of key is number' +
                    '  value is  world type of value is string. ttl is  1000 and typeof ttl is number');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });
    it('putToCache should fail for boolean as key',
        async function () {

            let isExceptionOccurred = false;
            try {
                await putToCache(true, 'world', 1000);
            } catch (e) {
                expect(e).to.eql('Please Verify parameters and its types. key is  true and type of key is boolean' +
                    '  value is  world type of value is string. ttl is  1000 and typeof ttl is number');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });
    it('putToCache should fail for null as Object',
        async function () {

            let isExceptionOccurred = false;
            try {
                await putToCache('hello', null, 1000);
            } catch (e) {
                expect(e).to.eql('Please Verify parameters and its types. key is  hello and type of key is string'+
                    '  value is  null type of value is object. ttl is  1000 and typeof ttl is number');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });
    it('putToCache should fail for string  as ttl',
        async function () {

            let isExceptionOccurred = false;
            try {
                await putToCache('hello', 'world', "1000");
            } catch (e) {
                expect(e).to.eql('Please Verify parameters and its types. key is  hello and type of key is string'+
                    '  value is  world type of value is string. ttl is  1000 and typeof ttl is string');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });
    it('putToCache should fail for Object  as ttl',
        async function () {

            let isExceptionOccurred = false;
            try {
                await putToCache('hello', 'world', {});
            } catch (e) {
                expect(e).to.eql('Please Verify parameters and its types. key is  hello and type of key is string'+
                    '  value is  world type of value is string. ttl is  [object Object] and typeof ttl is object');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });
    it('putToCache should fail for boolean  as ttl',
        async function () {

            let isExceptionOccurred = false;
            try {
                await putToCache('hello', 'world', true);
            } catch (e) {
                expect(e).to.eql('Please Verify parameters and its types. key is  hello and type of key is string'+
                    '  value is  world type of value is string. ttl is  true and typeof ttl is boolean');
                isExceptionOccurred = true;
            }
            expect(isExceptionOccurred).to.eql(true);
        });
});
