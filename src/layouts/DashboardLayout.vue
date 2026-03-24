<template>
  <div class="h-[100dvh] w-full flex flex-col bg-[#faf6f7] text-[#4a3f44] font-sans font-medium overflow-hidden">
    <!-- Top Bar -->
    <header class="h-20 shrink-0 px-6 lg:px-8 flex items-center justify-between border-b border-rose-100/50 bg-[#faf6f7] z-20">
      <div class="flex items-center gap-4">
        <button @click="toggleSidebar" class="p-2 -ml-2 text-[#8c3b58] hover:bg-rose-50 rounded-lg transition-colors hidden lg:block outline-none" title="Menu">
           <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isSidebarMinimized ? 'M4 6h16M4 12h16M4 18h16' : 'M4 6h16M4 12h16M4 18h7'" />
           </svg>
        </button>
        <div class="text-[#8c3b58] font-serif font-bold text-xl lg:text-2xl tracking-wide flex items-center">
          <span v-if="isSidebarMinimized" class="font-bold tracking-widest text-[#8c3b58]">TCS<span class="text-rose-300">.</span></span>
          <span v-else>The Curated Sanctuary</span>
        </div>
      </div>

      <nav class="hidden md:flex items-center gap-12 font-semibold text-[13px] tracking-wide text-[#8c3b58]">
        <router-link to="/" class="hover:opacity-70 transition-opacity">Home</router-link>
        <a href="#" class="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">Planner</a>
        <a href="#" class="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">Finance</a>
        <a href="#" class="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">Self-Care</a>
      </nav>
      
      <div class="flex items-center gap-4 lg:gap-5 text-[#8c3b58]">
        <button class="hidden sm:block hover:scale-110 transition-transform cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>
        <button class="hover:scale-110 transition-transform cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
        <div class="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-rose-200 overflow-hidden border-2 border-[#8c3b58]/10 cursor-pointer">
          <img :src="`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.email || 'Alice'}&backgroundColor=fdf4f4`" alt="Profile" class="w-full h-full object-cover" />
        </div>
      </div>
    </header>

    <div class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar -->
      <aside 
        class="h-full hidden lg:flex flex-col pt-8 pb-6 overflow-y-auto border-r border-rose-100/30 transition-[width,padding] duration-300 ease-in-out shrink-0"
        :class="isSidebarMinimized ? 'w-[80px] px-2 items-center' : 'w-[280px] px-6'"
      >
        <!-- Greeting -->
        <div class="mb-10 pl-2 transition-all duration-300 overflow-hidden whitespace-nowrap" :class="isSidebarMinimized ? 'w-0 opacity-0 h-0 hidden' : 'w-full opacity-100'">
          <h2 class="text-[#8c3b58] font-serif font-bold text-xl leading-tight">
            Good morning,<br/>
            {{ user?.email?.split('@')[0] || 'alicessr12' }}
          </h2>
          <p class="text-[13px] italic font-serif text-[#8c3b58]/80 mt-1">Your sanctuary is ready.</p>
        </div>

        <nav class="flex-1 flex flex-col gap-1 w-full" :class="isSidebarMinimized ? 'items-center' : ''">
          <router-link to="/habitos" class="flex flex-row items-center rounded-full transition-all text-[#7a646c] font-semibold text-[13px]" active-class="bg-white shadow-sm shadow-rose-100/50 text-[#8c3b58] font-bold" :class="isSidebarMinimized ? 'w-12 h-12 justify-center' : 'px-4 py-3 gap-4 hover:bg-white/50 w-full'" :title="isSidebarMinimized ? 'Daily Habits' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> 
            <span v-show="!isSidebarMinimized" class="whitespace-nowrap transition-opacity duration-300">Daily Habits</span>
          </router-link>
          
          <router-link to="/financeiro" class="flex flex-row items-center rounded-full transition-all text-[#7a646c] font-semibold text-[13px]" active-class="bg-white shadow-sm shadow-rose-100/50 text-[#8c3b58] font-bold" :class="isSidebarMinimized ? 'w-12 h-12 justify-center mt-1' : 'px-4 py-3 gap-4 hover:bg-white/50 w-full'" :title="isSidebarMinimized ? 'Financial' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> 
            <span v-show="!isSidebarMinimized" class="whitespace-nowrap transition-opacity duration-300">Financial</span>
          </router-link>
          
          <router-link to="/anotacoes" class="flex flex-row items-center rounded-full transition-all text-[#7a646c] font-semibold text-[13px]" active-class="bg-white shadow-sm shadow-rose-100/50 text-[#8c3b58] font-bold" :class="isSidebarMinimized ? 'w-12 h-12 justify-center mt-1' : 'px-4 py-3 gap-4 hover:bg-white/50 w-full'" :title="isSidebarMinimized ? 'Notes' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span v-show="!isSidebarMinimized" class="whitespace-nowrap w-full">Notes</span>
          </router-link>
        </nav>

        <div class="mt-8 mb-8 w-full transition-all duration-300 flex justify-center" :class="isSidebarMinimized ? 'px-0' : ''">
          <button class="bg-[#8c3b58] text-[white] rounded-full text-sm font-bold shadow-lg shadow-[#8c3b58]/30 hover:bg-[#7a324b] transition-all flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap"
           :class="isSidebarMinimized ? 'w-12 h-12 p-0 active:scale-95' : 'w-full py-3.5 hover:-translate-y-0.5 active:scale-95'" :title="isSidebarMinimized ? 'Add New Entry' : ''">
            <svg v-if="isSidebarMinimized" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span v-else>Add New Entry</span>
          </button>
        </div>

        <div class="flex flex-col gap-2 mt-auto text-[13px] text-[#7a646c] font-semibold transition-all duration-300" :class="isSidebarMinimized ? 'items-center px-0' : 'px-4'">
          <button @click="handleLogout" class="flex items-center hover:text-rose-500 transition-colors rounded-full" :class="isSidebarMinimized ? 'w-12 h-12 justify-center hover:bg-white/50' : 'gap-3 py-2 w-full'" :title="isSidebarMinimized ? 'Logout' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span v-show="!isSidebarMinimized" class="whitespace-nowrap">Support / Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 h-full overflow-y-auto relative scroll-smooth bg-[#fcfeff]/0 p-6 lg:p-10">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const { user, logout, fetchUser } = useAuth()
const router = useRouter()

// Add minimal state management for sidebar
const isSidebarMinimized = ref(false)

onMounted(async () => {
  await fetchUser()
})

const toggleSidebar = () => {
  isSidebarMinimized.value = !isSidebarMinimized.value
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
</script>
<style>
/* Hide scrollbar visually */
aside::-webkit-scrollbar, main::-webkit-scrollbar {
  display: none;
}
aside, main {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
