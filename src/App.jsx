import { useMemo, useState } from 'react'
import { Menu, X, FolderKanban, ListTodo, CalendarDays, Users, LayoutDashboard, CheckCircle2, AlertTriangle } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import ProjectModal from './components/ProjectModal'
import TaskModal from './components/TaskModal'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import TaskBoard from './pages/TaskBoard'
import Calendar from './pages/Calendar'
import Team from './pages/Team'
import Settings from './pages/Settings'
import useLocalStorage from './hooks/useLocalStorage'
import { seedProjects, seedTasks, teamMembers } from './data/seed'

export default function App() {
  const [projects, setProjects] = useLocalStorage('projectflow-projects-v1', seedProjects)
  const [tasks, setTasks] = useLocalStorage('projectflow-tasks-v1', seedTasks)
  const [page, setPage] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)

  const notify = message => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }
  const openNewProject = () => { setEditingProject(null); setProjectModalOpen(true) }
  const openEditProject = project => { setEditingProject(project); setProjectModalOpen(true) }
  const saveProject = form => {
    if (editingProject) {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...form } : p))
      notify('Project updated successfully')
    } else {
      setProjects(prev => [{ ...form, id: `p-${Date.now()}`, progress: 0, createdAt: new Date().toISOString().slice(0,10) }, ...prev])
      notify('Project created successfully')
    }
  }
  const deleteProject = project => setConfirmDelete({ type: 'project', item: project })
  const confirmDeleteItem = () => {
    if (confirmDelete?.type === 'project') {
      setProjects(prev => prev.filter(p => p.id !== confirmDelete.item.id))
      setTasks(prev => prev.filter(t => t.projectId !== confirmDelete.item.id))
      notify('Project and its tasks deleted')
    } else if (confirmDelete?.type === 'task') {
      setTasks(prev => prev.filter(t => t.id !== confirmDelete.item.id))
      notify('Task deleted')
    }
    setConfirmDelete(null)
  }
  const openNewTask = () => {
    if (!projects.length) { notify('Create a project before adding tasks'); setPage('Projects'); return }
    setEditingTask(null); setTaskModalOpen(true)
  }
  const openEditTask = task => { setEditingTask(task); setTaskModalOpen(true) }
  const saveTask = form => {
    if (editingTask) {
      setTasks(prev => prev.map(t => t.id === editingTask.id ? { ...t, ...form } : t))
      notify('Task updated successfully')
    } else {
      setTasks(prev => [{ ...form, id: `t-${Date.now()}` }, ...prev])
      notify('Task created successfully')
    }
  }
  const deleteTask = task => setConfirmDelete({ type: 'task', item: task })
  const changeTaskStatus = (id, status) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  const openProjectDetail = project => { setSearch(project.name); setPage('Tasks') }
  const exportBackup = () => {
    const blob = new Blob([JSON.stringify({ projects, tasks, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'projectflow-backup.json'
    link.click()
    URL.revokeObjectURL(url)
    notify('Backup exported')
  }
  const resetData = () => {
    if (window.confirm('Reset projects and tasks to the original demo data? This cannot be undone.')) {
      setProjects(seedProjects); setTasks(seedTasks); setSearch(''); notify('Demo data restored')
    }
  }
  const pageContent = useMemo(() => {
    const shared = { projects, tasks, search, setSearch, onNewProject: openNewProject, onEditProject: openEditProject, onDeleteProject: deleteProject, onOpenProject: openProjectDetail, onNewTask: openNewTask, onEditTask: openEditTask, onDeleteTask: deleteTask, onStatusChange: changeTaskStatus, setPage }
    switch (page) {
      case 'Projects': return <Projects {...shared}/>
      case 'Tasks': return <Tasks {...shared}/>
      case 'Task Board': return <TaskBoard {...shared}/>
      case 'Calendar': return <Calendar {...shared}/>
      case 'Team': return <Team members={teamMembers}/>
      case 'Settings': return <Settings onExport={exportBackup} onReset={resetData}/>
      default: return <Dashboard {...shared}/>
    }
  }, [page, projects, tasks, search])

  return (
    <div className="app-shell bg-[#f7f8fc]">
      {mobileMenuOpen && <button aria-label="Close menu backdrop" className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMobileMenuOpen(false)}/>}
      <div className={mobileMenuOpen ? 'fixed left-0 top-0 z-40 block lg:hidden' : 'hidden'}><Sidebar page={page} setPage={p=>{setPage(p);setMobileMenuOpen(false)}} onNewProject={()=>{openNewProject();setMobileMenuOpen(false)}}/></div>
      <div className="hidden lg:block"><Sidebar page={page} setPage={setPage} onNewProject={openNewProject}/></div>
      <div className="main-panel min-h-screen lg:ml-[248px] md:ml-[78px] ml-[64px]">
        <Topbar page={page} search={search} setSearch={setSearch} onNewProject={openNewProject} onMenu={()=>setMobileMenuOpen(v=>!v)}/>
        {pageContent}
        <footer className="px-7 pb-7 pt-1 text-center text-[10px] text-[#b0b0c2] md:px-9">Made with focus · ProjectFlow © 2026</footer>
      </div>

      <ProjectModal open={projectModalOpen} onClose={()=>setProjectModalOpen(false)} onSave={saveProject} project={editingProject}/>
      <TaskModal open={taskModalOpen} onClose={()=>setTaskModalOpen(false)} onSave={saveTask} task={editingTask} projects={projects} members={teamMembers}/>
      {confirmDelete && <div className="modal-backdrop"><div className="modal-panel max-w-sm"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600"><AlertTriangle size={22}/></div><h2 className="font-display mt-4 text-center text-lg font-extrabold">Delete {confirmDelete.type}?</h2><p className="mt-2 text-center text-xs leading-relaxed text-[#9292aa]">{confirmDelete.type==='project'?'This also removes the tasks connected to this project.':'This task will be permanently removed from your workspace.'}</p><div className="mt-6 flex justify-center gap-2"><button className="btn-secondary text-xs" onClick={()=>setConfirmDelete(null)}>Cancel</button><button className="rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-700" onClick={confirmDeleteItem}>Delete</button></div></div></div>}
      {toast && <div role="status" className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-xl bg-[#282642] px-4 py-3 text-xs font-semibold text-white shadow-xl"><CheckCircle2 size={16} className="text-emerald-400"/>{toast}</div>}
    </div>
  )
}
