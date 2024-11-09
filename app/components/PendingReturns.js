"use client";

import { useEffect, useState } from "react";

export default function PendingReturns() {
  const [pendingReturns, setPendingReturns] = useState([]);

  useEffect(() => {
    // Datos de ejemplo para pruebas
    const exampleData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      bookTitle: `Libro ${i + 1}`,
      delay: `${Math.floor(Math.random() * 10) + 1} días`,
      user: `Usuario ${i + 1}`
    }));

    setPendingReturns(exampleData);
  }, []);

  return (
    <div className="card">
      <h2>Libros pendientes de devolución</h2>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Libro</th>
              <th>Atraso</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {pendingReturns.map((returnItem) => (
              <tr key={returnItem.id}>
                <td>{returnItem.bookTitle}</td>
                <td className="delay">{returnItem.delay}</td>
                <td>{returnItem.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}