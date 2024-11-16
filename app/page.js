// page.js
import PendingReturns from "./components/PendingReturns";
import Statistics from "./components/Statistics";
import MostRequestedBooks from "./components/MostRequestedBooks";
import TopReaders from "./components/TopReaders";
import TopDonors from "./components/TopDonors";
import LinesChart from "./components/LineChart";

async function getTopDonors(res_books, cantidad = 5) {
  const response = await fetch("https://dlp-api.vercel.app/libros");
  const data = await response.json();

  // Crear un objeto para contar los libros donados por cada donante
  const donorCount = {};

  data.libros.forEach((book) => {
    const donante = book.donante;

    if (donante) {
      if (!donorCount[donante]) {
        donorCount[donante] = 0;
      }
      donorCount[donante]++;
    }
  });

  // Convertir el objeto en un array de donantes y sus libros donados
  const sortedDonors = Object.entries(donorCount)
    .map(([donor, booksDonated]) => ({ donor, booksDonated }))
    .sort((a, b) => b.booksDonated - a.booksDonated); // Ordenar por cantidad de libros donados

  // Limitar al top "cantidad" de donantes
  return sortedDonors.slice(0, cantidad);
}

async function getMostRequestedBooks(res_borrowed, currentDate, cantidad = 5) {
  const mostRequestedBooks = [];
  const bookRequestCount = {}; // Aquí almacenamos la cantidad de veces que fue prestado un libro

  // Convertir currentDate a objeto Date
  const currentDateObj = new Date(currentDate);

  // Filtrar y contar los préstamos cuyo fecha_limite haya pasado
  for (const e of res_borrowed.prestamos) {
    const fechaLimite = new Date(e.fecha_limite);

    // Verificar si el préstamo está atrasado (fecha_limite pasada)
    if (fechaLimite < currentDateObj) {
      // Si el libro ya está registrado en el contador, aumentamos el count
      if (!bookRequestCount[e.id_libro]) {
        bookRequestCount[e.id_libro] = 0;
      }
      bookRequestCount[e.id_libro] += 1; // Aumentamos el contador de préstamos para este libro
    }
  }

  // Crear un array con los libros más solicitados, incluyendo la cantidad de veces que fueron prestados
  for (const [bookId, count] of Object.entries(bookRequestCount)) {
    // Obtener el libro de la API
    const res_book = await fetch(
      `https://dlp-api.vercel.app/libros?id=${bookId}`,
    );
    const data = await res_book.json();

    // Asumir que la respuesta contiene un array en 'libros' y tomar el primer libro
    const book = data.libros ? data.libros[0] : null;

    // Verificar que el libro existe antes de agregarlo
    if (book) {
      mostRequestedBooks.push({ book, count });
    }
  }

  // Ordenar los libros por la cantidad de veces prestados (count) en orden descendente
  // Sin modificar el valor de 'count', solo se ordena por el número de veces prestado
  mostRequestedBooks.sort((a, b) => b.count - a.count);

  // Limitar a los primeros "cantidad" libros más prestados
  const topMostRequestedBooks = mostRequestedBooks.slice(0, cantidad);

  return topMostRequestedBooks;
}

async function getTopNReaders(res_borrowed, currentDate, cantidad = 5) {
  const topReaders = [];
  const userRequestCount = {}; // Almacena la cantidad de préstamos por usuario

  // Convertir currentDate a objeto Date
  const currentDateObj = new Date(currentDate);

  // Filtrar y contar los préstamos cuyo fecha_limite haya pasado
  for (const e of res_borrowed.prestamos) {
    const fechaLimite = new Date(e.fecha_limite);

    // Verificar si el préstamo está atrasado (fecha_limite pasada)
    if (fechaLimite < currentDateObj) {
      // Contabilizar las veces que un usuario ha tomado un préstamo
      if (!userRequestCount[e.usuario]) {
        userRequestCount[e.usuario] = 0;
      }
      userRequestCount[e.usuario] += 1; // Aumentamos el contador para este usuario
    }
  }

  // Crear un array con los usuarios más solicitados y la cantidad de veces que han pedido libros
  for (const [userEmail, count] of Object.entries(userRequestCount)) {
    topReaders.push({ userEmail, count });
  }

  // Ordenar los usuarios por la cantidad de préstamos realizados en orden descendente
  topReaders.sort((a, b) => b.count - a.count);

  // Limitar a los primeros "n" usuarios con más préstamos
  const topNReaders = topReaders.slice(0, cantidad);

  return topNReaders;
}

// Esta función se ejecutará en el servidor
export async function getData() {
  try {
    const response_books = await fetch("https://dlp-api.vercel.app/libros", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const response_borrowed = await fetch(
      "https://dlp-api.vercel.app/prestamos",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    if (!response_books.ok)
      throw new Error("Error al obtener los datos de libros");
    if (!response_borrowed.ok)
      throw new Error("Error al obtener los datos de prestamo");

    const res_books = await response_books.json();
    const res_borrowed = await response_borrowed.json();
    const uniqueDonors = [
      ...new Set(res_books.libros.map((book) => book.donante)),
    ];
    /* //same code
    const uniqueDonors = res_books.libros
      .map((book) => book.donante)
      .filter((value, index, self) => self.indexOf(value) === index);
    */

    const currentDate = new Date();
    const pendingBooks = [];

    for (const e of res_borrowed.prestamos) {
      if (e.fecha_limite > currentDate) continue; // Si la fecha límite es mayor, continúa con el siguiente libro.
      const res_book = await fetch(
        `https://dlp-api.vercel.app/libros?id=${e.id_libro}`,
      );
      const book = await res_book.json();
      let actual_book = book.libros[0];
      pendingBooks.push({
        id: e.id_libro,
        title: actual_book.titulo,
        grilla: e.fecha_limite,
        user: e.usuario,
      });
    }

    let cantidad_most = 10;
    const mostRequestedBooks = await getMostRequestedBooks(
      res_borrowed,
      currentDate,
      cantidad_most,
    );

    let cantidad_top_readers = 3;
    const topReaders = await getTopNReaders(
      res_borrowed,
      currentDate,
      cantidad_top_readers,
    );

    let cantidad_top_donors = 3;
    const topDonors = await getTopDonors(res_books, cantidad_top_donors);
    console.log(topDonors);

    return [
      res_books.libros.length,
      res_borrowed.prestamos.length,
      uniqueDonors.length,
      pendingBooks,
      mostRequestedBooks,
      topReaders,
      topDonors,
    ];
  } catch (e) {
    console.error("Error al obtener los datos:", e);
    return 0;
  }
}

export default async function DashboardPage() {
  const [
    totalBooks,
    totalBorrowedBooks,
    totalDonors,
    pendingBooks,
    mostRequestedBooks,
    topReaders,
    topDonors,
  ] = await getData();

  return (
    <div className="dashboard grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <PendingReturns pendingBooks={pendingBooks} />
        <LinesChart />
      </div>
      <div className="col-span-1">
        <Statistics
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
