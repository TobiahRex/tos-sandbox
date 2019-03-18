/* eslint-disable indent */
import fs from 'fs';

fs.createReadStream('.env-copy')
.pipe(
  fs.createWriteStream('.env')
);
