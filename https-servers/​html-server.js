const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const { Transform } = require('stream');

const myTransform = new Transform({
    transform(chunk, encoding, callback) {
        let data =  chunk.toString('utf-8').replace('{message}', 'Hello Server Replace');
        callback(null, data);
    }
});

const indexHtmlStream = fs.createReadStream('index.html', 'utf-8');

const requestHandler = (request, response) => {
    console.log(request.url);
    response.setHeader('Content-Type', 'text/html');
    indexHtmlStream.pipe(myTransform).pipe(response);
};

const server = http.createServer(requestHandler);

server.listen(port, hostname, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`Server running at ${port}`);
});