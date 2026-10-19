export default function StatCard({ title, value, note, icon: Icon, tone = 'purple', trend }) {
  const tones = {
    purple: { bg: '#f0edff', color: '#755fe7', bar: '#806bea' },
    mint: { bg: '#e5f8f3', color: '#2ca88f', bar: '#3cb9a3' },
    orange: { bg: '#fff2e4', color: '#e69543', bar: '#f0a04e' },
    pink: { bg: '#ffedf4', color: '#dd729c', bar: '#e77da4' },
  }
  const c = tones[tone]
  return (
    <div className="card soft-shadow p-5">
      <div className="flex items-start justify-between">
        <div><p className="text-xs font-semibold text-[#8888a2]">{title}</p><div className="font-display mt-3 text-[30px] font-extrabold leading-none tracking-tight text-[#252541]">{value}</div></div>
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px]" style={{ background: c.bg, color: c.color }}><Icon size={20}/></div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-[10px]"><span className="font-bold" style={{ color: c.color }}>{trend}</span><span className="text-[#9b9bb2]">{note}</span></div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#f1f0f7]"><div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(12, Number(value) * 4))}%`, background: c.bar }}/></div>
    </div>
  )
}
