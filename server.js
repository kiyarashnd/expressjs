const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvent');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

app.use(logger);

//Cross Origin Resource Sharing
const whiteList = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5500',
  'http://localhost:3500',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  OptionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//built-in middleware to handle URLencoded data
//for when data is submited
app.use(express.urlencoded({ extended: false })); //this line applies for all below http method

//built-in middleware for json
app.use(express.json());

//serve static file
app.use(express.static(path.join(__dirname, '/public'))); //for apply css and image file in public folder

app.use('/new-page.html', (req, res, next) => {
  console.log('hiiii');
  next();
});

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
// app.get('/*', (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

//app.use('/')
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send(err.message);
// });

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on prot ${PORT}`));
