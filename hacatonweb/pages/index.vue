<template>
  <div>
    <div class="fixed top-0 left-0 z-50 p-6">
      <div class="flex items-center gap-2">
        <div class="text-xl">🌊</div>
        <span class="font-bold text-lg sm:text-xl drop-shadow-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          SkoHydrovision
        </span>
      </div>
    </div>

    <main class="flex-1 pt-24">
      <section class="text-center max-w-3xl mx-auto mb-16">
        <h1 class="text-4xl sm:text-5xl font-bold drop-shadow-lg">
         Petropavl Environment Dashboard
        </h1>
        <p class="mt-4 text-gray-300 text-lg opacity-90">
          A modern platform for tracking environmental water behavior  
          and ecosystem indicators across the region.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <NuxtLink
            to="/map"
            class="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl font-semibold shadow-lg transition"
          >
            Open Map
          </NuxtLink>
        </div>
      </section>

      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <!-- Water Level -->
        <NuxtLink 
          to="/water" 
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/20 transition cursor-pointer"
        >
          <div class="w-12 h-12 bg-blue-600/40 rounded-xl flex items-center justify-center">💧</div>
          <h3 class="text-xl font-semibold mt-4">Water Level</h3>
          <p class="text-gray-300 text-sm mt-1">Track water elevation and recent depth variations.</p>
        </NuxtLink>

        <!-- Transparency -->
        <NuxtLink 
          to="/transparency" 
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/20 transition cursor-pointer"
        >
          <div class="w-12 h-12 bg-green-500/40 rounded-xl flex items-center justify-center">🔍</div>
          <h3 class="text-xl font-semibold mt-4">Transparency</h3>
          <p class="text-gray-300 text-sm mt-1">Visual clarity and turbidity signal analysis.</p>
        </NuxtLink>

        <!-- Temperature -->
        <NuxtLink 
          to="/temperature" 
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/20 transition cursor-pointer"
        >
          <div class="w-12 h-12 bg-yellow-500/40 rounded-xl flex items-center justify-center">🌡️</div>
          <h3 class="text-xl font-semibold mt-4">Temperature</h3>
          <p class="text-gray-300 text-sm mt-1">Thermal fluctuations and heat distribution tracking.</p>
        </NuxtLink>

        <!-- Conductivity -->
        <NuxtLink 
          to="/conductivity" 
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/20 transition cursor-pointer"
        >
          <div class="w-12 h-12 bg-red-500/40 rounded-xl flex items-center justify-center">⚡</div>
          <h3 class="text-xl font-semibold mt-4">Conductivity</h3>
          <p class="text-gray-300 text-sm mt-1">Mineral and ion activity measurements.</p>
        </NuxtLink>

        <!-- Bio Risk -->
        <NuxtLink 
          to="/polution" 
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/20 transition cursor-pointer"
        >
          <div class="w-12 h-12 bg-purple-500/40 rounded-xl flex items-center justify-center">🦠</div>
          <h3 class="text-xl font-semibold mt-4">Bio Risk</h3>
          <p class="text-gray-300 text-sm mt-1">Pathogen signal detection & risk scoring.</p>
        </NuxtLink>

        <!-- Interactive Map -->
        <NuxtLink 
          to="/map" 
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/20 transition cursor-pointer"
        >
          <div class="w-12 h-12 bg-cyan-500/40 rounded-xl flex items-center justify-center">🗺️</div>
          <h3 class="text-xl font-semibold mt-4">Interactive Map</h3>
          <p class="text-gray-300 text-sm mt-1">Explore regions and hydro monitoring zones.</p>
        </NuxtLink>
      </section>
    </main>

    <!-- Красивый футер -->
    <footer class="mt-16 py-8 border-t border-white/10 bg-gradient-to-t from-[#0b1524] to-transparent">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <!-- Соцсети -->
          <div class="flex gap-4">
            <a 
              href="https://www.youtube.com" 
              target="_blank"
              class="w-10 h-10 bg-white/10 hover:bg-red-500 rounded-lg flex items-center justify-center transition"
            >
              <img src="/public/images/youtube.png" class="w-5 h-5" alt="YouTube" />
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank"
              class="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition"
            >
              <img src="/public/images/facebook.png" class="w-5 h-5" alt="Facebook" />
            </a>
            <a 
              href="https://www.github.com" 
              target="_blank"
              class="w-10 h-10 bg-white/10 hover:bg-gray-800 rounded-lg flex items-center justify-center transition"
            >
              <img src="/public/images/github.png" class="w-5 h-5" alt="GitHub" />
            </a>
          </div>
          
          <!-- Копирайт и статус -->
          <div class="flex flex-col items-center md:items-end gap-2">
            <p class="text-sm text-gray-300">© 2024 SkoHydrovision • All Rights Reserved</p>
            <div class="flex items-center gap-2 text-xs text-green-400">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              System Online
            </div>
          </div>
        </div>
        
        <!-- Дополнительная информация -->
        <div class="mt-6 pt-6 border-t border-white/5 text-center">
          <p class="text-xs text-gray-400">
            Environmental Monitoring System • Petropavl, Kazakhstan • v2.1.0
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>