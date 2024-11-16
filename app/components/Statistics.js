"use client";

function StatBox({ title, value }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default function Statistics( { totalBooks, totalBorrowedBooks, totalDonors } ) {
  return (
    <>
      <StatBox title="Total de libros" value={totalBooks} />
      <StatBox title="Libros prestados" value={totalBorrowedBooks} />
      <StatBox title="Total de donantes" value={totalDonors} />
    </>
  );
}
