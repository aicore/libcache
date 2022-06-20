/*global describe, it*/
import mockedFunctions from './setup-mocks.js';
import * as chai from 'chai';
import {closeCache, deleteKeyFromCache, getValueFromCache, putToCache} from "../../src/index.js";
import * as LibCache from "../../src/index.js";

let expect = chai.expect;

describe('This will test src/index.js', function () {

    it('should export APIs', async function () {
        expect(closeCache).to.exist;
        expect(deleteKeyFromCache).to.exist;
        expect(getValueFromCache).to.exist;
        expect(putToCache).to.exist;
        // LibCache.
        expect(LibCache.closeCache).to.exist;
        expect(LibCache.deleteKeyFromCache).to.exist;
        expect(LibCache.getValueFromCache).to.exist;
        expect(LibCache.putToCache).to.exist;
    });
});
