function BookItem({ imageData, title, genres, author, loans }) {
  return (
    <div className="book-item">
      {/*<div className="book-cover">portada.png</div>*/}
      <img
        src={`data:image/jpeg;base64,${imageData}`}
        width="100px"
        height="180px"
      />
      <div className="book-info">
        <h3 className="font-semibold">{title}</h3>
        <p>Géneros: {genres}</p>
        <p>Autor: {author}</p>
        <p>N° préstamos: {loans}</p>
      </div>
    </div>
  );
}

export default function MostRequestedBooks({ mostRequestedBooks }) {
  return (
    <div className="card">
      <h2>Libros más pedidos</h2>
      <div style={{ maxHeight: "450px", overflowY: "auto" }}>
        {
          // Usamos un for...in para iterar sobre el array de libros
          mostRequestedBooks.map((e) => (
            <BookItem
              key={e.book.id}
              imageData={e.book.caratula}
              title={e.book.titulo}
              genres={e.book.tags}
              author={e.book.autores}
              loans={e.count}
            />
          ))
        }
      </div>
    </div>
  );
}
