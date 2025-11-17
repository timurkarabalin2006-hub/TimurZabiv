<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0b1524] via-[#0e2239] to-[#143d63] p-6">
    <div class="max-w-7xl mx-auto">
      
      <!-- Хедер с контролами -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-white">🌍 Interactive Map</h1>
        <div class="flex gap-3">
          <button @click="toggleSatellite" class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition text-white">
            {{ isSatellite ? '🗺️ Street' : '🛰️ Satellite' }}
          </button>
          <button @click="currentZoom = 12" class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition text-white">
            🔄 Reset
          </button>
        </div>
      </div>

      <!-- Основной контент -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <!-- Карта -->
        <div class="lg:col-span-3">
          <div class="bg-white/5 border border-white/10 rounded-2xl p-4 relative">
            <!-- Контролы зума -->
            <div class="absolute top-6 right-6 z-[1000] bg-black/50 rounded-lg p-2 space-y-2">
              <button @click="currentZoom++" class="block w-8 h-8 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center text-white">
                +
              </button>
              <button @click="currentZoom--" class="block w-8 h-8 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center text-white">
                -
              </button>
            </div>

            <!-- Карта -->
            <div class="rounded-xl overflow-hidden border border-white/20" style="height: 65vh">
              <LMap 
                :zoom="currentZoom" 
                :center="currentCenter" 
                :use-global-leaflet="false"
                @update:zoom="onZoomUpdate"
                @update:center="onCenterUpdate"
              >
                <LTileLayer 
                  :url="isSatellite ? satelliteUrl : streetUrl"
                  :attribution="isSatellite ? satelliteAttribution : streetAttribution"
                />
                
                <!-- Маркеры с разными иконками -->
                <LMarker :lat-lng="petropavl" :icon="cityIcon">
                  <LTooltip permanent direction="top">🏙️ Petropavlosk</LTooltip>
                  <LPopup>
                    <div class="text-black p-2">
                      <strong class="text-lg">🏙️ Petropavlosk</strong>
                      <div class="mt-2 space-y-1 text-sm">
                        <div>📍 Regional Center</div>
                        <div>👥 Population: ~200,000</div>
                        <div>🌆 Major city in North Kazakhstan</div>
                      </div>
                    </div>
                  </LPopup>
                </LMarker>

                <LMarker :lat-lng="Ishim" :icon="riverIcon">
                  <LTooltip permanent direction="top">🌊 Ishim River</LTooltip>
                  <LPopup>
                    <div class="text-black p-2">
                      <strong class="text-lg">🌊 Ishim River</strong>
                      <div class="mt-2 space-y-1 text-sm">
                        <div>📍 Main water artery</div>
                        <div>💧 Length: 2,450 km</div>
                        <div>🚰 Water quality: Good</div>
                      </div>
                    </div>
                  </LPopup>
                </LMarker>

                <LMarker 
                  v-for="(lake, i) in lakes" 
                  :key="i"
                  :lat-lng="[lake.lat, lake.lng]"
                  :icon="lakeIcon"
                >
                  <LTooltip permanent direction="top">💧 {{ lake.name }}</LTooltip>
                  <LPopup>
                    <div class="text-black p-2">
                      <strong class="text-lg">💧 {{ lake.name }}</strong>
                      <div class="mt-2 space-y-1 text-sm">
                        <div>📍 Coordinates: {{ lake.lat.toFixed(4) }}, {{ lake.lng.toFixed(4) }}</div>
                        <div>🌡️ Temperature: {{ getRandomValue(15, 25) }}°C</div>
                        <div>🔍 Transparency: {{ getRandomTransparency() }}</div>
                        <div>📊 Depth: {{ getRandomValue(2, 12) }}m</div>
                      </div>
                    </div>
                  </LPopup>
                </LMarker>

                <!-- Круги вокруг озер -->
                <LCircle 
                  v-for="(lake, i) in lakes" 
                  :key="'circle-'+i"
                  :lat-lng="[lake.lat, lake.lng]"
                  :radius="500"
                  :color="'#00ffff'"
                  :fill-color="'#00ffff'"
                  :fill-opacity="0.1"
                  :weight="1"
                />
              </LMap>
            </div>

            <!-- Статус бар -->
            <div class="flex justify-between items-center mt-4 text-sm text-gray-300">
              <div>Zoom: {{ currentZoom }}x</div>
              <div>Center: {{ currentCenter[0].toFixed(4) }}, {{ currentCenter[1].toFixed(4) }}</div>
              <div>Markers: {{ lakes.length + 2 }}</div>
            </div>
          </div>
        </div>

        <!-- Боковая панель -->
        <div class="space-y-6">
          <!-- Легенда -->
          <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 class="text-lg font-semibold text-white mb-3">🗺️ Map Legend</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">🏙️</div>
                <span class="text-gray-300">City</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">🌊</div>
                <span class="text-gray-300">River</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-xs">💧</div>
                <span class="text-gray-300">Lake</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 border border-cyan-500 rounded-full flex items-center justify-center text-xs opacity-50"></div>
                <span class="text-gray-300">Monitoring Zone</span>
              </div>
            </div>
          </div>

          <!-- Статистика -->
          <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 class="text-lg font-semibold text-white mb-3">📊 Quick Stats</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-300">Lakes monitored:</span>
                <span class="text-cyan-400 font-bold">{{ lakes.length }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Rivers tracked:</span>
                <span class="text-green-400 font-bold">1</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Cities covered:</span>
                <span class="text-blue-400 font-bold">1</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Total area:</span>
                <span class="text-yellow-400 font-bold">~500 km²</span>
              </div>
            </div>
          </div>

          <!-- Быстрые действия -->
          <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 class="text-lg font-semibold text-white mb-3">⚡ Quick Actions</h3>
            <div class="grid grid-cols-2 gap-2">
              <button 
                v-for="action in quickActions" 
                :key="action.name"
                @click="action.handler"
                class="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition text-center text-sm"
              >
                <div class="text-lg mb-1">{{ action.emoji }}</div>
                <div>{{ action.name }}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker, LTooltip, LPopup, LCircle } from '@vue-leaflet/vue-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Типы
type LatLngTuple = [number, number];

interface Lake {
  name: string;
  lat: number;
  lng: number;
}

// Данные карты
const petropavl: LatLngTuple = [54.88, 69.16];
const Ishim: LatLngTuple = [54.893110, 69.127836];

const lakes: Lake[] = [
  { name: 'Озеро Пестрое', lat: 54.836699, lng: 69.111328 },
  { name: 'Озеро Белое', lat: 54.927154, lng: 69.254322 },
  { name: 'Озеро Горькое', lat: 54.947573, lng: 68.951122 },
  { name: 'Озеро Поганка', lat: 54.921209, lng: 69.053476 },
  { name: 'Озеро Дикое', lat: 54.840156, lng: 69.131957 },
];

// Состояние
const currentZoom = ref(12);
const currentCenter = ref<LatLngTuple>(petropavl);
const isSatellite = ref(false);

// URL для тайлов
const streetUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const streetAttribution = '&copy; OpenStreetMap contributors';
const satelliteAttribution = '&copy; Esri, Earthstar Geographics';

// Кастомные иконки
const cityIcon = L.divIcon({
  html: '🏙️',
  className: 'text-2xl',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const riverIcon = L.divIcon({
  html: '🌊',
  className: 'text-2xl',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const lakeIcon = L.divIcon({
  html: '💧',
  className: 'text-2xl',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Методы
const toggleSatellite = () => {
  isSatellite.value = !isSatellite.value;
};

const onZoomUpdate = (zoom: number) => {
  currentZoom.value = zoom;
};

const onCenterUpdate = (center: LatLngTuple) => {
  currentCenter.value = center;
};

const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomTransparency = () => {
  const values = ['High', 'Medium', 'Low'];
  return values[Math.floor(Math.random() * values.length)];
};

// Быстрые действия
const quickActions = [
  { emoji: '📍', name: 'Locate Me', handler: () => alert('Location feature would go here!') },
  { emoji: '📷', name: 'Screenshot', handler: () => alert('Screenshot saved!') },
  { emoji: '🎯', name: 'Add Marker', handler: () => alert('Click on map to add marker!') },
  { emoji: '📏', name: 'Measure', handler: () => alert('Measurement tool activated!') },
];
</script>

<style scoped>
:deep(.leaflet-popup-content) {
  margin: 12px !important;
  font-family: system-ui, -apple-system, sans-serif;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 12px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
}
</style>