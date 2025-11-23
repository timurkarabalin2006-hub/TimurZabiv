<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
    <!-- Шапка -->
    <header class="bg-gray-800/80 backdrop-blur-md border-b border-blue-500/30 shadow-xl">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Лого -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
              <span class="font-bold text-white">KU</span>
            </div>
            <div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
                KOZYBAYEV UNIVERSITY
              </h1>
              <p class="text-gray-300 text-sm">M-51 Петропавл • P-49</p>
            </div>
          </div>

          <!-- Навигация -->
          <nav class="flex items-center gap-3">
            <NuxtLink 
              to="/" 
              class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-200 font-medium shadow-lg"
            >
              📍 Координаты
            </NuxtLink>
            <NuxtLink 
              to="/inform" 
              class="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors duration-200 font-medium shadow-lg"
            >
              ⚠️ Патогены
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Контент -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Футер -->
    <footer class="bg-gray-800/80 backdrop-blur-md border-t border-blue-500/30 py-6">
      <div class="container mx-auto text-center">
        <p class="text-gray-400">© 2024 KOZYBAYEV UNIVERSITY • ГИС Мониторинг Водоёмов</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Простая логика
</script>

<style>
.router-link-active {
  background: #1e40af !important;
  border: 1px solid #60a5fa !important;
}
</style>