export default function PendingReturns() {
  return (
    <div className="card">
      <h2>Libros pendientes de devolución</h2>
      <table>
        <thead>
          <tr>
            <th>Libro</th>
            <th>Atraso</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Título 1</td>
            <td className="delay">5 días 13 horas</td>
            <td>Usuario 1</td>
          </tr>
          <tr>
            <td>Título 2</td>
            <td className="delay">3 días 5 horas</td>
            <td>Usuario 2</td>
          </tr>
          <tr>
            <td>Título 3</td>
            <td className="delay">3 días 5 horas</td>
            <td>Usuario 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}