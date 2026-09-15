import type { Task, TaskPriority, TaskStatus } from '~/types/devflow'
import type { DeepReadonly } from 'vue'

export const useTaskFilters = (tasks: { readonly value: readonly DeepReadonly<Task>[] }) => {
  const searchQuery = ref('')
  const selectedStatus = ref<TaskStatus | 'all'>('all')
  const selectedPriority = ref<TaskPriority | 'all'>('all')
  const selectedAssigneeId = ref<string | 'all'>('all')

  const filteredTasks = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()

    return tasks.value.filter((task) => {
      const matchesSearch = !query || `${task.title} ${task.description} ${task.tags.join(' ')}`.toLowerCase().includes(query)
      const matchesStatus = selectedStatus.value === 'all' || task.status === selectedStatus.value
      const matchesPriority = selectedPriority.value === 'all' || task.priority === selectedPriority.value
      const matchesAssignee = selectedAssigneeId.value === 'all' || task.assignee?.id === selectedAssigneeId.value
      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
    })
  })

  const resetFilters = () => {
    searchQuery.value = ''
    selectedStatus.value = 'all'
    selectedPriority.value = 'all'
    selectedAssigneeId.value = 'all'
  }

  return { searchQuery, selectedStatus, selectedPriority, selectedAssigneeId, filteredTasks, resetFilters }
}