import dotenv from 'dotenv';
import { getBinancePrices } from './binanceService';
import { getBityprecoPrice } from './bityprecoService';

dotenv.config();

const COINPAIRBINANCE = process.env.COINPAIRBINANCE || '';
const BUY_TRIGGER = parseFloat(process.env.BUY_TRIGGER || '');
const BUY_AMOUNT = parseFloat(process.env.BUY_AMOUNT || '');
const FEE = 1.02;

let profit = 0;
let profitAmount = 0;
let balance = BUY_AMOUNT;

async function runArbitrageBot(){

  console.clear();

  let btcBrlBinance = 0;
  let btcBrlBity = 0;

  try {

    const prices = await getBinancePrices();

    btcBrlBinance = parseFloat(prices[COINPAIRBINANCE]);
    console.log('Preço na Binance', btcBrlBinance);
    
    
    const priceBitypreco = await getBityprecoPrice();
    
    btcBrlBity = priceBitypreco.buy;
    console.log('Preço na Bity', btcBrlBity);

    const moreCheap = btcBrlBinance > btcBrlBity 
    ? {title: 'Bity', value: btcBrlBity} 
    : {title: 'Binance', value: btcBrlBinance};

    const moreExpansive = btcBrlBinance > btcBrlBity 
    ? {title: 'Binance', value: btcBrlBinance}
    : {title: 'Bity', value: btcBrlBity};
    
    // Verifica se o menor preço de compra está abaixo do gatilho de compra
    
    if(moreCheap.value <= BUY_TRIGGER) {
      const _profixAliq = (moreExpansive.value * BUY_AMOUNT / moreCheap.value) - BUY_AMOUNT ;
      const _profix = BUY_AMOUNT * _profixAliq;
  
      if(_profix > 0) {
        profit = _profix;
        profitAmount += profit;

        console.log('Lucro atual: ', profit);
        console.log('Lucro acumulado: ', profitAmount);

        console.log(`Comprando R$${BUY_AMOUNT} na ${moreCheap.title} e vendendo na ${moreExpansive.title}, o lucro esperado é de: R$${_profix.toFixed(4)}`);

        console.log('Efetua compra & venda');

        balance += profit;

        console.log('Saldo', balance);
        

      } else {
        console.log('Nenhuma oportunidade encontrada no momento.');
      } 
    }

  } catch(error) {
    console.error(error);
    process.exit(0);
    
  }
  

}
console.log('Iniciando robô de arbitragem...');

runArbitrageBot();
setInterval(() => {
  runArbitrageBot();
}, 10000)
