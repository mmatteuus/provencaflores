export default function AdminProfile({ admin }) {
  if (!admin) {
    return null
  }

  return (
    <section className="bg-white rounded-3xl shadow-lg p-6 flex gap-6 items-center">
      <img
        src={admin.avatarUrl}
        alt={`${admin.name} avatar`}
        className="w-20 h-20 rounded-full ring-4 ring-purple-100 object-cover"
      />
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">{admin.name}</h1>
        <p className="text-sm text-slate-500">{admin.email}</p>
        <p className="text-xs text-purple-500 uppercase tracking-[0.4em]">{admin.roles.join(' • ')}</p>
        <small className="text-xs text-slate-400">
          Último login: {new Date(admin.lastLogin).toLocaleString()}
        </small>
      </div>
    </section>
  )
}
