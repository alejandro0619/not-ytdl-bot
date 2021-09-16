//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.
import dotenv from 'dotenv';

// Note this function is getting the /.env (.env in the root of your project) path as a param by default.
// By the way you can pass a custom path if your .env is not on the root.

export function getAPIKEY(path: string = '.env'): string | Error | undefined {
  const api_key: dotenv.DotenvConfigOutput = dotenv.config({path});
  if (api_key['parsed']) {
    return api_key['parsed']['TELEGRAM_BOT_API_KEY']
  } else {

    return api_key['error'];
  }
}

