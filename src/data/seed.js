export const seedProjects = [
  { id: 'p1', name: 'Portfolio Website', description: 'A personal portfolio to showcase selected work and skills.', color: '#7c6bea', status: 'In Progress', dueDate: '2026-11-05', progress: 70, members: ['SC', 'AM'], createdAt: '2026-10-01' },
  { id: 'p2', name: 'Job Portal', description: 'A simple platform for discovering and tracking job applications.', color: '#39b9a4', status: 'Completed', dueDate: '2026-10-12', progress: 100, members: ['SC', 'RK', 'AM'], createdAt: '2026-09-20' },
  { id: 'p3', name: 'AI PDF Search', description: 'Search and find useful answers inside uploaded PDF documents.', color: '#f1a454', status: 'In Progress', dueDate: '2026-11-18', progress: 45, members: ['SC'], createdAt: '2026-10-04' },
  { id: 'p4', name: 'Study Planner', description: 'Plan study sessions and keep track of weekly goals.', color: '#e77ca4', status: 'Planning', dueDate: '2026-11-24', progress: 15, members: ['SC', 'RK'], createdAt: '2026-10-10' },
]
export const seedTasks = [
  { id: 't1', title: 'Finalize homepage layout', projectId: 'p1', status: 'In Progress', priority: 'High', dueDate: '2026-10-21', assignee: 'SC' },
  { id: 't2', title: 'Build responsive navigation', projectId: 'p1', status: 'Todo', priority: 'Medium', dueDate: '2026-10-23', assignee: 'AM' },
  { id: 't3', title: 'Polish project cards', projectId: 'p1', status: 'Review', priority: 'Low', dueDate: '2026-10-24', assignee: 'SC' },
  { id: 't4', title: 'Fix search filtering', projectId: 'p3', status: 'In Progress', priority: 'High', dueDate: '2026-10-20', assignee: 'SC' },
  { id: 't5', title: 'Prepare sample PDF files', projectId: 'p3', status: 'Todo', priority: 'Medium', dueDate: '2026-10-26', assignee: 'RK' },
  { id: 't6', title: 'Write project documentation', projectId: 'p2', status: 'Done', priority: 'Medium', dueDate: '2026-10-12', assignee: 'AM' },
  { id: 't7', title: 'Create login screen mockup', projectId: 'p4', status: 'Todo', priority: 'Low', dueDate: '2026-10-28', assignee: 'RK' },
  { id: 't8', title: 'Review database schema', projectId: 'p2', status: 'Done', priority: 'High', dueDate: '2026-10-10', assignee: 'SC' },
]
export const teamMembers = [
  { id: 'SC', name: 'You', role: 'Project Lead', email: 'you@example.com', color: '#7865e8' },
  { id: 'AM', name: 'Aarav Mehta', role: 'UI Designer', email: 'aarav@example.com', color: '#3db8a5' },
  { id: 'RK', name: 'Riya Kapoor', role: 'Developer', email: 'riya@example.com', color: '#f1a454' },
]
