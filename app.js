const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const users = require('./controllers/users');
const products = require('./controllers/products');

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
    req.parsedCookies = req.cookies;
    console.log(req.parsedCookies);
    next();
  });
  
  app.use((req, res, next) => {
    req.parsedQuery = req.query;
    console.log(req.parsedQuery);
    next();
  });
  
app.get('/', function (req, res) {
    res.send('Hello World!');
    res.end();
});

app.get('/api/users', users.all);

app.get('/api/products', products.all);
app.get('/api/products/:id', products.getProductById);
app.get('/api/products/:id/reviews', products.getReviewsByProductId);
app.post('/api/products', products.addNewProduct);

module.exports = app;
