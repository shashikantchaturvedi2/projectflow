import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const blank = { name: '', description: '', status: 'Planning', dueDate: '', color: '#7c6bea', members: ['SC'] }
export default function ProjectModal({ open, onClose, onSave, project }) {
  const [form, setForm] = useState(blank)
  useEffect(() => {
    if (open) setForm(project ? { ...project, members: project.members || ['SC'] } : blank)
  }, [open, project])
  if (!open) return null
  const change = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim()) return
    onSave({ ...form, name: form.name.trim() })
    onClose()
  }
  return (
    <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <form className="modal-panel" onSubmit={submit}>
        <div className="mb-6 flex items-start justify-between"><div><h2 className="font-display text-xl font-extrabold">{project ? 'Edit project' : 'Create a project'}</h2><p className="mt-1 text-xs text-[#9292aa]">Give your next idea a home.</p></div><button type="button" className="icon-btn" onClick={onClose}><X size={17}/></button></div>
        <div className="space-y-4">
          <label className="block text-xs font-bold text-[#60607b]">Project name *<input className="input mt-2" required value={form.name} onChange={e => change('name', e.target.value)} placeholder="e.g. Mobile app redesign"/></label>
          <label className="block text-xs font-bold text-[#60607b]">Description<textarea className="input mt-2 min-h-20 resize-y" value={form.description} onChange={e => change('description', e.target.value)} placeholder="What is this project about?"/></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs font-bold text-[#60607b]">Status<select className="input mt-2" value={form.status} onChange={e => change('status', e.target.value)}><option>Planning</option><option>In Progress</option><option>On Hold</option><option>Completed</option></select></label>
            <label className="block text-xs font-bold text-[#60607b]">Due date<input className="input mt-2" type="date" value={form.dueDate || ''} onChange={e => change('dueDate', e.target.value)}/></label>
          </div>
          <div><div className="mb-2 text-xs font-bold text-[#60607b]">Project color</div><div className="flex gap-3">{['#7c6bea','#39b9a4','#f1a454','#e77ca4','#5b9de8','#4f596f'].map(color => <button key={color} type="button" onClick={() => change('color', color)} className={`h-7 w-7 rounded-full ${form.color === color ? 'ring-2 ring-offset-2 ring-violet-500' : ''}`} style={{ background: color }} aria-label={`Choose ${color}`}/>)}</div></div>
        </div>
        <div className="mt-7 flex justify-end gap-2"><button type="button" onClick={onClose} className="btn-secondary text-xs">Cancel</button><button className="btn-primary text-xs" type="submit">{project ? 'Save changes' : 'Create project'}</button></div>
      </form>
    </div>
  )
}
