import { useMemo } from 'react'
import { FolderKanban, ListTodo, CheckCircle2, Clock3, ArrowUpRight, Plus, CalendarDays, MoreHorizontal, TrendingUp } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts'
import StatCard from '../components/StatCard'
import ProjectCard from '../components/ProjectCard'
import { formatDate, isOverdue, projectProgress } from '../utils/helpers'

const chartData = [
  { day: 'Mon', tasks: 4 }, { day: 'Tue', tasks: 7 }, { day: 'Wed', tasks: 5 },
  { day: 'Thu', tasks: 9 }, { day: 'Fri', tasks: 6 }, { day: 'Sat', tasks: 8 }, { day: 'Sun', tasks: 11 },
]
export default function Dashboard({ projects, tasks, setPage, onNewProject, onEditProject, onDeleteProject, onOpenProject, search }) {
  const activeTasks = tasks.filter(t => t.status !== 'Done')
  const completedTasks = tasks.filter(t => t.status === 'Done')
  const overdue = tasks.filter(t => isOverdue(t.dueDate, t.status))
  const visibleProjects = useMemo(() => projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase())), [projects, search])
  const upcoming = [...activeTasks].sort((a,b) => (a.dueDate || '9999').localeCompare(b.dueDate || '9999')).slice(0, 4)
  return (
    <div className="main-content space-y-7 p-7 md:p-9">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><div className="mb-2 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-bold text-violet-700"><span className="h-1.5 w-1.5 rounded-full bg-violet-500"/> YOUR PRODUCTIVITY SPACE</div><h2 className="font-display text-2xl font-extrabold tracking-tight text-[#252541] md:text-[28px]">Good to see you, Shashikant <span>✦</span></h2><p className="mt-2 text-sm text-[#9090a9]">Here's what's happening with your projects today.</p></div>
        <button className="btn-secondary text-xs" onClick={() => setPage('Calendar')}><CalendarDays size={15}/> View calendar</button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total projects" value={projects.length} note="across your workspace" trend="+2 this month" icon={FolderKanban} tone="purple"/>
        <StatCard title="Active tasks" value={activeTasks.length} note="need your attention" trend={`${overdue.length} overdue`} icon={ListTodo} tone="mint"/>
        <StatCard title="Completed tasks" value={completedTasks.length} note="great work so far" trend="Keep it up" icon={CheckCircle2} tone="orange"/>
        <StatCard title="Upcoming deadlines" value={upcoming.length} note="tasks to keep an eye on" trend="Next 7 days" icon={Clock3} tone="pink"/>
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
        <section className="card soft-shadow p-5 md:p-6">
          <div className="flex items-center justify-between"><div><h3 className="font-display text-sm font-extrabold">Weekly activity</h3><p className="mt-1 text-[11px] text-[#9999b0]">Tasks completed throughout the week</p></div><span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-2 text-[10px] font-bold text-emerald-700"><TrendingUp size={13}/> This week</span></div>
          <div className="mt-5 h-[190px] w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}><defs><linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#806bea" stopOpacity={0.22}/><stop offset="95%" stopColor="#806bea" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#a1a1b7', fontSize: 10 }} dy={10}/><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eeeaf9', fontSize: 12 }}/><Area type="monotone" dataKey="tasks" stroke="#806bea" strokeWidth={3} fill="url(#activityFill)" activeDot={{ r: 5, fill: '#806bea', stroke: '#fff', strokeWidth: 2 }}/></AreaChart></ResponsiveContainer></div>
        </section>
        <section className="card soft-shadow p-5 md:p-6">
          <div className="flex items-center justify-between"><div><h3 className="font-display text-sm font-extrabold">Task overview</h3><p className="mt-1 text-[11px] text-[#9999b0]">Your current workload</p></div><button className="icon-btn h-8 w-8" onClick={() => setPage('Tasks')}><ArrowUpRight size={15}/></button></div>
          <div className="mt-6 flex items-center gap-5">
            <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full" style={{ background: `conic-gradient(#7964e8 0 ${tasks.length ? completedTasks.length / tasks.length * 100 : 0}%, #e9e6fc ${tasks.length ? completedTasks.length / tasks.length * 100 : 0}% 100%)` }}><div className="flex h-[94px] w-[94px] flex-col items-center justify-center rounded-full bg-white"><span className="font-display text-2xl font-extrabold">{tasks.length ? Math.round(completedTasks.length / tasks.length * 100) : 0}%</span><span className="text-[9px] text-[#9999b0]">completed</span></div></div>
            <div className="min-w-0 flex-1 space-y-4">{[{label:'Completed',value:completedTasks.length,color:'#7964e8'},{label:'In progress',value:tasks.filter(t=>t.status==='In Progress').length,color:'#39b9a4'},{label:'To do',value:tasks.filter(t=>t.status==='Todo').length,color:'#f1a454'}].map(row=><div key={row.label} className="flex items-center justify-between gap-2"><div className="flex items-center gap-2 text-[11px] text-[#7f7f99]"><span className="h-2 w-2 rounded-full" style={{background:row.color}}/>{row.label}</div><span className="text-xs font-extrabold">{row.value}</span></div>)}</div>
          </div>
        </section>
      </div>
      <section>
        <div className="mb-4 flex items-center justify-between"><div><h3 className="font-display text-base font-extrabold">Recent projects</h3><p className="mt-1 text-xs text-[#9999b0]">A quick look at what you're working on</p></div><button onClick={() => setPage('Projects')} className="flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-800">View all <ArrowUpRight size={14}/></button></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">{visibleProjects.slice(0,3).map(project=><ProjectCard key={project.id} project={project} progress={projectProgress(project,tasks)} tasks={tasks.filter(t=>t.projectId===project.id)} onEdit={onEditProject} onDelete={onDeleteProject} onOpen={onOpenProject}/>)}
          {visibleProjects.length===0 && <div className="card col-span-full p-8 text-center text-sm text-[#8e8ea7]">No projects match your search.</div>}
        </div>
      </section>
      <section className="card soft-shadow p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between"><div><h3 className="font-display text-sm font-extrabold">Upcoming tasks</h3><p className="mt-1 text-[11px] text-[#9999b0]">Stay ahead of your deadlines</p></div><button onClick={() => setPage('Tasks')} className="text-xs font-bold text-violet-600">All tasks <ArrowUpRight className="ml-1 inline" size={13}/></button></div>
        <div className="divide-y divide-[#f0f0f6]">{upcoming.map(task=>{const project=projects.find(p=>p.id===task.projectId);return <div key={task.id} className="flex flex-wrap items-center gap-3 py-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600"><ListTodo size={16}/></div><div className="min-w-0 flex-1"><div className="truncate text-xs font-bold text-[#454560]">{task.title}</div><div className="mt-1 text-[10px] text-[#a0a0b5]">{project?.name || 'Unassigned project'}</div></div><span className={`badge ${task.priority==='High'?'bg-rose-50 text-rose-600':task.priority==='Medium'?'bg-amber-50 text-amber-700':'bg-slate-100 text-slate-600'}`}>{task.priority}</span><div className="flex min-w-[84px] items-center gap-1.5 text-[10px] text-[#8f8fa8]"><CalendarDays size={12}/>{formatDate(task.dueDate)}</div></div>})}{upcoming.length===0&&<p className="py-5 text-center text-xs text-[#9999b0]">No upcoming tasks. You're all caught up!</p>}</div>
      </section>
    </div>
  )
}
