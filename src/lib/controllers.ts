//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.

import TlgBot from 'node-telegram-bot-api';
import axios, { AxiosResponse } from 'axios';
import { dirname, join, basename, resolve } from 'path';
import { URL } from 'url';
import fs from 'fs';
import qs from 'qs';
import { IFetch, ILinks, IConvert } from '../interfaces/Controllers_interface.js';

const __dirname: string = dirname(new URL(import.meta.url).pathname);

class Controllers {
  private _TempPath: string = join(__dirname, '../../temp').substring(1);
  
  // this method will fetch data from 9convert.com to get the links and the different quality
  public async fetch(url: string, vt: string): Promise<IFetch> {
    try {
      const response: AxiosResponse<any> = await axios({
        method: 'POST',
        url: 'https://9convert.com/api/ajaxSearch/index',
        data: qs.stringify({
          query: url,
          vt: vt
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });
      //getting the links of the video depending on quality of the audio
      let links: ILinks[] = [];
      if (response.data.links.mp3) {
        for (let l in response.data.links) {
          if (response.data.links.hasOwnProperty(l)) {
            const linkArrayIndex = Object.keys(response.data.links[l]);
            for (let i = 0; i <= linkArrayIndex.length -1; i++){
              const index = linkArrayIndex[i]
              const linkObject: ILinks = {
                f: response.data.links['mp3'][index].f,
                q: response.data.links['mp3'][index].q,
                k: response.data.links['mp3'][index].k
              }
              links.push(linkObject);
            }
          }
        }
      }
      
      return {
        status_code: 1,
        status: response.data.status,
        title: response.data.title,
        vid: response.data.vid,
        a: response.data.a,
        links: links,
        mess: response.data.mess,
      }
    } catch (e) {
      console.error(e)
      return {
        status_code: 0,
        status: 'Error, something  related to the request failed, check logs',
        title: '',
        vid: '',
        a: '',
        mess: '',
      }
    }
  }
  // once a get data the key and id of the video, I can POST a givenm endpoint to retrieve the link of the source to download the music from.
  public async convert(vid_id: string, k: string): Promise<IConvert> {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://9convert.com/api/ajaxConvert/convert',
        data: qs.stringify({
          vid: vid_id,
          k: k
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });
      return {
        status_code: 1,
        status: response.data.status,
        mess: response.data.mess,
        c_status: response.data.c_status,
        vid: response.data.vid,
        title: response.data.title,
        ftype: response.data.ftype,
        fquality: response.data.fquality,
        dlink: response.data.dlink
  
      }
    } catch (e) {
      console.error(e);
      return {
        status_code: 0,
        status: '',
        mess: '',
        c_status: '',
        vid: '',
        title: '',
        ftype: '',
        fquality: '',
        dlink: ''
  
      }
    }
  }
  // this method will download a given video / music by url into the temp folder.
  public async download(url: string, downloadFolder: string = this._TempPath): Promise<{ success: boolean, path?: string, err?: unknown}> {
    const fileName: string = basename(url);
    const localFilePath: string = resolve(__dirname, downloadFolder, fileName);
      try {
        const response: AxiosResponse<any> = await axios({
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

const test = new Controllers();
const test2 = await test.fetch('https://youtu.be/T8CNMYdiUEE', 'mp3');
if (test2.vid && test2.links) {
  test.convert(test2.vid, test2.links[4].k)
 }