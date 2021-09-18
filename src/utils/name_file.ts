//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.

import fs from 'fs';
import { join, dirname } from 'path';
import { URL } from 'url';

// generate a random number, if a file already exists with that number, just call itself recursively
export default function genNumber(min = 0, max = 20): number {
  const __dirname: string = dirname(new URL(import.meta.url).pathname);
  const _TempPath: string = join(__dirname, '../../temp').substring(1)
  const number = Math.floor(
    Math.random() * (max - min) + min
  )
  if (!fs.existsSync(`${_TempPath}/${number}.mp3`)) {
    return number;
  } else {
    return genNumber();
  }
  
}
