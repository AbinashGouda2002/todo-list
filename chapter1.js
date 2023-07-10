// Clients & Servers

const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  //lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log('Every page is working properly');
  });
  greet();

res.setHeader('Content-type', 'text/html');

let path = './chapter1Views/';
switch (req.url) {
    case '/': 
      path += 'index.html';
      //status code
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      //status code
      res.statusCode = 200;
      break;
      case '/about-me':
      path += 'about.html';
      //status code
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      //status code
      res.statusCode = 404;
      break;
} 

fs.readFile(path, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        res.end(data);
    }
})  

});

server.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000');
});