/*global describe, it*/
import mockedFunctions from '../setup-mocks.js';
import * as chai from 'chai';
import {deleteKey, get, put} from "../../../src/utils/memcache.js";

let expect = chai.expect;

describe('Unit test for src/memcache.js', function () {
    it('get should succeed', async function () {
        mockedFunctions.memjs.client.get = function (key, callback) {
            callback(null, '{"key":"val"}');
        };
        const result = await get("str");
        expect(result).to.eql({key: "val"}); // use eql for object compare
    });
    it(
        'get should fail with  Number key', async function () {
            mockedFunctions.memjs.client.get = function (key, callback) {
                callback(null, '{"key":"val"}');
            };
            let exceptionHappened = false;
            try {
                await get(1);
            } catch (e) {
                expect(e).to.eql('Provide valid key');
                exceptionHappened = true;
            }
            expect(exceptionHappened).to.eql(true);

        });

    it(
        'get should fail with  boolean key', async function () {
            mockedFunctions.memjs.client.get = function (key, callback) {
                callback(null, '{"key":"val"}');
            };
            let exceptionHappened = false;
            try {
                await get(true);
            } catch (e) {
                expect(e).to.eql('Provide valid key');
                exceptionHappened = true;
            }
            expect(exceptionHappened).to.eql(true);

        });

    it(
        'get should fail with  Object key', async function () {
            mockedFunctions.memjs.client.get = function (key, callback) {
                callback(null, '{"key":"val"}');
            };
            let exceptionHappened = false;
            try {
                await get({});
            } catch (e) {
                expect(e).to.eql('Provide valid key');
                exceptionHappened = true;
            }
            expect(exceptionHappened).to.eql(true);

        });

    it('get should fail in case of time out', async function () {
        mockedFunctions.memjs.client.get = function (key, callback) {
            callback('time out', null);
        };

        let exceptionHappened = false;
        try {
            await get('hello');
        } catch (e) {
            expect(e).to.eql('time out');
            exceptionHappened = true;
        }
        expect(exceptionHappened).to.eql(true); // use eql for object compare
    });
    it('put should succeed', async function () {
        mockedFunctions.memjs.client.set = function (key, value, option, callback) {
            callback(null, true);
        };
        const result = await put("hello", 'world', 10);
        expect(result).to.eql(true); // use eql for object compare
    });
    it('put should succeed with object', async function () {
        mockedFunctions.memjs.client.set = function (key, value, option, callback) {
            callback(null, true);
        };
        const result = await put("hello", {}, 10);
        expect(result).to.eql(true); // use eql for object compare
    });
    it('put should succeed with Number', async function () {
        mockedFunctions.memjs.client.set = function (key, value, option, callback) {
            callback(null, true);
        };
        const result = await put("hello", 10, 10);
        expect(result).to.eql(true); // use eql for object compare
    });
    it('put should succeed with boolean', async function () {
        mockedFunctions.memjs.client.set = function (key, value, option, callback) {
            callback(null, true);
        };
        const result = await put("hello", true, 10);
        expect(result).to.eql(true); // use eql for object compare
    });
    it('put should succeed for Number ttl', async function () {
        mockedFunctions.memjs.client.set = function (key, value, option, callback) {
            callback(null, true);
        };
        const result = await put("hello", 'world', Number(10));
        expect(result).to.eql(true); // use eql for object compare
    });

    it('put should fail with null key', async function () {
        let exceptionHappened = false;
        try {
            await put(null, 'world', 10);
        } catch (e) {
            expect(e).to.eql('Please provide valid parameters');
            exceptionHappened = true;
        }
        expect(exceptionHappened).to.eql(true);
    });

    it('put should fail with null value', async function () {
        let exceptionHappened = false;
        try {
            await put('hello', null, 10);
        } catch (e) {
            expect(e).to.eql('Please provide valid parameters');
            exceptionHappened = true;
        }
        expect(exceptionHappened).to.eql(true);
    });

    it('put should fail with null ttl', async function () {
        let exceptionHappened = false;
        try {
            await put('hello', 'world', null);
        } catch (e) {
            expect(e).to.eql('Please provide valid parameters');
            exceptionHappened = true;
        }
        expect(exceptionHappened).to.eql(true);
    });
    it('put should fail for object key ', async function () {
        let exceptionHappened = false;
        try {
            await put({}, 'world', 10);
        } catch (e) {
            expect(e).to.eql('Please provide valid parameters');
            exceptionHappened = true;
        }
        expect(exceptionHappened).to.eql(true);
    });
    it('put should fail for Number key ', async function () {
        let exceptionHappened = false;
        try {
            await put(10, 'world', 10);
        } catch (e) {
            expect(e).to.eql('Please provide valid parameters');
            exceptionHappened = true;
        }
        expect(exceptionHappened).to.eql(true);
    });

    it('put should fail with non  object ttl', async function () {
        let exceptionHappened = false;
        try {
            await put('hello', 'world', {});
        } catch (e) {
            expect(e).to.eql('Please provide valid parameters');
            exceptionHappened = true;
        }
        expect(exceptionHappened).to.eql(true);
    });

    it('put should fail with non  boolean ttl', async function () {
        let exceptionHappened = false;
        try {
            await put('hello', 'world', true);
        } catch (e) {
            expect(e).to.eql('Please provide valid parameters');
            exceptionHappened = true;
        }
        expect(exceptionHappened).to.eql(true);
    });
    it('put should fail in case of time out', async function () {
        mockedFunctions.memjs.client.set = function (key, value, option, callback) {
            callback('time out', null);
        };

        let exceptionHappened = false;
        try {
            await put('hello', 'world', 10);
        } catch (e) {
            expect(e).to.eql('time out');
            exceptionHappened = true;
        }
        expect(exceptionHappened).to.eql(true); // use eql for object compare
    });


    it('delete should succeed', async function () {
        mockedFunctions.memjs.client.delete = function (key, callback) {
            callback(null, true);
        };
        const result = await deleteKey("hello");
        expect(result).to.eql(true); // use eql for object compare
    });

    it('delete should fail with null key', async function () {
        let exceptionHappened = false;
        try {
            await deleteKey(null);
        } catch (e) {
            expect(e).to.eql('Provide valid key');
            exceptionHappened = true;
        }
        expect(exceptionHappened).to.eql(true);
    });

    it('delete should fail in case of time out', async function () {
        mockedFunctions.memjs.client.delete = function (key, callback) {
            callback('time out', null);
        };

        let exceptionHappened = false;
        try {
            await deleteKey('hello');
        } catch (e) {
            expect(e).to.eql('time out');
            exceptionHappened = true;
        }
        expect(exceptionHappened).to.eql(true); // use eql for object compare
    });
});
