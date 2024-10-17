function DonorItem({ icon, user, booksDonated }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{icon}</span>
        <span>{user}</span>
      </div>
      <span>{booksDonated}</span>
    </div>
  )
}

export default function TopDonors() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Top Donadores</h2>
      <div className="space-y-1">
        <DonorItem icon="🥇" user="Usuario" booksDonated="Libros Donados" />
        <DonorItem icon="🥈" user="Usuario" booksDonated="Libros Donados" />
        <DonorItem icon="🥉" user="Usuario" booksDonated="Libros Donados" />
      </div>
    </div>
  )
}