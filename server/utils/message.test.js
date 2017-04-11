"use strict";
let expect = require('expect');
let generateMessage = require('./message.js').generateMessage;

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'John';
        let text = "Hello";
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text})
    });

});