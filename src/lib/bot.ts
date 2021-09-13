//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.

import TlgBot from 'node-telegram-bot-api';
import { getAPIKEY } from '../utils/get_keys.js';

//This class is in charge of the bot's logic.

export default class Bot {
  // you can use your own token to host this bot on your own.
  private TOKEN: string = getAPIKEY() as string;

  private Bot: TlgBot = new TlgBot(this.TOKEN, { polling: true });

  public run() {
    console.log(getAPIKEY)
    this.Bot.onText(/\/info/, (msg: TlgBot.Message) => {
      console.log(msg)
    })
  }

}

