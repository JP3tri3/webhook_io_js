// TEST NOTES:

// console.log(global)

// setTimeout(() => {
//     console.log('in the timeout');
//     clearInterval(int);
// }, 3000);

// const int = setInterval(() => {
//     console.log('in the interval');
// }, 1000);

// get filenames:
// console.log(__dirname);
// console.log(__filename);

// Streams / chunk data:

// const fs = require('fs');

// const readStream = fs.createReadStream('data location')
// const writeStream = fs.createWriteStream('data location')
// // add string encoding:
// const readStream = fs.createReadStream('data location', { encoding: 'utf8' })

// readStream.on('data', (chunk) => {
//     console.log('----- NEW CHUNK -----');
//     console.log(chunk.toString());
//     writeStream(`\n NEW CHUNK\n`)
//     writeStream.write(chunk);
// });

// // piping
// readStream.pipe(writeStream);