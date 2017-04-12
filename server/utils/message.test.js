"use strict";
let expect = require('expect');
let generateMessage = require('./message.js').generateMessage;
let generateLocationMessage = require('./message.js').generateLocationMessage;
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'John';
        let text = "Hello";
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text})
    });

});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'John';
        let latitude = 15;
        let longitude =  19;
        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url: `https://www.google.com/maps?q=${latitude},${longitude}` })
    });

});