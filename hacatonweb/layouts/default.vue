<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#0b1524] via-[#0e2239] to-[#143d63] text-white px-6">
    <header class="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 bg-transparent">
      
      <!-- Левая часть: Логотип -->
      <NuxtLink to="/" class="flex items-center gap-3 cursor-pointer group">
        <div class="text-2xl">🌊</div>
        <span class="font-bold text-xl sm:text-2xl drop-shadow-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        </span>
      </NuxtLink>

      <!-- Правая часть: Кнопки навигации, переключатель языков и бургер -->
      <div class="flex items-center gap-4">
        <!-- Кнопки навигации -->
        <div class="flex items-center gap-2 mr-2">
          <NuxtLink 
            to="/reports"
            class="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <span>📝</span>
            <span class="hidden sm:inline">{{ t('nav.reports') }}</span>
          </NuxtLink>
          
          <NuxtLink 
            to="/support"
            class="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <span>🛟</span>
            <span class="hidden sm:inline">{{ t('nav.support') }}</span>
          </NuxtLink>
          
          <NuxtLink 
            to="/contacts"
            class="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <span>📞</span>
            <span class="hidden sm:inline">{{ t('nav.contacts') }}</span>
          </NuxtLink>
        </div>

        <!-- Бургер меню -->
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
      </div>

      <!-- Красивое выпадающее меню -->
      <Transition name="menu">
        <div v-if="menuOpen" 
             class="absolute top-full right-0 w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col p-4 gap-2 mt-2">
          
          <!-- Заголовок меню -->
          <div class="px-3 py-2 border-b border-white/10">
            <h3 class="text-sm font-semibold text-gray-300 uppercase tracking-wide">{{ t('menu.quickNav') }}</h3>
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
              <div class="font-medium text-white">{{ t('menu.temperature') }}</div>
              <div class="text-xs text-gray-400">{{ t('menu.tempDesc') }}</div>
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
              <div class="font-medium text-white">{{ t('menu.waterLevel') }}</div>
              <div class="text-xs text-gray-400">{{ t('menu.waterDesc') }}</div>
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
              <div class="font-medium text-white">{{ t('menu.map') }}</div>
              <div class="text-xs text-gray-400">{{ t('menu.mapDesc') }}</div>
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
              <div class="font-medium text-white">{{ t('menu.pathogen') }}</div>
              <div class="text-xs text-gray-400">{{ t('menu.pathogenDesc') }}</div>
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
              <div class="font-medium text-white">{{ t('menu.transparency') }}</div>
              <div class="text-xs text-gray-400">{{ t('menu.transparencyDesc') }}</div>
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
              <div class="font-medium text-white">{{ t('menu.conductivity') }}</div>
              <div class="text-xs text-gray-400">{{ t('menu.conductivityDesc') }}</div>
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
              <div class="font-medium text-white">{{ t('menu.home') }}</div>
              <div class="text-xs text-blue-300">{{ t('menu.homeDesc') }}</div>
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

// Состояние меню
const menuOpen = ref(false)
const showLanguageMenu = ref(false)

// Состояние для языка
const currentLang = ref('en')

// Доступные языки
const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'kk', name: 'Қазақша', flag: '🇰🇿' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
]

// Переводы для меню
const translations = {
  en: {
    nav: {
      reports: 'Reports',
      support: 'Support',
      contacts: 'Contacts'
    },
    menu: {
      quickNav: 'Quick Navigation',
      temperature: 'Temperature',
      tempDesc: 'Thermal monitoring',
      waterLevel: 'Water Level',
      waterDesc: 'Depth variations',
      map: 'Interactive Map',
      mapDesc: 'Explore regions',
      pathogen: 'Pathogen Risk',
      pathogenDesc: 'Bio safety',
      transparency: 'Transparency',
      transparencyDesc: 'Water clarity',
      conductivity: 'Conductivity',
      conductivityDesc: 'Mineral activity',
      home: 'Dashboard Home',
      homeDesc: 'Back to main'
    }
  },
  ru: {
    nav: {
      reports: 'Отчёты',
      support: 'Поддержка',
      contacts: 'Контакты'
    },
    menu: {
      quickNav: 'Быстрая Навигация',
      temperature: 'Температура',
      tempDesc: 'Тепловой мониторинг',
      waterLevel: 'Уровень Воды',
      waterDesc: 'Изменения глубины',
      map: 'Интерактивная Карта',
      mapDesc: 'Исследовать регионы',
      pathogen: 'Риск Патогенов',
      pathogenDesc: 'Биобезопасность',
      transparency: 'Прозрачность',
      transparencyDesc: 'Чистота воды',
      conductivity: 'Электропроводность',
      conductivityDesc: 'Минеральная активность',
      home: 'Главная Панель',
      homeDesc: 'На главную'
    }
  },
  kk: {
    nav: {
      reports: 'Есептер',
      support: 'Қолдау',
      contacts: 'Байланыс'
    },
    menu: {
      quickNav: 'Жылдам Навигация',
      temperature: 'Температура',
      tempDesc: 'Жылулық бақылау',
      waterLevel: 'Су Деңгейі',
      waterDesc: 'Тереңдік өзгерістері',
      map: 'Интерактивті Карта',
      mapDesc: 'Аймақтарды зерттеу',
      pathogen: 'Патогендік Тәуекел',
      pathogenDesc: 'Биоқауіпсіздік',
      transparency: 'Мөлдірлік',
      transparencyDesc: 'Су тазалығы',
      conductivity: 'Электр өткізгіштік',
      conductivityDesc: 'Минералдық белсенділік',
      home: 'Басты Панель',
      homeDesc: 'Басты бетке'
    }
  },
  es: {
    nav: {
      reports: 'Reportes',
      support: 'Soporte',
      contacts: 'Contactos'
    },
    menu: {
      quickNav: 'Navegación Rápida',
      temperature: 'Temperatura',
      tempDesc: 'Monitoreo térmico',
      waterLevel: 'Nivel del Agua',
      waterDesc: 'Variaciones de profundidad',
      map: 'Mapa Interactivo',
      mapDesc: 'Explorar regiones',
      pathogen: 'Riesgo de Patógenos',
      pathogenDesc: 'Bioseguridad',
      transparency: 'Transparencia',
      transparencyDesc: 'Claridad del agua',
      conductivity: 'Conductividad',
      conductivityDesc: 'Actividad mineral',
      home: 'Panel Principal',
      homeDesc: 'Volver al inicio'
    }
  }
}

// Функция для получения перевода
const t = (key) => {
  const keys = key.split('.')
  let value = translations[currentLang.value]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

// Функции меню
function toggleMenu() {
  menuOpen.value = !menuOpen.value
  showLanguageMenu.value = false
}

function closeMenu() {
  menuOpen.value = false
}

// Функции переключения языка
const changeLanguage = (lang) => {
  currentLang.value = lang
  showLanguageMenu.value = false
  localStorage.setItem('preferred-language', lang)
}

const getLanguageFlag = (lang) => {
  const language = availableLanguages.find(l => l.code === lang)
  return language ? language.flag : '🌐'
}

const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value
  menuOpen.value = false
}

// Закрытие меню при клике вне его области
const closeOnClickOutside = (event) => {
  if ((menuOpen.value || showLanguageMenu.value) && !event.target.closest('header')) {
    closeMenu()
    showLanguageMenu.value = false
  }
}

// Загрузка сохраненного языка при загрузке
onMounted(() => {
  const savedLang = localStorage.getItem('preferred-language')
  if (savedLang && availableLanguages.some(lang => lang.code === savedLang)) {
    currentLang.value = savedLang
  }
  
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