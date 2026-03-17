<template>
  <div class="min-h-screen bg-(--pastel-pink) flex items-center justify-center p-4">
    <div class="p-8 rounded-lg w-full max-w-md">
      <div class="text-2xl cinzel-decorative-regular font-bold mb-10 text-center">
        {{ isSignUp ? 'Criar Conta' : 'Entrar no organizador' }}
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="email" type="email" placeholder="Seu email" class="w-full p-3 border rounded-lg" required />
        <input v-model="password" type="password" placeholder="Sua senha" class="w-full p-3 border rounded-lg" required />
        
        <button type="submit" class="w-full bg-rose-400 text-white p-3 rounded hover:bg-rose-800 transition">
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
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const { user, login, signUp, fetchUser } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const isSignUp = ref(false)
const errorMsg = ref('')

onMounted(async () => {
  await fetchUser()
  if (user.value) {
    router.push('/')
  }
})

watch(user, (newUser) => {
  if (newUser) {
    router.push('/')
  }
})

const handleSubmit = async () => {
  try {
    errorMsg.value = ''
    if (isSignUp.value) {
      await signUp(email.value, password.value)
      alert('Cadastro realizado! Redirecionando...')
      router.push('/')
    } else {
      await login(email.value, password.value)
      router.push('/')
    }
  } catch (e: any) {
    errorMsg.value = e.message
  }
}

</script>

<style scoped>
</style>
