"use client";

import { Line } from "react-chartjs-2";
import{
    Chart as ChartJS,
    CatregoryScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LinearScale,
    CategoryScale, 
}from "chart.js";
import { color } from "@chakra-ui/react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,   
);
let prestamos=[20,23,20,14,31,27,11,9,10,29,7,10];
let donaciones=[3,7,12,5,2,9,13,9,6,11,8,16]
let meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

let midata={
    labels: meses,
    datasets:[//cada una de las lineas del grafico
        {
            label:"Prestamos",
            
            data: prestamos,
            tension: 0,
            fill:false,
            borderColor:'rgb(117, 168, 255)',
            backgroundColor: 'rgb(117, 168, 255)',
            pointRadios:6,
            pointBorderColor:'rgb(255, 255, 255)',
            pointBackgroundColor: 'rgb(255, 255, 255)',
            
        },
        {
            label:"Donaciones",
            data: donaciones,
            tension: 0,
            fill:false,
            borderColor:"rgb(184,217,255)",
            backgroundColor: 'rgb(184, 217, 255)',
            pointRadios:6,
            pointBorderColor:'rgb(0, 0, 0)',
            pointBackgroundColor: 'rgb(0, 0, 0)',
        },
    ],
};
const misoptions = {
    responsive: true,
    maintainAspectRatio: false,

    
    
    plugins: {
        legend: {
          labels: {
            color: '#ffffff', // Color de los labels (Prestamos, Donaciones)
            font: {
              size: 14, // Tamaño de fuente
              weight: 'bold', // Peso de fuente
            },
          },
          onClick: (e, legendItem, legend) => {
        const index = legendItem.datasetIndex;
        const chart = legend.chart;

        // Forzar siempre a mostrar los datasets
        if (chart.isDatasetVisible(index)) {
          chart.show(index);
        } else {
          chart.show(index);
        }
      },
        },
      },
    scales: {
      x: {
        ticks: {
          color: '#ffffff', // Color de los labels (meses) en el eje X
          font: {
            size: 14, // Tamaño de fuente
            weight: 'bold', // Peso de fuente
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Color de las líneas del grid
        },
      },
      y: {
        ticks: {
          color: '#ffffff', // Color de los labels en el eje Y
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    
  };

export default function LinesChart() {
    return (
      <div
        style={{
          height: "300px",
          backgroundColor: "rgba(24, 24, 32, 0.4)",
          border: "0.15vw solid rgba(0, 0, 0, 0.3)", // Borde con opacidad
          borderRadius: "2vh", // Radio del borde
          padding: "10px",
        }}
      >
        <Line data={midata} options={misoptions} />
      </div>
    );
  }
  