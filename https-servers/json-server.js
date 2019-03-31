const http = require('http');
const port = 3000;

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
      { color: 'blue' },
      { size: 'XL' }
    ]
};

const requestHandler = (request, response) => {
    console.log(request.url);
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(product));
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
