<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0b1524] via-[#0e2239] to-[#143d63] text-white relative overflow-hidden">
    <!-- Анимированный фон -->
    <div class="absolute inset-0">
      <!-- Летающие контакты -->
      <div class="absolute top-1/6 left-1/5 w-16 h-16 bg-blue-400/10 rounded-full animate-float-1 flex items-center justify-center">📧</div>
      <div class="absolute top-1/3 right-1/4 w-14 h-14 bg-green-400/10 rounded-full animate-float-2 flex items-center justify-center">📞</div>
      <div class="absolute bottom-1/4 left-1/3 w-12 h-12 bg-purple-400/10 rounded-full animate-float-3 flex items-center justify-center">📍</div>
      <div class="absolute top-2/3 right-1/3 w-18 h-18 bg-cyan-400/10 rounded-full animate-float-4 flex items-center justify-center">💬</div>
      
      <!-- Пульсирующие точки -->
      <div class="absolute top-1/4 left-3/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping-slow"></div>
      <div class="absolute bottom-1/3 right-1/6 w-3 h-3 bg-red-400 rounded-full animate-ping-slower"></div>
    </div>

    <div class="relative z-10">
      <!-- Хедер -->
      <div class="text-center pt-20 pb-16">
        <h1 class="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          📞 Contact Us
        </h1>
        <p class="text-xl text-blue-100/80 max-w-2xl mx-auto">
          Get in touch with our environmental monitoring team. We're here to help!
        </p>
      </div>

      <!-- Основной контент -->
      <div class="max-w-6xl mx-auto px-6 mb-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Левая колонка - контактная информация -->
          <div class="space-y-6">
            <!-- Контактные карточки -->
            <div class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
                <span class="text-3xl">👥</span>
                Our Team
              </h3>
              
              <div class="space-y-4">
                <div 
                  v-for="member in teamMembers" 
                  :key="member.id"
                  class="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  @click="selectTeamMember(member)"
                >
                  <div class="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span class="text-2xl">{{ member.emoji }}</span>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-lg">{{ member.name }}</h4>
                    <p class="text-blue-100/70 text-sm">{{ member.position }}</p>
                    <p class="text-blue-100/50 text-xs">{{ member.department }}</p>
                  </div>
                  <div class="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    👆
                  </div>
                </div>
              </div>
            </div>

            <!-- Соцсети -->
            <div class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
                <span class="text-3xl">🌐</span>
                Follow Us
              </h3>
              
              <div class="grid grid-cols-2 gap-4">
                <a 
                  v-for="social in socialMedia" 
                  :key="social.name"
                  :href="social.url" 
                  target="_blank"
                  class="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group text-center"
                >
                  <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">{{ social.emoji }}</div>
                  <div class="font-medium text-sm">{{ social.name }}</div>
                  <div class="text-blue-100/50 text-xs">{{ social.handle }}</div>
                </a>
              </div>
            </div>

            <!-- Экстренные контакты -->
            <div class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
                <span class="text-3xl">🚨</span>
                Emergency Contacts
              </h3>
              
              <div class="space-y-3">
                <div 
                  v-for="emergency in emergencyContacts" 
                  :key="emergency.type"
                  class="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-xl">{{ emergency.emoji }}</span>
                    <div>
                      <div class="font-medium">{{ emergency.type }}</div>
                      <div class="text-red-300 text-sm">{{ emergency.number }}</div>
                    </div>
                  </div>
                  <button 
                    @click="callNumber(emergency.number)"
                    class="bg-red-500 hover:bg-red-600 rounded-lg px-3 py-1 text-sm transition-all duration-300"
                  >
                    Call
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Правая колонка - карта и форма -->
          <div class="space-y-6">
            <!-- Карта -->
            <div class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
                <span class="text-3xl">🗺️</span>
                Visit Our Office
              </h3>
              
              <div class="bg-gray-800 rounded-xl h-64 mb-4 relative overflow-hidden">
                <!-- Заглушка карты -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div class="text-6xl mb-4">🏢</div>
                    <p class="text-blue-100/70">Petropavl Environmental Center</p>
                    <p class="text-blue-100/50 text-sm">North Kazakhstan Region</p>
                  </div>
                </div>
                
                <!-- Маркер на карте -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div class="w-8 h-8 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                    <span class="text-white text-sm">📍</span>
                  </div>
                </div>
              </div>
              
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-3">
                  <span class="text-lg">🏢</span>
                  <span>Environmental Monitoring Department</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-lg">📍</span>
                  <span>Petropavl, North Kazakhstan Region</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-lg">🕒</span>
                  <span>Mon-Fri: 8:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            <!-- Быстрая связь -->
            <div class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
                <span class="text-3xl">💬</span>
                Quick Contact
              </h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Your Name</label>
                  <input 
                    v-model="quickContact.name"
                    type="text" 
                    class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Enter your name"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2">Your Email</label>
                  <input 
                    v-model="quickContact.email"
                    type="email" 
                    class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="your@email.com"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    v-model="quickContact.message"
                    rows="3"
                    class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all duration-300"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button 
                  @click="sendQuickMessage"
                  :disabled="!quickContact.name || !quickContact.email"
                  class="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
                >
                  Send Quick Message
                </button>
              </div>
            </div>

            <!-- Контактные номера -->
            <div class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
                <span class="text-3xl">📞</span>
                Direct Lines
              </h3>
              
              <div class="space-y-3">
                <div 
                  v-for="contact in directContacts" 
                  :key="contact.department"
                  class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-xl group-hover:scale-110 transition-transform">{{ contact.emoji }}</span>
                    <div>
                      <div class="font-medium">{{ contact.department }}</div>
                      <div class="text-blue-100/70 text-sm">{{ contact.number }}</div>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button 
                      @click="callNumber(contact.number)"
                      class="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg px-3 py-1 text-sm transition-all duration-300"
                    >
                      Call
                    </button>
                    <button 
                      @click="copyNumber(contact.number)"
                      class="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg px-3 py-1 text-sm transition-all duration-300"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно сотрудника -->
    <Transition name="modal">
      <div v-if="selectedMember" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center">
              <span class="text-4xl">{{ selectedMember.emoji }}</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold">{{ selectedMember.name }}</h3>
              <p class="text-blue-100/70">{{ selectedMember.position }}</p>
              <p class="text-blue-100/50 text-sm">{{ selectedMember.department }}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="text-lg">📧</span>
              <span>{{ selectedMember.email }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-lg">📞</span>
              <span>{{ selectedMember.phone }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-lg">🕒</span>
              <span>Available: {{ selectedMember.availability }}</span>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button 
              @click="sendEmail(selectedMember.email)"
              class="flex-1 bg-blue-500 hover:bg-blue-600 rounded-xl py-3 transition-all duration-300"
            >
              Email
            </button>
            <button 
              @click="callNumber(selectedMember.phone)"
              class="flex-1 bg-green-500 hover:bg-green-600 rounded-xl py-3 transition-all duration-300"
            >
              Call
            </button>
            <button 
              @click="selectedMember = null"
              class="flex-1 bg-white/10 hover:bg-white/20 rounded-xl py-3 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Состояние
const selectedMember = ref(null)

// Данные
const teamMembers = [
  { 
    id: 1, 
    name: 'Karabalin Timur', 
    position: 'Head of Monitoring', 
    department: 'Environmental Science',
    emoji: '👩‍🔬',
    email: 'aisulu.zhangir@skohydro.com',
    phone: '+7 (777) 100-0001',
    availability: 'Mon-Fri, 9:00-17:00'
  },
  { 
    id: 2, 
    name: 'Kydyr Arman', 
    position: 'Data Analyst', 
    department: 'Research & Development',
    emoji: '👨‍💻',
    email: 'arman.kydyr@skohydro.com',
    phone: '+7 (777) 100-0002',
    availability: 'Mon-Fri, 8:00-16:00'
  },
  { 
    id: 3, 
    name: 'Madina Boranbayeva', 
    position: 'Field Specialist', 
    department: 'Operations',
    emoji: '👩‍🌾',
    email: 'madina.boranbayeva@skohydro.com',
    phone: '+7 (777) 100-0003',
    availability: 'Mon-Sat, 7:00-15:00'
  },
  { 
    id: 4, 
    name: 'Bakhytzhan Tolegen', 
    position: 'Technical Support', 
    department: 'IT Department',
    emoji: '👨‍🔧',
    email: 'bakhytzhan.tolegen@skohydro.com',
    phone: '+7 (777) 100-0004',
    availability: '24/7 on call'
  }
]

const socialMedia = [
  { name: 'Twitter', emoji: '🐦', handle: '@SkoHydro', url: 'https://twitter.com' },
  { name: 'Facebook', emoji: '📘', handle: 'SkoHydrovision', url: 'https://facebook.com' },
  { name: 'Instagram', emoji: '📷', handle: '@skohydro', url: 'https://instagram.com' },
  { name: 'LinkedIn', emoji: '💼', handle: 'SkoHydro Company', url: 'https://linkedin.com' }
]

const emergencyContacts = [
  { type: 'Environmental Emergency', emoji: '🚨', number: '+7 (777) 911-0001' },
  { type: 'Water Pollution Hotline', emoji: '🌊', number: '+7 (777) 911-0002' },
  { type: 'Wildlife Emergency', emoji: '🐾', number: '+7 (777) 911-0003' }
]

const directContacts = [
  { department: 'Main Office', emoji: '🏢', number: '+7 (7172) 555-100' },
  { department: 'Technical Support', emoji: '🔧', number: '+7 (7172) 555-200' },
  { department: 'Data Department', emoji: '📊', number: '+7 (7172) 555-300' },
  { department: 'Field Operations', emoji: '🌿', number: '+7 (7172) 555-400' }
]

const quickContact = reactive({
  name: '',
  email: '',
  message: ''
})

// Методы
const selectTeamMember = (member) => {
  selectedMember.value = member
}

const callNumber = (number) => {
  alert(`Calling: ${number}`)
  // В реальном приложении: window.location.href = `tel:${number}`
}

const copyNumber = (number) => {
  navigator.clipboard.writeText(number)
  alert(`Copied: ${number}`)
}

const sendEmail = (email) => {
  window.location.href = `mailto:${email}`
}

const sendQuickMessage = () => {
  if (!quickContact.name || !quickContact.email) return
  
  alert(`Message sent!\n\nWe'll contact you at: ${quickContact.email}`)
  
  // Сброс формы
  quickContact.name = ''
  quickContact.email = ''
  quickContact.message = ''
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

@keyframes ping-slow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}

@keyframes ping-slower {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.8); opacity: 0.3; }
}

.animate-float-1 { animation: float-1 8s ease-in-out infinite; }
.animate-float-2 { animation: float-2 10s ease-in-out infinite; }
.animate-float-3 { animation: float-3 9s ease-in-out infinite; }
.animate-float-4 { animation: float-4 11s ease-in-out infinite; }
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