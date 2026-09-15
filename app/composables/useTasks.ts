import type { Task, TaskStatus, User } from '~/types/devflow'

const lead: User = { id: 'u1', name: 'Camille Martin', email: 'camille@devsquad.fr', role: 'lead' }
const frontend: User = { id: 'u2', name: 'Nora Bernard', email: 'nora@devsquad.fr', role: 'frontend' }
const backend: User = { id: 'u3', name: 'Yanis Petit', email: 'yanis@devsquad.fr', role: 'backend' }

const initialTasks: Task[] = [
  { id: 'task-1', title: 'Refondre le tableau de bord client', description: 'Repenser la hiérarchie des informations et intégrer les nouveaux indicateurs de performance.', status: 'in_progress', priority: 'high', assignee: frontend, tags: ['UI', 'Dashboard'], estimatedHours: 12, createdAt: '2026-09-02' },
  { id: 'task-2', title: 'Sécuriser le webhook de paiement', description: 'Ajouter la validation de signature et la gestion des événements rejoués.', status: 'in_review', priority: 'urgent', assignee: backend, tags: ['API', 'Sécurité'], estimatedHours: 8, createdAt: '2026-09-04' },
  { id: 'task-3', title: 'Préparer les tests de recette', description: 'Structurer les scénarios de recette pour la prochaine livraison.', status: 'todo', priority: 'medium', assignee: lead, tags: ['QA', 'Sprint'], estimatedHours: 6, createdAt: '2026-09-08' },
  { id: 'task-4', title: 'Optimiser le chargement initial', description: 'Réduire le poids JavaScript et améliorer les métriques Web Vitals.', status: 'done', priority: 'low', assignee: frontend, tags: ['Performance'], estimatedHours: 5, createdAt: '2026-08-25', completedAt: '2026-09-06' }
]

export const useTasks = () => {
  const taskList = useState<Task[]>('devflow-tasks', () => initialTasks.map((task) => ({ ...task, tags: [...task.tags] })))

  const totalTasks = computed(() => taskList.value.length)
  const completedTasks = computed(() => taskList.value.filter((task) => task.status === 'done').length)
  const pendingTasks = computed(() => totalTasks.value - completedTasks.value)
  const urgentTasks = computed(() => taskList.value.filter((task) => task.priority === 'urgent').length)
  const completionRate = computed(() => totalTasks.value ? Math.round((completedTasks.value / totalTasks.value) * 100) : 0)
  const totalEstimatedHours = computed(() => taskList.value.reduce((total, task) => total + task.estimatedHours, 0))

  const getTaskById = (id: string) => taskList.value.find((task) => task.id === id)

  const addTask = (task: Task) => {
    taskList.value.push(task)
  }

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    const task = getTaskById(id)
    if (task) {
      task.status = status
      task.completedAt = status === 'done' ? new Date().toISOString().slice(0, 10) : undefined
    }
  }

  const deleteTask = (id: string) => {
    taskList.value = taskList.value.filter((task) => task.id !== id)
  }

  return {
    tasks: readonly(taskList),
    totalTasks,
    completedTasks,
    pendingTasks,
    urgentTasks,
    completionRate,
    totalEstimatedHours,
    getTaskById,
    addTask,
    updateTaskStatus,
    deleteTask
  }
}