import React from "react";

// Función para formatear el nombre y apellido
function formatName(name) {
  // Eliminar puntos, cambiar por un espacio
  name = name.replace(/\./g, " ");

  // Separar el nombre completo en partes
  const parts = name.split(" ");

  // Capitalizar la primera letra de cada nombre y apellido, y poner el resto en minúsculas
  const formattedParts = parts.map((part, index) => {
    if (index === parts.length - 1) {
      // Si es la última parte (apellido), capitalizar solo la primera letra
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  });

  // Volver a unir las partes
  return formattedParts.join(" ");
}

function DonorItem({ icon, user, booksDonated }) {
  return (
    <div className="donors-item">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{icon}</span>
        <span>{user}</span>
      </div>
      <span>N° de libros donados: {booksDonated}</span>
    </div>
  );
}

export default function TopDonors({ topDonors }) {
  return (
    <div className="top-donors">
      <h2 className="text-xl font-bold mb-2">Top Donadores</h2>
      <div className="space-y-1">
        {topDonors.map((e, index) => {
          // Aquí asignamos el icono dependiendo de la posición
          let icon;
          if (index === 0)
            icon = "🥇"; // Oro para el primer lugar
          else if (index === 1)
            icon = "🥈"; // Plata para el segundo
          else if (index === 2)
            icon = "🥉"; // Bronce para el tercero
          else icon = "🏅"; // Para el resto

          // Recortar el correo y formatear el nombre
          const userName = e.donor ? formatName(e.donor.split("@")[0]) : "";

          return (
            <DonorItem
              key={e.donor}
              icon={icon}
              user={userName} // Pasar el nombre formateado
              booksDonated={e.booksDonated}
            />
          );
        })}
      </div>
    </div>
  );
}
