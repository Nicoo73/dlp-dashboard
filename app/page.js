"use client";

import React, { useState } from 'react';
import PendingReturns from './components/PendingReturns';
import Statistics from './components/Statistics';
import MostRequestedBooks from './components/MostRequestedBooks';
import TopReaders from './components/TopReaders';
import TopDonors from './components/TopDonors';
import GenreChart from './components/GenreChart';

const data = [
  { genre: 'Acción', count: 10 },
  { genre: 'Comedia', count: 15 },
  { genre: 'Drama', count: 8 },
  { genre: 'Terror', count: 12 },
  { genre: 'Cuentos', count: 5 },
  // Agrega más géneros y sus conteos aquí
];

export default function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="dashboard grid grid-cols-4 gap-4">
      <div className="col-span-4 flex justify-between items-center space-x-4">
        <button className="nav-button">Inicio</button>
        <button className="nav-button">Catálogo</button>
        <button className="nav-button">Donaciones</button>
        <button className="nav-button">Dashboard</button>
        <button className="nav-button">Admin</button>
        <button onClick={() => setShowChart(!showChart)} className="nav-button">
          Géneros más solicitados
        </button>
      </div>
      {showChart && (
        <div className="col-span-4">
          <GenreChart data={data} />
        </div>
      )}
      <div className="col-span-3">
        <PendingReturns />
      </div>
      <div className="col-span-1">
        <Statistics />
      </div>
      <div className="col-span-3">
        <MostRequestedBooks />
      </div>
      <div className="col-span-1">
        <TopReaders />
      </div>
      <div className="col-span-1">
        <TopDonors />
      </div>
    </div>
  );
}