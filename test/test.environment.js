'use strict';

process.env.NODE_ENV = 'test';
process.env.PORT     = 4243;        // Use a different port for tests

console.log('process.env.NODE_ENV set to ' + process.env.NODE_ENV + ' by test.environment.js');
console.log('process.env.PORT     set to ' + process.env.PORT     + ' by test.environment.js');
