<template>
  <DashboardLayout>
    <div class="px-6 lg:px-16 py-8 mx-auto max-w-[1400px] flex flex-col h-full w-full">
      <!-- Header -->
      <div class="w-full mb-10">
        <div class="flex flex-col gap-1">
          <h1 class="text-[#8c3b58] font-bold text-[2rem] md:text-[2.5rem] flex items-center gap-3 leading-none">
             Habit Sanctuary
          </h1>
          <p class="text-[13px] md:text-[15px] font-medium italic font-serif text-[#7a646c] opacity-80 mt-1">Your journey of elegance and discipline</p>
        </div>
      </div>

      <!-- Stats Row top -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full">
        <!-- Mastery -->
        <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-rose-50 flex flex-col justify-center relative overflow-hidden">
           <svg class="absolute -right-8 -bottom-8 w-40 h-40 text-rose-50/60 opacity-50 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 9l7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
           <span class="text-[10px] md:text-[11px] font-black tracking-widest text-[#aea2a7] uppercase mb-4 relative z-10">RITUALS MASTERY</span>
           <span class="text-[3rem] md:text-[3.5rem] font-bold text-[#4a3f44] mb-1 leading-none relative z-10 tracking-tight">{{ monthlyMastery }}%</span>
           <span class="text-[13px] font-medium text-gray-500 mb-4 relative z-10">Monthly Rituals Completion Rate</span>
           <div class="text-[12px] font-bold text-[#8c3b58] flex items-center gap-1.5 relative z-10 mt-auto">
             <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
             Month Overview
           </div>
        </div>

        <!-- Momentum -->
        <div class="bg-[#8c3b58] text-white rounded-[2rem] p-8 shadow-md shadow-[#8c3b58]/20 flex flex-col justify-center relative overflow-hidden">
           <svg class="absolute top-6 right-6 w-8 h-8 text-white/10 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
           <span class="text-[10px] md:text-[11px] font-black tracking-widest text-white/60 uppercase mb-4">MOMENTUM</span>
           <span class="text-[3rem] md:text-[3.5rem] font-bold mb-1 leading-none tracking-tight">{{ monthlyStreak }} Days</span>
           <span class="text-[13px] font-medium text-white/80 mb-4">Highest Blooming Streak (This Month)</span>
           <div class="text-[12px] font-bold text-white flex items-center bg-white/10 px-4 py-2 rounded-full self-start backdrop-blur-sm mt-auto">
             🦋 Monthly Best!
           </div>
        </div>

        <!-- Weekly Intent -->
        <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-rose-50 flex flex-col justify-center">
           <span class="text-[10px] md:text-[11px] font-black tracking-widest text-[#aea2a7] uppercase mb-4">WEEKLY INTENT</span>
           <div class="flex items-end justify-between mb-4">
             <span class="text-[3rem] md:text-[3.5rem] font-bold text-[#4a3f44] leading-none tracking-tight">{{ habits.length === 0 ? 0 : Math.round((weeklyCompleted / weeklyGoal) * 100) }}%</span>
             <span class="text-[14px] font-bold text-[#8c3b58] mb-1.5">{{ weeklyCompleted }}/{{ habits.length === 0 ? 0 : weeklyGoal }}</span>
           </div>
           
           <div class="w-full h-2.5 bg-rose-50 rounded-full overflow-hidden mb-4">
              <div class="h-full bg-[#8c3b58] rounded-full transition-all duration-1000" :style="{ width: `${habits.length === 0 ? 0 : Math.round((weeklyCompleted / weeklyGoal) * 100)}%` }"></div>
           </div>
           
           <span class="text-[13px] font-medium text-gray-500 mt-auto">{{ habits.length === 0 ? 'Add habits to track' : `${Math.max(0, weeklyGoal - weeklyCompleted)} more rituals to reach your weekly goal` }}</span>
        </div>
      </div>

      <!-- Calendar Bento Grid -->
      <div class="w-full bg-white rounded-[2.5rem] p-8 md:p-12 mb-10 shadow-sm border border-rose-50">
        <!-- Calendar Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div class="flex flex-col gap-1">
             <h2 class="text-[1.6rem] md:text-[1.8rem] font-bold text-[#4a3f44] leading-none">Calendar of Rituals</h2>
             <p class="text-[13px] font-medium text-gray-400 mt-1">Visualizing your consistency</p>
          </div>
          <div class="flex items-center justify-center gap-8 text-[#8c3b58] font-bold">
             <button @click="prevMonth" class="text-[12px] flex items-center gap-2 hover:text-rose-400 uppercase transition-colors"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" /></svg> Prev</button>
             <span class="w-36 text-center text-[15px] md:text-[16px] tracking-wide text-[#4a3f44]">{{ currentMonthName }}</span>
             <button @click="nextMonth" class="text-[12px] flex items-center gap-2 hover:text-rose-400 uppercase transition-colors">Next <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>

        <!-- Days Header -->
        <div class="grid grid-cols-7 gap-3 mb-6 w-full" style="display: grid; grid-template-columns: repeat(7, minmax(0, 1fr));">
          <div v-for="day in ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']" :key="day" class="text-center text-[11px] font-black tracking-widest text-[#7a646c]/60">
            {{ day }}
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-3 md:gap-4 mb-10 w-full" style="display: grid; grid-template-columns: repeat(7, minmax(0, 1fr));">
          <div v-for="(dayObj, index) in calendarDays" :key="index" class="w-full flex justify-center">
            <button 
              v-if="dayObj.date"
              @click="gotoHabits(dayObj.date)"
              class="w-full max-w-[130px] mx-auto rounded-[1.2rem] md:rounded-[2.2rem] flex flex-col items-center justify-center text-[15px] md:text-[22px] font-extrabold relative transition-all duration-300 hover:scale-[1.05] cursor-pointer"
              style="aspect-ratio: 1 / 1;"
              :class="getDayClasses(dayObj)"
              :title="`Ver hábitos de ${dayObj.date.toLocaleDateString()}`"
            >
              {{ dayObj.date.getDate() }}
              
              <!-- Sparkle icon if ALL habits met -->
              <svg v-if="dayObj.status === 'ALL_MET'" class="absolute bottom-3 right-3 w-[14px] h-[14px] text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 9l7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
              <!-- Check icon if COMPLETED or PARTIAL -->
              <svg v-else-if="dayObj.status === 'COMPLETED' || dayObj.status === 'PARTIAL'" class="absolute bottom-3 right-3 w-[14px] h-[14px] text-[#8c3b58]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7" /></svg>
            </button>
            <!-- Empty Box (Padding) -->
            <div v-else class="w-full max-w-[130px] mx-auto rounded-[1.2rem] md:rounded-[2.2rem] bg-transparent" style="aspect-ratio: 1 / 1;"></div>
          </div>
        </div>

        <!-- Legend -->
        <div class="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-8 border-t-[1.5px] border-rose-50/50">
           <div class="flex items-center gap-3 text-[12px] md:text-[13px] font-bold tracking-wide text-gray-500">
             <div class="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#f4a7bb]"></div> Ritual Completed (>75%)
           </div>
           <div class="flex items-center gap-3 text-[12px] md:text-[13px] font-bold tracking-wide text-gray-500">
             <div class="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#8c3b58]"></div> All Habits Met (100%)
           </div>
           <div class="flex items-center gap-3 text-[12px] md:text-[13px] font-bold tracking-wide text-gray-500">
             <div class="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#fbe1e8]"></div> Partially Complete (25-75%)
           </div>
           <div class="flex items-center gap-3 text-[12px] md:text-[13px] font-bold tracking-wide text-gray-500">
             <div class="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#f4f0f2]"></div> Rest Day (<25%)
           </div>
        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import { useHabits } from '../composables/useHabits'

const router = useRouter()
const { habits, fetchHabits } = useHabits()

const currentMonthDate = ref(new Date())

const getLocalISODate = (date: Date) => {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

onMounted(() => {
  fetchHabits()
})

const gotoHabits = (date: Date) => {
  router.push(`/habitos?date=${getLocalISODate(date)}`)
}

// Calculations for Stats
const monthlyMastery = computed(() => {
  const year = currentMonthDate.value.getFullYear()
  const month = currentMonthDate.value.getMonth()
  let count = 0
  habits.value.forEach(h => {
    h.completed_dates?.forEach(dateStr => {
      const d = new Date(dateStr + 'T12:00:00')
      if (d.getFullYear() === year && d.getMonth() === month) {
        count++
      }
    })
  })
  
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalPossible = habits.value.length * daysInMonth
  if (totalPossible === 0) return 0
  
  return Math.round((count / totalPossible) * 100)
})

const weeklyCompleted = computed(() => {
  const datesLast7Days = Array.from({length: 7}, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return getLocalISODate(d)
  })
  
  let count = 0
  habits.value.forEach(h => {
    h.completed_dates?.forEach(date => {
      if (datesLast7Days.includes(date)) count++
    })
  })
  return count
})

const weeklyGoal = computed(() => Math.max(habits.value.length * 7, 1))

const monthlyStreak = computed(() => {
  const year = currentMonthDate.value.getFullYear()
  const month = currentMonthDate.value.getMonth()
  const lastDay = new Date(year, month + 1, 0).getDate()
  
  const totalHabitsCount = habits.value.length
  if (totalHabitsCount === 0) return 0
  
  let maxStreak = 0
  let currentStreak = 0
  
  for (let i = 1; i <= lastDay; i++) {
    const d = new Date(year, month, i)
    const iso = getLocalISODate(d)
    
    // Stop counting streak accurately if checking future days
    if (d > new Date()) break
    
    const completedThatDay = habits.value.filter(h => h.completed_dates?.includes(iso)).length
    
    // Only 100% completion counts for streak momentum
    if (completedThatDay > 0 && completedThatDay === totalHabitsCount) {
      currentStreak++
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak
      }
    } else {
      currentStreak = 0
    }
  }
  return maxStreak
})

// Calendar Logic
const currentMonthName = computed(() => {
  return currentMonthDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const prevMonth = () => {
  currentMonthDate.value = new Date(currentMonthDate.value.getFullYear(), currentMonthDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentMonthDate.value = new Date(currentMonthDate.value.getFullYear(), currentMonthDate.value.getMonth() + 1, 1)
}

const calendarDays = computed(() => {
  const year = currentMonthDate.value.getFullYear()
  const month = currentMonthDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  let startDayOfWeek = firstDay.getDay()
  if (startDayOfWeek === 0) startDayOfWeek = 7
  
  const days = []
  
  for (let i = 1; i < startDayOfWeek; i++) {
    days.push({ date: null, status: 'NONE' })
  }
  
  const totalHabitsCount = habits.value.length
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i)
    const iso = getLocalISODate(d)
    
    const completedThatDay = habits.value.filter(h => h.completed_dates?.includes(iso)).length
    const percentage = totalHabitsCount > 0 ? (completedThatDay / totalHabitsCount) : 0
    
    let status = 'NONE'
    
    // Strict logic definition
    if (d > new Date()) {
       status = 'NONE' // Future days
    } else if (percentage === 1 && totalHabitsCount > 0) {
       status = 'ALL_MET'
    } else if (percentage > 0.75) {
       status = 'COMPLETED'
    } else if (percentage >= 0.25) {
       status = 'PARTIAL'
    } else {
       // Only if percentage < 0.25
       status = 'REST'
    }
    
    days.push({ date: d, status })
  }
  return days
})

const getDayClasses = (dayObj: any) => {
  switch(dayObj.status) {
    case 'ALL_MET':
      return 'bg-[#8c3b58] text-white shadow-xl shadow-[#8c3b58]/30 hover:bg-[#7a324b] border-[2px] border-[#8c3b58]'
    case 'COMPLETED': // > 75%
      return 'bg-[#f4a7bb] text-[#8c3b58] hover:bg-[#eea0b4] border-[2px] border-transparent shadow-sm'
    case 'PARTIAL': // 25-75%
      return 'bg-[#fbe1e8] text-[#8c3b58]/80 hover:bg-[#f6d7df] border-[2px] border-transparent'
    case 'REST': // < 25%
      return 'bg-[#f4f0f2] text-[#7a646c]/80 hover:bg-[#ece7e9] border-[2px] border-transparent shadow-sm'
    default: // NONE or Future
      return 'bg-transparent text-[#7a646c]/40 cursor-default hover:scale-100 border-[2px] border-transparent'
  }
}
</script>
