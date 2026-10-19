import { Bell, Search, Plus, Menu } from 'lucide-react'

export default function Topbar({ page, search, setSearch, onNewProject, onMenu }) {
  return (
    <header className="flex min-h-[78px] items-center justify-between gap-4 border-b border-[#ececf4] bg-white/80 px-7 py-4 backdrop-blur md:px-9">
      <div className="flex min-w-0 items-center gap-3">
        <button className="icon-btn lg:hidden" onClick={onMenu} aria-label="Toggle navigation"><Menu size={18}/></button>
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[.16em] text-[#9898b1]">Workspace / {page}</div>
          <h1 className="font-display mt-1 truncate text-xl font-extrabold tracking-tight text-[#252541]">{page}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {['Dashboard', 'Projects', 'Tasks'].includes(page) && (
          <div className="relative hidden sm:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1b8]"/>
            <input value={search} onChange={e => setSearch(e.target.value)} className="input w-44 bg-[#fafaff] py-2.5 pl-9 text-xs md:w-56" placeholder="Search anything..."/>
          </div>
        )}
        <button className="icon-btn relative" aria-label="Notifications" title="Notifications"><Bell size={17}/><span className="absolute right-[8px] top-[7px] h-1.5 w-1.5 rounded-full bg-rose-400 ring-2 ring-white"/></button>
        <button onClick={onNewProject} className="btn-primary px-3 py-2.5 text-xs sm:px-4"><Plus size={16}/><span className="hidden sm:inline">New project</span></button>
      </div>
    </header>
  )
}
