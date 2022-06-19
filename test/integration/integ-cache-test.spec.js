// Testing framework: Mocha , assertion style: chai
// See https://mochajs.org/#getting-started on how to write tests
// Use chai for BDD style assertions (expect, should etc..). See move here: https://www.chaijs.com/guide/styles/#expect

// Mocks and spies: sinon
// if you want to mock/spy on fn() for unit tests, use sinon. refer docs: https://sinonjs.org/

// Note on coverage suite used here:
// we use c8 for coverage https://github.com/bcoe/c8. Its reporting is based on nyc, so detailed docs can be found
// here: https://github.com/istanbuljs/nyc ; We didn't use nyc as it do not yet have ES module support
// see: https://github.com/digitalbazaar/bedrock-test/issues/16 . c8 is drop replacement for nyc coverage reporting tool

// remove integration tests if you don't have them.
// jshint ignore: start
/*global describe, it, after*/

import * as chai from 'chai';
import {closeCache, deleteKeyFromCache, getValueFromCache, putToCache} from "../../src/cache.js";

let expect = chai.expect;

describe('Integration: cache.js', function () {
    after('shutdown', function () {
        closeCache();
    });
    it('put-get should pass', async function () {
        const key = 'hello';
        const value = 'world';
        const ttl = 1000;
        const putVal = await putToCache(key, value, ttl);
        expect(putVal).to.equal(true);
        const getVal = await getValueFromCache(key);
        expect(getVal).to.equal(value);
    });

    it('put-get-delete should pass', async function () {
        const key = 'hello';
        const value = 'world';
        const ttl = 1000;
        const putVal = await putToCache(key, value, ttl);
        expect(putVal).to.equal(true);
        const getVal = await getValueFromCache(key);
        expect(getVal).to.equal(value);
        const deleteVal = await deleteKeyFromCache(key);
        expect(deleteVal).to.equal(true);
        const valAfterDelete = await getValueFromCache(key);
        expect(valAfterDelete).to.equal(null);
    });
    it('put-get-delete should pass for Object', async function () {
        const key = 'hello';
        const value = {
            'Name': 'world',
            'year': 2022
        };
        const ttl = 1001;
        const putVal = await putToCache(key, value, ttl);
        expect(putVal).to.equal(true);
        const getVal = await getValueFromCache(key);
        expect(JSON.stringify(getVal) === JSON.stringify(value)).to.equal(true);
        const deleteVal = await deleteKeyFromCache(key);
        expect(deleteVal).to.equal(true);
        const valAfterDelete = await getValueFromCache(key);
        expect(valAfterDelete).to.equal(null);
    });

    it('put-get-delete should pass for boolean', async function () {
        const key = 'hello';
        const value = true;
        const ttl = 1001;
        const putVal = await putToCache(key, value, ttl);
        expect(putVal).to.equal(true);
        const getVal = await getValueFromCache(key);
        expect(getVal).to.equal(true);
        const deleteVal = await deleteKeyFromCache(key);
        expect(deleteVal).to.equal(true);
        const valAfterDelete = await getValueFromCache(key);
        expect(valAfterDelete).to.equal(null);
    });

    it('put-get-delete should pass for Number', async function () {
        const key = 'hello';
        const value = 10;
        const ttl = 1001;
        const putVal = await putToCache(key, value, ttl);
        expect(putVal).to.equal(true);
        const getVal = await getValueFromCache(key);
        expect(getVal).to.equal(value);
        const deleteVal = await deleteKeyFromCache(key);
        expect(deleteVal).to.equal(true);
        const valAfterDelete = await getValueFromCache(key);
        expect(valAfterDelete).to.equal(null);
    });

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    it('verify cache invalidation after 1 second', async function () {
        const key = 'hello';
        const value = 1;
        const ttl = 1;
        const putVal = await putToCache(key, value, ttl);
        expect(putVal).to.equal(true);
        await delay(1000);
        const getVal = await getValueFromCache(key);
        expect(getVal).to.equal(null);


    });
});

