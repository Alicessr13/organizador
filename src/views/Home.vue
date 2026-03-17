<template>
  <div class="min-h-screen bg-(--pastel-pink) flex items-center justify-center p-4">
    <div class="p-8 rounded-3xl w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl border border-white/50 flex flex-col items-center">
      <!-- Icon Avatar -->
      <div class="w-20 h-20 bg-linear-to-tr from-pink-100 to-rose-100 rounded-full flex items-center justify-center mb-6 shadow-inner text-pink-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 class="text-3xl font-extrabold mb-2 text-center text-gray-800 tracking-tight">
        Olá, <span class="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-rose-500">{{ user?.email?.split('@')[0] || 'Usuário' }}</span>!
      </h1>
      <p class="mb-10 text-center text-gray-500 font-medium">O que vamos organizar hoje?</p>
      
      <!-- Habits Reference Card (Router Link) -->
      <router-link 
        to="/habitos" 
        class="w-full mb-4 group relative overflow-hidden rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 p-[2px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-200"
      >
        <div class="flex items-center justify-between bg-white px-6 py-5 rounded-[14px] transition-all duration-300 group-hover:bg-opacity-0">
          <div class="flex items-center gap-4">
            <div class="bg-pink-100 p-3 rounded-xl text-pink-600 group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-800 text-lg group-hover:text-white transition-colors duration-300">Hábitos Diários</h3>
              <p class="text-sm text-gray-500 group-hover:text-pink-100 transition-colors duration-300">Acompanhe sua rotina</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </router-link>

      <!-- Weekly Habits Reference Card -->
      <router-link 
        to="/habitos-semanais" 
        class="w-full mb-8 group relative overflow-hidden rounded-2xl bg-linear-to-r from-teal-500 to-emerald-500 p-[2px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-200"
      >
        <div class="flex items-center justify-between bg-white px-6 py-5 rounded-[14px] transition-all duration-300 group-hover:bg-opacity-0">
          <div class="flex items-center gap-4">
            <div class="bg-teal-100 p-3 rounded-xl text-teal-600 group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-800 text-lg group-hover:text-white transition-colors duration-300">Hábitos Semanais</h3>
              <p class="text-sm text-gray-500 group-hover:text-teal-100 transition-colors duration-300">Planeje sua semana</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </router-link>

      <!-- Logout Button -->
      <button @click="handleLogout" class="w-full text-gray-400 hover:text-red-500 hover:bg-red-50 p-3 rounded-xl transition-colors font-medium flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sair da conta
      </button>
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
</style>
