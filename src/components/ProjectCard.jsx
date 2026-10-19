import { CalendarDays, Pencil, Trash2, ArrowUpRight } from 'lucide-react'
import AvatarStack from './AvatarStack'
import { formatDate } from '../utils/helpers'

const statusStyle = {
  'In Progress': 'bg-violet-50 text-violet-700',
  Completed: 'bg-emerald-50 text-emerald-700',
  Planning: 'bg-amber-50 text-amber-700',
  'On Hold': 'bg-slate-100 text-slate-600',
}
export default function ProjectCard({ project, progress, tasks, onEdit, onDelete, onOpen }) {
  return (
    <article className="card soft-shadow group p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] text-sm font-extrabold text-white" style={{ background: project.color }}>{project.name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase()}</div>
        <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"><button className="icon-btn h-8 w-8" title="Edit project" onClick={() => onEdit(project)}><Pencil size={14}/></button><button className="icon-btn h-8 w-8" title="Delete project" onClick={() => onDelete(project)}><Trash2 size={14}/></button></div>
      </div>
      <button onClick={() => onOpen(project)} className="block w-full text-left"><h3 className="font-display text-[15px] font-extrabold text-[#2b2b48] hover:text-violet-700">{project.name} <ArrowUpRight className="ml-1 inline text-[#a7a7bc]" size={14}/></h3><p className="mt-1.5 min-h-9 text-xs leading-relaxed text-[#8e8ea7]">{project.description || 'No description added yet.'}</p></button>
      <div className="mt-4 flex items-center justify-between gap-2"><span className={`badge ${statusStyle[project.status] || statusStyle.Planning}`}>{project.status}</span><span className="text-[10px] font-semibold text-[#9a9ab0]">{tasks.length} tasks</span></div>
      <div className="mt-5 flex items-center justify-between text-[11px]"><span className="font-semibold text-[#777791]">Progress</span><span className="font-extrabold text-[#4d4d6a]">{progress}%</span></div>
      <div className="progress-track mt-2"><div className="progress-fill" style={{ width: `${progress}%`, background: project.color }}/></div>
      <div className="mt-5 flex items-center justify-between border-t border-[#f0f0f6] pt-4"><div className="flex items-center gap-1.5 text-[10px] text-[#9999b0]"><CalendarDays size={13}/>{formatDate(project.dueDate)}</div><AvatarStack members={project.members || ['SC']}/></div>
    </article>
  )
}
