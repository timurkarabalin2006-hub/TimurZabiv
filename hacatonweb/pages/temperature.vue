<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0b1524] via-[#0e2239] to-[#143d63] text-white p-6">
    <div class="max-w-7xl mx-auto">
      
      <!-- Хедер -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-2">🌡️ Water Temperature</h1>
        <p class="text-gray-300">Thermal fluctuations and heat distribution tracking</p>
      </div>

      <!-- Переключение между данными и картой -->
      <div class="flex gap-4 mb-6">
        <button 
          @click="activeTab = 'data'"
          class="px-6 py-3 rounded-lg transition font-semibold"
          :class="activeTab === 'data' 
            ? 'bg-red-500 text-white' 
            : 'bg-white/10 text-gray-300 hover:bg-white/20'"
        >
          📊 Temperature Data
        </button>
        <button 
          @click="activeTab = 'map'"
          class="px-6 py-3 rounded-lg transition font-semibold"
          :class="activeTab === 'map' 
            ? 'bg-red-500 text-white' 
            : 'bg-white/10 text-gray-300 hover:bg-white/20'"
        >
          🗺️ Heat Map
        </button>
      </div>

      <!-- Данные температуры -->
      <div v-if="activeTab === 'data'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Левая колонка - график температуры -->
          <div class="space-y-6">
            <!-- Основной график -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">📈 Temperature Trends</h3>
              
              <!-- Текущая температура -->
              <div class="text-center mb-6">
                <div class="text-6xl font-bold text-red-400">{{ getAverageTemperature() }}°C</div>
                <div class="text-gray-400 mt-2">Average Water Temperature</div>
              </div>

              <!-- График -->
              <div class="bg-black/20 rounded-xl p-4 h-64">
                <div class="flex items-end justify-between h-full">
                  <div 
                    v-for="(temp, index) in temperatureData" 
                    :key="index"
                    class="flex flex-col items-center flex-1"
                  >
                    <div 
                      class="w-6 rounded-t transition-all hover:opacity-80"
                      :class="getTemperatureColor(temp.value)"
                      :style="{ height: (temp.value / 25 * 150) + 'px' }"
                      :title="temp.lake + ': ' + temp.value + '°C'"
                    ></div>
                    <div class="text-xs mt-2 text-gray-400 text-center">{{ temp.lake.split(' ')[1] }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Статистика -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">📊 Temperature Stats</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-4 bg-white/5 rounded-lg">
                  <div class="text-2xl text-blue-400">❄️</div>
                  <div class="text-lg font-semibold">{{ getMinTemperature() }}°C</div>
                  <div class="text-sm text-gray-400">Minimum</div>
                </div>
                <div class="text-center p-4 bg-white/5 rounded-lg">
                  <div class="text-2xl text-red-400">🔥</div>
                  <div class="text-lg font-semibold">{{ getMaxTemperature() }}°C</div>
                  <div class="text-sm text-gray-400">Maximum</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Правая колонка -->
          <div class="space-y-6">
            <!-- Статус озер -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">💧 Lake Temperatures</h3>
              <div class="space-y-3">
                <div 
                  v-for="lake in lakes" 
                  :key="lake.name"
                  class="p-4 rounded-lg border transition-all"
                  :class="getTemperatureStatusClass(lake.name)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <span class="text-2xl">🌡️</span>
                      <div>
                        <div class="font-semibold">{{ lake.name }}</div>
                        <div class="text-sm opacity-80">
                          {{ getLakeTemperature(lake.name) }}°C
                        </div>
                      </div>
                    </div>
                    <div class="text-2xl">
                      {{ getTemperatureEmoji(lake.name) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Алармы -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">⚠️ Temperature Alerts</h3>
              <div class="space-y-3">
                <div class="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <span class="text-red-400 text-xl">🔥</span>
                  <div>
                    <div class="font-medium">High Temperature</div>
                    <div class="text-sm opacity-80">Lake Peschanoe +3°C above normal</div>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <span class="text-blue-400 text-xl">❄️</span>
                  <div>
                    <div class="font-medium">Low Temperature</div>
                    <div class="text-sm opacity-80">Lake Beloe -2°C below normal</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Быстрые действия -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">⚡ Quick Actions</h3>
              <div class="grid grid-cols-2 gap-3">
                <button class="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 p-3 rounded-lg transition text-center">
                  <div class="text-xl mb-1">📥</div>
                  <div class="text-sm">Export Data</div>
                </button>
                <button @click="activeTab = 'map'" class="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 p-3 rounded-lg transition text-center">
                  <div class="text-xl mb-1">🗺️</div>
                  <div class="text-sm">Heat Map</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Тепловая карта -->
      <div v-if="activeTab === 'map'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <!-- Карта -->
          <div class="lg:col-span-3">
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4 relative">
              <!-- Контролы -->
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
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  
                  <!-- Маркеры озер с температурой -->
                  <LMarker 
                    v-for="(lake, i) in lakes" 
                    :key="i"
                    :lat-lng="[lake.lat, lake.lng]"
                    :icon="getTemperatureIcon(lake.name)"
                  >
                    <LTooltip permanent direction="top">
                      🌡️ {{ lake.name }} ({{ getLakeTemperature(lake.name) }}°C)
                    </LTooltip>
                    <LPopup>
                      <div class="text-black p-2 min-w-48">
                        <strong class="text-lg">🌡️ {{ lake.name }}</strong>
                        <div class="mt-2 space-y-1 text-sm">
                          <div>📊 Temperature: {{ getLakeTemperature(lake.name) }}°C</div>
                          <div>🔥 Status: {{ getTemperatureStatus(lake.name) }}</div>
                          <div>💧 Depth: {{ lake.level }}m</div>
                        </div>
                      </div>
                    </LPopup>
                  </LMarker>

                  <!-- Тепловые круги -->
                  <LCircle 
                    v-for="(lake, i) in lakes" 
                    :key="'circle-'+i"
                    :lat-lng="[lake.lat, lake.lng]"
                    :radius="500"
                    :color="getTemperatureColor(getLakeTemperature(lake.name))"
                    :fill-color="getTemperatureColor(getLakeTemperature(lake.name))"
                    :fill-opacity="0.3"
                    :weight="2"
                  />
                </LMap>
              </div>

              <!-- Статус бар -->
              <div class="flex justify-between items-center mt-4 text-sm text-gray-300">
                <div>Zoom: {{ currentZoom }}x</div>
                <div>Avg Temp: {{ getAverageTemperature() }}°C</div>
                <div>Lakes: {{ lakes.length }}</div>
              </div>
            </div>
          </div>

          <!-- Боковая панель карты -->
          <div class="space-y-6">
            <!-- Легенда температуры -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">🎨 Temperature Legend</h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span class="text-gray-300">Cold (10-15°C)</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span class="text-gray-300">Normal (15-20°C)</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span class="text-gray-300">Warm (20+°C)</span>
                </div>
              </div>
            </div>

            <!-- Список озер с температурой -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">💧 Lake Temperatures</h3>
              <div class="space-y-3 max-h-96 overflow-y-auto">
                <div 
                  v-for="lake in lakes" 
                  :key="lake.name"
                  class="p-3 rounded-lg border cursor-pointer hover:bg-white/5 transition"
                  :class="getTemperatureStatusClass(lake.name)"
                  @click="focusOnLake(lake)"
                >
                  <div class="flex justify-between items-center">
                    <div>
                      <div class="font-medium">{{ lake.name }}</div>
                      <div class="text-xs text-gray-400">{{ getLakeTemperature(lake.name) }}°C</div>
                    </div>
                    <div class="text-xl">
                      {{ getTemperatureEmoji(lake.name) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Информация о температуре -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">ℹ️ Temperature Info</h3>
              <div class="text-sm text-gray-300 space-y-2">
                <p>🌡️ Ideal range: 15-20°C</p>
                <p>❄️ Cold: &lt;15°C</p>
                <p>🔥 Warm: &gt;20°C</p>
                <p>Affects: oxygen levels, ecosystem health</p>
              </div>
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
interface Lake {
  name: string;
  lat: number;
  lng: number;
  level: number;
}

interface TemperatureData {
  lake: string;
  value: number;
}

// Состояние
const activeTab = ref('data');
const currentZoom = ref(12);
const currentCenter = ref<[number, number]>([54.88, 69.16]);

// Данные озер
const lakes: Lake[] = [
  { name: 'Озеро Пёстрое', lat: 54.836699, lng: 69.111328, level: 14 },
  { name: 'Озеро Белое', lat: 54.927154, lng: 69.254322, level: 16 },
  { name: 'Озеро Горькое', lat: 54.947573, lng: 68.951122, level: 16 },
  { name: 'Озеро Поганка', lat: 54.921205, lng: 69.053476, level: 14 },
  { name: 'Озеро Дикое', lat: 54.840156, lng: 69.131957, level: 15 },
];

// Данные температуры
const temperatureData: TemperatureData[] = [
  { lake: 'Озеро Пёстрое', value: 14 },
  { lake: 'Озеро Белое', value: 16 },
  { lake: 'Озеро Горькое', value: 16 },
  { lake: 'Озеро Поганка', value: 14 },
  { lake: 'Озеро Дикое', value: 15 },
];

// Методы
const getLakeTemperature = (lakeName: string): number => {
  const data = temperatureData.find(d => d.lake === lakeName);
  return data ? data.value : 15;
};

const getTemperatureColor = (temp: number): string => {
  if (temp < 15) return 'bg-blue-500';
  if (temp <= 20) return 'bg-green-500';
  return 'bg-red-500';
};

const getTemperatureStatus = (lakeName: string): string => {
  const temp = getLakeTemperature(lakeName);
  if (temp < 15) return 'Cold';
  if (temp <= 20) return 'Normal';
  return 'Warm';
};

const getTemperatureEmoji = (lakeName: string): string => {
  const temp = getLakeTemperature(lakeName);
  if (temp < 15) return '❄️';
  if (temp <= 20) return '🌡️';
  return '🔥';
};

const getTemperatureStatusClass = (lakeName: string) => {
  const temp = getLakeTemperature(lakeName);
  if (temp < 15) return 'bg-blue-500/10 border-blue-500/30';
  if (temp <= 20) return 'bg-green-500/10 border-green-500/30';
  return 'bg-red-500/10 border-red-500/30';
};

const getAverageTemperature = (): number => {
  const sum = temperatureData.reduce((acc, curr) => acc + curr.value, 0);
  return Math.round((sum / temperatureData.length) * 10) / 10;
};

const getMinTemperature = (): number => {
  return Math.min(...temperatureData.map(t => t.value));
};

const getMaxTemperature = (): number => {
  return Math.max(...temperatureData.map(t => t.value));
};

const getTemperatureIcon = (lakeName: string) => {
  const emoji = getTemperatureEmoji(lakeName);
  return L.divIcon({
    html: emoji,
    className: 'text-2xl',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

// Методы карты
const onZoomUpdate = (zoom: number) => {
  currentZoom.value = zoom;
};

const onCenterUpdate = (center: [number, number]) => {
  currentCenter.value = center;
};

const focusOnLake = (lake: Lake) => {
  currentCenter.value = [lake.lat, lake.lng];
  currentZoom.value = 14;
};
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