export function AdminPermissions({ permissions, onToggle }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6 space-y-3">
      <p className="text-sm uppercase tracking-[0.4em] text-purple-500">Permissões</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {Object.entries(permissions).map(([key, value]) => (
          <label
            key={key}
            className="flex items-center justify-between px-4 py-3 border rounded-2xl border-purple-100 text-sm cursor-pointer hover:border-purple-200 transition"
          >
            <span className="text-slate-600">{key}</span>
            <input type="checkbox" checked={value} onChange={() => onToggle(key)} className="h-4 w-4 text-purple-600" />
          </label>
        ))}
      </div>
    </div>
  )
}
