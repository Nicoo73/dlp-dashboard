import './styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <main className="max-w-6xl mx-auto mt-4 p-4">{children}</main>
      </body>
    </html>
  )
}