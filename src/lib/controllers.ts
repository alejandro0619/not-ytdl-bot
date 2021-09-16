import TlgBot from 'node-telegram-bot-api';
import axios, { AxiosResponse } from 'axios';
import { dirname, join, basename, resolve } from 'path';
import { URL } from 'url';
import fs from 'fs';
const __dirname: string = dirname(new URL(import.meta.url).pathname);

class Controllers {
  private _TempPath: string = join(__dirname, '../../temp').substring(1);
  
  // this method will fetch data from 9convert.com
  private fetch() {
    
  }
  // this method will download a given video by url into the temp folder.
  public async download(url: string, downloadFolder: string = this._TempPath): Promise<{ success: boolean, path?: string, err?: unknown}> {
    const fileName: string = basename(url);
    const localFilePath: string = resolve(__dirname, downloadFolder, fileName);
      try {
        const response = await axios({
          method: 'GET',
          url: url,
          responseType: 'stream',
        });

    const w: fs.WriteStream = response.data.pipe(fs.createWriteStream(localFilePath));
      w.on('finish', () => {
        console.log('downloaded.') 
      });
        return {
          success: true,
          path: join(this._TempPath, fileName)
        }
    } catch (err) {
        return {
            success: false,
            err: err
        
      }
    }
  }
}

new Controllers().download('https://www.kindacode.com/wp-content/uploads/2021/01/example.mp4', );