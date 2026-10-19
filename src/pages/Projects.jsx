import { FolderKanban, Plus, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { projectProgress } from '../utils/helpers'

export default function Projects({ projects, tasks, search, setSearch, onNewProject, onEditProject, onDeleteProject, onOpenProject }) {
  const filtered = projects.filter(p => `${p.name} ${p.description} ${p.status}`.toLowerCase().includes(search.toLowerCase()))
  return <div className="main-content space-y-6 p-7 md:p-9">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-[#9292aa]">Manage everything you're building.</p><h2 className="font-display mt-2 text-2xl font-extrabold">All projects <span className="ml-1 rounded-lg bg-violet-50 px-2 py-1 text-sm text-violet-700">{projects.length}</span></h2></div><button className="btn-primary text-xs" onClick={onNewProject}><Plus size={16}/> Create project</button></div>
    <div className="flex flex-wrap items-center gap-3"><div className="relative min-w-[200px] flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1b8]"/><input className="input pl-9" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search projects..."/></div><button className="btn-secondary text-xs" onClick={()=>setSearch('')}><SlidersHorizontal size={15}/> Clear filters</button><span className="text-xs text-[#9898b0]">{filtered.length} results</span></div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">{filtered.map(project=><ProjectCard key={project.id} project={project} progress={projectProgress(project,tasks)} tasks={tasks.filter(t=>t.projectId===project.id)} onEdit={onEditProject} onDelete={onDeleteProject} onOpen={onOpenProject}/>)}</div>
    {filtered.length===0&&<div className="card flex flex-col items-center py-16 text-center"><div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600"><FolderKanban size={24}/></div><h3 className="font-display font-extrabold">No projects found</h3><p className="mt-1 text-xs text-[#9999b0]">Try another search or create a new project.</p><button className="btn-primary mt-4 text-xs" onClick={onNewProject}><Plus size={14}/> New project</button></div>}
  </div>
}
