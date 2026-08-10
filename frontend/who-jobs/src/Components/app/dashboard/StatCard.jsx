export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-200">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800 mt-2">{value}</h3>
    </div>
  )
}