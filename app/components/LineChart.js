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
var prestamos=[20,23,20,14,31,27,11,9,10,29,7,10];
var donaciones=[3,7,12,5,2,9,13,9,6,11,8,16]
var meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

var midata={
    labels: meses,
    datasets:[//cada una de las lineas del grafico
        {
            label:"Prestamos",
            data: prestamos,
            tension: 0,
            fill:false,
            boderColor:'rgb(255,99,132)',
            backgroundColor: 'rgba(255,99,132,0.5)',
            pointRadios:5,
            pointBorderColor:'rgba(255,99,132)',
            pointBackgroundColor: 'rgba(255,99,132)',
        },
        {
            label:"Donaciones",
            data: donaciones,
            tension: 0,
            fill:false,
            boderColor:'rgb(51,255,51)',
            backgroundColor: 'rgba(51,255,51,0.5)',
            pointRadios:5,
            pointBorderColor:'rgba(51,255,51)',
            pointBackgroundColor: 'rgba(51,255,51)',
        },
    ],
};
var misoptions={
    responsive: true,
    maintainAspectRatio: false,
    
};
export default function LinesChart(){
    return (
        <div style={{  height: "300px" }}>
          <Line data={midata} options={misoptions} />
        </div>
      );
}