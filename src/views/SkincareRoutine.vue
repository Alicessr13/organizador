<template>
  <div class="min-h-screen bg-linear-to-br from-fuchsia-50 leading-relaxed text-gray-800 to-pink-100 p-4 md:p-8 flex justify-center items-start">
    <div class="w-full max-w-5xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-10 border border-white/50">
      
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-fuchsia-600 to-pink-600 tracking-tight flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Rotina de Cuidados
        </h1>
        <div class="flex gap-3">
          <button 
            @click="isCreatingRoutine = !isCreatingRoutine"
            class="px-5 py-2.5 bg-white text-fuchsia-600 border border-fuchsia-200 hover:bg-fuchsia-50 font-bold rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-fuchsia-100 flex items-center gap-2"
          >
             <svg v-if="!isCreatingRoutine" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
             </svg>
             <span v-if="!isCreatingRoutine">Nova Rotina</span>
             <span v-else>Cancelar</span>
          </button>
          <router-link to="/" class="px-5 py-2.5 bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 font-bold rounded-xl transition-all flex items-center gap-2">
            Voltar
          </router-link>
        </div>
      </div>

      <!-- Create Routine Form -->
      <div v-if="isCreatingRoutine" class="mb-10 bg-fuchsia-50/50 p-6 rounded-2xl border border-fuchsia-100 animate-in fade-in slide-in-from-top-4 duration-300">
        <form @submit.prevent="addRoutine" class="flex flex-col sm:flex-row gap-4">
          <input 
            v-model="newRoutineName" 
            type="text" 
            placeholder="Nome da rotina (ex: Noite, Fim de Semana...)"
            class="flex-1 px-5 py-4 rounded-xl bg-white border border-fuchsia-100 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100 outline-none transition-all placeholder:text-gray-400 text-gray-700 text-lg shadow-inner"
            required
            ref="routineInputRef"
          />
          <button 
            type="submit" 
            :disabled="!newRoutineName.trim()"
            class="px-8 py-4 bg-linear-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-fuchsia-200 hover:shadow-fuchsia-300 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2 text-lg"
          >
             Criar
          </button>
        </form>
      </div>

      <!-- Routines Display -->
      <div v-if="routines.length === 0" class="text-center py-20 text-gray-400 flex flex-col items-center bg-white/40 rounded-2xl border border-dashed border-fuchsia-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mb-4 text-fuchsia-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p class="text-xl text-gray-500 font-medium mb-2">Nenhuma rotina configurada ainda.</p>
        <p class="text-md">Clique em "Nova Rotina" para começar a organizar seus produtos!</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Routine Card -->
        <div 
          v-for="routine in routines" 
          :key="routine.id"
          class="bg-white border border-fuchsia-100/60 rounded-3xl p-6 shadow-sm flex flex-col h-full"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">{{ routine.name }}</h2>
            <button 
              @click="removeRoutine(routine.id)"
              class="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              title="Excluir rotina"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <!-- Step by Step Area -->
          <div class="mb-6 relative">
            <label class="text-xs font-bold text-fuchsia-600/70 uppercase tracking-widest mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Passo a Passo
            </label>
            <textarea 
              v-model="routine.steps"
              placeholder="Descreva a ordem ou instruções especiais. Ex: 1. Lavar rosto, 2. Aplicar 3 gotas de sérum..."
              class="w-full px-4 py-3 rounded-xl bg-fuchsia-50/30 border border-fuchsia-100 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100 outline-none transition-all text-sm text-gray-600 resize-y min-h-[80px]"
            ></textarea>
          </div>

          <!-- Add Product to this Routine -->
          <div v-if="productInputs[routine.id]" class="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div class="flex flex-col sm:flex-row gap-3">
              <input 
                :value="productInputs[routine.id]?.name || ''"
                @input="productInputs[routine.id]!.name = ($event.target as HTMLInputElement).value"
                type="text" 
                placeholder="Produto (ex: Sabonete Gel)"
                class="flex-1 px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100 outline-none text-sm text-gray-700 w-full"
              />
              <select 
                :value="productInputs[routine.id]?.type"
                @change="productInputs[routine.id]!.type = ($event.target as HTMLSelectElement).value"
                class="px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100 outline-none text-sm text-gray-700 w-full sm:w-auto min-w-[130px]"
              >
                <option value="Limpeza">Limpeza</option>
                <option value="Tônico">Tônico</option>
                <option value="Sérum/Tratamento">Sérum/Trat.</option>
                <option value="Hidratação">Hidratação</option>
                <option value="Proteção">Proteção Solar</option>
                <option value="Máscara">Máscara</option>
                <option value="Outros">Outros</option>
            </select>
            </div>
            <button 
              @click="addProduct(routine.id)"
              :disabled="!productInputs[routine.id]?.name.trim()"
              class="mt-3 w-full py-2.5 bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Adicionar Produto
            </button>
          </div>

          <!-- Product List -->
          <div class="flex-1 overflow-y-auto pr-1">
            <div v-if="routine.products.length === 0" class="text-center py-6 text-gray-400 text-sm italic">
              Nenhum produto adicionado nesta rotina.
            </div>
            
            <div 
              v-else
              class="space-y-3"
            >
              <div 
                v-for="product in routine.products"
                :key="product.id"
                class="group flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer"
                :class="product.completed ? 'bg-fuchsia-50/50 border-fuchsia-100 opacity-70' : 'bg-white border-gray-100 hover:border-fuchsia-200 shadow-sm'"
                @click="toggleProduct(routine.id, product.id)"
              >
                <div class="flex items-center gap-4 min-w-0">
                  <div 
                    class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                    :class="product.completed ? 'bg-green-400 border-green-400 text-white' : 'border-gray-300 group-hover:border-fuchsia-300 text-transparent'"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span 
                      class="font-semibold text-gray-800 truncate"
                      :class="{'line-through text-gray-400': product.completed}"
                    >
                      {{ product.name }}
                    </span>
                    <span class="text-xs font-medium text-fuchsia-600/80 uppercase tracking-wide mt-0.5">
                      {{ product.type }}
                    </span>
                  </div>
                </div>

                <button 
                  @click.stop="removeProduct(routine.id, product.id)"
                  class="ml-2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

interface Product {
  id: string
  name: string
  type: string
  completed: boolean
}

interface Routine {
  id: string
  name: string
  products: Product[]
  steps?: string
}

const routines = ref<Routine[]>([])
const isCreatingRoutine = ref(false)
const newRoutineName = ref('')
const routineInputRef = ref<HTMLInputElement | null>(null)

// For storing inputs of each routine separately to avoid cross-talk
const productInputs = ref<Record<string, { name: string, type: string }>>({})

onMounted(() => {
  const saved = localStorage.getItem('@organizador:skincare-routines')
  if (saved) {
    try {
      routines.value = JSON.parse(saved)
      initializeProductInputs()
    } catch (e) {
      console.error(e)
    }
  }
})

watch(routines, (newVal) => {
  localStorage.setItem('@organizador:skincare-routines', JSON.stringify(newVal))
}, { deep: true })

watch(isCreatingRoutine, async (val) => {
  if (val) {
    await nextTick()
    routineInputRef.value?.focus()
  }
})

const initializeProductInputs = () => {
  routines.value.forEach(r => {
    if (!productInputs.value[r.id]) {
      productInputs.value[r.id] = { name: '', type: 'Limpeza' }
    }
  })
}

const addRoutine = () => {
  if (!newRoutineName.value.trim()) return
  
  const newRoutineId = crypto.randomUUID()
  
  routines.value.push({
    id: newRoutineId,
    name: newRoutineName.value.trim(),
    products: [],
    steps: ''
  })
  
  productInputs.value[newRoutineId] = { name: '', type: 'Limpeza' }
  
  newRoutineName.value = ''
  isCreatingRoutine.value = false
}

const removeRoutine = (id: string) => {
  routines.value = routines.value.filter(r => r.id !== id)
  delete productInputs.value[id]
}

const addProduct = (routineId: string) => {
  const inputs = productInputs.value[routineId]
  if (!inputs || !inputs.name.trim()) return

  const routine = routines.value.find(r => r.id === routineId)
  if (routine) {
    routine.products.push({
      id: crypto.randomUUID(),
      name: inputs.name.trim(),
      type: inputs.type,
      completed: false
    })
    
    // Reset inputs
    inputs.name = ''
    inputs.type = 'Limpeza'
  }
}

const removeProduct = (routineId: string, productId: string) => {
  const routine = routines.value.find(r => r.id === routineId)
  if (routine) {
    routine.products = routine.products.filter(p => p.id !== productId)
  }
}

const toggleProduct = (routineId: string, productId: string) => {
  const routine = routines.value.find(r => r.id === routineId)
  if (routine) {
    const product = routine.products.find(p => p.id === productId)
    if (product) {
      product.completed = !product.completed
    }
  }
}
</script>
