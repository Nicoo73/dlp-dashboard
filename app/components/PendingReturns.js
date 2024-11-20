"use client";

import { useEffect, useState } from "react";


function AtrasoLibro({ fechaLimite }) {
  const [diasAtraso, setDiasAtraso] = useState(0);

  useEffect(() => {
    const calcularAtraso = () => {
      const fechaLimiteDate = new Date(fechaLimite); // Convertir la fecha límite en un objeto Date
      const fechaActual = new Date(); // Fecha actual
      const diferencia = fechaActual - fechaLimiteDate; // Diferencia en milisegundos
      const diasDeAtraso = Math.floor(diferencia / (1000 * 60 * 60 * 24)); // Convertir la diferencia a días
      setDiasAtraso(diasDeAtraso);
    };

    // Calcular el atraso de inmediato
    calcularAtraso();

    // Actualizar cada minuto (60000 ms)
    const intervalo = setInterval(calcularAtraso, 60000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalo);
  }, [fechaLimite]);

  return (
    <td className={`delay ${diasAtraso > 0 ? 'atraso' : 'en-tiempo'}`}>
      {diasAtraso > 0 ? `${diasAtraso} día(s) de atraso` : "En tiempo"}
    </td>
  );
}

export default function PendingReturns({ pendingBooks }) {

  // Calcular los días de atraso para cada libro y añadirlo al objeto del libro
  const librosConAtraso = pendingBooks.map((book) => {
    const fechaLimiteDate = new Date(book.grilla);
    const fechaActual = new Date();
    const diferencia = fechaActual - fechaLimiteDate;
    const diasDeAtraso = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    return { ...book, diasDeAtraso };
  });

  // Ordenar los libros por días de atraso de mayor a menor
  const librosOrdenados = librosConAtraso.sort((a, b) => b.diasDeAtraso - a.diasDeAtraso);
  
return (
    <div className="card">
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Libro</th>
              <th>Atraso</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {librosOrdenados.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <AtrasoLibro fechaLimite={book.grilla} />
                <td>{book.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
