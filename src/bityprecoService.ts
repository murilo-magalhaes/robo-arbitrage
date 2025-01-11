import axios, { AxiosError, AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function getBityprecoPrice(): Promise<any> {

  const url = 'https://api.bitpreco.com/btc-brl/ticker';

  let data = {};

  await axios.get(url).then((res: AxiosResponse) => {
    if(res.data){
      data = res.data;
    }
  }).catch((err: AxiosError) => console.error(err))

  return data;
}