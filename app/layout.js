import './styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <main className="max-w-6xl mx-auto mt-4 p-4">
          <div className="text-center mb-4">
            <img src="logoAdminBlanco1.png" style={{ height: "125px", width: "250px" }} className="mx-auto" />
          </div>
          {children}
        </main>
      </body>
    </html>
  )
}