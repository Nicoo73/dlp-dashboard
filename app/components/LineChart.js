"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LinearScale,
  CategoryScale,
} from "chart.js";

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

let prestamos = [20, 23, 20, 14, 31, 27, 11, 9, 10, 29, 7, 10];
let reembolsos = [3, 7, 12, 5, 2, 9, 13, 9, 6, 11, 8, 16];
let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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
