<template>
  <div class="min-h-screen bg-linear-to-br from-emerald-50 leading-relaxed text-gray-800 to-teal-100 p-4 md:p-8 flex justify-center items-start">
    <div class="w-full max-w-5xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-10 border border-white/50">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600 tracking-tight flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Planejamento Financeiro
        </h1>
        <router-link to="/" class="text-emerald-600 hover:text-emerald-800 font-medium flex items-center justify-end gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Voltar
        </router-link>
      </div>

      <!-- Controls -->
      <div class="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-emerald-100 items-center justify-between">
        
        <!-- View Toggle -->
        <div class="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
          <button 
            @click="currentView = 'monthly'"
            class="flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all"
            :class="currentView === 'monthly' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
          >
            Visão Mensal
          </button>
          <button 
            @click="currentView = 'annual'"
            class="flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all"
            :class="currentView === 'annual' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
          >
            Visão Anual
          </button>
        </div>

        <!-- Date Selectors -->
        <div class="flex gap-3 w-full md:w-auto">
          <select 
            v-if="currentView === 'monthly'"
            v-model="selectedMonth" 
            class="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 outline-none font-medium text-gray-700"
          >
            <option v-for="(name, index) in monthNames" :key="index" :value="index">
              {{ name }}
            </option>
          </select>
          <select 
            v-model="selectedYear" 
            class="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 outline-none font-medium text-gray-700"
          >
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <!-- Incomes -->
        <div class="bg-linear-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200 flex flex-col items-center justify-center text-center">
          <span class="text-green-700 font-bold uppercase tracking-wider text-xs mb-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            Entradas
          </span>
          <span class="text-3xl font-extrabold text-green-800">{{ formatCurrency(totalIncome) }}</span>
        </div>
        
        <!-- Expenses -->
        <div class="bg-linear-to-br from-red-50 to-rose-100 p-6 rounded-2xl border border-red-200 flex flex-col items-center justify-center text-center">
          <span class="text-red-700 font-bold uppercase tracking-wider text-xs mb-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
            Saídas
          </span>
          <span class="text-3xl font-extrabold text-red-800">{{ formatCurrency(totalExpense) }}</span>
        </div>

        <!-- Balance -->
        <div class="bg-linear-to-br p-6 rounded-2xl border flex flex-col items-center justify-center text-center"
             :class="balance >= 0 ? 'from-emerald-500 to-green-600 border-green-600 text-white shadow-lg shadow-green-200' : 'from-rose-500 to-red-600 border-red-600 text-white shadow-lg shadow-red-200'">
          <span class="font-bold uppercase tracking-wider text-xs mb-2 flex items-center gap-1 text-white/80">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            Saldo Líquido
          </span>
          <span class="text-4xl font-black">{{ formatCurrency(balance) }}</span>
        </div>
      </div>

      <!-- Add Transaction Form -->
      <div class="mb-10 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 class="font-bold text-gray-800 mb-6 flex items-center gap-2 text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nova Transação
        </h3>

        <form @submit.prevent="addTransaction" class="flex flex-col gap-5">
          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div class="md:col-span-3">
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Tipo</label>
              <div class="flex gap-2 bg-gray-100 p-1 rounded-xl">
                <button type="button" @click="newTxType = 'income'" class="flex-1 py-2 rounded-lg text-sm font-bold transition-all" :class="newTxType === 'income' ? 'bg-green-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'">Entrada</button>
                <button type="button" @click="newTxType = 'expense'" class="flex-1 py-2 rounded-lg text-sm font-bold transition-all" :class="newTxType === 'expense' ? 'bg-red-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'">Saída</button>
              </div>
            </div>
            <div class="md:col-span-6">
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Descrição</label>
              <input v-model="newTxDesc" type="text" placeholder="Ex: Salário, Conta de Luz..." class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-emerald-300 outline-none transition-all placeholder:text-gray-400 font-medium" required />
            </div>
            <div class="md:col-span-3">
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Valor (R$)</label>
              <input v-model="newTxAmount" type="number" step="0.01" min="0.01" placeholder="0.00" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-emerald-300 outline-none transition-all placeholder:text-gray-400 font-bold text-right" required />
            </div>
          </div>

          <!-- Recurrence Rules -->
          <div class="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 mt-2">
            <label class="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Regra de Repetição
            </label>
            
            <div class="flex flex-wrap gap-3 mb-4">
              <label class="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 border rounded-xl hover:border-emerald-300 transition-colors" :class="newTxRecurrence === 'monthly' ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-gray-200'">
                <input type="radio" v-model="newTxRecurrence" value="monthly" class="text-emerald-500 focus:ring-emerald-500" />
                <span class="font-medium text-sm text-gray-700">Todos os meses</span>
              </label>
              
              <label class="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 border rounded-xl hover:border-emerald-300 transition-colors" :class="newTxRecurrence === 'specific_months' ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-gray-200'">
                <input type="radio" v-model="newTxRecurrence" value="specific_months" class="text-emerald-500 focus:ring-emerald-500" />
                <span class="font-medium text-sm text-gray-700">Meses específicos</span>
              </label>
              
              <label class="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 border rounded-xl hover:border-emerald-300 transition-colors" :class="newTxRecurrence === 'single' ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-gray-200'">
                <input type="radio" v-model="newTxRecurrence" value="single" class="text-emerald-500 focus:ring-emerald-500" />
                <span class="font-medium text-sm text-gray-700">Apenas numa data</span>
              </label>
            </div>

            <!-- Specific Months Selection -->
            <div v-if="newTxRecurrence === 'specific_months'" class="mt-4 pt-4 border-t border-emerald-100">
              <p class="text-sm text-gray-600 mb-3">Selecione em quais meses esta transação se repete (anualmente):</p>
              <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                <label v-for="(name, index) in shortMonthNames" :key="index" class="flex items-center justify-center gap-2 cursor-pointer bg-white px-2 py-2 border rounded-lg transition-colors text-sm font-medium" :class="newTxSpecificMonths.includes(index) ? 'bg-emerald-500 text-white border-emerald-600' : 'border-gray-200 text-gray-600 hover:border-emerald-300'">
                  <input type="checkbox" :value="index" v-model="newTxSpecificMonths" class="hidden" />
                  {{ name }}
                </label>
              </div>
            </div>

            <!-- Single Month Selection -->
            <div v-if="newTxRecurrence === 'single'" class="mt-4 pt-4 border-t border-emerald-100 flex flex-wrap gap-4 items-center">
              <p class="text-sm text-gray-600 w-full md:w-auto">Data exata:</p>
              <select v-model="newTxSingleMonth" class="px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-emerald-300 outline-none text-sm font-medium">
                <option v-for="(name, index) in monthNames" :key="index" :value="index">{{ name }}</option>
              </select>
              <select v-model="newTxSingleYear" class="px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-emerald-300 outline-none text-sm font-medium">
                <option v-for="year in availableYearsToSelect" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>
          </div>

          <!-- Submit -->
          <div class="flex justify-end mt-2">
            <button type="submit" :disabled="!isFormValid" class="w-full sm:w-auto px-10 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Salvar Transação
            </button>
          </div>
        </form>
      </div>

      <!-- Transaction List -->
      <div>
        <h3 class="font-bold text-gray-800 tracking-tight text-2xl mb-6">
          Transações do período ({{ currentView === 'monthly' ? monthNames[selectedMonth] + ' de ' + selectedYear : 'Ano de ' + selectedYear }})
        </h3>

        <div v-if="filteredTransactions.length === 0" class="text-center py-16 text-gray-400 bg-white/40 rounded-3xl border border-dashed border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p class="text-xl font-medium mb-1">Nenhuma transação encontrada</p>
          <p class="text-sm">Os lançamentos que se aplicam a este período aparecerão aqui.</p>
        </div>

        <div v-else class="space-y-3">
          <div 
            v-for="tx in filteredTransactions" :key="tx.id"
            class="group bg-white flex items-center justify-between p-4 md:p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 shadow-sm hover:shadow-md transition-all"
          >
            <div class="flex items-center gap-4">
              <div class="p-3 rounded-full shrink-0" :class="tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'">
                <svg v-if="tx.type === 'income'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              </div>
              <div class="min-w-0">
                <p class="font-bold text-gray-800 text-lg truncate">{{ tx.description }}</p>
                <div class="flex items-center gap-2 mt-0.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <span v-if="tx.recurrence === 'monthly'">Mês a mês</span>
                  <span v-else-if="tx.recurrence === 'single'">Somente {{ monthNames[tx.singleMonth!] }}/{{ tx.singleYear }}</span>
                  <span v-else>Meses específicos ({{ tx.specificMonths?.map(m => shortMonthNames[m]).join(', ') }})</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-4 shrink-0">
              <span class="font-black text-xl" :class="tx.type === 'income' ? 'text-green-600' : 'text-red-600'">
                {{ tx.type === 'income' ? '+' : '-' }} {{ formatCurrency(tx.amount) }}
              </span>
              <button 
                @click="removeTransaction(tx.id)"
                class="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                title="Excluir Transação"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

type RecurrenceType = 'monthly' | 'specific_months' | 'single'

interface Transaction {
  id: string
  description: string
  type: 'income' | 'expense'
  amount: number
  recurrence: RecurrenceType
  specificMonths?: number[] // array of month indices 0-11
  singleMonth?: number // 0-11
  singleYear?: number
}

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const shortMonthNames = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
]

const today = new Date()
const currentSystemYear = today.getFullYear()
const currentSystemMonth = today.getMonth()

// State
const transactions = ref<Transaction[]>([])
const currentView = ref<'monthly' | 'annual'>('monthly')
const selectedMonth = ref(currentSystemMonth)
const selectedYear = ref(currentSystemYear)

// Years dropdown (10 years back, 10 years forward)
const availableYears = computed(() => {
  const years = []
  for (let i = currentSystemYear - 10; i <= currentSystemYear + 10; i++) {
    years.push(i)
  }
  return years
})

// Separate year list for creating single event (maybe we just want 5 years back/fwd)
const availableYearsToSelect = computed(() => {
  const years = []
  for (let i = currentSystemYear - 5; i <= currentSystemYear + 5; i++) {
    years.push(i)
  }
  return years
})

// Form State
const newTxType = ref<'income' | 'expense'>('expense')
const newTxDesc = ref('')
const newTxAmount = ref<number | ''>('')
const newTxRecurrence = ref<RecurrenceType>('monthly')
const newTxSpecificMonths = ref<number[]>([])
const newTxSingleMonth = ref(currentSystemMonth)
const newTxSingleYear = ref(currentSystemYear)

onMounted(() => {
  const saved = localStorage.getItem('@organizador:finance')
  if (saved) {
    try {
      transactions.value = JSON.parse(saved)
    } catch (e) {
      console.error('Error parsing finance from LS', e)
    }
  }
})

watch(transactions, (newVal) => {
  localStorage.setItem('@organizador:finance', JSON.stringify(newVal))
}, { deep: true })

const isFormValid = computed(() => {
  if (!newTxDesc.value.trim() || newTxAmount.value === '' || newTxAmount.value <= 0) return false
  if (newTxRecurrence.value === 'specific_months' && newTxSpecificMonths.value.length === 0) return false
  return true
})

// Logic to determine if a transaction applies to a specific YEAR and MONTH combination
const appliesToPeriod = (tx: Transaction, checkMonth: number, checkYear: number) => {
  if (tx.recurrence === 'monthly') return true
  if (tx.recurrence === 'single') {
    return tx.singleMonth === checkMonth && tx.singleYear === checkYear
  }
  if (tx.recurrence === 'specific_months') {
    return tx.specificMonths?.includes(checkMonth) ?? false
  }
  return false
}

const filteredTransactions = computed(() => {
  return [...transactions.value].filter(tx => {
    if (currentView.value === 'monthly') {
      return appliesToPeriod(tx, selectedMonth.value, selectedYear.value)
    } else {
      // Annual view: applies to ANY month in the selected year
      // To show in annual list, we just check if it applies to at least 1 month
      for (let m = 0; m < 12; m++) {
         if (appliesToPeriod(tx, m, selectedYear.value)) return true
      }
      return false
    }
  })
})

const totalIncome = computed(() => {
  if (currentView.value === 'monthly') {
    return filteredTransactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  } else {
    // Annual calculation: sum over all 12 months for this year
    let annualSum = 0
    transactions.value.filter(t => t.type === 'income').forEach(tx => {
       for (let m = 0; m < 12; m++) {
          if (appliesToPeriod(tx, m, selectedYear.value)) annualSum += tx.amount
       }
    })
    return annualSum
  }
})

const totalExpense = computed(() => {
  if (currentView.value === 'monthly') {
    return filteredTransactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  } else {
    let annualSum = 0
    transactions.value.filter(t => t.type === 'expense').forEach(tx => {
       for (let m = 0; m < 12; m++) {
          if (appliesToPeriod(tx, m, selectedYear.value)) annualSum += tx.amount
       }
    })
    return annualSum
  }
})

const balance = computed(() => totalIncome.value - totalExpense.value)

const addTransaction = () => {
  if (!isFormValid.value) return

  const tx: Transaction = {
    id: crypto.randomUUID(),
    description: newTxDesc.value.trim(),
    type: newTxType.value,
    amount: Number(newTxAmount.value),
    recurrence: newTxRecurrence.value
  }

  if (newTxRecurrence.value === 'specific_months') {
    tx.specificMonths = [...newTxSpecificMonths.value]
  } else if (newTxRecurrence.value === 'single') {
    tx.singleMonth = newTxSingleMonth.value
    tx.singleYear = newTxSingleYear.value
  }

  transactions.value.unshift(tx)

  // Reset form
  newTxDesc.value = ''
  newTxAmount.value = ''
  // keep default recurrence selections as they often repeat similar patterns
}

const removeTransaction = (id: string) => {
  transactions.value = transactions.value.filter(tx => tx.id !== id)
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>
