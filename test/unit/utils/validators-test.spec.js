/*global describe, it*/
import * as setup from '../setup-mocks.js';
import * as assert from 'assert';
import * as chai from 'chai';
import {isValidPutArguments} from "../../../src/utils/validators.js";


let expect = chai.expect;

describe('unit test for src/utils/validators.js', function () {
    it('isValidPutArguments should return true  for  valid arguments', function () {
        expect(isValidPutArguments('hello', 'world', 10)).to.equal(true);
    });
    it('isValidPutArguments should return true  for object value', function () {
        expect(isValidPutArguments('hello', {}, 10)).to.equal(true);
    });
    it('isValidPutArguments should return true  for boolean value', function () {
        expect(isValidPutArguments('hello', true, 10)).to.equal(true);
    });
    it('isValidPutArguments should return true  for Number value', function () {
        expect(isValidPutArguments('hello', 10, 10)).to.equal(true);
    });
    it('isValidPutArguments should return false  if key is not string', function () {
        expect(isValidPutArguments(1, 'world', 10)).to.equal(false);
    });
    it('isValidPutArguments should return false  if key is null', function () {
        expect(isValidPutArguments(null, 'world', 10)).to.equal(false);
    });
    it('isValidPutArguments should return false  if key is obj', function () {
        expect(isValidPutArguments({}, 'world', 10)).to.equal(false);
    });
    it('isValidPutArguments should return false  if key is boolean', function () {
        expect(isValidPutArguments(true, 'world', 10)).to.equal(false);
    });
    it('isValidPutArguments should return false if key is null', function () {
        expect(isValidPutArguments('hello', null, 10)).to.equal(false);
    });
    it('isValidPutArguments should return false if ttl is null', function () {
        expect(isValidPutArguments('hello', 'world', null)).to.equal(false);
    });
    it('isValidPutArguments should return false if ttl is string', function () {
        expect(isValidPutArguments('hello', 'world', '10')).to.equal(false);
    });
    it('isValidPutArguments should return false if ttl is obj', function () {
        expect(isValidPutArguments('hello', 'world', {})).to.equal(false);
    });
});
