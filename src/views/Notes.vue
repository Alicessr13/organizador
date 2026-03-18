<template>
  <div class="min-h-screen bg-linear-to-br from-amber-50 leading-relaxed text-gray-800 to-yellow-100 p-4 md:p-8 flex justify-center items-start">
    <div class="w-full max-w-5xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-10 border border-white/50 min-h-[80vh] flex flex-col">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-yellow-600 tracking-tight flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Anotações
        </h1>
        <div class="flex items-center gap-4">
          <button 
            @click="openAddModal"
            class="px-5 py-2.5 bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold rounded-xl shadow-lg shadow-amber-200 transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Nova Anotação
          </button>
          <router-link to="/" class="text-amber-600 hover:text-amber-800 font-medium flex items-center gap-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Voltar
          </router-link>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="notes.length === 0" class="flex-1 flex flex-col items-center justify-center text-gray-400 bg-white/40 rounded-3xl border border-dashed border-gray-300 p-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 text-amber-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-xl font-medium mb-1 text-gray-500">Nenhuma anotação por aqui</p>
        <p class="text-sm">Clique em "Nova Anotação" para começar!</p>
      </div>

      <!-- Notes Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        <div 
          v-for="note in notes" :key="note.id"
          class="relative p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col min-h-[160px] border"
          :class="getColorClasses(note.color)"
          @click="editNote(note)"
        >
          <!-- Decorative pin -->
          <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 rounded-full bg-white/50 backdrop-blur-xs shadow-xs border border-white/60"></div>

          <div class="flex justify-between items-start mb-3 mt-1">
             <h3 class="font-bold text-lg leading-tight line-clamp-2" :title="note.title">{{ note.title || 'Sem título' }}</h3>
          </div>
          
          <p class="text-sm opacity-90 whitespace-pre-wrap line-clamp-6 flex-1 mb-4">{{ note.content }}</p>
          
          <div class="text-xs font-medium opacity-60 flex justify-between items-center mt-auto pt-4 border-t border-black/5">
             <span>{{ formatDate(note.updatedAt || note.createdAt) }}</span>
             <button @click.stop="removeNote(note.id)" class="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500" title="Excluir">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
               </svg>
             </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Adding / Editing -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0">
          <h2 class="text-xl font-bold text-gray-800">{{ editingNoteId ? 'Editar Anotação' : 'Nova Anotação' }}</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto flex-1 flex flex-col">
          <form @submit.prevent="saveNote" class="flex flex-col gap-5 flex-1">
            <div>
              <input 
                v-model="form.title" 
                type="text" 
                placeholder="Título da anotação (opcional)" 
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-400 focus:bg-white outline-none transition-all font-bold text-lg text-gray-800 placeholder-gray-400" 
              />
            </div>
            
            <div class="flex-1 flex flex-col">
               <textarea 
                 v-model="form.content"
                 placeholder="Digite sua nota aqui..."
                 class="w-full flex-1 min-h-[200px] px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-400 focus:bg-white outline-none transition-all text-gray-700 resize-y"
                 required
               ></textarea>
            </div>

            <!-- Color Selection -->
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Cor do Post-it</label>
              <div class="flex gap-3">
                <button 
                  v-for="c in colorOptions" 
                  :key="c.id" type="button" 
                  @click="form.color = c.id"
                  class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                  :class="[c.bgClass, form.color === c.id ? 'border-gray-800 scale-110 shadow-md' : 'border-transparent']"
                  :title="c.label"
                ></button>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
               <button 
                 type="button" 
                 @click="closeModal" 
                 class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
               >
                 Cancelar
               </button>
               <button 
                 type="submit" 
                 :disabled="!isFormValid"
                 class="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-200 disabled:opacity-50 transition-all flex justify-center items-center"
               >
                 Salvar
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

type NoteColor = 'yellow' | 'pink' | 'blue' | 'green' | 'purple' | 'white'

interface Note {
  id: string
  title: string
  content: string
  color: NoteColor
  createdAt: string
  updatedAt: string
}

const colorOptions: { id: NoteColor, label: string, bgClass: string }[] = [
  { id: 'yellow', label: 'Amarelo', bgClass: 'bg-yellow-200' },
  { id: 'blue', label: 'Azul', bgClass: 'bg-blue-200' },
  { id: 'green', label: 'Verde', bgClass: 'bg-green-200' },
  { id: 'pink', label: 'Rosa', bgClass: 'bg-pink-200' },
  { id: 'purple', label: 'Roxo', bgClass: 'bg-purple-200' },
  { id: 'white', label: 'Branco', bgClass: 'bg-white border-gray-300' },
]

const notes = ref<Note[]>([])

onMounted(() => {
  const saved = localStorage.getItem('@organizador:anotacoes')
  if (saved) {
    try {
      notes.value = JSON.parse(saved)
    } catch (e) {
      console.error('Error parsing notes from LS', e)
    }
  }
})

watch(notes, (newVal) => {
  localStorage.setItem('@organizador:anotacoes', JSON.stringify(newVal))
}, { deep: true })

// Modal and Form State
const isModalOpen = ref(false)
const editingNoteId = ref<string | null>(null)

const form = ref<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>({
  title: '',
  content: '',
  color: 'yellow'
})

const isFormValid = computed(() => form.value.content.trim().length > 0)

const openAddModal = () => {
  editingNoteId.value = null
  form.value = {
    title: '',
    content: '',
    color: 'yellow'
  }
  isModalOpen.value = true
}

const editNote = (note: Note) => {
  editingNoteId.value = note.id
  form.value = {
    title: note.title,
    content: note.content,
    color: note.color || 'yellow'
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveNote = () => {
  if (!isFormValid.value) return

  const now = new Date().toISOString()
  
  if (editingNoteId.value) {
    const index = notes.value.findIndex(n => n.id === editingNoteId.value)
    if (index !== -1) {
      const existing = notes.value[index]
      if (existing) {
        notes.value[index] = {
          id: existing.id,
          createdAt: existing.createdAt,
          title: form.value.title.trim(),
          content: form.value.content.trim(),
          color: form.value.color,
          updatedAt: now
        }
      }
    }
  } else {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: form.value.title.trim(),
      content: form.value.content.trim(),
      color: form.value.color,
      createdAt: now,
      updatedAt: now
    }
    notes.value.unshift(newNote)
  }

  closeModal()
}

const removeNote = (id: string) => {
  if (confirm('Tem certeza que deseja excluir esta anotação?')) {
    notes.value = notes.value.filter(n => n.id !== id)
  }
}

// UI Helpers
const formatDate = (isoString: string) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getColorClasses = (color: NoteColor) => {
  switch (color) {
    case 'yellow': return 'bg-yellow-100 border-yellow-200 text-yellow-900 group-hover:border-yellow-300'
    case 'pink': return 'bg-pink-100 border-pink-200 text-pink-900 group-hover:border-pink-300'
    case 'blue': return 'bg-blue-100 border-blue-200 text-blue-900 group-hover:border-blue-300'
    case 'green': return 'bg-green-100 border-green-200 text-green-900 group-hover:border-green-300'
    case 'purple': return 'bg-purple-100 border-purple-200 text-purple-900 group-hover:border-purple-300'
    case 'white': 
    default:
      return 'bg-white border-gray-200 text-gray-800 group-hover:border-gray-300'
  }
}

</script>

<style scoped>
</style>
