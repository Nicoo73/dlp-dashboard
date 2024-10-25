// App.js
import React from 'react';
import GenreChart from './components/GenreChart';

const data = [
  { genre: 'Acción', count: 10 },
  { genre: 'Comedia', count: 15 },
  { genre: 'Drama', count: 8 },
  // Agrega más géneros y sus conteos aquí
];

const App = () => {
  return (
    <div>
      <h1>Géneros más solicitados</h1>
      <GenreChart data={data} />
    </div>
  );
};

export default App;