import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import moment from 'moment';
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );


  const getData=(dates,stock,rate,mrp,deal,free)=>{
    const data = {
        labels: dates,
        datasets: [
          {
            label: "Stock",
            data: stock,
            borderColor: 'red',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: "deal",
            borderColor: 'green',
            backgroundColor: 'rgba(183, 182, 265, 0.5)',
            data: deal
          },
          {
            label: "free",
            borderColor: 'blue',
            backgroundColor: 'rgba(183, 182, 265, 0.5)',
            data: free
          },
          {
            label: "Rate",
            data: rate,
            borderColor: 'yellow',
            backgroundColor: 'rgba(13, 12, 25, 0.5)',
          },
          {
            label: "MRP",
            borderColor: 'orange',
            backgroundColor: 'rgba(183, 182, 265, 0.5)',
            data: mrp
          }
        ]
      };
      return data
  }

export default function Charts({tableData}){

    const [dates,setDates]=useState([]);
    const [stock,setstock]=useState([]);
    const [mrp,setMrp]=useState([]);
    const [rate,setrate]=useState([]);
    const [deal,setDeal]=useState([]);
    const [free, setFree]=useState([])
    useEffect(()=>{

        const dates=[];
        const stock=[];
        const mrp=[];
        const rate=[];
        const deal=[];
        const free=[];
        if(tableData?.length > 0){
            for(let i=0;i<tableData.length;i++){
                dates.push(moment(tableData[i].exp).format("DD/MM/YYYY"))
                stock.push(tableData[i].stock)
                mrp.push(tableData[i].mrp)
                rate.push(tableData[i].rate)
                free.push(tableData[i].free)
                deal.push(tableData[i].deal)
            }
            setDates([...new Set(dates)])
            setMrp(mrp)
            setstock(stock)
            setrate(rate)
            setDeal(deal)
            setFree(free)
        }

    },[tableData])

    
    
      var options = {
        scales: {
            y:
              {
                min: -15,
                max: 600,
                stepSize: 10,
              },
            x:
              {
                stepSize: 6,
              },
          },
        legend: {
          labels: {
            boxWidth: 10
          }
        }
      };
    
    return<div>
        <h4>Chart</h4>
     <Line data={getData(dates,stock,rate,mrp,deal,free)} options={options} />
    </div>
}