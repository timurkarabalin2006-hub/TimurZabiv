<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0b1524] via-[#0e2239] to-[#143d63] text-white relative overflow-hidden">
    <!-- Анимированный фон с плавающими элементами -->
    <div class="absolute inset-0">
      <!-- Плавающие пузыри -->
      <div class="absolute top-1/4 left-1/4 w-8 h-8 bg-cyan-400/20 rounded-full animate-float-1"></div>
      <div class="absolute top-1/3 right-1/4 w-12 h-12 bg-blue-400/15 rounded-full animate-float-2"></div>
      <div class="absolute bottom-1/4 left-1/3 w-6 h-6 bg-purple-400/25 rounded-full animate-float-3"></div>
      <div class="absolute top-2/3 right-1/3 w-10 h-10 bg-green-400/20 rounded-full animate-float-4"></div>
      
      <!-- Волны -->
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/10 to-transparent animate-wave"></div>
    </div>

    <div class="relative z-10">
      <!-- Хедер -->
      <div class="text-center pt-20 pb-16">
        <h1 class="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          🛟 Support Center
        </h1>
        <p class="text-xl text-blue-100/80 max-w-2xl mx-auto">
          We're here to help! Choose your support adventure below
        </p>
      </div>

      <!-- Интерактивная карта поддержки -->
      <div class="max-w-6xl mx-auto px-6 mb-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Левая колонка - интерактивные карточки -->
          <div class="space-y-6">
            <!-- AI Assistant -->
            <div 
              @click="activateAssistant"
              class="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20"
            >
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-cyan-500/30 to-cyan-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-3xl">🤖</span>
                </div>
                <div>
                  <h3 class="text-2xl font-bold">AI Assistant</h3>
                  <p class="text-blue-100/70">Instant help with our smart bot</p>
                </div>
              </div>
              <div class="flex gap-2">
                <span class="px-3 py-1 bg-cyan-500/20 rounded-full text-sm">24/7 Available</span>
                <span class="px-3 py-1 bg-green-500/20 rounded-full text-sm">Fast Response</span>
              </div>
            </div>

            <!-- Live Chat -->
            <div 
              @click="startLiveChat"
              class="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20"
            >
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-green-500/30 to-green-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-3xl">💬</span>
                </div>
                <div>
                  <h3 class="text-2xl font-bold">Live Chat</h3>
                  <p class="text-blue-100/70">Talk to real human experts</p>
                </div>
              </div>
              <div class="flex items-center gap-2 text-sm text-green-400">
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online now
              </div>
            </div>

            <!-- Video Call -->
            <div 
              @click="requestVideoCall"
              class="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-purple-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-3xl">📹</span>
                </div>
                <div>
                  <h3 class="text-2xl font-bold">Video Call</h3>
                  <p class="text-blue-100/70">Face-to-face assistance</p>
                </div>
              </div>
              <div class="flex gap-2">
                <span class="px-3 py-1 bg-purple-500/20 rounded-full text-sm">Screen Share</span>
                <span class="px-3 py-1 bg-blue-500/20 rounded-full text-sm">Recording</span>
              </div>
            </div>
          </div>

          <!-- Правая колонка - интерактивная форма -->
          <div class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
            <h3 class="text-2xl font-bold mb-6">🚀 Quick Help Form</h3>
            
            <!-- Интерактивный селектор проблемы -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-3">What do you need help with?</label>
              <div class="grid grid-cols-2 gap-3">
                <button 
                  v-for="issue in issues" 
                  :key="issue.id"
                  @click="selectIssue(issue.id)"
                  class="p-3 rounded-xl border transition-all duration-300 text-left"
                  :class="selectedIssue === issue.id 
                    ? 'bg-blue-500/20 border-blue-500/50 scale-105' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'"
                >
                  <span class="text-lg mb-1 block">{{ issue.emoji }}</span>
                  <span class="text-sm font-medium">{{ issue.name }}</span>
                </button>
              </div>
            </div>

            <!-- Динамическая форма -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Describe your issue</label>
                <textarea 
                  v-model="issueDescription"
                  rows="4"
                  class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Tell us what's happening..."
                ></textarea>
              </div>

              <!-- Приоритет -->
              <div>
                <label class="block text-sm font-medium mb-3">Priority Level</label>
                <div class="flex gap-3">
                  <button 
                    v-for="priority in priorities" 
                    :key="priority.level"
                    @click="selectPriority(priority.level)"
                    class="flex-1 p-3 rounded-xl border transition-all duration-300"
                    :class="selectedPriority === priority.level 
                      ? priority.class 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'"
                  >
                    <span class="text-lg block mb-1">{{ priority.emoji }}</span>
                    <span class="text-sm">{{ priority.name }}</span>
                  </button>
                </div>
              </div>

              <!-- Кнопка отправки -->
              <button 
                @click="submitSupportRequest"
                :disabled="!selectedIssue || !issueDescription"
                class="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
              >
                🚀 Launch Support Request
              </button>
            </div>
          </div>
        </div>

        <!-- Дополнительные опции -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div class="text-center p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
            <div class="text-4xl mb-4">📧</div>
            <h4 class="text-lg font-semibold mb-2">Email Support</h4>
            <p class="text-blue-100/70 text-sm">support@skohydro.com</p>
            <p class="text-blue-100/50 text-xs mt-2">Response within 2 hours</p>
          </div>

          <div class="text-center p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
            <div class="text-4xl mb-4">📞</div>
            <h4 class="text-lg font-semibold mb-2">Phone Support</h4>
            <p class="text-blue-100/70 text-sm">+7 (777) 123-4567</p>
            <p class="text-blue-100/50 text-xs mt-2">24/7 Hotline</p>
          </div>

          <div class="text-center p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
            <div class="text-4xl mb-4">🕒</div>
            <h4 class="text-lg font-semibold mb-2">Schedule Call</h4>
            <p class="text-blue-100/70 text-sm">Book a time slot</p>
            <p class="text-blue-100/50 text-xs mt-2">Expert consultation</p>
          </div>
        </div>
      </div>

      <!-- AI Assistant Chat (появляется при активации) -->
      <Transition name="assistant">
        <div v-if="showAssistant" class="fixed bottom-6 right-6 w-96 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50">
          <div class="p-4 border-b border-white/10">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <span class="text-xl">🤖</span>
              </div>
              <div>
                <h4 class="font-semibold">Hydro AI Assistant</h4>
                <p class="text-xs text-green-400">Online • Ready to help</p>
              </div>
              <button @click="showAssistant = false" class="ml-auto text-white/60 hover:text-white">
                ✕
              </button>
            </div>
          </div>
          <div class="p-4 h-64 overflow-y-auto">
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-sm">AI</span>
                </div>
                <div class="bg-white/10 rounded-xl p-3 max-w-[80%]">
                  <p class="text-sm">Hello! I'm your Hydro Assistant. How can I help you with water monitoring today?</p>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 border-t border-white/10">
            <div class="flex gap-2">
              <input 
                v-model="aiMessage"
                type="text" 
                placeholder="Ask me anything..."
                class="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                @keyup.enter="sendAIMessage"
              >
              <button 
                @click="sendAIMessage"
                class="bg-cyan-500 hover:bg-cyan-600 rounded-lg px-4 py-2 transition-all duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Состояние
const showAssistant = ref(false)
const selectedIssue = ref(null)
const selectedPriority = ref('medium')
const issueDescription = ref('')
const aiMessage = ref('')

// Данные
const issues = [
  { id: 1, name: 'Data Issues', emoji: '📊' },
  { id: 2, name: 'Map Problems', emoji: '🗺️' },
  { id: 3, name: 'Sensor Errors', emoji: '🔧' },
  { id: 4, name: 'Account Help', emoji: '👤' },
  { id: 5, name: 'Billing', emoji: '💳' },
  { id: 6, name: 'Other', emoji: '❓' }
]

const priorities = [
  { level: 'low', name: 'Low', emoji: '🐢', class: 'bg-green-500/20 border-green-500/50' },
  { level: 'medium', name: 'Medium', emoji: '🚶', class: 'bg-yellow-500/20 border-yellow-500/50' },
  { level: 'high', name: 'High', emoji: '🚨', class: 'bg-red-500/20 border-red-500/50' }
]

// Методы
const activateAssistant = () => {
  showAssistant.value = true
}

const startLiveChat = () => {
  alert('🚀 Connecting you with a support specialist...')
}

const requestVideoCall = () => {
  alert('📹 Scheduling your video call with an expert...')
}

const selectIssue = (issueId) => {
  selectedIssue.value = issueId
}

const selectPriority = (priority) => {
  selectedPriority.value = priority
}

const submitSupportRequest = () => {
  if (!selectedIssue.value || !issueDescription.value) return
  
  const issue = issues.find(i => i.id === selectedIssue.value)
  const priority = priorities.find(p => p.level === selectedPriority.value)
  
  alert(`🎉 Support request submitted!\n\nIssue: ${issue.name}\nPriority: ${priority.name}\n\nWe'll contact you shortly!`)
  
  // Сброс формы
  selectedIssue.value = null
  selectedPriority.value = 'medium'
  issueDescription.value = ''
}

const sendAIMessage = () => {
  if (!aiMessage.value.trim()) return
  
  // Здесь была бы интеграция с реальным AI API
  const responses = [
    "I can help with that! Let me check the water sensor data...",
    "Based on our monitoring, everything looks normal in your area.",
    "I recommend checking the sensor calibration for better accuracy.",
    "The water quality parameters are within safe limits currently.",
    "Let me pull up the latest data analysis for you..."
  ]
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)]
  
  // Добавление сообщения в чат (в реальном приложении)
  aiMessage.value = ''
  alert(`AI: ${randomResponse}`)
}
</script>

<style scoped>
/* Анимации */
@keyframes float-1 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(-15px); }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-25px) translateX(5px); }
}

@keyframes float-4 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-10px) translateX(-10px); }
}

@keyframes wave {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float-1 { animation: float-1 6s ease-in-out infinite; }
.animate-float-2 { animation: float-2 8s ease-in-out infinite; }
.animate-float-3 { animation: float-3 7s ease-in-out infinite; }
.animate-float-4 { animation: float-4 9s ease-in-out infinite; }
.animate-wave { animation: wave 4s ease-in-out infinite; }

/* Анимация для AI ассистента */
.assistant-enter-active,
.assistant-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.assistant-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.assistant-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>