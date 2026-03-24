<template>
  <div class="min-h-screen bg-linear-to-br from-indigo-50 leading-relaxed text-gray-800 to-purple-100 p-4 md:p-8 flex justify-center items-start">
    <div class="w-full max-w-3xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-10 border border-white/50">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">
          Hábitos Diários
        </h1>
        <router-link to="/" class="text-indigo-500 hover:text-indigo-700 font-medium flex items-center gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Voltar
        </router-link>
      </div>

      <!-- Date Navigator -->
      <div class="flex items-center justify-between mb-8 bg-white/60 p-2 md:p-3 rounded-2xl shadow-sm border border-indigo-50">
        <button @click="previousDay" class="p-2 md:p-3 hover:bg-white text-indigo-500 hover:text-indigo-700 rounded-xl transition-all hover:shadow-md active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="text-lg md:text-xl font-bold text-gray-700 capitalize">
          {{ displayDate }}
        </div>
        <button @click="nextDay" :disabled="isSelectedDateToday" class="p-2 md:p-3 hover:bg-white text-indigo-500 hover:text-indigo-700 rounded-xl transition-all hover:shadow-md active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Add habit form -->
      <form @submit.prevent="addHabit" class="flex gap-3 mb-8">
        <input 
          v-model="newHabitTitle" 
          type="text" 
          placeholder="Novo hábito (ex: Beber 2L de água)"
          class="flex-1 px-5 py-4 rounded-xl bg-white/60 border border-indigo-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all placeholder:text-gray-400 text-gray-700 text-lg shadow-inner"
        />
        <button 
          type="submit" 
          :disabled="!newHabitTitle.trim()"
          class="px-6 py-4 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2 text-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          <span class="hidden sm:inline">Adicionar</span>
        </button>
      </form>

      <!-- Habits list -->
      <div v-if="habits.length === 0" class="text-center py-16 text-gray-400 flex flex-col items-center bg-white/40 rounded-2xl border border-dashed border-indigo-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mb-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <p class="text-xl text-gray-500 font-medium mb-2">Nenhum hábito cadastrado ainda.</p>
        <p class="text-md">Que tal começar a construir sua rotina hoje?</p>
      </div>

      <ul v-else class="space-y-4">
        <li 
          v-for="habit in habits" 
          :key="habit.id"
          class="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
          :class="isCompletedOnSelectedDate(habit) ? 'bg-indigo-50/60 border border-indigo-100/50 opacity-80' : 'bg-white shadow-md border border-gray-100'"
          @click="toggleHabit(habit.id)"
        >
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border-2"
            :class="isCompletedOnSelectedDate(habit) ? 'bg-green-500 border-green-500 text-white scale-110 shadow-lg shadow-green-200' : 'bg-gray-50 border-gray-300 text-transparent group-hover:border-indigo-400 group-hover:bg-indigo-50'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300" :class="isCompletedOnSelectedDate(habit) ? 'scale-100' : 'scale-50'" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <span 
            class="flex-1 text-xl font-medium transition-all duration-300"
            :class="isCompletedOnSelectedDate(habit) ? 'text-gray-400 line-through decoration-gray-400/50 decoration-2' : 'text-gray-700'"
          >
            {{ habit.title }}
          </span>

          <button 
            @click.stop="removeHabit(habit.id)"
            class="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 rounded-xl hover:bg-red-50"
            title="Remover hábito"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Habit {
  id: string
  title: string
  completed?: boolean
  completedDates?: string[]
}

// Em um cenário real, isso viria do Supabase. Aqui usaremos localStorage pro mockup inicial
const habits = ref<Habit[]>([])
const newHabitTitle = ref('')
const selectedDate = ref(new Date())

const getLocalISODate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const isSelectedDateToday = computed(() => {
  const today = new Date()
  return selectedDate.value.getDate() === today.getDate() &&
         selectedDate.value.getMonth() === today.getMonth() &&
         selectedDate.value.getFullYear() === today.getFullYear()
})

const displayDate = computed(() => {
  let dateStr = selectedDate.value.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'long' 
  })
  
  return isSelectedDateToday.value ? `Hoje, ${dateStr}` : dateStr
})

const formattedSelectedDate = computed(() => {
  return getLocalISODate(selectedDate.value)
})

const previousDay = () => {
  const newDate = new Date(selectedDate.value)
  newDate.setDate(newDate.getDate() - 1)
  selectedDate.value = newDate
}

const nextDay = () => {
  if (isSelectedDateToday.value) return
  const newDate = new Date(selectedDate.value)
  newDate.setDate(newDate.getDate() + 1)
  selectedDate.value = newDate
}

const isCompletedOnSelectedDate = (habit: Habit) => {
  return habit.completedDates?.includes(formattedSelectedDate.value) ?? false
}

onMounted(() => {
  const saved = localStorage.getItem('@organizador:habits')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      const todayStr = getLocalISODate(new Date())
      
      habits.value = parsed.map((h: Habit) => {
        if (h.completedDates === undefined) {
          h.completedDates = h.completed ? [todayStr] : []
          delete h.completed
        }
        return h
      })
    } catch (e) {
      console.error(e)
    }
  }
})

watch(habits, (newVal) => {
  localStorage.setItem('@organizador:habits', JSON.stringify(newVal))
}, { deep: true })

const addHabit = () => {
  if (!newHabitTitle.value.trim()) return
  
  habits.value.unshift({
    id: crypto.randomUUID(),
    title: newHabitTitle.value.trim(),
    completedDates: []
  })
  
  newHabitTitle.value = ''
}

const toggleHabit = (id: string) => {
  const habit = habits.value.find(h => h.id === id)
  if (habit) {
    if (!habit.completedDates) {
      habit.completedDates = []
    }
    
    const dateStr = formattedSelectedDate.value
    const index = habit.completedDates.indexOf(dateStr)
    
    if (index === -1) {
      habit.completedDates.push(dateStr)
    } else {
      habit.completedDates.splice(index, 1)
    }
  }
}

const removeHabit = (id: string) => {
  habits.value = habits.value.filter(h => h.id !== id)
}
</script>
