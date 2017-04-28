"use strict";
const expect = require('expect');
const isRealString = require('./validation.js').isRealString;

describe('isRealString', () => {
    it('should reject non-string values', () => {

        let isString = isRealString(1);

        expect(isString).toBeA('boolean');
        expect(isString).toBe(false);

    });

    it('should reject string with only spaces', () => {

        let isString = isRealString('      ');

        expect(isString).toBeA('boolean');
        expect(isString).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        let isString = isRealString('erg qwtqet q34tq');

        expect(isString).toBeA('boolean');
        expect(isString).toBe(true);
    });

});