<template>
  <div class="min-h-screen bg-linear-to-br from-indigo-50 leading-relaxed text-gray-800 to-blue-100 p-4 md:p-8 flex justify-center items-start">
    <div class="w-full max-w-5xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-10 border border-white/50">
      
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-600 tracking-tight flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Diário de Leitura
        </h1>
        <router-link to="/" class="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Voltar
        </router-link>
      </div>

      <!-- Add / Edit Book Form Modal Toggle -->
      <div class="mb-8 flex justify-end">
        <button 
          @click="openAddModal"
          class="px-6 py-3 bg-linear-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Registrar Novo Livro
        </button>
      </div>

      <!-- Currently Reading Section -->
      <div v-if="currentlyReading.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span class="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </span>
          Lendo Atualmente
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div 
            v-for="book in currentlyReading" :key="book.id"
            class="relative bg-linear-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-3xl shadow-xl shadow-indigo-200/50 overflow-hidden group cursor-pointer"
            @click="editBook(book)"
          >
            <!-- Decorative circle -->
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl group-hover:bg-indigo-300 transition-colors"></div>
            
            <div class="relative z-10">
               <div class="flex justify-between items-start mb-4">
                  <h3 class="text-2xl font-bold max-w-[80%] leading-tight">{{ book.title }}</h3>
                  <span class="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                    {{ book.pages ? book.pages + ' pgs' : 'Tamanho desc.' }}
                  </span>
               </div>
               
               <div class="flex items-center gap-4 text-indigo-100 text-sm font-medium mb-6">
                 <div v-if="book.startDate" class="flex items-center gap-1">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                   Iniciado em: {{ formatDate(book.startDate) }}
                 </div>
                 <div v-else>Data de início não informada</div>
               </div>

               <div class="mt-4 flex justify-end">
                 <span class="inline-flex items-center gap-1 text-white text-sm bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Editar / Atualizar Status
                 </span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Library Library Divider -->
      <div v-if="currentlyReading.length > 0 && library.length > 0" class="h-px bg-gray-200 w-full my-12"></div>

      <!-- Library Section -->
      <div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <span class="bg-blue-100 text-blue-600 p-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </span>
            Minha Biblioteca
          </h2>
          
          <!-- Library Filter -->
          <div class="flex gap-2 bg-gray-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto hide-scrollbar">
             <button 
                @click="libraryFilter = 'all'"
                class="px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap"
                :class="libraryFilter === 'all' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
             >Todos</button>
             <button 
                @click="libraryFilter = 'lido'"
                class="px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap"
                :class="libraryFilter === 'lido' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
             >Lidos</button>
             <button 
                @click="libraryFilter = 'quero_ler'"
                class="px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap"
                :class="libraryFilter === 'quero_ler' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
             >Quero Ler</button>
             <button 
                @click="libraryFilter = 'abandonado'"
                class="px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap"
                :class="libraryFilter === 'abandonado' ? 'bg-white text-red-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
             >Abandonados</button>
          </div>
        </div>

        <div v-if="filteredLibrary.length === 0" class="text-center py-16 text-gray-400 bg-white/40 rounded-3xl border border-dashed border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p class="text-xl font-medium mb-1">Não há livros aqui</p>
          <p class="text-sm">Comece a registrar suas leituras!</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="book in filteredLibrary" :key="book.id"
            class="bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col"
            :class="getStatusBorderColor(book.status)"
            @click="editBook(book)"
          >
            <div class="px-5 py-4 border-b border-gray-100 flex-1">
              <div class="flex justify-between items-start mb-2 gap-2">
                 <h3 class="font-bold text-gray-800 text-lg leading-tight line-clamp-2" :title="book.title">{{ book.title }}</h3>
              </div>
              
              <div class="flex items-center gap-2 mb-3">
                 <span class="text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wider" :class="getStatusBadgeClass(book.status)">
                    {{ getStatusLabel(book.status) }}
                 </span>
                 <span v-if="book.rating && book.status === 'lido'" class="flex items-center text-yellow-500 text-sm">
                   <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :class="i <= book.rating ? 'fill-current' : 'text-gray-200 fill-current'" viewBox="0 0 20 20">
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                   </svg>
                 </span>
              </div>
              
              <p v-if="book.review" class="text-sm text-gray-600 line-clamp-3 italic">"{{ book.review }}"</p>
              <p v-else class="text-sm text-gray-400 italic">Nenhuma resenha.</p>
            </div>
            
            <div class="bg-gray-50 px-5 py-3 text-xs text-gray-500 flex justify-between items-center mt-auto">
               <span v-if="book.status === 'lido' && book.endDate">
                 Lido em {{ formatDate(book.endDate) }}
               </span>
               <span v-else-if="book.startDate">
                 Adicionado em {{ formatDate(book.startDate) }}
               </span>
               <span v-else>
                 Sem data
               </span>
               
               <span v-if="book.pages" class="font-medium text-gray-600 border border-gray-200 px-2 py-0.5 rounded-md bg-white">
                 {{ book.pages }} p
               </span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Modal for Adding / Editing -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0">
          <h2 class="text-xl font-bold text-gray-800">{{ editingBookId ? 'Editar Livro' : 'Novo Livro' }}</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto">
          <form @submit.prevent="saveBook" class="flex flex-col gap-5">
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Título do Livro *</label>
              <input v-model="form.title" type="text" placeholder="A coragem de ser imperfeito..." class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-400 outline-none transition-all font-medium" required />
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Status *</label>
                  <select v-model="form.status" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-400 outline-none transition-all font-medium text-gray-700">
                    <option value="lendo">Lendo Atualmente</option>
                    <option value="quero_ler">Quero Ler</option>
                    <option value="lido">Lido</option>
                    <option value="abandonado">Abandonado</option>
                  </select>
               </div>
               <div>
                  <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Páginas</label>
                  <input v-model="form.pages" type="number" min="1" placeholder="Ex: 256" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-400 outline-none transition-all font-medium" />
               </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Data de Início</label>
                  <input v-model="form.startDate" type="date" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-400 outline-none transition-all font-medium text-gray-700" />
               </div>
               <div>
                  <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Data Fim (Conclusão)</label>
                  <input v-model="form.endDate" type="date" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-400 outline-none transition-all font-medium text-gray-700" :disabled="form.status !== 'lido' && form.status !== 'abandonado'" />
               </div>
            </div>

            <!-- Review and Rating (Only relevant if read or abandoned) -->
            <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
               <div class="mb-4">
                 <label class="block text-xs font-bold text-indigo-800 uppercase tracking-widest mb-2">Sua Nota</label>
                 <div class="flex gap-2">
                   <button 
                      type="button" 
                      v-for="star in 5" :key="star"
                      @click="form.rating = star"
                      class="focus:outline-none focus:scale-110 transition-transform"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 transition-colors" :class="star <= (form.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current hover:text-yellow-200'" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                   </button>
                   <button v-if="form.rating" @click="form.rating = undefined" type="button" class="ml-2 text-xs text-gray-400 hover:text-gray-600 underline self-end mb-1">Limpar nota</button>
                 </div>
               </div>
               
               <div>
                  <label class="block text-xs font-bold text-indigo-800 uppercase tracking-widest mb-2">Resenha / Anotações</label>
                  <textarea 
                    v-model="form.review"
                    placeholder="O que achou do livro?"
                    class="w-full px-4 py-3 rounded-xl bg-white border border-indigo-100 focus:border-indigo-400 outline-none transition-all text-sm text-gray-700 resize-y min-h-[100px]"
                  ></textarea>
               </div>
            </div>

            <!-- Footer Actions -->
            <div class="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
               <button 
                 v-if="editingBookId" 
                 type="button"
                 @click="removeBook(editingBookId)"
                 class="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-colors shrink-0"
               >
                 Excluir Livro
               </button>
               <div v-else></div>

               <div class="flex flex-col-reverse sm:flex-row gap-3 w-full sm:w-auto">
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
                   class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 disabled:opacity-50 transition-all flex justify-center items-center"
                 >
                   Salvar
                 </button>
               </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

type BookStatus = 'lendo' | 'lido' | 'abandonado' | 'quero_ler'

interface Book {
  id: string
  title: string
  status: BookStatus
  startDate?: string
  endDate?: string
  pages?: number
  rating?: number // 1-5
  review?: string
}

const books = ref<Book[]>([])

onMounted(() => {
  const saved = localStorage.getItem('@organizador:reading-diary')
  if (saved) {
    try {
      books.value = JSON.parse(saved)
    } catch (e) {
      console.error('Error parsing books from LS', e)
    }
  }
})

watch(books, (newVal) => {
  localStorage.setItem('@organizador:reading-diary', JSON.stringify(newVal))
}, { deep: true })

// Modal and Form State
const isModalOpen = ref(false)
const editingBookId = ref<string | null>(null)

const form = ref<Omit<Book, 'id'>>({
  title: '',
  status: 'lendo',
  startDate: '',
  endDate: '',
  pages: undefined,
  rating: undefined,
  review: ''
})

const isFormValid = computed(() => form.value.title.trim().length > 0)

const openAddModal = () => {
  editingBookId.value = null
  const todayStr = new Date().toISOString().split('T')[0]
  form.value = {
    title: '',
    status: 'lendo',
    startDate: todayStr,
    endDate: '',
    pages: undefined,
    rating: undefined,
    review: ''
  }
  isModalOpen.value = true
}

const editBook = (book: Book) => {
  editingBookId.value = book.id
  form.value = {
    title: book.title,
    status: book.status,
    startDate: book.startDate || '',
    endDate: book.endDate || '',
    pages: book.pages,
    rating: book.rating,
    review: book.review || ''
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveBook = () => {
  if (!isFormValid.value) return

  const bookData: Book = {
    id: editingBookId.value || crypto.randomUUID(),
    title: form.value.title.trim(),
    status: form.value.status,
    startDate: form.value.startDate || undefined,
    endDate: form.value.endDate || undefined,
    pages: form.value.pages || undefined,
    rating: form.value.rating || undefined,
    review: form.value.review?.trim() || undefined
  }

  if (editingBookId.value) {
    const index = books.value.findIndex(b => b.id === editingBookId.value)
    if (index !== -1) {
      books.value[index] = bookData
    }
  } else {
    books.value.unshift(bookData)
  }

  closeModal()
}

const removeBook = (id: string) => {
  books.value = books.value.filter(b => b.id !== id)
  closeModal()
}

// Display Logic
const currentlyReading = computed(() => books.value.filter(b => b.status === 'lendo'))

const library = computed(() => books.value.filter(b => b.status !== 'lendo'))

const libraryFilter = ref<'all' | BookStatus>('all')

const filteredLibrary = computed(() => {
  if (libraryFilter.value === 'all') {
    return library.value
  }
  return library.value.filter(b => b.status === libraryFilter.value)
})

// UI Helpers
const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

const getStatusLabel = (status: BookStatus) => {
  switch (status) {
    case 'lendo': return 'Lendo'
    case 'lido': return 'Lido'
    case 'abandonado': return 'Abandonado'
    case 'quero_ler': return 'Quero Ler'
  }
}

const getStatusBadgeClass = (status: BookStatus) => {
  switch (status) {
    case 'lendo': return 'bg-indigo-100 text-indigo-700'
    case 'lido': return 'bg-green-100 text-green-700'
    case 'abandonado': return 'bg-red-100 text-red-700'
    case 'quero_ler': return 'bg-purple-100 text-purple-700'
  }
}

const getStatusBorderColor = (status: BookStatus) => {
  switch (status) {
    case 'lido': return 'border-green-100 hover:border-green-300'
    case 'abandonado': return 'border-red-100 hover:border-red-300'
    case 'quero_ler': return 'border-purple-100 hover:border-purple-300'
    default: return 'border-indigo-100 hover:border-indigo-300'
  }
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
