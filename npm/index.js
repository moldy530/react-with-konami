'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/react-with-konami.production.min.js');
} else {
    module.exports = require('./cjs/react-with-konami.development.js');
}
