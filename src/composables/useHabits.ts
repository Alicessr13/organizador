import { ref, watch } from 'vue'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export interface Habit {
  id: string
  user_id?: string
  title: string
  subtitle?: string | null
  streak?: string | null
  completed_dates?: string[]
}

// Global state shared across views
const habits = ref<Habit[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
let hasFetched = false

export function useHabits() {
  const { user } = useAuth()

  // Sincroniza o fetch com o delay de autenticação do F5 (Reload da Página)
  watch(user, (newUser) => {
    if (newUser && !hasFetched) {
      fetchHabits()
    } else if (!newUser) {
      habits.value = []
      hasFetched = false
    }
  }, { immediate: true })

  const fetchHabits = async (force = false) => {
    if (!user.value) return
    if (hasFetched && !force) return // Use memory cache
    
    loading.value = true
    error.value = null
    
    try {
      const { data, error: err } = await (supabase as any)
        .from('habits')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (err) throw err
      if (data) {
        habits.value = data as Habit[]
        hasFetched = true
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching habits:', err)
    } finally {
      loading.value = false
    }
  }

  const addHabit = async (title: string, subtitle?: string) => {
    if (!user.value) return null
    error.value = null
    try {
      const newHabit = {
        user_id: user.value.id,
        title,
        subtitle: subtitle || null,
        completed_dates: []
      }
      
      const { data, error: err } = await (supabase as any)
        .from('habits')
        .insert(newHabit)
        .select()
        .single()
        
      if (err) throw err
      if (data) {
        habits.value.unshift(data as Habit)
        return data as Habit
      }
    } catch(err: any) {
      error.value = err.message
      console.error('Error adding habit:', err)
      return null
    }
  }

  const toggleHabitDate = async (id: string, dateStr: string) => {
    error.value = null
    const habit = habits.value.find(h => h.id === id)
    if (!habit) return
    
    const dates = habit.completed_dates || []
    const index = dates.indexOf(dateStr)
    const newDates = [...dates]
    
    // Toggle logic
    if (index === -1) {
      newDates.push(dateStr)
    } else {
      newDates.splice(index, 1)
    }

    // Optimistic UI Update so the user feels it's instant
    habit.completed_dates = newDates
    
    try {
      const { error: err } = await (supabase as any)
        .from('habits')
        .update({ completed_dates: newDates })
        .eq('id', id)
        
      if (err) {
        // Revert on error
        habit.completed_dates = dates
        throw err
      }
    } catch(err: any) {
      error.value = err.message
      console.error('Error toggling date:', err)
    }
  }

  return {
    habits,
    loading,
    error,
    fetchHabits,
    addHabit,
    toggleHabitDate
  }
}
