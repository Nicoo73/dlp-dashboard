function ReaderItem({ icon, user, booksRead }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{icon}</span>
        <span>{user}</span>
      </div>
      <span>{booksRead}</span>
    </div>
  )
}

export default function TopReaders() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Top Lectores</h2>
      <div className="space-y-1">
        <ReaderItem icon="🥇" user="Usuario" booksRead="Libros Leídos" />
        <ReaderItem icon="🥈" user="Usuario" booksRead="Libros Leídos" />
        <ReaderItem icon="🥉" user="Usuario" booksRead="Libros Leídos" />
      </div>
    </div>
  )
}