import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const blank = { title: '', projectId: '', status: 'Todo', priority: 'Medium', dueDate: '', assignee: 'SC' }
export default function TaskModal({ open, onClose, onSave, task, projects, members }) {
  const [form, setForm] = useState(blank)
  useEffect(() => {
    if (open) setForm(task ? { ...task } : { ...blank, projectId: projects[0]?.id || '' })
  }, [open, task, projects])
  if (!open) return null
  const change = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const submit = e => { e.preventDefault(); if (!form.title.trim()) return; onSave({ ...form, title: form.title.trim() }); onClose() }
  return (
    <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <form className="modal-panel" onSubmit={submit}>
        <div className="mb-6 flex items-start justify-between"><div><h2 className="font-display text-xl font-extrabold">{task ? 'Edit task' : 'Create a task'}</h2><p className="mt-1 text-xs text-[#9292aa]">Break the work into manageable steps.</p></div><button type="button" className="icon-btn" onClick={onClose}><X size={17}/></button></div>
        <div className="space-y-4">
          <label className="block text-xs font-bold text-[#60607b]">Task title *<input className="input mt-2" required value={form.title} onChange={e => change('title', e.target.value)} placeholder="What needs to get done?"/></label>
          <label className="block text-xs font-bold text-[#60607b]">Project<select className="input mt-2" value={form.projectId} onChange={e => change('projectId', e.target.value)}>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs font-bold text-[#60607b]">Status<select className="input mt-2" value={form.status} onChange={e => change('status', e.target.value)}><option>Todo</option><option>In Progress</option><option>Review</option><option>Done</option></select></label>
            <label className="block text-xs font-bold text-[#60607b]">Priority<select className="input mt-2" value={form.priority} onChange={e => change('priority', e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs font-bold text-[#60607b]">Due date<input className="input mt-2" type="date" value={form.dueDate || ''} onChange={e => change('dueDate', e.target.value)}/></label>
            <label className="block text-xs font-bold text-[#60607b]">Assignee<select className="input mt-2" value={form.assignee} onChange={e => change('assignee', e.target.value)}>{members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></label>
          </div>
        </div>
        <div className="mt-7 flex justify-end gap-2"><button type="button" onClick={onClose} className="btn-secondary text-xs">Cancel</button><button className="btn-primary text-xs" type="submit">{task ? 'Save changes' : 'Create task'}</button></div>
      </form>
    </div>
  )
}
