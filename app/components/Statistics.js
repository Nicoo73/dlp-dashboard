function StatBox({ title, value }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}

export default function Statistics() {
  return (
    <>
      <StatBox title="Total de libros" value="X" />
      <StatBox title="Libros prestados" value="X" />
      <StatBox title="Total de donantes" value="X" />
    </>
  )
}