import { useEffect, useMemo } from 'react'
import { DELIVERY_WINDOWS, SAME_DAY_CUTOFF_HOUR, getDefaultDeliveryDateISO, isSameDayStillAvailable } from '@/data/delivery/araguaina'

export default function DeliveryScheduler({ sameDayEligible, value, onChange }) {
  const now = useMemo(() => new Date(), [])
  const sameDayAvailable = sameDayEligible && isSameDayStillAvailable(now)

  useEffect(() => {
    if (!value?.deliveryDate) {
      onChange({
        deliveryDate: getDefaultDeliveryDateISO({ sameDayEligible, now }),
        deliveryWindow: value?.deliveryWindow ?? DELIVERY_WINDOWS[1].id,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const minDate = useMemo(() => {
    return getDefaultDeliveryDateISO({ sameDayEligible, now })
  }, [sameDayEligible, now])

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-900">Agendamento de entrega</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="space-y-1">
          <span className="text-sm text-slate-600">Data</span>
          <input
            type="date"
            min={minDate}
            value={value?.deliveryDate ?? ''}
            onChange={(e) => onChange({ ...value, deliveryDate: e.target.value })}
            className="w-full bg-white border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-600">Janela</span>
          <select
            value={value?.deliveryWindow ?? ''}
            onChange={(e) => onChange({ ...value, deliveryWindow: e.target.value })}
            className="w-full bg-white border border-purple-100 rounded-2xl px-4 py-3 focus:border-purple-300 focus:outline-none"
          >
            {DELIVERY_WINDOWS.map((window) => (
              <option key={window.id} value={window.id}>
                {window.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {sameDayEligible ? (
        <p className="text-xs text-slate-500">
          Entrega hoje {sameDayAvailable ? 'disponível' : 'indisponível'} (cutoff: {SAME_DAY_CUTOFF_HOUR}h).
        </p>
      ) : (
        <p className="text-xs text-slate-500">Este produto requer preparo; apenas entrega agendada.</p>
      )}
    </div>
  )
}

