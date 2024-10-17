import './styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <nav className="nav-bar">
          <button className="nav-button">Inicio</button>
          <button className="nav-button">Catálogo</button>
          <button className="nav-button">Donaciones</button>
          <button className="nav-button active">Dashboard</button>
          <button className="nav-button">Admin</button>
        </nav>
        <main className="max-w-6xl mx-auto mt-4 p-4">{children}</main>
      </body>
    </html>
  )
}