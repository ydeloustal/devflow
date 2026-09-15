export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'lead' | 'frontend' | 'backend' | 'qa'
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: User | null
  tags: string[]
  estimatedHours: number
  createdAt: string
  completedAt?: string
}

export interface TaskFilterOptions {
  searchQuery: string
  statusFilter: TaskStatus | 'all'
  priorityFilter: TaskPriority | 'all'
  assigneeId: string | 'all'
}