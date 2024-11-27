// page.js
import PendingReturns from "./components/PendingReturns";
import Statistics from "./components/Statistics";
import MostRequestedBooks from "./components/MostRequestedBooks";
import TopReaders from "./components/TopReaders";
import TopDonors from "./components/TopDonors";
import LinesChart from "./components/LineChart";

async function getData() {
  try {
    const response_books = await fetch("https://dlp-api.vercel.app/libros", {
      next: { revalidate: 300 }, // Revalida cada 300 segundos
    });

    const response_borrowed = await fetch(
      "https://dlp-api.vercel.app/prestamos",
      { next: { revalidate: 300 } },
    );

    if (!response_books.ok) {
      throw new Error("Error al obtener los datos de libros");
    }
    if (!response_borrowed.ok) {
      throw new Error("Error al obtener los datos de préstamos");
    }

    const res_books = await response_books.json();
    const res_borrowed = await response_borrowed.json();

    const uniqueDonors = [
      ...new Set(res_books.libros.map((book) => book.donante)),
    ];

    const currentDate = new Date();

    const pendingBooks = await Promise.all(res_borrowed.prestamos
      .filter((e) => new Date(e.fecha_limite) < currentDate)
      .map(async (e) => {
        // Obtener el libro correspondiente usando el id
        const res_book = await fetch(`https://dlp-api.vercel.app/libros?id=${e.id_libro}`);
        const bookData = await res_book.json();
        const book = bookData.libros ? bookData.libros[0] : null;
    
        return book ? {
          id: book.id,
          title: book.titulo,
          grilla: e.fecha_limite,
          user: e.usuario,
        } : null;
      })
    );
    
    // Filtrar los libros que no se encontraron
    const filteredPendingBooks = pendingBooks.filter(book => book !== null);

    const mostRequestedBooks = await getMostRequestedBooks(
      res_borrowed,
      currentDate,
      10,
    );

    const topReaders = await getTopNReaders(res_borrowed, currentDate, 3);
    const topDonors = await getTopDonors(res_books, 3);

    return {
      totalBooks: res_books.libros.length,
      totalBorrowedBooks: res_borrowed.prestamos.length,
      totalDonors: uniqueDonors.length,
      pendingBooks,
      mostRequestedBooks,
      topReaders,
      topDonors,
    };
  } catch (e) {
    console.error("Error al obtener los datos:", e);
    return { error: "Error al cargar los datos" };
  }
}

async function getTopDonors(res_books, cantidad = 5) {
  const donorCount = {};

  res_books.libros.forEach((book) => {
    const donante = book.donante;

    if (donante) {
      if (!donorCount[donante]) {
        donorCount[donante] = 0;
      }
      donorCount[donante]++;
    }
  });

  const sortedDonors = Object.entries(donorCount)
    .map(([donor, booksDonated]) => ({ donor, booksDonated }))
    .sort((a, b) => b.booksDonated - a.booksDonated);

  return sortedDonors.slice(0, cantidad);
}

async function getMostRequestedBooks(res_borrowed, currentDate, cantidad = 5) {
  const mostRequestedBooks = [];
  const bookRequestCount = {};

  for (const e of res_borrowed.prestamos) {
    const fechaLimite = new Date(e.fecha_limite);

    if (fechaLimite < currentDate) {
      if (!bookRequestCount[e.id_libro]) {
        bookRequestCount[e.id_libro] = 0;
      }
      bookRequestCount[e.id_libro] += 1;
    }
  }

  for (const [bookId, count] of Object.entries(bookRequestCount)) {
    const res_book = await fetch(`https://dlp-api.vercel.app/libros?id=${bookId}`);
    const data = await res_book.json();
    const book = data.libros ? data.libros[0] : null;

    if (book) {
      mostRequestedBooks.push({ book, count });
    }
  }

  mostRequestedBooks.sort((a, b) => b.count - a.count);
  return mostRequestedBooks.slice(0, cantidad);
}

async function getTopNReaders(res_borrowed, currentDate, cantidad = 5) {
  const topReaders = [];
  const userRequestCount = {};

  for (const e of res_borrowed.prestamos) {
    const fechaLimite = new Date(e.fecha_limite);

    if (fechaLimite < currentDate) {
      if (!userRequestCount[e.usuario]) {
        userRequestCount[e.usuario] = 0;
      }
      userRequestCount[e.usuario] += 1;
    }
  }

  for (const [userEmail, count] of Object.entries(userRequestCount)) {
    topReaders.push({ userEmail, count });
  }

  topReaders.sort((a, b) => b.count - a.count);
  return topReaders.slice(0, cantidad);
}

export default async function DashboardPage() {
  const {
    totalBooks,
    totalBorrowedBooks,
    totalDonors,
    pendingBooks,
    mostRequestedBooks,
    topReaders,
    topDonors,
    error,
  } = await getData();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <PendingReturns pendingBooks={pendingBooks} />
        <LinesChart />
      </div>
      <div className="col-span-1">
        <Statistics
          totalPendingReturns={pendingBooks.length}
          totalBooks={totalBooks}
          totalBorrowedBooks={totalBorrowedBooks}
          totalDonors={totalDonors}
        />
      </div>
      <div className="col-span-3">
        <MostRequestedBooks mostRequestedBooks={mostRequestedBooks} />
      </div>
      <div className="col-span-1 space-y-4">
        <TopReaders topReaders={topReaders} />
        <TopDonors topDonors={topDonors} />
      </div>
    </div>
  );
}
