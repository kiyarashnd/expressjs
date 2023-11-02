const fs = require('fs');

const rs = fs.createReadStream('./file/lorem.txt', { encoding: 'utf8' });

const ws = fs.createWriteStream('./file/new-lorem.txt');

// rs.on('data', (dataChunk) => {
//   ws.write(dataChunk);
// });

rs.pipe(ws);
