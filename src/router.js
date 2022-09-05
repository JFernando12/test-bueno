const express = require('express');
const db = require("./database.js");

const router = express.Router();

// Needs correcting:
// It is very important to have correctly formatted code to improve readability.
// It is recommended to use a linter to identify errors: https://www.npmjs.com/package/eslint

// Can be improved:
// The code would be more readable if the logic of the database queries was separated from the routes.
// If you separate logic from routes, the communication would be asynchronous and it is recommended to use promises: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise

// Needs correcting: next is not necessary in the endpoints.
// next is used in middleware to pass control to the next function and we don't have next function: https://expressjs.com/es/guide/writing-middleware.html
router.get("/api/articles", (req, res, next) => {
    const sql = "select * from article";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            // Needs correcting: Quotes in keys are not needed.
            // The res.json() function sends a JSON response but you could pass an object to it: https://www.geeksforgeeks.org/express-js-res-json-function/
            // For security measures, server or database errors are never sent to the client, always generic errors like "An error occurred with the request".
          res.status(403).json({"error":err.message});
          return;
        }
        // Needs correcting: Quotes in keys are not needed.
        // The res.json() function sends a JSON response but you could pass an object to it: https://www.geeksforgeeks.org/express-js-res-json-function/
        res.json({
            "message":"Success",
            "data":rows
        })
      });
});

// Needs correcting: next is not necessary in the endpoints.
// next is used in middleware to pass control to the next function and we don't have next function: https://expressjs.com/es/guide/writing-middleware.html
router.get("/api/article/:id", (req, res, next) => {
    const sql = `select * from article where id = ${req.params.id}`;
    const params = [];
    db.get(sql, params, (err, row) => {
        if (err) {
            // Needs correcting: Quotes in keys are not needed.
            // The res.json() function sends a JSON response but you could pass an object to it: https://www.geeksforgeeks.org/express-js-res-json-function/
            // For security measures, server or database errors are never sent to the client, always generic errors like "An error occurred with the request".
          res.status(403).json({"error":err.message});
          return;
        }
        // Can be better: Before submitting work, please make sure that all lines of code containing debugger and console.log are deleted.
        console.log('row: ', row);
        // Needs correcting: Quotes in keys are not needed.
        // The res.json() function sends a JSON response but you could pass an object to it: https://www.geeksforgeeks.org/express-js-res-json-function/
        // It is possible that the article with some id does not exist. A good practice would be to validate if the product exists or not, and if not exist, tell the customer.
        res.json({
            "message":"Success",
            "data":row
        });
      });
});

// Needs correcting: next is not necessary in the endpoints.
// next is used in middleware to pass control to the next function and we don't have next function: https://expressjs.com/es/guide/writing-middleware.html
// Can be improved: You could remove the last parenthesis to maintain a standard in the code.
router.post("/api/article/", (req, res, next) => {
    const errors=[];
    // Can be improved: No need to type req.body.title, req.body... as many times.
    // You can use destructuring an only use the keys: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // It is a bit tedious to validate the data in this way. You can use a middleware and you will have a better validation: https://express-validator.github.io/docs/
    if (!req.body.title){
        errors.push("title is required");
    }
    if (!req.body.body){
        errors.push("body is required");
    }
    // Needs correcting: If you are going to use the join function, try to leave a space after the comma, otherwise it will be written all together.
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    // Needs correcting: The date has to be set automatically.
    // it is bad practice to ask the client for the date, apart from the fact that it may not be very exact: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date
    const data = {
        title: req.body.title,
        body: req.body.body,
        date: req.body.date
    };
    const sql ='INSERT INTO article (title, body, date) VALUES (?,?,?)';
    const params =[data.title, data.body, data.date];
    db.run(sql, params, function (err, result) {
        if (err){
            // Needs correcting: Quotes in keys are not needed.
            // The res.json() function sends a JSON response but you could pass an object to it: https://www.geeksforgeeks.org/express-js-res-json-function/
            // For security measures, server or database errors are never sent to the client, always generic errors like "An error occurred with the request".
            res.status(403).json({"error": err.message});
            return;
        }
        // Needs correcting: The correct status code must be set.
        // The default status code is 200, and there is a status code that indicates creation, you could to set it: https://developer.mozilla.org/es/docs/Web/HTTP/Status
        // The id should be inside the data. the job of the id is to identify the article, therefore it is part of the data.
        res.json({
            "message": "Success",
            "data": data,
            "id" : this.lastID
        });
    });
});

// Needs correcting: next is not necessary in the endpoints.
// next is used in middleware to pass control to the next function and we don't have next function: https://expressjs.com/es/guide/writing-middleware.html
router.put("/api/article/:id", (req, res, next) => {
    // Can be improved: There is no need to declare the object if it already exists inside the req.body.
    // You can only save req.body into the constant data or you can use destructuring: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const data = {
        title: req.body.title,
        body: req.body.body
    };
    // Can be better: Before submitting work, please make sure that all lines of code containing debugger and console.log are deleted.
    console.log(data);
    // Can be improved: This runs fine but you could save the query and parameters in variables like you did above, this would make your code more readable.
    db.run(
        `UPDATE article set 
           title = COALESCE(?,title),
           body = COALESCE(?,body)
           WHERE id = ?`,
        [data.title, data.body, req.params.id],
        (err, result) => {
            if (err){
                console.log(err);
                // Needs correcting:
                // Quotes in keys are not needed.
                // The res.json() function sends a JSON response but you could pass an object to it: https://www.geeksforgeeks.org/express-js-res-json-function/
                res.status(403).json({"error": res.message});
                return;
            }
            res.json({
                message: "Success",
                data: data
            });
    });
});

// Needs correcting: next is not necessary in the endpoints.
// next is used in middleware to pass control to the next function and we don't have next function: https://expressjs.com/es/guide/writing-middleware.html
router.delete("/api/article/:id", (req, res, next) => {
    // Can be improved: This runs fine but you could save the query and parameters in variables like you did above, this would make your code more readable.
    db.run(
        'DELETE FROM article WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                // Needs correcting:
                // Quotes in keys are not needed.
                // The res.json() function sends a JSON response but you could pass an object to it: https://www.geeksforgeeks.org/express-js-res-json-function/
                // For security measures, server or database errors are never sent to the client, always generic errors like "An error occurred with the request".
                res.status(403).json({"error": res.message});
                return;
            }
            // Needs correcting:
            // Quotes in keys are not needed.
            // The res.json() function sends a JSON response but you could pass an object to it: https://www.geeksforgeeks.org/express-js-res-json-function/
            // Can be improved: could you indicate in the response the id of the deleted article.
            res.json({"message":"Deleted", rows: this.changes});
    });
});

// Needs correcting:
// next is not necessary in the endpoints.
// next is used in middleware to pass control to the next function and we don't have next function: https://expressjs.com/es/guide/writing-middleware.html
router.get("/", (req, res, next) => {
    // Needs correcting:
    // Quotes in keys are not needed.
    // The res.json() function sends a JSON response but you could pass an object to it: https://www.geeksforgeeks.org/express-js-res-json-function/
    res.json({"message":"Ok"});
});

module.exports = router;