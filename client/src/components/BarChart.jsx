import React from 'react';
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { useEffect } from 'react';
import { useState } from 'react';
Chart.register(...registerables);


export default function BarChart({ recipe }) {
  const nutrients = recipe['nutrition'] && recipe['nutrition'].nutrients;
  let collections = ["Calories", "Protein", "Calcium", "Fiber", "Fat", "Carbohydrates"];

  let value = [], labels = [];
  const [chartInfo, setChartInfo] = useState(false);

  useEffect(() => {
    if (nutrients) {
      for (let i = 0; i < nutrients.length; i++) {
        if (collections.includes(nutrients[i].name)) {          
          labels.push(nutrients[i].name);
          value.push(nutrients[i].percentOfDailyNeeds)
        }
      }
      setChartInfo({ labels, value })
    }
  }, [nutrients])

  const labelsSpare = ["Calories", "Protein", "Calcium", "Fiber", "Fat", "Carbohydrates"];
  const dataSpare = [20, 50, 10, 30, 26, 74];

  const data = {
    labels: Object.keys(recipe).length > 0 && chartInfo ? chartInfo.labels : labelsSpare,
    datasets: [{
      data: Object.keys(recipe).length > 0 && chartInfo ? chartInfo.value : dataSpare,

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
    aspectRatio: 1.5,
    type: 'bar',
    plugins: {
      title: {
        display: true,
        fontSize: 20,
        fontStyle: 'bold',
      },
      legend: {
        display: false,
      }
    },
    scales: {
      yAxes: {
        barPercentage: 0.9,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: '% Daily Needs',
          font: {
            size: 15,
          }
        },
        ticks: {
          beginAtZero: true,
          stepSize: 20,
        }
      },
      xAxes: {
        barPercentage: 0.1,
        grid: {
          display: false,
        }
      }
    }
  }
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  )
}
