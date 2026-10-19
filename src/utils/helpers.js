export const todayISO = () => {
  const date = new Date()
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

export const formatDate = (dateString) => {
  if (!dateString) return 'No date'
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase()

export const projectProgress = (project, tasks) => {
  const related = tasks.filter(task => task.projectId === project.id)
  if (related.length === 0) return Number(project.progress || 0)
  return Math.round((related.filter(task => task.status === 'Done').length / related.length) * 100)
}

export const isOverdue = (date, status) =>
  Boolean(date && date < todayISO() && status !== 'Done' && status !== 'Completed')
