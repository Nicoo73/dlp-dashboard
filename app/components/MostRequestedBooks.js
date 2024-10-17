function BookItem({ title, genres, author, loans }) {
  return (
    <div className="book-item">
      <div className="book-cover">portada.png</div>
      <div className="book-info">
        <h3 className="font-semibold">{title}</h3>
        <p>Géneros: {genres}</p>
        <p>Autor: {author}</p>
        <p>N° préstamos: {loans}</p>
      </div>
    </div>
  )
}

export default function MostRequestedBooks() {
  return (
    <div className="card">
      <h2>Libros más pedidos</h2>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        <BookItem title="Título" genres="Géneros" author="Autor" loans="N° préstamos" />
        <BookItem title="Título" genres="Géneros" author="Autor" loans="N° préstamos" />
        <BookItem title="Título" genres="Géneros" author="Autor" loans="N° préstamos" />
      </div>
    </div>
  )
}