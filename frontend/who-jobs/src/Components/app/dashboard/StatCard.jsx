export default function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-card p-5 shadow-sm">
      <p className="text-sm text-brand-muted">{title}</p>

      <h3 className="mt-2 text-3xl font-bold text-brand-title">
        {value}
      </h3>
    </div>
  )
}