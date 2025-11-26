<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Современный анимированный фон -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <!-- Анимированные волны -->
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600/20 to-transparent animate-wave"></div>
      <div class="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse-slower"></div>
      <div class="absolute top-1/3 left-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl animate-ping-slow"></div>
      
      <!-- Точки как звезды -->
      <div class="absolute inset-0 opacity-30">
        <div v-for="i in 50" :key="i" 
             class="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
             :style="{
               left: Math.random() * 100 + '%',
               top: Math.random() * 100 + '%',
               animationDelay: Math.random() * 5 + 's'
             }">
        </div>
      </div>
    </div>

    <!-- Контент -->
    <div class="relative z-10">
      <div class="fixed top-0 left-12 z-50 p-6">
        <div class="flex items-center gap-2">
          <div class="text-2xl"></div>
          <span class="font-bold text-xl sm:text-2xl drop-shadow-lg bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
              SkoHydrovision
          </span>
        </div>
      </div>

      <main class="flex-1 pt-32 pb-20 px-6">
        <section class="text-center max-w-4xl mx-auto mb-20">
          <h1 class="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Petropavl Environment Dashboard
          </h1>
          <p class="text-xl text-blue-100/80 mb-8 leading-relaxed">
            Advanced real-time monitoring of aquatic ecosystems<br>
            across the North Kazakhstan region
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <NuxtLink
              to="/map"
              class="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-10 py-4 rounded-2xl font-semibold text-white shadow-2xl shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/40 flex items-center gap-3"
            >
              <span class="text-xl">🗺️</span>
              Explore Interactive Map
            </NuxtLink>
          </div>
        </section>

        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <!-- Water Level -->
          <NuxtLink 
            to="/water" 
            class="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-blue-500/10"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
              <span class="text-2xl">💧</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Water Level</h3>
            <p class="text-blue-100/70 leading-relaxed">Track water elevation and recent depth variations with precision sensors.</p>
          </NuxtLink>

          <!-- Transparency -->
          <NuxtLink 
            to="/transparency" 
            class="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-green-500/10"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-green-500/30 to-green-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
              <span class="text-2xl">🔍</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Transparency</h3>
            <p class="text-blue-100/70 leading-relaxed">Advanced turbidity analysis and visual clarity monitoring.</p>
          </NuxtLink>

          <!-- Temperature -->
          <NuxtLink 
            to="/temperature" 
            class="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-yellow-500/10"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-500/30 to-yellow-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
              <span class="text-2xl">🌡️</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Temperature</h3>
            <p class="text-blue-100/70 leading-relaxed">Real-time thermal mapping and heat distribution analysis.</p>
          </NuxtLink>

          <!-- Conductivity -->
          <NuxtLink 
            to="/conductivity" 
            class="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-red-500/10"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-red-500/30 to-red-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Conductivity</h3>
            <p class="text-blue-100/70 leading-relaxed">Mineral content and ion activity precision measurements.</p>
          </NuxtLink>

          <!-- Bio Risk -->
          <NuxtLink 
            to="/polution" 
            class="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-purple-500/10"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-purple-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
              <span class="text-2xl">🦠</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Bio Risk</h3>
            <p class="text-blue-100/70 leading-relaxed">Pathogen detection and advanced risk assessment algorithms.</p>
          </NuxtLink>

          <!-- Interactive Map -->
          <NuxtLink 
            to="/map" 
            class="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-cyan-500/10"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-cyan-500/30 to-cyan-600/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
              <span class="text-2xl">🗺️</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Interactive Map</h3>
            <p class="text-blue-100/70 leading-relaxed">Explore hydro monitoring zones with real-time data overlay.</p>
          </NuxtLink>
        </section>
      </main>

      <!-- Современный футер -->
      <footer class="relative border-t border-white/10 bg-gradient-to-t from-slate-900/50 to-transparent backdrop-blur-lg">
        <div class="max-w-7xl mx-auto py-12 px-6">
          <div class="flex flex-col md:flex-row justify-between items-center gap-8">
            
            <!-- Соцсети -->
            <div class="flex gap-4">
              <a 
                href="https://www.youtube.com" 
                target="_blank"
                class="w-12 h-12 bg-white/10 hover:bg-red-500 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
              >
                <div class="text-white text-lg">▶️</div>
              </a>
              <a 
                href="https://www.facebook.com" 
                target="_blank"
                class="w-12 h-12 bg-white/10 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <div class="text-white text-lg">f</div>
              </a>
              <a 
                href="https://www.github.com" 
                target="_blank"
                class="w-12 h-12 bg-white/10 hover:bg-gray-800 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25"
              >
                <div class="text-white text-lg">🐙</div>
              </a>
            </div>
            
            <!-- Копирайт и статус -->
            <div class="flex flex-col items-center md:items-end gap-3">
              <p class="text-blue-100/80 text-sm">© 2024 SkoHydrovision • All Rights Reserved</p>
              <div class="flex items-center gap-2 text-green-400/80">
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span class="text-sm font-medium">Live System • All Sensors Active</span>
              </div>
            </div>
          </div>
          
          <!-- Дополнительная информация -->
          <div class="mt-8 pt-8 border-t border-white/5 text-center">
            <p class="text-blue-100/60 text-xs">
              Advanced Environmental Monitoring Platform • Petropavl, Kazakhstan • v3.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Анимации для современного фона */
@keyframes wave {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-wave {
  animation: wave 8s ease-in-out infinite;
}

.animate-twinkle {
  animation: twinkle 3s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-slower {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping-slow {
  animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>