const express = require("express");
const bodyParser = require("body-parser");
const router = require('./src/router.js');

const app = express();

// Needs correcting:
// It is very important to have correctly formatted code to improve readability.
// It is recommended to use a linter to identify errors: https://www.npmjs.com/package/eslint
// if you are not using a module, the ideal is to uninstall it to optimize the code.
// if you don't use a script in the package.json the ideal is to remove it to prevent confusions.
// An old version of the sqlite3 module is installed and it doesn't work.: https://docs.npmjs.com/updating-packages-downloaded-from-the-registry

// Excellent: Using capital letters for naming constants is a good practice!
const HTTP_PORT = 3000;

// Can be improved: bodyParser module is no longer needed.
// urlencoded a json function are already included in express module and your code would be lighter: https://expressjs.com/es/api.html
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

