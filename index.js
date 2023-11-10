const logEvents = require('./logEvent');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

//initialize object
const myEmitter = new MyEmitter();

//add listener for the "log" event
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
  //Emit event
  myEmitter.emit('log', 'Log event emitted!');
}, 2000);

// function LoopProcessor(num) {
//   var e = new MyEmitter();

//   setTimeout(function () {
//     for (var i = 1; i <= num; i++) {
//       e.emit('BeforeProcess', i);

//       console.log('Processing number:' + i);

//       e.emit('AfterProcess', i);
//     }
//   }, 2000);

//   return e;
// }
// var lp = LoopProcessor(3);

// lp.on('BeforeProcess', function (data) {
//   console.log('About to start the process for ' + data);
// });

// lp.on('AfterProcess', function (data) {
//   console.log('Completed processing ' + data);
// });
