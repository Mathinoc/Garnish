import React from 'react';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';



const data = {
  labels: ["Calories", "Protein", "Calcium", "Fiber", "Fat", "Carbs" ],
  datasets: [{
    data: [20,50,10,30,26,74],
    backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1,
    hoverBorderWidth: 1.4,
    borderRadius: 5,
    inflateAmount: 'auto',
  }]
}
const options = {
  type:'bar',
  plugins:{
    title : {
      display: true,
      text: 'Daily needs',
      fontSize: 20,
      fontStyle: 'bold',
    },
    legend: {
      display: false,
    }
  },
  scales: {
    yAxes: {
      title: {
          display: true,
          text: '%',
          font: {
              size: 15,
              weight: 'bolder',
          }
      },
      ticks: {
        beginAtZero: true,
        stepSize: 20,
      }
    }
  }
}


export default function BarChart() {
  return (
    <div>
      <p>Daily needs</p>
      <Bar data={data} options={options} />
    </div>
  )
}
