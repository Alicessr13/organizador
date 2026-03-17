<template>
  <div class="min-h-screen bg-linear-to-br from-violet-50 leading-relaxed text-gray-800 to-purple-100 p-4 md:p-8 flex justify-center items-start">
    <div class="w-full max-w-4xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-10 border border-white/50">
      
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-purple-600 tracking-tight flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Lista de Desejos
        </h1>
        <router-link to="/" class="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Voltar
        </router-link>
      </div>

      <!-- General Progress / Stats -->
      <div class="mb-8 bg-violet-50/50 p-4 rounded-2xl flex flex-wrap gap-6 items-center border border-violet-100">
        <div>
          <span class="text-sm font-semibold text-violet-600/70 uppercase tracking-widest block mb-1">Total Desejado</span>
          <span class="text-2xl font-bold text-gray-800">{{ formatCurrency(totalWishlistValue) }}</span>
        </div>
        <div class="h-10 w-px bg-violet-200 hidden sm:block"></div>
        <div>
          <span class="text-sm font-semibold text-green-600/70 uppercase tracking-widest block mb-1">Já Comprado</span>
          <span class="text-2xl font-bold text-green-600">{{ formatCurrency(totalPurchasedValue) }}</span>
        </div>
      </div>

      <!-- Add item form -->
      <form @submit.prevent="addItem" class="flex flex-col gap-4 mb-10 bg-white/60 p-5 md:p-6 rounded-2xl border border-violet-100 shadow-inner">
        <h3 class="font-bold text-gray-700 mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          O que você quer comprar?
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-3">
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Item (obrigatório)</label>
            <input 
              v-model="newItemName" 
              type="text" 
              placeholder="Ex: Novo Fone de Ouvido"
              class="w-full px-4 py-3 rounded-xl bg-white border border-violet-100 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 outline-none transition-all placeholder:text-gray-400 text-gray-700 font-medium"
              required
            />
          </div>
          
          <div class="md:col-span-1">
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Valor (R$)</label>
            <input 
              v-model="newItemPrice" 
              type="number" 
              step="0.01"
              min="0"
              placeholder="Ex: 150.00"
              class="w-full px-4 py-3 rounded-xl bg-white border border-violet-100 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 outline-none transition-all placeholder:text-gray-400 text-gray-700 text-right"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Link (opcional)</label>
          <input 
            v-model="newItemLink" 
            type="url" 
            placeholder="https://..."
            class="w-full px-4 py-3 rounded-xl bg-white border border-violet-100 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 outline-none transition-all placeholder:text-gray-400 text-gray-600 text-sm"
          />
        </div>
        
        <div class="flex justify-end mt-2">
          <button 
            type="submit" 
            :disabled="!isFormValid"
            class="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-violet-200 hover:shadow-violet-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Adicionar à Lista
          </button>
        </div>
      </form>

      <!-- Wishlist -->
      <div v-if="items.length === 0" class="text-center py-16 text-gray-400 flex flex-col items-center bg-white/40 rounded-2xl border border-dashed border-violet-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mb-4 text-violet-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p class="text-xl text-gray-500 font-medium mb-2">Lista vazia.</p>
        <p class="text-md">Adicione novos desejos para mantê-los sob controle!</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div 
          v-for="item in sortedItems" 
          :key="item.id"
          class="group flex flex-col gap-3 p-5 rounded-2xl transition-all duration-300 transform border hover:-translate-y-1 hover:shadow-xl"
          :class="item.purchased ? 'bg-green-50/50 border-green-100 opacity-80 border-dashed' : 'bg-white border-violet-100 hover:border-violet-300 shadow-sm'"
        >
          <div class="flex justify-between items-start gap-4">
            
            <div class="flex items-start gap-3 min-w-0">
               <div 
                  class="w-6 h-6 mt-1 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  :class="item.purchased ? 'bg-green-400 border-green-400 text-white' : 'border-gray-300 group-hover:border-violet-300 text-transparent'"
                  @click="toggleItemStatus(item.id)"
                  title="Marcar como comprado/não comprado"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>

              <div class="flex flex-col min-w-0">
                <span 
                  class="text-lg font-bold truncate"
                  :class="item.purchased ? 'text-gray-400 line-through' : 'text-gray-800'"
                >
                  {{ item.name }}
                </span>
                
                <span v-if="item.price" class="text-sm font-semibold tracking-wide" :class="item.purchased ? 'text-green-600/60' : 'text-violet-600'">
                  {{ formatCurrency(item.price) }}
                </span>
                <span v-else class="text-xs text-gray-400">Sem valor defindo</span>
              </div>
            </div>

            <button 
              @click="removeItem(item.id)"
              class="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2 rounded-xl hover:bg-red-50 shrink-0"
              title="Excluir item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <div v-if="item.link" class="mt-auto pt-2 pl-9">
            <a 
              :href="item.link" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors border"
              :class="item.purchased ? 'bg-green-100/50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-violet-50 text-violet-600 border-violet-100 hover:bg-violet-100 hover:border-violet-200'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Acessar Link
            </a>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

interface WishlistItem {
  id: string
  name: string
  price?: number
  link?: string
  purchased: boolean
}

const items = ref<WishlistItem[]>([])

// Form state
const newItemName = ref('')
const newItemPrice = ref<number | ''>('')
const newItemLink = ref('')

onMounted(() => {
  const saved = localStorage.getItem('@organizador:wishlist')
  if (saved) {
    try {
      items.value = JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
  }
})

watch(items, (newVal) => {
  localStorage.setItem('@organizador:wishlist', JSON.stringify(newVal))
}, { deep: true })


const isFormValid = computed(() => {
  return newItemName.value.trim() !== ''
})

const sortedItems = computed(() => {
  return [...items.value].sort((a, b) => {
    // Put purchased items at the bottom
    if (a.purchased && !b.purchased) return 1
    if (!a.purchased && b.purchased) return -1
    return 0
  })
})

const totalWishlistValue = computed(() => {
  return items.value
    .filter(item => !item.purchased)
    .reduce((sum, item) => sum + (item.price || 0), 0)
})

const totalPurchasedValue = computed(() => {
  return items.value
    .filter(item => item.purchased)
    .reduce((sum, item) => sum + (item.price || 0), 0)
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const addItem = () => {
  if (!isFormValid.value) return
  
  // Basic URL validation if provided
  let formattedLink = newItemLink.value.trim()
  if (formattedLink && !formattedLink.startsWith('http://') && !formattedLink.startsWith('https://')) {
    formattedLink = 'https://' + formattedLink
  }
  
  items.value.unshift({
    id: crypto.randomUUID(),
    name: newItemName.value.trim(),
    price: newItemPrice.value !== '' && newItemPrice.value !== null ? Number(newItemPrice.value) : undefined,
    link: formattedLink || undefined,
    purchased: false
  })
  
  // Reset form
  newItemName.value = ''
  newItemPrice.value = ''
  newItemLink.value = ''
}

const toggleItemStatus = (id: string) => {
  const item = items.value.find(i => i.id === id)
  if (item) {
    item.purchased = !item.purchased
  }
}

const removeItem = (id: string) => {
  items.value = items.value.filter(i => i.id !== id)
}
</script>
