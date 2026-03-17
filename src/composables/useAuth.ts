import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

const user = ref<User | null>(null)

export function useAuth() {
  // Login com Email e Senha
  const login = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    })
    if (error) throw error
    user.value = data.user
  }

  // Cadastro de novo usuário
  const signUp = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
    })
    if (error) throw error
    user.value = data.user
  }

  // Logout
  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  // Verificar se o usuário já está logado ao abrir o app
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data.user
  }

  return { user, login, signUp, logout, fetchUser }
}