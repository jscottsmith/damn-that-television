// All subsequent files required by node with the extensions .es6, .es, .jsx and .js will be transformed by Babel.
require('babel-register');
require('dotenv').config();

// Server Driver Code, everything from here on can use all the super future ES6 features!
module.exports = require('./server.js');
