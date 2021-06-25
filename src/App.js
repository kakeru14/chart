// import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import Chart from './Chart'

function App() {
  const URL = "http://api.marketstack.com/v1/tickers";
  const ACCESS_KEY = "afca2f529a3ed1df53cc3748998d976d";
  const [stock,setStockData] = useState({})
  const [stockPrice,setStockPrice] = useState({})
  const [symbolName,setSymbolName] = useState('')

  const createSymbol = e => {
    console.log('task')
    setSymbolName(e.target.value)
}

  useEffect(() => {
    const getStockData = (symbol) => {
      axios.get(`${URL}/${symbol}?access_key=${ACCESS_KEY}`)
        .then(response => {
          console.log(response.data);
          console.log(symbolName);
          setStockData(response.data)
      });
      axios.get(`${URL}/${symbol}/eod/latest?access_key=${ACCESS_KEY}`)
    .then(response => {
        console.log(response.data)
        setStockPrice(response.data);
    })
    }
    getStockData(symbolName);
  },[symbolName]);

  return (
    <div className="App">
      <input onChange={createSymbol} type="text" placeholder="銘柄のシンボル名を入力してください"></input>
      <h1>{ stock.name }</h1>
      <h2>{ stockPrice.close }</h2>
      <Chart symbolName={symbolName}/>
    </div>
  );
}

export default App;
