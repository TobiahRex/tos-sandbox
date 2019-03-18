/* eslint-disable indent */
import fs from 'fs';

let data = '',
  newData;

const readStream = fs.createReadStream('.env-copy');
const writeStream = fs.createWriteStream('.env');

readStream
.on('data', (chunk) => {
  data += chunk;
})
.on('end', () => {
  newData = data
    .replace('INSERT_BASE_URL', 'http://localhost:3000/')
    .replace('INSERT_NODE_ENV', 'development');

  writeStream.write(newData);
});
