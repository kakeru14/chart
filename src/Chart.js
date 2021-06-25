import React,{ useEffect, useState } from 'react'
import'./Chart.css'
import { Line } from 'react-chartjs-2'
import axios from 'axios'

const Chart = (props) => {
    const URL = "http://api.marketstack.com/v1/eod";
    const API_KEY = "afca2f529a3ed1df53cc3748998d976d";
    const [stockData,setStockData] = useState({})

    // useEffect(() => {
    //     let data = [];
	// 	let labels = [];

    //     const getStockData = (symbol) => {
    //      axios.get(`${URL}?access_key=${API_KEY}&symbols=${symbol}&date_from=2021-04-17&date_to=2021-06-16&sort=ASC`)
    //         .then(response => 
    //             console.log(response.data)
                
    //         );
    //       }
    //       getStockData('TSLA');
    //   },[]);

    useEffect(() => {
        const getStockData = async(symbol) => {
            let data = []
            let labels = []

            await axios.get(`${URL}?access_key=${API_KEY}&symbols=${symbol}&date_from=2021-04-17&date_to=2021-06-16&sort=ASC`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            
                res.data.data.forEach(stock => {
                    data.push(stock.close)
                    labels.push(stock.date)
                })
            })
            setStockData({
                labels:labels,
                datasets:[{
                    borderColor: 'rgba(35,200,153,1)',
					data: data,
					lineTension: 0,
                }]
            })
        }
        getStockData(props.symbolName)
    },[props.symbolName])

    // const data = {
    //     labels:['1月','2月','3月','4月'],
    //     datasets:[{
    //       borderColor: 'rgba(35,200,153,1)',
    //       data: [100,120,50,110],
    //       lineTension: 0,
    //     }]
    // }
    return (
        <>
        <div className="chart">
            <Line data={stockData}/>
        </div>
        </>
    )
}
export default Chart