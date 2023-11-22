/*
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvent');
const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

//serveFile function for show file in browser
const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes('image') ? 'utf8' : ''
    );
    const data =
      contentType === 'application/json' ? JSON.parse(rawData) : rawData;

    // const data = await fsPromises.readFile(filePath, 'utf8');
    response.writeHead(filePath.includes('404.html') ? 404 : 200, {
      'Content-Type': contentType,
    });
    response.end(
      contentType === 'application/json' ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit('log', `${err.name} : ${err.message}`, 'errLog.txt');

    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt'); // '/img/2.png'

  const extension = path.extname(req.url); //.png

  let contentType;

  //here extension is extension of file that reads from url
  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;

    default:
      contentType = 'text/html';
      break;
  }

  let filePath =
    contentType === 'text/html' && req.url === '/'
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && req.url.slice(-1) === '/'
      ? path.join(__dirname, 'views', req.url, 'index.html')
      : contentType === 'text/html'
      ? path.join(__dirname, 'views', req.url)
      : path.join(__dirname, req.url);

  //makes the .html extension not requrired in the browser
  if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    //serve the file
    serveFile(filePath, contentType, res);
  } else {
    //404
    //301
    // console.log(path.parse(filePath));
    switch (path.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { Location: '/new-page.html' });
        res.end();
        break;
      case 'www-page.html':
        res.writeHead(301, { Location: '/' });
        res.end();
        break;
      default:
        //serve a 404 response
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
});
server.listen(PORT, () => console.log(`Server running on prot ${PORT}`));
*/
/*
var http = require('http'); // Import Node.js core module

var server = http.createServer(function (req, res) {
  //create web server
  if (req.url == '/') {
    //check the URL of the current request

    // set response header
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // set response content
    res.write('<html><body><p>This is home Page.</p></body></html>');
    console.log('hello'); //this showin in the terminal
    res.end();
  } else if (req.url == '/student') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body><p>This is student Page.</p></body></html>');
    res.end();
  } else if (req.url == '/admin') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body><p>This is admin Page.</p></body></html>');
    res.end();
  } else if (req.url == '/data') {
    //check the URL of the current request
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Hello World' }));
    res.end();
  } else res.end('Invalid Request!');
});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..');
*/

//for set cors in express :

var http = require('http');
var express = require('express');
var cors = require('cors'); // Import the cors middleware

var app = express();
app.use(cors()); // Enable CORS for all routes

var server = http.createServer(app);

app.get('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><body><p>This is home Page.</p></body></html>');
  res.end();
});

app.get('/student', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><body><p>This is student Page.</p></body></html>');
  res.end();
});

app.get('/admin', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><body><p>This is admin Page.</p></body></html>');
  res.end();
});

app.get('/data', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(
    JSON.stringify({
      message: 'Hello World',
      name: 'kiyarash',
      lastName: 'nd',
      age: 23,
    })
  );
  res.end();
});

server.listen(5000);
console.log('Node.js web server at port 5000 is running..');
