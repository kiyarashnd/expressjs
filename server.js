const express = require('express');
const app = express();

const path = require('path');
const PORT = process.env.PORT || 3500;

//below regex says if start with slash or end with slash or index.html or just index
app.get('^/$|/index(.html)?', (req, res) => {
  // res.send('Hello world!');
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
  res.redirect('/new-page.html'); //302 by default
});

//Route handlers
app.get(
  '/hello(.html)?',
  (req, res, next) => {
    console.log('attempted to load hello.html');
    next();
  },
  (req, res) => {
    res.json({ user: 'kiya', age: 23 });
  }
);

//chaining route handlers
const one = (req, res, next) => {
  console.log('one');
  next();
};

const two = (req, res, next) => {
  console.log('two');
  next();
};

const three = (req, res, next) => {
  console.log('three');
  res.send('Finished!');
};

app.get('/chain(.html)?', [one, two, three]);

///* mean / and anything
app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on prot ${PORT}`));

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
/*
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
*/
