import { LayoutDashboard, FolderKanban, ListTodo, CalendarDays, Users, Settings, Sparkles, ChevronDown, Plus } from 'lucide-react'

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Tasks', icon: ListTodo },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Team', icon: Users },
]
export default function Sidebar({ page, setPage, onNewProject }) {
  return (
    <aside className="sidebar fixed left-0 top-0 z-30 flex h-screen flex-col bg-[#24223f] px-5 py-6 text-white">
      <div className="mb-9 flex items-center gap-3 px-1">
        <div className="sidebar-logo flex h-10 w-10 items-center justify-center rounded-[13px] bg-violet-500 shadow-lg shadow-violet-950/30">
          <Sparkles size={21} strokeWidth={2.3} />
        </div>
        <div className="brand-copy">
          <div className="font-display text-lg font-extrabold tracking-tight">ProjectFlow</div>
          <div className="text-[10px] tracking-wide text-violet-200/65">WORKSPACE</div>
        </div>
      </div>
      <div className="nav-caption mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#777593]">Workspace</div>
      <nav className="flex flex-col gap-1.5">
        {navigation.map(({ label, icon: Icon }) => (
          <button key={label} onClick={() => setPage(label)} className={`nav-link ${page === label ? 'active' : ''}`}>
            <Icon size={18} />
            <span className="nav-label text-[13px] font-semibold">{label}</span>
            {label === 'Tasks' && <span className="nav-label ml-auto rounded-md bg-white/10 px-2 py-0.5 text-[10px]">8</span>}
          </button>
        ))}
      </nav>
      <div className="nav-caption mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#777593]">Personal</div>
      <button onClick={() => setPage('Settings')} className={`nav-link ${page === 'Settings' ? 'active' : ''}`}>
        <Settings size={18} /><span className="nav-label text-[13px] font-semibold">Settings</span>
      </button>
      <div className="workspace-card mt-auto rounded-2xl border border-white/10 bg-white/[.055] p-4">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/20 text-violet-200"><Sparkles size={14}/></span> Pro workspace</div>
        <p className="mb-3 text-[11px] leading-relaxed text-[#a5a3c2]">Keep your projects organized and moving forward.</p>
        <button onClick={onNewProject} className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-white/10 py-2 text-xs font-semibold hover:bg-white/15"><Plus size={14}/> New project</button>
      </div>
      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 text-xs font-bold">SC</div>
        <div className="profile-copy min-w-0 flex-1"><div className="truncate text-xs font-semibold">Shashikant</div><div className="truncate text-[10px] text-[#9997b6]">Free plan</div></div>
        <ChevronDown className="profile-copy text-[#9997b6]" size={15}/>
      </div>
    </aside>
  )
}
