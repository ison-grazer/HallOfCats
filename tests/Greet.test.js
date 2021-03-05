const { expect } = require('@jest/globals');
const greet = require('../js/script.js');


// getHours will round up if a new hour has begun.
// using spy
test('Greeting should be "Good Morning!" ', () => {
const mockedDate = new Date('2021-03-04T05:20:23.015Z');
const spy = jest
    .spyOn(global, 'Date')
    .mockImplementation(() => mockedDate)
const greeting_msg = greet();
expect(greeting_msg).toBe("Good Morning!");
spy.mockRestore();
})

test('Greeting should be "Good Evening!" ', () => {
   const mockedDate = new Date('2021-03-04T20:10:23.015Z');
   const spy = jest
    .spyOn(global, 'Date')
    .mockImplementation(() => mockedDate)
   const greeting_msg = greet();
   expect(greeting_msg).toBe("Good Evening!");
   spy.mockRestore();
   })