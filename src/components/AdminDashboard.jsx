export function AdminDashboard({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-3xl shadow py-4 px-6">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Usuários Ativos</p>
        <span className="text-3xl font-bold text-slate-900">{stats.activeUsers}</span>
      </div>
      <div className="bg-white rounded-3xl shadow py-4 px-6">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Alertas do Sistema</p>
        <span className="text-3xl font-bold text-slate-900">{stats.systemAlerts}</span>
      </div>
    </div>
  )
}
