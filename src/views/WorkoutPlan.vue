<template>
  <div class="min-h-screen bg-linear-to-br from-orange-50 leading-relaxed text-gray-800 to-amber-100 p-4 md:p-8 flex justify-center items-start">
    <div class="w-full max-w-4xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-10 border border-white/50">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-600 tracking-tight flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Plano de Treino
        </h1>
        <router-link to="/" class="text-orange-600 hover:text-orange-800 font-medium flex items-center gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Voltar
        </router-link>
      </div>

      <!-- Day Selector -->
      <div class="mb-10 overflow-x-auto pb-2">
        <div class="flex gap-2 min-w-max">
          <button 
            type="button"
            v-for="day in daysOfWeek" 
            :key="day.id"
            @click="selectedDay = day.id"
            class="px-5 py-3 rounded-xl font-bold transition-all text-sm md:text-base cursor-pointer"
            :class="selectedDay === day.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 transform scale-105' : 'bg-white text-gray-500 border border-orange-100 hover:bg-orange-50 hover:text-orange-600'"
          >
            {{ day.label }}
          </button>
        </div>
      </div>

      <!-- Add exercise form -->
      <form @submit.prevent="addExercise" class="flex flex-col gap-4 mb-10 bg-white/60 p-5 md:p-6 rounded-2xl border border-orange-100 shadow-inner">
        <h3 class="font-bold text-gray-700 mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Novo exercício para {{ daysOfWeek.find(d => d.id === selectedDay)?.label }}
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-1">
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Horário</label>
            <input 
              v-model="newExerciseTime" 
              type="time" 
              class="w-full px-4 py-3 rounded-xl bg-white border border-orange-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-gray-700 font-medium"
              required
            />
          </div>
          
          <div class="md:col-span-3">
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Exercício / Descrição</label>
            <input 
              v-model="newExerciseTitle" 
              type="text" 
              placeholder="Ex: Supino Reto 4x12"
              class="w-full px-4 py-3 rounded-xl bg-white border border-orange-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 text-gray-700"
              required
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Link de Apoio (Opcional - YouTube, Imagem, etc)</label>
          <input 
            v-model="newExerciseLink" 
            type="url" 
            placeholder="https://..."
            class="w-full px-4 py-3 rounded-xl bg-white border border-orange-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 text-gray-600 text-sm"
          />
        </div>
        
        <div class="flex justify-end mt-2">
          <button 
            type="submit" 
            :disabled="!isFormValid"
            class="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Adicionar ao Treino
          </button>
        </div>
      </form>

      <!-- Exercise list (Timeline) -->
      <div v-if="filteredExercises.length === 0" class="text-center py-16 text-gray-400 flex flex-col items-center bg-white/40 rounded-2xl border border-dashed border-orange-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mb-4 text-orange-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-xl text-gray-500 font-medium mb-2">Treino livre!</p>
        <p class="text-md">Nenhum exercício planejado para este dia.</p>
      </div>

      <div v-else class="relative border-l-2 border-orange-100 ml-4 md:ml-8 translate-x-3">
        <div 
          v-for="exercise in filteredExercises" 
          :key="exercise.id"
          class="mb-8 relative pl-8 group"
        >
          <!-- Timeline dot -->
          <div 
            class="absolute w-6 h-6 bg-orange-500 rounded-full -left-[13px] top-1 border-4 border-white shadow-md cursor-pointer transition-transform group-hover:scale-125"
            :class="exercise.completed ? 'bg-green-500' : 'bg-orange-500'"
            @click="toggleExercise(exercise.id)"
          ></div>

          <!-- Content Card -->
          <div 
            class="bg-white p-5 rounded-2xl shadow-md border transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-orange-200"
            :class="exercise.completed ? 'border-green-100 opacity-75' : 'border-gray-100'"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="flex items-center gap-3">
                <span class="text-xl font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">
                  {{ exercise.time }}
                </span>
                <button 
                  @click="toggleExercise(exercise.id)"
                  class="text-sm font-medium px-2 py-1 rounded shadow-inner transition-colors"
                  :class="exercise.completed ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                >
                  {{ exercise.completed ? 'Concluído' : 'Pendente' }}
                </button>
              </div>
              <button 
                @click="removeExercise(exercise.id)"
                class="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2 rounded-xl hover:bg-red-50"
                title="Remover exercício"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <h4 
              class="text-lg font-semibold mb-3"
              :class="exercise.completed ? 'text-gray-400 line-through' : 'text-gray-800'"
            >
              {{ exercise.title }}
            </h4>

            <div v-if="exercise.link" class="mt-3">
              <a 
                :href="exercise.link" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ver Referência / Link
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

interface Exercise {
  id: string
  dayId: string
  time: string // HH:MM format
  title: string
  link?: string
  completed: boolean
}

const daysOfWeek = [
  { id: '0', label: 'Domingo' },
  { id: '1', label: 'Segunda' },
  { id: '2', label: 'Terça' },
  { id: '3', label: 'Quarta' },
  { id: '4', label: 'Quinta' },
  { id: '5', label: 'Sexta' },
  { id: '6', label: 'Sábado' }
]

const exercises = ref<Exercise[]>([])
const selectedDay = ref(new Date().getDay().toString())

// Form state
const newExerciseTime = ref('08:00')
const newExerciseTitle = ref('')
const newExerciseLink = ref('')

onMounted(() => {
  const saved = localStorage.getItem('@organizador:workout-plan')
  if (saved) {
    try {
      exercises.value = JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
  }
})

watch(exercises, (newVal) => {
  localStorage.setItem('@organizador:workout-plan', JSON.stringify(newVal))
}, { deep: true })

const filteredExercises = computed(() => {
  return exercises.value
    .filter(e => e.dayId === selectedDay.value)
    .sort((a, b) => a.time.localeCompare(b.time))
})

const isFormValid = computed(() => {
  return newExerciseTitle.value.trim() !== '' && newExerciseTime.value !== ''
})

const addExercise = () => {
  if (!isFormValid.value) return
  
  // Basic URL validation if provided
  let formattedLink = newExerciseLink.value.trim()
  if (formattedLink && !formattedLink.startsWith('http://') && !formattedLink.startsWith('https://')) {
    formattedLink = 'https://' + formattedLink
  }
  
  exercises.value.push({
    id: crypto.randomUUID(),
    dayId: selectedDay.value,
    time: newExerciseTime.value,
    title: newExerciseTitle.value.trim(),
    link: formattedLink || undefined,
    completed: false
  })
  
  // Reset form but keep time for convenience
  newExerciseTitle.value = ''
  newExerciseLink.value = ''
}

const toggleExercise = (id: string) => {
  const exercise = exercises.value.find(e => e.id === id)
  if (exercise) {
    exercise.completed = !exercise.completed
  }
}

const removeExercise = (id: string) => {
  exercises.value = exercises.value.filter(e => e.id !== id)
}
</script>
