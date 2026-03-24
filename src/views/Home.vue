<template>
  <DashboardLayout>
    <div class="max-w-[1200px]">
      <!-- Big Greeting -->
      <div class="mb-10 max-w-4xl">
        <h1 class="text-[#8c3b58] font-serif font-extrabold text-5xl md:text-7xl leading-[1] tracking-tight mb-2">
          Bonjour, {{ user?.email?.split('@')[0] || 'Alice' }}.
        </h1>
        <p class="text-[1.3rem] italic text-[#8c3b58]/80 font-serif">
          "A dream is a wish your heart makes."
        </p>
      </div>

      <!-- Bento Grid (Copied from previous Home.vue) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min pb-20 items-start">
        
        <!-- Column 1 -->
        <div class="flex flex-col gap-6 w-full">
          <!-- Hábitos Diários -->
          <router-link to="/habitos" class="bg-white rounded-[2rem] p-7 shadow-sm shadow-rose-100/50 border border-white hover:border-rose-100 hover:shadow-xl hover:shadow-rose-100 transition-all group flex flex-col h-[320px]">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-[#8c3b58] group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/></svg>
                </div>
                <h3 class="font-bold text-[#8c3b58] text-[1.4rem]">Hábitos Diários</h3>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-rose-100" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 9l7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
            </div>

            <!-- Habits List -->
            <div class="flex-1 flex flex-col justify-end gap-3" v-if="displayHabits.length > 0">
              <template v-for="(habit, index) in displayHabits" :key="habit.id">
                <div class="flex items-center justify-between" :class="{'opacity-60': isCompletedToday(habit)}">
                  <div class="flex items-center gap-4">
                    <div class="w-6 h-6 rounded-full flex items-center justify-center transition-colors" 
                         :class="isCompletedToday(habit) ? 'bg-[#8c3b58] text-white' : 'border-[2.5px] border-rose-300 text-transparent'">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span class="text-[15px] font-semibold text-[#4a3f44] transition-all" :class="isCompletedToday(habit) ? 'line-through decoration-[#8c3b58]/50 decoration-2' : ''">
                      {{ habit.title }}
                    </span>
                  </div>
                  <span class="text-[11px] font-bold text-gray-400 tracking-wide">{{ isCompletedToday(habit) ? 'Complete' : (habit.subtitle || 'Pendente') }}</span>
                </div>
                <hr class="border-rose-50/80 my-0.5" v-if="index < displayHabits.length - 1" />
              </template>
            </div>
            <div v-else class="flex-1 flex items-center justify-center text-sm text-[#7a646c]/60 italic font-medium">
              Nenhum ritual hoje.
            </div>

            <div class="mt-8 pt-6 border-t-[1.5px] border-rose-50 flex items-center justify-between">
              <span class="text-[13px] font-bold text-[#7a646c]">Progress: {{ progressPercentage }}%</span>
              <div class="w-32 h-2.5 bg-rose-50 rounded-full overflow-hidden">
                <div class="h-full bg-[#8c3b58] rounded-full transition-all duration-1000" :style="{ width: progressPercentage + '%' }"></div>
              </div>
            </div>
          </router-link>

          <!-- Semanais -->
          <router-link to="/habitos-semanais" class="bg-white rounded-[2rem] p-7 shadow-sm shadow-rose-100/50 border border-white hover:border-rose-100 hover:shadow-xl transition-all flex flex-col gap-5 group">
             <div class="flex items-center gap-3 mb-1">
               <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8c3b58]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               <h3 class="font-bold text-[#8c3b58] text-[1.4rem]">Semanais</h3>
             </div>
             <div class="flex gap-4">
               <div class="flex-1 bg-[#faf6f7] rounded-[1.2rem] p-5 flex flex-col justify-center border border-rose-50">
                  <span class="text-[13px] font-bold text-[#4a3f44] leading-tight mb-2">Flower Market Visit</span>
                  <span class="text-[9px] font-black text-gray-400 tracking-widest uppercase">Saturday Morning</span>
               </div>
               <div class="flex-1 bg-[#faf6f7] rounded-[1.2rem] p-5 flex flex-col justify-center border border-rose-50">
                  <span class="text-[13px] font-bold text-[#4a3f44] leading-tight mb-2">Wardrobe Refresh</span>
                  <span class="text-[9px] font-black text-gray-400 tracking-widest uppercase">Pending</span>
               </div>
             </div>
          </router-link>

          <!-- Mensais & Desejos -->
          <div class="flex gap-6">
             <router-link to="/tarefas-mensais" class="flex-1 bg-white rounded-[2rem] p-6 shadow-sm shadow-rose-100/50 hover:shadow-xl transition-all border border-white hover:border-rose-100">
                <div class="flex items-center gap-3 mb-5">
                   <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8c3b58]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                   <h3 class="font-bold text-[#8c3b58] text-[1.1rem]">Mensais</h3>
                </div>
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-3">
                     <div class="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg></div>
                     <span class="text-[13px] font-semibold text-gray-500 line-through">Pay rent</span>
                  </div>
                  <div class="flex items-center gap-3">
                     <div class="w-4 h-4 rounded-full border border-gray-400"></div>
                     <span class="text-[13px] font-semibold text-[#4a3f44]">Self-care day</span>
                  </div>
                </div>
             </router-link>
             
             <router-link to="/lista-de-desejos" class="flex-1 bg-white rounded-[2rem] p-6 shadow-sm shadow-rose-100/50 hover:shadow-xl transition-all border border-white hover:border-rose-100 relative overflow-hidden">
                <div class="flex items-center justify-between mb-5 relative z-10">
                   <div class="flex items-center gap-3">
                     <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8c3b58]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                     <h3 class="font-bold text-[#8c3b58] text-[1.1rem]">Desejos</h3>
                   </div>
                </div>
                <svg class="absolute top-4 right-4 w-8 h-8 text-rose-50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 9l7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
                <div class="flex flex-wrap gap-2 relative z-10 mt-6">
                   <span class="px-4 py-1.5 bg-[#faf6f7] text-[11px] font-bold text-[#8c3b58] rounded-full border border-rose-50 shadow-sm">Silk Scarf</span>
                   <span class="px-4 py-1.5 bg-[#faf6f7] text-[11px] font-bold text-[#8c3b58] rounded-full border border-rose-50 shadow-sm">Perfume</span>
                </div>
             </router-link>
          </div>
        </div>
        
        <!-- Column 2 -->
        <div class="flex flex-col gap-6 w-full">
          <!-- Financeiro -->
          <router-link to="/financeiro" class="bg-white rounded-[2rem] p-8 shadow-sm shadow-rose-100/50 border border-white hover:border-rose-100 transition-all flex flex-col justify-between aspect-[1.3] hover:shadow-xl group">
             <div class="flex justify-between items-start">
                <div class="w-12 h-12 rounded-full bg-[#faf6f7] flex items-center justify-center text-[#8c3b58] group-hover:bg-[#8c3b58] group-hover:text-white transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <span class="text-[10px] font-black tracking-[0.2em] text-[#8c3b58]/60 uppercase pt-2">Financeiro</span>
             </div>
             <div class="mt-auto">
               <h2 class="text-[2.6rem] font-extrabold text-[#4a3f44] tracking-tight leading-none mb-2">$2,450.00</h2>
               <p class="text-[14px] font-serif italic text-gray-500">Budget status: Healthy</p>
             </div>
          </router-link>

          <!-- Leituras -->
          <router-link to="/diario-de-leitura" class="bg-white rounded-[2rem] p-8 shadow-sm shadow-rose-100/50 border border-white hover:border-rose-100 transition-all flex flex-col aspect-[1.1] hover:shadow-xl">
             <div class="flex items-center gap-3 mb-8">
               <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8c3b58]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
               <h3 class="font-bold text-[#8c3b58] text-[1.4rem]">Leituras</h3>
             </div>
             
             <div class="flex items-center -space-x-4 mb-auto pt-2 pl-4">
               <div class="w-16 h-24 bg-[#232323] rounded-lg shadow-xl shadow-gray-500/30 border border-white/20 transform rotate-[-8deg] z-10 flex flex-col items-center justify-center p-2 text-center">
                 <div class="w-full h-1/2 bg-[#d4af37]/20 rounded-t-sm mb-1"></div>
                 <span class="text-[7px] text-[#d4af37] font-serif font-bold uppercase leading-tight">The Great Gatsby</span>
               </div>
               <div class="w-16 h-24 bg-emerald-900 rounded-lg shadow-xl border border-white/20 z-20 flex outline-none rotate-[2deg]"></div>
               <div class="w-14 h-14 rounded-full bg-white shadow-md border border-gray-100 z-30 flex items-center justify-center text-[13px] font-bold text-gray-600 tracking-tight">+3</div>
             </div>

             <p class="text-[12px] font-bold text-gray-400 tracking-wide mt-8">"The Great Gatsby" • 45%</p>
          </router-link>

          <!-- Treino -->
          <router-link to="/plano-de-treino" class="bg-[#faf6f7] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-inner transition-all hover:bg-white hover:shadow-xl border border-transparent hover:border-rose-50 group aspect-[1.1]">
             <div class="w-[5.5rem] h-[5.5rem] rounded-full bg-white border border-rose-100 flex items-center justify-center text-[#8c3b58] mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
             </div>
             <h3 class="font-bold text-[#8c3b58] text-xl mb-2">Treino</h3>
             <p class="text-[13px] font-serif italic text-gray-500">Pilates Session @ 10am</p>
          </router-link>
        </div>

        <!-- Column 3 -->
        <div class="flex flex-col gap-6 w-full h-full"> 
          <!-- Skincare -->
          <router-link to="/skincare" class="bg-white rounded-[2rem] p-8 shadow-sm shadow-rose-100/50 border border-white hover:border-rose-100 transition-all flex flex-col aspect-[1.3] hover:shadow-xl">
             <div class="flex items-center justify-between mb-auto">
               <div class="w-12 h-12 rounded-full bg-indigo-50/80 flex items-center justify-center text-[#737dbb]">
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <svg class="w-8 h-8 text-indigo-50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 9l7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
             </div>
             <div class="mt-6">
                <h3 class="font-bold text-[#4a3f44] text-[1.4rem] mb-2 tracking-tight">Skincare</h3>
                <p class="text-[13px] text-gray-400 font-semibold tracking-wide">Evening routine at 9 PM</p>
             </div>
          </router-link>

          <!-- Anotações -->
          <router-link to="/anotacoes" class="flex-1 bg-white rounded-[2rem] p-8 shadow-sm shadow-rose-100/50 border border-white hover:border-rose-100 transition-all flex flex-col relative overflow-hidden group hover:shadow-xl hover:-translate-y-1">
             <div class="absolute inset-x-2 inset-y-2 border-2 border-[#faf6f7] rounded-[1.6rem] pointer-events-none"></div>
             <div class="flex items-center justify-between mb-10 relative z-10">
               <div class="flex items-center gap-3">
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8c3b58]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                 <h3 class="font-bold text-[#8c3b58] text-[1.4rem]">Anotações</h3>
               </div>
             </div>

             <div class="flex flex-col gap-8 relative z-10 mb-8">
               <div class="border-l-[3px] border-rose-200 pl-5 relative before:content-[''] before:absolute before:-left-[5.5px] before:top-1 before:w-[8px] before:h-[8px] before:rounded-full before:bg-rose-300">
                  <h4 class="text-[10px] font-black tracking-[0.15em] text-gray-400 uppercase mb-2">TEA PARTY PLANNING</h4>
                  <p class="text-[13px] italic font-serif text-[#4a3f44]/80 leading-relaxed pr-2">
                    "Macarons, rose tea, and vintage lace table runners. Invite Clara and Sofie..."
                  </p>
               </div>
               <div class="border-l-[3px] border-rose-200 pl-5 relative before:content-[''] before:absolute before:-left-[5.5px] before:top-1 before:w-[8px] before:h-[8px] before:rounded-full before:bg-rose-300">
                  <h4 class="text-[10px] font-black tracking-[0.15em] text-gray-400 uppercase mb-2">POETRY PROMPT</h4>
                  <p class="text-[13px] italic font-serif text-[#4a3f44]/80 leading-relaxed pr-2">
                    "The way sunlight filters through linen curtains..."
                  </p>
               </div>
             </div>

             <div class="mt-auto relative z-10 pt-4">
               <button class="w-full py-4 rounded-full border border-rose-100 bg-[#faf6f7]/50 text-[11px] font-bold tracking-[0.1em] text-[#8c3b58] hover:bg-rose-50 hover:border-rose-200 transition-colors uppercase">
                 + Quick Note
               </button>
             </div>
          </router-link>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const { user } = useAuth()

interface Habit {
  id: string
  title: string
  completed?: boolean
  subtitle?: string
  completedDates?: string[]
}

const habits = ref<Habit[]>([])

const getLocalISODate = (date: Date) => {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const todayStr = computed(() => getLocalISODate(new Date()))

const isCompletedToday = (habit: Habit) => {
  return habit.completedDates?.includes(todayStr.value) ?? false
}

onMounted(() => {
  const saved = localStorage.getItem('@organizador:habits')
  if (saved) {
    try {
      habits.value = JSON.parse(saved)
    } catch(e){}
  }
})

const totalCount = computed(() => habits.value.length)
const completedCount = computed(() => habits.value.filter(isCompletedToday).length)
const progressPercentage = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round((completedCount.value / totalCount.value) * 100)
})

const displayHabits = computed(() => habits.value.slice(0, 3))
</script>
