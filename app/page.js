// Agregando un título y descripción a la página
// Referencia: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata = {
  title: "Home",
  description: "Esta es la página de inicio",
};

export default function Home() {
  return (
    <>
      <div className="container">
        <h1 className="title">Hola mundo!</h1>
        
      </div>
    </>
  );
}
