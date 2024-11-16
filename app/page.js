// page.js
import PendingReturns from "./components/PendingReturns";
import Statistics from "./components/Statistics";
import MostRequestedBooks from "./components/MostRequestedBooks";
import TopReaders from "./components/TopReaders";
import TopDonors from "./components/TopDonors";
import LinesChart from "./components/LineChart";

// Esta función se ejecutará en el servidor
export async function getData() {
  try {
    const response = await fetch("https://dlp-api.vercel.app/prestamos", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }

    const res = await response.json();
    return res.prestamos.length;
  } catch (e) {
    console.error("Error al obtener los datos:", e);
    return 0;
  }
}

export default async function DashboardPage() {
  const totalBorrowedBooks = await getData();

  return (
    <div className="dashboard grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <PendingReturns />
        <LinesChart />
      </div>
      <div className="col-span-1">
        <Statistics totalBorrowedBooks={totalBorrowedBooks} />
      </div>
      <div className="col-span-3">
        <MostRequestedBooks />
      </div>
      <div className="col-span-1 space-y-4">
        <TopReaders />
        <TopDonors />
      </div>
    </div>
  );
}
