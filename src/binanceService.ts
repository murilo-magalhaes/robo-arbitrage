import Binance  from "binance-api-node";
import dotenv from 'dotenv';

dotenv.config();

const client = Binance({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET
});

export async function getBinancePrices() {
  return await client.prices();
}

export async function getBinanceOrderBook(symbol: string) {
  return await client.book({symbol})
}