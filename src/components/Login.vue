<template>
  <div class="min-h-screen bg-[var(--pastel-pink)] flex items-center justify-center p-4">
    <div v-if="user" class="p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-xl font-bold mb-4">Olá, {{ user.email }}!</h1>
      <p class="mb-6">Você está pronto para organizar suas tarefas.</p>
      <button @click="logout" class="w-full bg-red-500 text-white p-2 rounded">Sair</button>
    </div>

    <div v-else class="p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">
        {{ isSignUp ? 'Criar Conta' : 'Entrar no Planner' }}
      </h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="email" type="email" placeholder="Seu email" class="w-full p-2 border rounded" required />
        <input v-model="password" type="password" placeholder="Sua senha" class="w-full p-2 border rounded" required />
        
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          {{ isSignUp ? 'Cadastrar' : 'Entrar' }}
        </button>
      </form>

      <p v-if="errorMsg" class="text-red-500 mt-4 text-sm">{{ errorMsg }}</p>

      <button @click="isSignUp = !isSignUp" class="w-full mt-4 text-sm text-blue-500 underline">
        {{ isSignUp ? 'Já tem conta? Entre aqui' : 'Não tem conta? Cadastre-se' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'

const { user, login, signUp, logout, fetchUser } = useAuth()

const email = ref('')
const password = ref('')
const isSignUp = ref(false)
const errorMsg = ref('')

onMounted(() => fetchUser())

const handleSubmit = async () => {
  try {
    errorMsg.value = ''
    if (isSignUp.value) {
      await signUp(email.value, password.value)
      alert('Verifique seu email para confirmar o cadastro!')
    } else {
      await login(email.value, password.value)
    }
  } catch (e: any) {
    errorMsg.value = e.message
  }
}

</script>

<style scoped>
</style>
