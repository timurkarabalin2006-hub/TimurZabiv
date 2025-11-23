<template>
  <div class="p-6">
    <!-- Заголовок -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
        ГИС Мониторинг Озёр Петропавловска
      </h1>
      <p class="text-gray-300">Реальные данные экологического мониторинга</p>
    </div>

    <!-- Карта -->
    <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/30 shadow-2xl">
      <div class="p-4 border-b border-blue-500/20">
        <h2 class="text-xl font-semibold flex items-center gap-2">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Интерактивная карта водоёмов
        </h2>
      </div>
      
      <div class="h-[600px] w-full">
        <LMap
          :zoom="11"
          :center="[54.88, 69.16]"
          style="height: 100%; width: 100%"
        >
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          
          <!-- Город -->
          <LMarker :lat-lng="[54.88, 69.16]">
            <LTooltip>🏙️ Петропавловск (СКО)</LTooltip>
            <LPopup>
              <div class="text-sm">
                <strong class="text-blue-600">Петропавловск</strong><br />
                Северо-Казахстанская область
              </div>
            </LPopup>
          </LMarker>
          
          <!-- Озёра -->
          <LMarker
            v-for="(lake, i) in lakes"
            :key="i"
            :lat-lng="[lake.lat, lake.lng]"
          >
            <LTooltip>{{ lake.name }}</LTooltip>
            <LPopup>
              <div class="text-sm min-w-[200px]">
                <strong class="text-green-600">{{ lake.name }}</strong><br />
                📍 Координаты: {{ lake.lat.toFixed(4) }}, {{ lake.lng.toFixed(4) }}<br />
                🔍 Статус: Мониторинг активен
              </div>
            </LPopup>
          </LMarker>
        </LMap>
      </div>
    </div>

    <!-- Статистика -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div class="bg-gray-800/50 rounded-xl p-4 text-center border border-blue-500/20">
        <div class="text-2xl font-bold text-blue-400">5</div>
        <div class="text-gray-300 text-sm">Всего озёр</div>
      </div>
      <div class="bg-gray-800/50 rounded-xl p-4 text-center border border-green-500/20">
        <div class="text-2xl font-bold text-green-400">4</div>
        <div class="text-gray-300 text-sm">Безопасные</div>
      </div>
      <div class="bg-gray-800/50 rounded-xl p-4 text-center border border-yellow-500/20">
        <div class="text-2xl font-bold text-yellow-400">1</div>
        <div class="text-gray-300 text-sm">С риском</div>
      </div>
      <div class="bg-gray-800/50 rounded-xl p-4 text-center border border-purple-500/20">
        <div class="text-2xl font-bold text-purple-400">24/7</div>
        <div class="text-gray-300 text-sm">Мониторинг</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

const lakes = [
  { name: 'Озеро Пёстрое', lat: 54.836699, lng: 69.111328 },
  { name: 'Озеро Белое', lat: 54.927154, lng: 69.254322 },
  { name: 'Озеро Горькое', lat: 54.947573, lng: 68.951122 },
  { name: 'Озеро Поганка', lat: 54.921205, lng: 69.053476 },
  { name: 'Озеро Дикое', lat: 54.840156, lng: 69.131957 },
]
</script>