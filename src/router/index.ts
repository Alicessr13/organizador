import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/habitos',
    name: 'Habitos',
    component: () => import('../views/Habits.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/habitos-semanais',
    name: 'HabitosSemanais',
    component: () => import('../views/WeeklyHabits.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tarefas-mensais',
    name: 'TarefasMensais',
    component: () => import('../views/MonthlyTasks.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plano-de-treino',
    name: 'WorkoutPlan',
    component: () => import('../views/WorkoutPlan.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/skincare',
    name: 'Skincare',
    component: () => import('../views/SkincareRoutine.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/lista-de-desejos',
    name: 'Wishlist',
    component: () => import('../views/Wishlist.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach(async (to, _from, next) => {
  const { data: { session } } = await supabase.auth.getSession()

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !session) {
    next('/login')
  } else if (!requiresAuth && session && to.path === '/login') {
    next('/')
  } else {
    next()
  }
})

export default router
