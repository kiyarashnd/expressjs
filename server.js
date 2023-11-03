/*
// console.log(global);

const os = require('os');
// const path = require('path');
// const math = require('./math');
const { add, subtract, multiply, divide } = require('./math');

// console.log(math.add(2, 3));
// console.log(add(2, 3));
// console.log(subtract(2, 3));
// console.log(multiply(2, 3));
// console.log(divide(2, 3));

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));

const fs = require('fs');
// fs.readFile('./file/starter.txt', 'utf-8', (err, data) => {
//   if (err) throw err;
//   //   console.log(data.toString());
//   console.log(data);
// });

const path = require('path');

fs.readFile(
  path.join(__dirname, 'file', 'starter.txt'),
  'utf-8',
  (err, data) => {
    if (err) throw err;
    //   console.log(data.toString());
    console.log(data);
  }
);

console.log('Hello...');

//exit on uncaught errors,
process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error : ${err}`);
  process.exit(1);
});

fs.writeFile(
  path.join(__dirname, 'file', 'reply.txt'),
  //   'utf-8',
  'Nice to meet you',
  (err) => {
    if (err) throw err;
    //   console.log(data.toString());
    console.log('write compelete');

    fs.appendFile(
      path.join(__dirname, 'file', 'reply.txt'),
      //   'utf-8',
      '\n\nYes it is ',
      (err) => {
        if (err) throw err;
        console.log('Append compelete');

        fs.rename(
          path.join(__dirname, 'file', 'reply.txt'),
          //   'utf-8',
          path.join(__dirname, 'file', 'new.txt'),
          (err) => {
            if (err) throw err;
            console.log('Rename compelete');
          }
        );
      }
    );
  }
);

// fs.appendFile(
//   path.join(__dirname, 'file', 'test.txt'),
//   //   'utf-8',
//   'Testing text',
//   (err) => {
//     if (err) throw err;
//     //   console.log(data.toString());
//     console.log('Append compelete');
//   }
// );

*/
//how to prevent from callback hell :
const fsPromise = require('fs').promises;
const path = require('path');

const fileOps = async () => {
  try {
    const data = await fsPromise.readFile(
      path.join(__dirname, 'file', 'starter.txt'),
      'utf-8',
      console.log('1-read file')
    );
    console.log('out of first ');

    await fsPromise.unlink(
      path.join(__dirname, 'file', 'starter.txt'),
      console.log('2-delete file')
    ); //unlink for delete file

    await fsPromise.writeFile(
      path.join(__dirname, 'file', 'promiseWrite.txt'),
      data,
      console.log('3-write file')
    );

    await fsPromise.appendFile(
      path.join(__dirname, 'file', 'promiseWrite.txt'),
      '\n\nNice to meet you',
      console.log('4-append file')
    );

    await fsPromise.rename(
      path.join(__dirname, 'file', 'promiseWrite.txt'),
      path.join(__dirname, 'file', 'promiseComplete.txt'),
      console.log('5-rename file ')
    );

    const newData = await fsPromise.readFile(
      path.join(__dirname, 'file', 'promiseComplete.txt'),
      'utf-8'
    );
    console.log('after latest function');
  } catch (err) {
    console.log(err);
  }
};

fileOps();
