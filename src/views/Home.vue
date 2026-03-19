<template>
  <div class="h-[100dvh] flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-pink-50 to-rose-100 p-3 pt-6 md:p-12 font-sans text-rose-900 overflow-hidden">
    <div class="max-w-7xl mx-auto w-full flex flex-col gap-4 md:gap-10 h-full">
      
      <!-- Top Header -->
      <header class="flex flex-row justify-between items-center gap-4 shrink-0 animate-fade-in-up md:mb-2">
        <div class="flex items-center gap-3 md:gap-5">
           <div class="w-12 h-12 md:w-16 md:h-16 bg-white border border-pink-200 rounded-[1rem] md:rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-pink-200/50 shrink-0 relative group overflow-hidden">
              <div class="absolute inset-0 bg-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 text-pink-400 z-10 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
           </div>
           <div>
             <h1 class="text-[1.35rem] leading-tight md:text-5xl font-extrabold text-rose-950 tracking-tight flex items-center md:gap-2">
               Olá, <span class="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-rose-400 ml-1">{{ user?.email?.split('@')[0] || 'Anjo' }}</span>! <span class="hidden md:inline">🎀</span>
             </h1>
             <p class="text-pink-600/80 mt-0.5 md:mt-2 font-medium text-[11px] sm:text-xs md:text-lg leading-tight">O que vamos organizar hoje?</p>
           </div>
        </div>
        
        <button @click="handleLogout" class="flex items-center justify-center gap-2 p-2 sm:px-6 sm:py-3 md:bg-white/80 backdrop-blur-sm md:border border-pink-100 text-pink-400 hover:text-rose-500 hover:bg-pink-50 font-bold rounded-xl md:rounded-[1.5rem] md:shadow-sm md:shadow-pink-100/50 transition-all duration-300 group shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-5 sm:w-5 md:group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class="text-xs md:text-base hidden sm:inline">Sair</span>
        </button>
      </header>

      <!-- Dashboard Grid - Strictly fills remaining height -->
      <main class="grid grid-cols-2 grid-rows-5 md:grid-cols-3 md:grid-rows-none lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 flex-1 w-full pb-4">

        <!-- Hábitos Diários -->
        <router-link to="/habitos" class="col-span-2 row-span-1 md:col-span-1 lg:col-span-2 group relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[1.2rem] md:rounded-[2rem] p-3 px-4 md:p-6 shadow-xs shadow-pink-100/50 hover:shadow-xl hover:shadow-pink-200/60 transition-all duration-300 border border-white hover:border-pink-200 md:hover:-translate-y-1 flex flex-row md:flex-col items-center md:items-start justify-start md:justify-between w-full h-full gap-4 md:gap-0">
          <div class="hidden md:block bg-pink-50/80 absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl group-hover:bg-pink-100 transition-colors duration-500"></div>
          <div class="w-11 h-11 md:w-14 md:h-14 shrink-0 bg-pink-50 border border-pink-100 rounded-[1rem] md:rounded-[1.2rem] flex items-center justify-center text-pink-400 group-hover:bg-pink-400 group-hover:text-white transition-all duration-300 z-10 md:mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-7 md:h-7 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          </div>
          <div class="z-10 text-left w-full flex-1">
            <h3 class="text-[17px] md:text-2xl font-bold text-rose-900 group-hover:text-pink-600 transition-colors leading-[1.1] md:leading-tight">Hábitos Diários <span class="hidden md:inline">🌸</span></h3>
            <p class="text-rose-400/80 mt-1 text-xs md:text-sm line-clamp-1 opacity-90">Acompanhe sua rotina fofa</p>
          </div>
        </router-link>

        <!-- Financeiro -->
        <router-link to="/financeiro" class="col-span-1 row-span-1 md:col-span-1 lg:col-span-2 group relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[1.2rem] md:rounded-[2rem] p-2 md:p-6 shadow-xs shadow-pink-100/50 hover:shadow-xl hover:shadow-pink-200/60 transition-all duration-300 border border-white hover:border-rose-200 md:hover:-translate-y-1 flex flex-col items-center md:items-start justify-center md:justify-between w-full h-full text-center md:text-left gap-1 md:gap-0">
          <div class="hidden md:block bg-rose-50 absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl group-hover:bg-rose-100 transition-colors duration-500"></div>
          <div class="w-9 h-9 md:w-14 md:h-14 shrink-0 bg-rose-50 border border-rose-100 rounded-[0.8rem] md:rounded-[1.2rem] flex items-center justify-center text-rose-400 group-hover:bg-rose-400 group-hover:text-white transition-all duration-300 z-10 md:mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-7 md:h-7 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div class="z-10 w-full">
            <h3 class="text-[14px] md:text-2xl font-bold text-rose-900 group-hover:text-rose-600 transition-colors leading-[1.1] md:leading-tight">
              <span class="md:hidden">Financeiro</span><span class="hidden md:inline">Financeiro 🦢</span>
            </h3>
            <p class="hidden md:block text-rose-400/80 mt-1 text-sm line-clamp-1">Planeje suas comprinhas</p>
          </div>
        </router-link>

        <!-- Semanais -->
        <router-link to="/habitos-semanais" class="col-span-1 row-span-1 md:col-span-1 lg:col-span-1 group relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[1.2rem] md:rounded-[2rem] p-2 md:p-6 shadow-xs shadow-pink-100/50 hover:shadow-xl hover:shadow-pink-200/60 transition-all duration-300 border border-white hover:border-fuchsia-200 md:hover:-translate-y-1 flex flex-col items-center md:items-start justify-center md:justify-between w-full h-full text-center md:text-left gap-1 md:gap-0">
          <div class="hidden md:block bg-fuchsia-50 absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl group-hover:bg-fuchsia-100 transition-colors duration-500"></div>
          <div class="w-9 h-9 md:w-14 md:h-14 shrink-0 bg-fuchsia-50 border border-fuchsia-100 rounded-[0.8rem] md:rounded-[1.2rem] flex items-center justify-center text-fuchsia-400 group-hover:bg-fuchsia-400 group-hover:text-white transition-all duration-300 z-10 md:mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-7 md:h-7 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <div class="z-10 w-full">
            <h3 class="text-[14px] md:text-xl font-bold text-rose-900 group-hover:text-fuchsia-600 transition-colors leading-[1.1] md:leading-tight">
              <span class="md:hidden">Semanais</span><span class="hidden md:inline">Semanais 🍰</span>
            </h3>
            <p class="hidden md:block text-rose-400/80 mt-1 text-xs line-clamp-1">Suas metas da semana</p>
          </div>
        </router-link>

        <!-- Anotacoes -->
        <router-link to="/anotacoes" class="col-span-1 row-span-1 md:col-span-2 lg:col-span-2 group relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[1.2rem] md:rounded-[2rem] p-2 md:p-6 shadow-xs shadow-pink-100/50 hover:shadow-xl hover:shadow-pink-200/60 transition-all duration-300 border border-white hover:border-pink-300 md:hover:-translate-y-1 flex flex-col items-center md:items-start justify-center md:justify-between w-full h-full text-center md:text-left gap-1 md:gap-0">
          <div class="hidden md:block bg-pink-50/50 absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl group-hover:bg-pink-100/50 transition-colors duration-500"></div>
          <div class="w-9 h-9 md:w-14 md:h-14 shrink-0 bg-white border border-pink-200 rounded-[0.8rem] md:rounded-[1.2rem] flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 z-10 md:mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-7 md:h-7 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </div>
          <div class="z-10 w-full">
            <h3 class="text-[14px] md:text-2xl font-bold text-rose-900 group-hover:text-pink-600 transition-colors leading-[1.1] md:leading-tight">
              <span class="md:hidden">Anotações</span><span class="hidden md:inline">Anotações 💌</span>
            </h3>
            <p class="hidden md:block text-rose-400/80 mt-1 text-sm line-clamp-1">Diário e recados soltos</p>
          </div>
        </router-link>

        <!-- Mensais -->
        <router-link to="/tarefas-mensais" class="col-span-1 row-span-1 md:col-span-1 lg:col-span-1 group relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[1.2rem] md:rounded-[2rem] p-2 md:p-6 shadow-xs shadow-pink-100/50 hover:shadow-xl hover:shadow-pink-200/60 transition-all duration-300 border border-white hover:border-red-200 md:hover:-translate-y-1 flex flex-col items-center md:items-start justify-center md:justify-between w-full h-full text-center md:text-left gap-1 md:gap-0">
          <div class="hidden md:block bg-red-50 absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl group-hover:bg-red-100 transition-colors duration-500"></div>
          <div class="w-9 h-9 md:w-14 md:h-14 shrink-0 bg-red-50 border border-red-100 rounded-[0.8rem] md:rounded-[1.2rem] flex items-center justify-center text-red-400 group-hover:bg-red-400 group-hover:text-white transition-all duration-300 z-10 md:mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-7 md:h-7 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
          </div>
          <div class="z-10 w-full">
            <h3 class="text-[14px] md:text-xl font-bold text-rose-900 group-hover:text-red-500 transition-colors leading-[1.1] md:leading-tight">
              <span class="md:hidden">Mensais</span><span class="hidden md:inline">Mensais 🍓</span>
            </h3>
            <p class="hidden md:block text-rose-400/80 mt-1 text-xs line-clamp-1">Checklist do mês</p>
          </div>
        </router-link>

        <!-- Leituras -->
        <router-link to="/diario-de-leitura" class="col-span-1 row-span-1 md:col-span-1 lg:col-span-1 group relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[1.2rem] md:rounded-[2rem] p-2 md:p-6 shadow-xs shadow-pink-100/50 hover:shadow-xl hover:shadow-pink-200/60 transition-all duration-300 border border-white hover:border-violet-200 md:hover:-translate-y-1 flex flex-col items-center md:items-start justify-center md:justify-between w-full h-full text-center md:text-left gap-1 md:gap-0">
          <div class="hidden md:block bg-violet-50 absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl group-hover:bg-violet-100 transition-colors duration-500"></div>
          <div class="w-9 h-9 md:w-14 md:h-14 shrink-0 bg-violet-50 border border-violet-100 rounded-[0.8rem] md:rounded-[1.2rem] flex items-center justify-center text-violet-400 group-hover:bg-violet-400 group-hover:text-white transition-all duration-300 z-10 md:mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-7 md:h-7 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <div class="z-10 w-full">
            <h3 class="text-[14px] md:text-xl font-bold text-rose-900 group-hover:text-violet-500 transition-colors leading-[1.1] md:leading-tight">
              <span class="md:hidden">Leituras</span><span class="hidden md:inline">Leituras 🧸</span>
            </h3>
            <p class="hidden md:block text-rose-400/80 mt-1 text-xs line-clamp-1">Livros e romances</p>
          </div>
        </router-link>

        <!-- Treino -->
        <router-link to="/plano-de-treino" class="col-span-1 row-span-1 md:col-span-1 lg:col-span-1 group relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[1.2rem] md:rounded-[2rem] p-2 md:p-6 shadow-xs shadow-pink-100/50 hover:shadow-xl hover:shadow-pink-200/60 transition-all duration-300 border border-white hover:border-pink-300 md:hover:-translate-y-1 flex flex-col items-center md:items-start justify-center md:justify-between w-full h-full text-center md:text-left gap-1 md:gap-0">
          <div class="hidden md:block bg-pink-100 absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl group-hover:bg-pink-200/50 transition-colors duration-500"></div>
          <div class="w-9 h-9 md:w-14 md:h-14 shrink-0 bg-pink-100 border border-pink-200 rounded-[0.8rem] md:rounded-[1.2rem] flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 z-10 md:mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-7 md:h-7 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          </div>
          <div class="z-10 w-full">
            <h3 class="text-[14px] md:text-xl font-bold text-rose-900 group-hover:text-pink-600 transition-colors leading-[1.1] md:leading-tight">
              <span class="md:hidden">Treino</span><span class="hidden md:inline">Treino 🩰</span>
            </h3>
            <p class="hidden md:block text-rose-400/80 mt-1 text-xs line-clamp-1">Pilates e suor fofo</p>
          </div>
        </router-link>

        <!-- Skincare -->
        <router-link to="/skincare" class="col-span-1 row-span-1 md:col-span-1 lg:col-span-1 group relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[1.2rem] md:rounded-[2rem] p-2 md:p-6 shadow-xs shadow-pink-100/50 hover:shadow-xl hover:shadow-pink-200/60 transition-all duration-300 border border-white hover:border-rose-300 md:hover:-translate-y-1 flex flex-col items-center md:items-start justify-center md:justify-between w-full h-full text-center md:text-left gap-1 md:gap-0">
          <div class="hidden md:block bg-rose-100/50 absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl group-hover:bg-rose-200/50 transition-colors duration-500"></div>
          <div class="w-9 h-9 md:w-14 md:h-14 shrink-0 bg-rose-100 border border-rose-200 rounded-[0.8rem] md:rounded-[1.2rem] flex items-center justify-center text-rose-500 group-hover:bg-rose-400 group-hover:text-white transition-all duration-300 z-10 md:mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-7 md:h-7 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div class="z-10 w-full">
            <h3 class="text-[14px] md:text-xl font-bold text-rose-900 group-hover:text-rose-600 transition-colors leading-[1.1] md:leading-tight">
              <span class="md:hidden">Skincare</span><span class="hidden md:inline">Skincare 🛁</span>
            </h3>
            <p class="hidden md:block text-rose-400/80 mt-1 text-xs line-clamp-1">Beleza e cuidados</p>
          </div>
        </router-link>

        <!-- Desejos -->
        <router-link to="/lista-de-desejos" class="col-span-1 row-span-1 md:col-span-2 lg:col-span-1 group relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[1.2rem] md:rounded-[2rem] p-2 md:p-6 shadow-xs shadow-pink-100/50 hover:shadow-xl hover:shadow-pink-200/60 transition-all duration-300 border border-white hover:border-fuchsia-300 md:hover:-translate-y-1 flex flex-col items-center md:items-start justify-center md:justify-between w-full h-full text-center md:text-left gap-1 md:gap-0">
          <div class="hidden md:block bg-fuchsia-100/50 absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl group-hover:bg-fuchsia-200/50 transition-colors duration-500"></div>
          <div class="w-9 h-9 md:w-14 md:h-14 shrink-0 bg-fuchsia-100 border border-fuchsia-200 rounded-[0.8rem] md:rounded-[1.2rem] flex items-center justify-center text-fuchsia-500 group-hover:bg-fuchsia-400 group-hover:text-white transition-all duration-300 z-10 md:mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-7 md:h-7 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <div class="z-10 w-full md:pr-4">
            <h3 class="text-[14px] md:text-xl font-bold text-rose-900 group-hover:text-fuchsia-600 transition-colors leading-[1.1] md:leading-tight line-clamp-1">
              <span class="md:hidden">Desejos</span><span class="hidden md:inline">Desejos 🛍️</span>
            </h3>
            <p class="hidden md:block text-rose-400/80 mt-1 text-xs line-clamp-1">Meus sonhos fofinhos</p>
          </div>
        </router-link>

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const { user, logout, fetchUser } = useAuth()
const router = useRouter()

onMounted(async () => {
  await fetchUser()
})

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
</script>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}
</style>
