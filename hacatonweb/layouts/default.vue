<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#0b1524] via-[#0e2239] to-[#143d63] text-white px-6">
    <header class="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 bg-transparent">
  <!-- Пустой div для балансировки layout (бургер остается справа) -->
      <div class="w-10 h-10"></div>
  
      <!-- Красивый бургер -->
      <button @click="toggleMenu" class="relative w-10 h-10 flex flex-col items-center justify-center group focus:outline-none">
        <div class="flex flex-col items-end gap-1.5">
          <span 
            class="block h-0.5 bg-white rounded-full transition-all duration-300 ease-out"
            :class="menuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6 group-hover:w-8'"
          ></span>
          <span 
            class="block h-0.5 bg-white rounded-full transition-all duration-300 ease-out"
            :class="menuOpen ? 'w-6 opacity-0' : 'w-4 group-hover:w-6'"
          ></span>
          <span 
            class="block h-0.5 bg-white rounded-full transition-all duration-300 ease-out"
            :class="menuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5 group-hover:w-7'"
          ></span>
        </div>
        
        <!-- Эффект пульсации при наведении -->
        <div class="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300 -z-10" 
             :class="menuOpen ? 'scale-150 bg-white/20' : ''"></div>
      </button>

      <!-- Красивое выпадающее меню -->
      <Transition name="menu">
        <div v-if="menuOpen" 
             class="absolute top-full right-0 w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col p-4 gap-2 mt-2">
          
          <!-- Заголовок меню -->
          <div class="px-3 py-2 border-b border-white/10">
            <h3 class="text-sm font-semibold text-gray-300 uppercase tracking-wide">Quick Navigation</h3>
          </div>
          
          <!-- Пункты меню -->
          <NuxtLink 
            to="/temperature" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            @click="closeMenu"
          >
            <div class="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-lg">🌡️</span>
            </div>
            <div>
              <div class="font-medium text-white">Temperature</div>
              <div class="text-xs text-gray-400">Thermal monitoring</div>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/water" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            @click="closeMenu"
          >
            <div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-lg">💧</span>
            </div>
            <div>
              <div class="font-medium text-white">Water Level</div>
              <div class="text-xs text-gray-400">Depth variations</div>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/map" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            @click="closeMenu"
          >
            <div class="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-lg">🗺️</span>
            </div>
            <div>
              <div class="font-medium text-white">Interactive Map</div>
              <div class="text-xs text-gray-400">Explore regions</div>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/polution" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            @click="closeMenu"
          >
            <div class="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-lg">🦠</span>
            </div>
            <div>
              <div class="font-medium text-white">Pathogen Risk</div>
              <div class="text-xs text-gray-400">Bio safety</div>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/transparency" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            @click="closeMenu"
          >
            <div class="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-lg">🔍</span>
            </div>
            <div>
              <div class="font-medium text-white">Transparency</div>
              <div class="text-xs text-gray-400">Water clarity</div>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/conductivity" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            @click="closeMenu"
          >
            <div class="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-lg">⚡</span>
            </div>
            <div>
              <div class="font-medium text-white">Conductivity</div>
              <div class="text-xs text-gray-400">Mineral activity</div>
            </div>
          </NuxtLink>

          <!-- Разделитель -->
          <div class="border-t border-white/10 my-2"></div>

          <!-- Домашняя страница -->
          <NuxtLink 
            to="/" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 transition-all duration-200 group"
            @click="closeMenu"
          >
            <div class="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-lg">🏠</span>
            </div>
            <div>
              <div class="font-medium text-white">Dashboard Home</div>
              <div class="text-xs text-blue-300">Back to main</div>
            </div>
          </NuxtLink>
        </div>
      </Transition>
    </header>

    <!-- Сюда будет подставляться контент страниц -->
    <main class="flex-1 pt-24">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

// Закрытие меню при клике вне его области
const closeOnClickOutside = (event) => {
  if (menuOpen.value && !event.target.closest('header')) {
    closeMenu()
  }
}

// Добавляем обработчик клика вне меню
onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>

<style scoped>
/* Плавные анимации для меню */
.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.menu-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/* Стили для активных ссылок */
.router-link-active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2));
  border: 1px solid rgba(59, 130, 246, 0.3);
}
</style>