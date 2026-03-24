<template>
  <DashboardLayout>
    <div class="px-6 lg:px-10 py-6 md:py-10 max-w-[1200px] mx-auto flex flex-col h-full relative w-full">
      <!-- Title & Date Nav -->
      <div class="grid grid-cols-1 md:grid-cols-3 items-center justify-between mb-10 w-full gap-6">
        <h1 class="text-[#4a3f44] font-bold text-[1.8rem] text-center md:text-left col-span-1">
          Hábitos Diários
        </h1>
        <div class="flex items-center justify-center gap-6 text-[#7a646c] font-bold col-span-1">
           <button @click="previousDay" class="p-2 hover:bg-white rounded-full transition-colors active:scale-90 relative z-10" title="Dia anterior">
              <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/></svg>
           </button>
           <span class="w-48 text-center text-[15px]">{{ displayDate }}</span>
           <button @click="nextDay" :disabled="isSelectedDateToday" class="p-2 hover:bg-white rounded-full transition-colors disabled:opacity-30 active:scale-90 relative z-10" title="Próximo dia">
              <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/></svg>
           </button>
        </div>
        <div class="hidden md:block col-span-1"></div>
      </div>

      <!-- Stats Row -->
      <div class="flex flex-col md:flex-row w-full gap-5 mb-10">
        <!-- Progressive -->
        <div class="flex-1 bg-white rounded-[2rem] p-7 shadow-xs border border-white flex flex-col justify-center">
           <span class="text-[10px] font-black tracking-[0.15em] text-gray-400 uppercase mb-2">PROGRESSO</span>
           <span class="text-[1.8rem] font-bold text-[#8c3b58] mb-6 tracking-tight leading-none">{{ progressPercentage }}% concluído</span>
           <div class="w-full h-3 bg-rose-100 rounded-full overflow-hidden">
              <div class="h-full bg-[#8c3b58] rounded-full transition-all duration-500" :style="{ width: progressPercentage + '%' }"></div>
           </div>
        </div>
        <!-- Daily Goal -->
        <div class="flex-1 bg-rose-50/50 rounded-[2rem] p-7 border border-rose-50 flex items-center justify-between">
           <div class="pr-2">
              <span class="text-[10px] font-black tracking-[0.15em] text-gray-500 uppercase flex items-center gap-2 mb-2">META DIÁRIA</span>
              <p class="text-[12px] text-[#7a646c] font-medium leading-relaxed max-w-[170px]">Faltam apenas {{ uncompletedCount }} rituais para um dia perfeito.</p>
           </div>
           <!-- Circular progress -->
           <div class="relative w-[5rem] h-[5rem] shrink-0">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <!-- Background Circle -->
                <path class="text-white fill-none stroke-current stroke-[2.5]" stroke-dasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <!-- Progress Circle -->
                <path class="text-[#8c3b58] fill-none stroke-current stroke-[2.5]" :stroke-dasharray="`${progressPercentage}, 100`" stroke-linecap="round" style="transition: stroke-dasharray 0.5s ease" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center text-[12px] font-black text-[#4a3f44] tracking-tight">
                {{ completedCount }}/{{ totalCount }}
              </div>
           </div>
        </div>
      </div>

      <!-- Add Ritual Input -->
      <form @submit.prevent="addHabit" class="w-full relative mb-10 shrink-0">
         <input 
          v-model="newHabitTitle" 
          type="text" 
          placeholder="Adicionar um novo ritual..." 
          class="w-full bg-[#e8e3e6]/50 hover:bg-[#e8e3e6]/70 focus:bg-[#e8e3e6]/80 outline-none text-[#4a3f44] text-sm font-semibold rounded-full py-4 pl-6 pr-32 transition-colors placeholder:text-[#a09499]"
         />
         <button 
          type="submit" 
          :disabled="!newHabitTitle.trim()"
          class="absolute py-2.5 px-6 right-2 top-1/2 -translate-y-1/2 bg-[#8c3b58] hover:bg-[#7a324b] text-white text-[12px] font-bold rounded-full transition-colors disabled:opacity-50"
         >
            Adicionar
         </button>
      </form>

      <!-- Habits List -->
      <div class="w-full flex flex-col gap-4 pb-20">
         <div 
          v-for="habit in habits" 
          :key="habit.id"
          @click="toggleHabit(habit.id)"
          class="w-full bg-white rounded-full px-6 py-5 flex items-center justify-between shadow-xs border border-white hover:border-rose-50 hover:shadow-sm transition-all cursor-pointer group"
         >
            <div class="flex items-center gap-5">
               <!-- Checkbox -->
               <div class="w-[26px] h-[26px] rounded-full flex items-center justify-center transition-colors border-[2px]"
                :class="isCompletedOnSelectedDate(habit) ? 'bg-[#8c3b58] border-[#8c3b58] text-white' : 'border-[#aea2a7] text-transparent'">
                  <svg class="w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
               </div>
               
               <div class="flex flex-col gap-0.5">
                 <span class="text-[14px] font-bold transition-all text-[#4a3f44]"
                  :class="isCompletedOnSelectedDate(habit) ? 'opacity-40 line-through decoration-[#4a3f44]/50' : ''">
                    {{ habit.title }}
                 </span>
                 <div class="flex items-center gap-1.5 text-[9px] font-black tracking-widest uppercase text-gray-400 opacity-80"
                  :class="isCompletedOnSelectedDate(habit) ? 'opacity-40' : ''">
                    <svg class="w-[10px] h-[10px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span v-if="habit.subtitle">{{ habit.subtitle }}</span>
                    <span v-else>{{ isCompletedOnSelectedDate(habit) ? 'Realizado' : 'A realizar' }}</span>
                 </div>
               </div>
            </div>
            
            <div v-if="habit.streak" class="px-3 py-1 bg-rose-50 rounded-full text-[10px] font-bold text-[#8c3b58]">
              {{ habit.streak }}
            </div>
         </div>
      </div>
      

      <!-- Bottom center sparkles -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-rose-200/50 pointer-events-none">
         <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 9l7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

interface Habit {
  id: string
  title: string
  completed?: boolean
  completedDates?: string[]
  subtitle?: string
  streak?: string
}

const habits = ref<Habit[]>([])
const newHabitTitle = ref('')
const selectedDate = ref(new Date())

const getLocalISODate = (date: Date) => {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
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

const totalCount = computed(() => habits.value.length)
const completedCount = computed(() => habits.value.filter(isCompletedOnSelectedDate).length)
const uncompletedCount = computed(() => totalCount.value - completedCount.value)
const progressPercentage = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round((completedCount.value / totalCount.value) * 100)
})

onMounted(() => {
  const saved = localStorage.getItem('@organizador:habits')
  if (saved && JSON.parse(saved).length > 0) {
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
  } else {
    // Inject mock data for empty state
    habits.value = [
      { id: crypto.randomUUID(), title: 'tomar remédio', subtitle: '08:00', completedDates: [getLocalISODate(new Date())] },
      { id: crypto.randomUUID(), title: 'beber água (2L)', subtitle: 'EM ANDAMENTO', streak: '2/4', completedDates: [] },
      { id: crypto.randomUUID(), title: 'exercícios físicos', subtitle: '30 MIN', completedDates: [] },
      { id: crypto.randomUUID(), title: 'meditação', subtitle: 'MANHÃ', completedDates: [getLocalISODate(new Date())] },
    ]
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
    if (!habit.completedDates) habit.completedDates = []
    
    const dateStr = formattedSelectedDate.value
    const index = habit.completedDates.indexOf(dateStr)
    
    if (index === -1) habit.completedDates.push(dateStr)
    else habit.completedDates.splice(index, 1)
  }
}
</script>
