"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
<<<<<<< Updated upstream
import {
  Chart as ChartJS,
=======
<<<<<<< Updated upstream
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
=======
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
>>>>>>> Stashed changes
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
<<<<<<< Updated upstream
  LinearScale,
  CategoryScale,
} from "chart.js";
=======
} from "chart.js";
>>>>>>> Stashed changes
>>>>>>> Stashed changes

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
let prestamos=[20,23,20,14,31,27,11,9,10,29,7,10];
let donaciones=[3,7,12,5,2,9,13,9,6,11,8,16]
let meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
>>>>>>> Stashed changes

let prestamos = [20, 23, 20, 14, 31, 27, 11, 9, 10, 29, 7, 10];
let reembolsos = [3, 7, 12, 5, 2, 9, 13, 9, 6, 11, 8, 16];
let meses = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

let midata = {
  labels: meses,
  datasets: [
    {
      label: "Préstamos",
      data: prestamos,
      tension: 0,
      fill: false,
      borderColor: "rgb(117, 168, 255)",
      backgroundColor: "rgb(117, 168, 255)",
      pointRadius: 6,
      pointBorderColor: "rgb(255, 255, 255)",
      pointBackgroundColor: "rgb(255, 255, 255)",
    },
    {
      label: "Reembolsos",
      data: reembolsos,
      tension: 0,
      fill: false,
      borderColor: "rgb(184,217,255)",
      backgroundColor: "rgb(184, 217, 255)",
      pointRadius: 6,
      pointBorderColor: "rgb(0, 0, 0)",
      pointBackgroundColor: "rgb(0, 0, 0)",
    },
  ],
};

const misoptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#ffffff",
        font: {
          size: 14,
          weight: "bold",
        },
      },
      onClick: (e, legendItem, legend) => {
        const index = legendItem.datasetIndex;
        const chart = legend.chart;

        // Verificar cuántos datasets están visibles
        const visibleDatasets = chart.data.datasets.filter((_, i) =>
          chart.isDatasetVisible(i)
        );

        if (chart.isDatasetVisible(index)) {
          // Si se intenta desactivar un dataset
          if (visibleDatasets.length > 1) {
            chart.setDatasetVisibility(index, false);
          } else {
            // Reactivar automáticamente el otro dataset si es la última línea
            const otherIndex = index === 0 ? 1 : 0;
            chart.setDatasetVisibility(otherIndex, true);
          }
        } else {
          // Reactivar el dataset desactivado
          chart.setDatasetVisibility(index, true);
        }

        chart.update();
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#ffffff",
        font: {
          size: 14,
          weight: "bold",
        },
      },
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
    },
    y: {
      ticks: {
        color: "#ffffff",
      },
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
    },
  },
};

export default function LinesChart() {
<<<<<<< Updated upstream
  return (
    <div
      style={{
        height: "300px",
        backgroundColor: "rgba(24, 24, 32, 0.4)",
        border: "0.15vw solid rgba(0, 0, 0, 0.3)",
        borderRadius: "2vh",
        padding: "10px",
      }}
    >
      <Line data={midata} options={misoptions} />
    </div>
  );
}
=======
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
  
=======

const prestamos = [20, 23, 20, 14, 31, 27, 11, 9, 10, 29, 7, 10];
const donaciones = [3, 7, 12, 5, 2, 9, 13, 9, 6, 11, 8, 16];
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const initialState = {
  labels: meses,
  datasets: [
    {
      label: "Prestamos",
      data: prestamos,
      tension: 0,
      fill: false,
      borderColor: "rgb(255,99,132)",
      backgroundColor: "rgba(255,99,132,0.5)",
      pointRadius: 5,
      pointBorderColor: "rgba(255,99,132)",
      pointBackgroundColor: "rgba(255,99,132)",
      hidden: false,
    },
    {
      label: "Donaciones",
      data: donaciones,
      tension: 0,
      fill: false,
      borderColor: "rgb(51,255,51)",
      backgroundColor: "rgba(51,255,51,0.5)",
      pointRadius: 5,
      pointBorderColor: "rgba(51,255,51)",
      pointBackgroundColor: "rgba(51,255,51)",
      hidden: false,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  onClick: (event, elements, chart) => {
    const datasets = chart.data.datasets;
    const activeDatasets = datasets.filter((ds) => !ds.hidden);
    
    if (activeDatasets.length === 1) {
      const lastActive = activeDatasets[0];
      datasets.forEach((ds) => {
        if (ds !== lastActive) {
          ds.hidden = !ds.hidden;
        }
      });
      chart.update();
    }
  },
};

export default function LinesChart() {
  const [chartData, setChartData] = useState(initialState);

  return (
    <div style={{ height: "400px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
>>>>>>> Stashed changes
>>>>>>> Stashed changes
