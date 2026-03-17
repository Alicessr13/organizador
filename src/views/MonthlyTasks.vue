<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 leading-relaxed text-gray-800 to-indigo-100 p-4 md:p-8 flex justify-center items-start">
    <div class="w-full max-w-4xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-10 border border-white/50">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 tracking-tight">
          Tarefas Mensais
        </h1>
        <router-link to="/" class="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Voltar
        </router-link>
      </div>

      <!-- Add task form -->
      <form @submit.prevent="addTask" class="flex flex-col gap-4 mb-10 bg-white/60 p-5 rounded-2xl border border-blue-100 shadow-inner">
        <div>
          <input 
            v-model="newTaskTitle" 
            type="text" 
            placeholder="Nova tarefa mensal (ex: Pagar conta de luz)"
            class="w-full px-5 py-4 rounded-xl bg-white border border-blue-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 text-gray-700 text-lg"
          />
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
            <div class="flex gap-2">
              <button 
                type="button"
                @click="dayType = 'any'"
                class="px-4 py-2 rounded-lg font-medium transition-all text-sm"
                :class="dayType === 'any' ? 'bg-blue-500 text-white shadow-md shadow-blue-200' : 'bg-white text-gray-500 border border-blue-100 hover:bg-blue-50 hover:text-blue-600'"
              >
                Qualquer dia
              </button>
              <button 
                type="button"
                @click="dayType = 'specific'"
                class="px-4 py-2 rounded-lg font-medium transition-all text-sm"
                :class="dayType === 'specific' ? 'bg-blue-500 text-white shadow-md shadow-blue-200' : 'bg-white text-gray-500 border border-blue-100 hover:bg-blue-50 hover:text-blue-600'"
              >
                Dia específico
              </button>
            </div>
            
            <div v-if="dayType === 'specific'" class="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-300">
              <span class="text-sm font-medium text-gray-600">Dia:</span>
              <input 
                type="number" 
                min="1" 
                max="31" 
                v-model="specificDay"
                class="w-20 px-3 py-2 rounded-lg bg-white border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-center font-semibold text-gray-700"
              />
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="!isFormValid"
            class="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2 mt-2 sm:mt-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Adicionar
          </button>
        </div>
      </form>

      <!-- Tasks list -->
      <div v-if="tasks.length === 0" class="text-center py-16 text-gray-400 flex flex-col items-center bg-white/40 rounded-2xl border border-dashed border-blue-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mb-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-xl text-gray-500 font-medium mb-2">Nenhuma tarefa mensal cadastrada.</p>
        <p class="text-md">Planeje seu mês!</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="task in tasks" 
          :key="task.id"
          class="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-default"
          :class="task.completed ? 'bg-blue-50/60 border border-blue-100/50 opacity-80' : 'bg-white shadow-md border border-gray-100'"
        >
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border-2 cursor-pointer"
            :class="task.completed ? 'bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-200' : 'bg-gray-50 border-gray-300 text-transparent hover:border-blue-400 hover:bg-blue-50'"
            @click="toggleTask(task.id)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300" :class="task.completed ? 'scale-100' : 'scale-50'" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <div class="flex-1 flex flex-col min-w-0">
            <span 
              class="text-lg font-semibold transition-all duration-300 truncate"
              :class="task.completed ? 'text-gray-400 line-through decoration-gray-400/50 decoration-2' : 'text-gray-800'"
            >
              {{ task.title }}
            </span>
            <span class="text-xs font-medium mt-1 truncate max-w-max px-2 py-0.5 rounded-md"
                  :class="getDayBadgeColor(task.day)">
              {{ getDayLabel(task.day) }}
            </span>
          </div>

          <button 
            @click="removeTask(task.id)"
            class="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 rounded-xl hover:bg-red-50 shrink-0"
            title="Remover tarefa"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

interface MonthlyTask {
  id: string
  title: string
  completed: boolean
  day: string // 'any' or string number '1' to '31'
}

const tasks = ref<MonthlyTask[]>([])
const newTaskTitle = ref('')
const dayType = ref<'any' | 'specific'>('any')
const specificDay = ref<number>(1)

onMounted(() => {
  const saved = localStorage.getItem('@organizador:monthly-tasks')
  if (saved) {
    try {
      tasks.value = JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
  }
})

watch(tasks, (newVal) => {
  localStorage.setItem('@organizador:monthly-tasks', JSON.stringify(newVal))
}, { deep: true })

const isFormValid = computed(() => {
  if (!newTaskTitle.value.trim()) return false
  if (dayType.value === 'specific') {
    return specificDay.value >= 1 && specificDay.value <= 31
  }
  return true
})

const addTask = () => {
  if (!isFormValid.value) return
  
  tasks.value.unshift({
    id: crypto.randomUUID(),
    title: newTaskTitle.value.trim(),
    completed: false,
    day: dayType.value === 'any' ? 'any' : String(specificDay.value)
  })
  
  newTaskTitle.value = ''
  dayType.value = 'any'
  specificDay.value = 1
}

const toggleTask = (id: string) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.completed = !task.completed
  }
}

const removeTask = (id: string) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

const getDayLabel = (day: string) => {
  if (day === 'any') return 'Qualquer dia do mês'
  return `Dia ${day}`
}

const getDayBadgeColor = (day: string) => {
  if (day === 'any') return 'bg-gray-100 text-gray-600'
  return 'bg-blue-100 text-blue-800'
}
</script>
