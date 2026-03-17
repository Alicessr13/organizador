<template>
  <div class="min-h-screen bg-linear-to-br from-teal-50 leading-relaxed text-gray-800 to-emerald-100 p-4 md:p-8 flex justify-center items-start">
    <div class="w-full max-w-4xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-10 border border-white/50">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-emerald-600 tracking-tight">
          Hábitos Semanais
        </h1>
        <router-link to="/" class="text-teal-600 hover:text-teal-800 font-medium flex items-center gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Voltar
        </router-link>
      </div>

      <!-- Add habit form -->
      <form @submit.prevent="addHabit" class="flex flex-col gap-4 mb-10 bg-white/60 p-5 rounded-2xl border border-teal-100 shadow-inner">
        <div>
          <input 
            v-model="newHabitTitle" 
            type="text" 
            placeholder="Novo hábito semanal (ex: Correr 5km)"
            class="w-full px-5 py-4 rounded-xl bg-white border border-teal-100 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 outline-none transition-all placeholder:text-gray-400 text-gray-700 text-lg"
          />
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div class="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <div class="flex gap-2 min-w-max">
              <button 
                type="button"
                v-for="day in daysOfWeek" 
                :key="day.id"
                @click="selectedDay = day.id"
                class="px-4 py-2 rounded-lg font-medium transition-all text-sm"
                :class="selectedDay === day.id ? 'bg-teal-500 text-white shadow-md shadow-teal-200' : 'bg-white text-gray-500 border border-teal-100 hover:bg-teal-50 hover:text-teal-600'"
              >
                {{ day.label }}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="!newHabitTitle.trim()"
            class="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-teal-200 hover:shadow-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Adicionar
          </button>
        </div>
      </form>

      <!-- Habits list -->
      <div v-if="habits.length === 0" class="text-center py-16 text-gray-400 flex flex-col items-center bg-white/40 rounded-2xl border border-dashed border-teal-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mb-4 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-xl text-gray-500 font-medium mb-2">Nenhum hábito semanal cadastrado.</p>
        <p class="text-md">Defina suas metas para a semana!</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="habit in habits" 
          :key="habit.id"
          class="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-default"
          :class="habit.completed ? 'bg-teal-50/60 border border-teal-100/50 opacity-80' : 'bg-white shadow-md border border-gray-100'"
        >
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border-2 cursor-pointer"
            :class="habit.completed ? 'bg-emerald-500 border-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200' : 'bg-gray-50 border-gray-300 text-transparent hover:border-teal-400 hover:bg-teal-50'"
            @click="toggleHabit(habit.id)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300" :class="habit.completed ? 'scale-100' : 'scale-50'" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <div class="flex-1 flex flex-col min-w-0">
            <span 
              class="text-lg font-semibold transition-all duration-300 truncate"
              :class="habit.completed ? 'text-gray-400 line-through decoration-gray-400/50 decoration-2' : 'text-gray-800'"
            >
              {{ habit.title }}
            </span>
            <span class="text-xs font-medium mt-1 truncate max-w-max px-2 py-0.5 rounded-md"
                  :class="getDayBadgeColor(habit.day)">
              {{ getDayLabel(habit.day) }}
            </span>
          </div>

          <button 
            @click="removeHabit(habit.id)"
            class="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 rounded-xl hover:bg-red-50 shrink-0"
            title="Remover hábito"
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
import { ref, onMounted, watch } from 'vue'

interface WeeklyHabit {
  id: string
  title: string
  completed: boolean
  day: string // 'any', '0' (Sun) to '6' (Sat)
}

const daysOfWeek = [
  { id: 'any', label: 'Qualquer dia' },
  { id: '1', label: 'Segunda' },
  { id: '2', label: 'Terça' },
  { id: '3', label: 'Quarta' },
  { id: '4', label: 'Quinta' },
  { id: '5', label: 'Sexta' },
  { id: '6', label: 'Sábado' },
  { id: '0', label: 'Domingo' }
]

const habits = ref<WeeklyHabit[]>([])
const newHabitTitle = ref('')
const selectedDay = ref('any')

onMounted(() => {
  const saved = localStorage.getItem('@organizador:weekly-habits')
  if (saved) {
    try {
      habits.value = JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
  }
})

watch(habits, (newVal) => {
  localStorage.setItem('@organizador:weekly-habits', JSON.stringify(newVal))
}, { deep: true })

const addHabit = () => {
  if (!newHabitTitle.value.trim()) return
  
  habits.value.unshift({
    id: crypto.randomUUID(),
    title: newHabitTitle.value.trim(),
    completed: false,
    day: selectedDay.value
  })
  
  newHabitTitle.value = ''
  selectedDay.value = 'any'
}

const toggleHabit = (id: string) => {
  const habit = habits.value.find(h => h.id === id)
  if (habit) {
    habit.completed = !habit.completed
  }
}

const removeHabit = (id: string) => {
  habits.value = habits.value.filter(h => h.id !== id)
}

const getDayLabel = (dayId: string) => {
  const day = daysOfWeek.find(d => d.id === dayId)
  return day ? day.label : 'Desconhecido'
}

const getDayBadgeColor = (dayId: string) => {
  if (dayId === 'any') return 'bg-gray-100 text-gray-600'
  return 'bg-teal-100 text-teal-800'
}
</script>
