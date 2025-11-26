<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0b1524] via-[#0e2239] to-[#143d63] text-white relative overflow-hidden">
    <!-- Анимированный фон -->
    <div class="absolute inset-0">
      <!-- Летающие документы -->
      <div class="absolute top-1/5 left-1/6 w-12 h-16 bg-yellow-400/10 rounded-lg rotate-12 animate-float-doc-1">📄</div>
      <div class="absolute top-1/3 right-1/5 w-10 h-14 bg-blue-400/10 rounded-lg -rotate-6 animate-float-doc-2">📝</div>
      <div class="absolute bottom-1/4 left-1/4 w-14 h-12 bg-green-400/10 rounded-lg rotate-45 animate-float-doc-3">📎</div>
      <div class="absolute top-2/3 right-1/3 w-11 h-15 bg-red-400/10 rounded-lg -rotate-12 animate-float-doc-4">🔍</div>
      
      <!-- Пульсирующие точки данных -->
      <div class="absolute top-1/4 left-3/4 w-3 h-3 bg-cyan-400 rounded-full animate-ping-slow"></div>
      <div class="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping-slower"></div>
    </div>

    <div class="relative z-10">
      <!-- Хедер -->
      <div class="text-center pt-20 pb-16">
        <h1 class="text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
          📢 Environmental Report
        </h1>
        <p class="text-xl text-blue-100/80 max-w-2xl mx-auto">
          Help us protect our waters! Report environmental concerns with our advanced submission system
        </p>
      </div>

      <!-- Основной контент -->
      <div class="max-w-5xl mx-auto px-6 mb-20">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Левая колонка - прогресс и подсказки -->
          <div class="space-y-6">
            <!-- Прогресс бар -->
            <div class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 class="text-lg font-semibold mb-4">📈 Report Progress</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm">Information</span>
                  <span class="text-green-400 text-sm">✓ Complete</span>
                </div>
                <div class="w-full bg-white/10 rounded-full h-2">
                  <div class="bg-green-500 h-2 rounded-full transition-all duration-1000" :style="{ width: progress + '%' }"></div>
                </div>
                <div class="text-xs text-blue-100/60 text-center">
                  {{ Math.round(progress) }}% Complete
                </div>
              </div>
            </div>

            <!-- Советы -->
            <div class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 class="text-lg font-semibold mb-4">💡 Tips for Better Reports</h3>
              <div class="space-y-3 text-sm">
                <div class="flex items-start gap-2">
                  <span class="text-green-400 mt-0.5">✓</span>
                  <span>Include clear photos with timestamps</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-green-400 mt-0.5">✓</span>
                  <span>Provide exact GPS coordinates if possible</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-green-400 mt-0.5">✓</span>
                  <span>Describe the issue in detail</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-green-400 mt-0.5">✓</span>
                  <span>Mention any immediate dangers</span>
                </div>
              </div>
            </div>

            <!-- Быстрые шаблоны -->
            <div class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 class="text-lg font-semibold mb-4">🚀 Quick Templates</h3>
              <div class="space-y-2">
                <button 
                  v-for="template in quickTemplates" 
                  :key="template.id"
                  @click="applyTemplate(template)"
                  class="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-lg group-hover:scale-110 transition-transform">{{ template.emoji }}</span>
                    <div>
                      <div class="font-medium text-sm">{{ template.title }}</div>
                      <div class="text-xs text-blue-100/60">{{ template.desc }}</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Центральная колонка - основная форма -->
          <div class="lg:col-span-2">
            <div class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <!-- Личная информация -->
              <div class="mb-8">
                <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span class="text-3xl">👤</span>
                  Personal Information
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Full Name *</label>
                    <input 
                      v-model="reportForm.fullName"
                      type="text" 
                      required
                      class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-100/50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      placeholder="John Doe"
                      @input="updateProgress"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Email *</label>
                    <input 
                      v-model="reportForm.email"
                      type="email" 
                      required
                      class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-100/50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      placeholder="john@example.com"
                      @input="updateProgress"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2">Phone Number</label>
                    <input 
                      v-model="reportForm.phone"
                      type="tel" 
                      class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-100/50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      placeholder="+7 (777) 123-4567"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2">Organization</label>
                    <input 
                      v-model="reportForm.organization"
                      type="text" 
                      class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-100/50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      placeholder="Optional"
                    >
                  </div>
                </div>
              </div>

              <!-- Детали репорта -->
              <div class="mb-8">
                <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span class="text-3xl">📋</span>
                  Report Details
                </h3>

                <!-- Тип проблемы -->
                <div class="mb-6">
                  <label class="block text-sm font-medium mb-3">Issue Type *</label>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <button 
                      v-for="issue in issueTypes" 
                      :key="issue.id"
                      @click="selectIssueType(issue.id)"
                      class="p-4 rounded-xl border transition-all duration-300 text-center group"
                      :class="selectedIssueType === issue.id 
                        ? 'bg-orange-500/20 border-orange-500/50 scale-105' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105'"
                    >
                      <span class="text-2xl block mb-2 group-hover:scale-110 transition-transform">{{ issue.emoji }}</span>
                      <span class="text-sm font-medium">{{ issue.name }}</span>
                    </button>
                  </div>
                </div>

                <!-- Местоположение -->
                <div class="mb-6">
                  <label class="block text-sm font-medium mb-3">Location</label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input 
                        v-model="reportForm.location"
                        type="text" 
                        class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-100/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Lake name or area"
                      >
                    </div>
                    <button 
                      @click="getCurrentLocation"
                      class="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl px-4 py-3 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>📍</span>
                      Use My Location
                    </button>
                  </div>
                </div>

                <!-- Описание -->
                <div class="mb-6">
                  <label class="block text-sm font-medium mb-2">Detailed Description *</label>
                  <textarea 
                    v-model="reportForm.description"
                    rows="5"
                    class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-100/50 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none transition-all duration-300"
                    placeholder="Please describe the environmental concern in detail..."
                    @input="updateProgress"
                  ></textarea>
                  <div class="flex justify-between text-xs text-blue-100/60 mt-2">
                    <span>Be as detailed as possible</span>
                    <span>{{ reportForm.description.length }}/2000</span>
                  </div>
                </div>

                <!-- Загрузка файлов -->
                <div class="mb-6">
                  <label class="block text-sm font-medium mb-3">Attach Evidence</label>
                  <div 
                    @click="triggerFileInput"
                    class="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-orange-400/50 hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">📎</div>
                    <p class="text-blue-100/70 mb-2">Drop files here or click to upload</p>
                    <p class="text-blue-100/50 text-sm">Photos, videos, documents (max 10MB each)</p>
                    <input 
                      ref="fileInput"
                      type="file" 
                      multiple 
                      class="hidden" 
                      @change="handleFileUpload"
                      accept="image/*,video/*,.pdf,.doc,.docx"
                    >
                  </div>
                  
                  <!-- Список загруженных файлов -->
                  <div v-if="uploadedFiles.length > 0" class="mt-4 space-y-2">
                    <div 
                      v-for="(file, index) in uploadedFiles" 
                      :key="index"
                      class="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2"
                    >
                      <div class="flex items-center gap-3">
                        <span class="text-lg">
                          {{ getFileEmoji(file.type) }}
                        </span>
                        <div>
                          <div class="text-sm font-medium">{{ file.name }}</div>
                          <div class="text-xs text-blue-100/60">{{ formatFileSize(file.size) }}</div>
                        </div>
                      </div>
                      <button 
                        @click="removeFile(index)"
                        class="text-red-400 hover:text-red-300 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Срочность -->
                <div class="mb-6">
                  <label class="block text-sm font-medium mb-3">Urgency Level</label>
                  <div class="flex gap-3">
                    <button 
                      v-for="urgency in urgencyLevels" 
                      :key="urgency.level"
                      @click="selectUrgency(urgency.level)"
                      class="flex-1 p-4 rounded-xl border transition-all duration-300 text-center group"
                      :class="selectedUrgency === urgency.level 
                        ? urgency.class + ' scale-105' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105'"
                    >
                      <span class="text-2xl block mb-2 group-hover:scale-110 transition-transform">{{ urgency.emoji }}</span>
                      <span class="text-sm font-medium">{{ urgency.name }}</span>
                      <span class="text-xs text-blue-100/60 block mt-1">{{ urgency.desc }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Кнопка отправки -->
              <button 
                @click="submitReport"
                :disabled="!isFormValid"
                class="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <span class="text-xl">🚀</span>
                Launch Environmental Report
                <span class="text-xl">🌍</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно успеха -->
    <Transition name="modal">
      <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md text-center">
          <div class="text-6xl mb-4">🎉</div>
          <h3 class="text-2xl font-bold mb-4">Report Submitted!</h3>
          <p class="text-blue-100/70 mb-6">
            Thank you for helping protect our environment. We'll review your report and take appropriate action.
          </p>
          <button 
            @click="showSuccessModal = false"
            class="bg-green-500 hover:bg-green-600 rounded-xl px-6 py-3 font-semibold transition-all duration-300"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Состояние
const showSuccessModal = ref(false)
const progress = ref(0)
const selectedIssueType = ref(null)
const selectedUrgency = ref('medium')
const fileInput = ref(null)
const uploadedFiles = ref([])

// Форма
const reportForm = reactive({
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  location: '',
  description: ''
})

// Данные
const issueTypes = [
  { id: 1, name: 'Water Pollution', emoji: '🌊' },
  { id: 2, name: 'Illegal Dumping', emoji: '🚯' },
  { id: 3, name: 'Fish Kill', emoji: '🐟' },
  { id: 4, name: 'Algae Bloom', emoji: '🟢' },
  { id: 5, name: 'Chemical Spill', emoji: '⚠️' },
  { id: 6, name: 'Other', emoji: '❓' }
]

const urgencyLevels = [
  { 
    level: 'low', 
    name: 'Low', 
    emoji: '🐢', 
    desc: 'No immediate threat',
    class: 'bg-green-500/20 border-green-500/50'
  },
  { 
    level: 'medium', 
    name: 'Medium', 
    emoji: '🚶', 
    desc: 'Moderate concern',
    class: 'bg-yellow-500/20 border-yellow-500/50'
  },
  { 
    level: 'high', 
    name: 'High', 
    emoji: '🚨', 
    desc: 'Urgent attention needed',
    class: 'bg-red-500/20 border-red-500/50'
  }
]

const quickTemplates = [
  { id: 1, title: 'Water Pollution', emoji: '🌊', desc: 'Chemical or waste contamination' },
  { id: 2, title: 'Algae Bloom', emoji: '🟢', desc: 'Excessive algae growth' },
  { id: 3, title: 'Fish Kill', emoji: '🐟', desc: 'Dead fish observation' },
  { id: 4, title: 'Illegal Activity', emoji: '🚫', desc: 'Suspicious dumping' }
]

// Вычисляемые свойства
const isFormValid = computed(() => {
  return reportForm.fullName && reportForm.email && reportForm.description && selectedIssueType.value
})

// Методы
const updateProgress = () => {
  let filledFields = 0
  const requiredFields = ['fullName', 'email', 'description']
  
  requiredFields.forEach(field => {
    if (reportForm[field].trim()) filledFields++
  })
  
  if (selectedIssueType.value) filledFields++
  
  progress.value = (filledFields / (requiredFields.length + 1)) * 100
}

const selectIssueType = (id) => {
  selectedIssueType.value = id
  updateProgress()
}

const selectUrgency = (level) => {
  selectedUrgency.value = level
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    if (file.size > 10 * 1024 * 1024) {
      alert('File size too large. Maximum 10MB per file.')
      return
    }
    uploadedFiles.value.push(file)
  })
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

const getFileEmoji = (type) => {
  if (type.startsWith('image/')) return '🖼️'
  if (type.startsWith('video/')) return '🎥'
  if (type.includes('pdf')) return '📄'
  if (type.includes('document')) return '📝'
  return '📎'
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      reportForm.location = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
    })
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}

const applyTemplate = (template) => {
  reportForm.description = `Issue Type: ${template.title}\n\nDescription: ${template.desc}\n\nAdditional details: `
}

const submitReport = () => {
  if (!isFormValid.value) return
  
  // Здесь была бы отправка на сервер
  console.log('Submitting report:', {
    ...reportForm,
    issueType: selectedIssueType.value,
    urgency: selectedUrgency.value,
    files: uploadedFiles.value
  })
  
  showSuccessModal.value = true
  
  // Сброс формы
  Object.keys(reportForm).forEach(key => {
    reportForm[key] = ''
  })
  selectedIssueType.value = null
  selectedUrgency.value = 'medium'
  uploadedFiles.value = []
  progress.value = 0
}
</script>

<style scoped>
/* Анимации */
@keyframes float-doc-1 {
  0%, 100% { transform: translateY(0px) translateX(0px) rotate(12deg); }
  50% { transform: translateY(-25px) translateX(15px) rotate(15deg); }
}

@keyframes float-doc-2 {
  0%, 100% { transform: translateY(0px) translateX(0px) rotate(-6deg); }
  50% { transform: translateY(-20px) translateX(-10px) rotate(-8deg); }
}

@keyframes float-doc-3 {
  0%, 100% { transform: translateY(0px) translateX(0px) rotate(45deg); }
  50% { transform: translateY(-30px) translateX(5px) rotate(48deg); }
}

@keyframes float-doc-4 {
  0%, 100% { transform: translateY(0px) translateX(0px) rotate(-12deg); }
  50% { transform: translateY(-15px) translateX(-15px) rotate(-15deg); }
}

@keyframes ping-slow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}

@keyframes ping-slower {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.8); opacity: 0.3; }
}

.animate-float-doc-1 { animation: float-doc-1 8s ease-in-out infinite; }
.animate-float-doc-2 { animation: float-doc-2 10s ease-in-out infinite; }
.animate-float-doc-3 { animation: float-doc-3 9s ease-in-out infinite; }
.animate-float-doc-4 { animation: float-doc-4 11s ease-in-out infinite; }
.animate-ping-slow { animation: ping-slow 3s ease-in-out infinite; }
.animate-ping-slower { animation: ping-slower 4s ease-in-out infinite; }

/* Анимации модальных окон */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>