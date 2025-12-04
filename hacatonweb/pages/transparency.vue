<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0b1524] via-[#0e2239] to-[#143d63] text-white p-6">
    <div class="max-w-7xl mx-auto">
      
      <!-- Хедер -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-2">🔍 Water Transparency</h1>
        <p class="text-gray-300">Visual clarity and turbidity signal analysis across monitored water bodies</p>
      </div>

      <!-- Переключение между данными и картой -->
      <div class="flex gap-4 mb-6">
        <button 
          @click="activeTab = 'data'"
          class="px-6 py-3 rounded-lg transition font-semibold"
          :class="activeTab === 'data' 
            ? 'bg-blue-500 text-white' 
            : 'bg-white/10 text-gray-300 hover:bg-white/20'"
        >
          📊 Transparency Data
        </button>
        <button 
          @click="activeTab = 'map'"
          class="px-6 py-3 rounded-lg transition font-semibold"
          :class="activeTab === 'map' 
            ? 'bg-blue-500 text-white' 
            : 'bg-white/10 text-gray-300 hover:bg-white/20'"
        >
          🗺️ Map View
        </button>
      </div>

      <!-- Данные прозрачности -->
      <div v-if="activeTab === 'data'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Левая колонка - основной график -->
          <div class="space-y-6">
            <!-- Основной график прозрачности -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">📈 Transparency Trends</h3>
              
              <!-- Легенда качества -->
              <div class="flex gap-4 mb-6 flex-wrap">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-green-500 rounded"></div>
                  <span class="text-sm">Excellent (0-10 NTU)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span class="text-sm">Good (10-20 NTU)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-red-500 rounded"></div>
                  <span class="text-sm">Poor (20+ NTU)</span>
                </div>
              </div>

              <!-- График -->
              <div class="bg-black/20 rounded-xl p-6 h-80">
                <div class="flex items-end justify-between h-full">
                  <div 
                    v-for="(data, index) in transparencyData" 
                    :key="index"
                    class="flex flex-col items-center"
                  >
                    <div 
                      class="w-8 rounded-t transition-all hover:opacity-80"
                      :class="getTurbidityColor(data.value)"
                      :style="{ height: (data.value / 30 * 200) + 'px' }"
                      :title="data.lake + ': ' + data.value + ' NTU'"
                    ></div>
                    <div class="text-xs mt-2 text-gray-400">{{ data.lake.substring(0, 4) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Детали измерений -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">🔬 Measurement Details</h3>
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="p-4 bg-white/5 rounded-lg">
                    <div class="text-2xl mb-2">🔍</div>
                    <div class="font-semibold">Turbidity Range</div>
                    <div class="text-sm text-gray-400">0 - 30 NTU</div>
                  </div>
                  <div class="p-4 bg-white/5 rounded-lg">
                    <div class="text-2xl mb-2">📏</div>
                    <div class="font-semibold">Clarity Depth</div>
                    <div class="text-sm text-gray-400">Up to 8m</div>
                  </div>
                </div>
                <div class="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div class="font-semibold">💡 About Transparency</div>
                  <div class="text-sm text-gray-300 mt-2">
                    Water transparency measures how clear the water is. Lower turbidity values indicate clearer water. 
                    Factors affecting transparency: algae, sediment, pollution.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Правая колонка -->
          <div class="space-y-6">
            <!-- Статус водоемов -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">💧 Water Body Transparency Status</h3>
              <div class="space-y-3">
                <div 
                  v-for="lake in lakes" 
                  :key="lake.name"
                  class="p-4 rounded-lg border transition-all"
                  :class="getTransparencyStatusClass(lake)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <span class="text-2xl">💧</span>
                      <div>
                        <div class="font-semibold">{{ lake.name }}</div>
                        <div class="text-sm opacity-80">
                          Turbidity: {{ getLakeTransparency(lake.name) }} NTU
                        </div>
                      </div>
                    </div>
                    <div class="text-xl">
                      {{ getTransparencyEmoji(lake.name) }}
                    </div>
                  </div>
                  <!-- Прогресс бар прозрачности -->
                  <div class="mt-3 w-full bg-white/10 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full transition-all"
                      :class="getTurbidityColor(getLakeTransparency(lake.name))"
                      :style="{ width: (getLakeTransparency(lake.name) / 30 * 100) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Алармы -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">⚠️ Transparency Alerts</h3>
              <div class="space-y-3">
                <div class="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <span class="text-yellow-400 text-xl">🌫️</span>
                  <div>
                    <div class="font-medium">High Turbidity</div>
                    <div class="text-sm opacity-80">Lake Gorkoe: 18.2 NTU</div>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <span class="text-green-400 text-xl">💎</span>
                  <div>
                    <div class="font-medium">Excellent Clarity</div>
                    <div class="text-sm opacity-80">Lake Beloe: 4.1 NTU</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Быстрые действия -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">⚡ Quick Actions</h3>
              <div class="grid grid-cols-2 gap-3">
                <button class="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 p-3 rounded-lg transition text-center">
                  <div class="text-xl mb-1">📥</div>
                  <div class="text-sm">Export Data</div>
                </button>
                <button class="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 p-3 rounded-lg transition text-center">
                  <div class="text-xl mb-1">📋</div>
                  <div class="text-sm">Generate Report</div>
                </button>
                <button @click="activeTab = 'map'" class="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 p-3 rounded-lg transition text-center">
                  <div class="text-xl mb-1">🗺️</div>
                  <div class="text-sm">View Map</div>
                </button>
                <button class="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 p-3 rounded-lg transition text-center">
                  <div class="text-xl mb-1">🔔</div>
                  <div class="text-sm">Set Alerts</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Таблица данных -->
        <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 class="text-xl font-semibold mb-4">📋 Transparency Measurements</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-white/10">
                  <th class="text-left pb-3">Water Body</th>
                  <th class="text-left pb-3">Turbidity</th>
                  <th class="text-left pb-3">Clarity Status</th>
                  <th class="text-left pb-3">Visibility Depth</th>
                  <th class="text-left pb-3">Last Update</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="measurement in transparencyMeasurements" :key="measurement.id" class="border-b border-white/5">
                  <td class="py-3">
                    <div class="flex items-center gap-2">
                      <span>💧</span>
                      {{ measurement.lake }}
                    </div>
                  </td>
                  <td class="py-3 font-mono">{{ measurement.turbidity }} NTU</td>
                  <td class="py-3">
                    <span class="px-2 py-1 rounded-full text-xs" :class="getStatusBadgeClass(measurement.status)">
                      {{ measurement.status }}
                    </span>
                  </td>
                  <td class="py-3">{{ measurement.visibilityDepth }}</td>
                  <td class="py-3 text-gray-400">{{ measurement.time }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Карта прозрачности -->
      <div v-if="activeTab === 'map'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <!-- Карта -->
          <div class="lg:col-span-3">
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4 relative">
              <!-- Контролы -->
              <div class="absolute top-6 right-6 z-[1000] bg-black/50 rounded-lg p-2 space-y-2">
                <button @click="currentZoom++" class="block w-8 h-8 bg-white/20 hover:bg-white/30 rounded items-center justify-center text-white">
                  +
                </button>
                <button @click="currentZoom--" class="block w-8 h-8 bg-white/20 hover:bg-white/30 rounded items-center justify-center text-white">
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
                  
                  <!-- Маркеры водоемов с прозрачностью -->
                  <LMarker 
                    v-for="(lake, i) in lakes" 
                    :key="i"
                    :lat-lng="[lake.lat, lake.lng]"
                    :icon="getTransparencyIcon(lake.name)"
                  >
                    <LTooltip permanent direction="top">
                      🔍 {{ lake.name }} ({{ getLakeTransparency(lake.name) }} NTU)
                    </LTooltip>
                    <LPopup>
                      <div class="text-black p-2 min-w-48">
                        <strong class="text-lg">🔍 {{ lake.name }}</strong>
                        <div class="mt-2 space-y-1 text-sm">
                          <div>💧 Transparency: {{ getLakeTransparency(lake.name) }} NTU</div>
                          <div>📊 Status: {{ getTransparencyStatus(lake.name) }}</div>
                          <div>📏 Visibility: {{ getVisibilityDepth(lake.name) }}m</div>
                          <div class="mt-2">
                            <div class="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                class="h-2 rounded-full transition-all"
                                :class="getTurbidityColor(getLakeTransparency(lake.name))"
                                :style="{ width: (100 - (getLakeTransparency(lake.name) / 30 * 100)) + '%' }"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </LPopup>
                  </LMarker>

                  <!-- Круги с цветом по прозрачности -->
                  <LCircle 
                    v-for="(lake, i) in lakes" 
                    :key="'circle-'+i"
                    :lat-lng="[lake.lat, lake.lng]"
                    :radius="600"
                    :color="getTurbidityColor(getLakeTransparency(lake.name))"
                    :fill-color="getTurbidityColor(getLakeTransparency(lake.name))"
                    :fill-opacity="0.2"
                    :weight="2"
                  />
                </LMap>
              </div>

              <!-- Статус бар -->
              <div class="flex justify-between items-center mt-4 text-sm text-gray-300">
                <div>Zoom: {{ currentZoom }}x</div>
                <div>Water Bodies: {{ lakes.length }}</div>
                <div>Transparency Monitoring</div>
              </div>
            </div>
          </div>

          <!-- Боковая панель карты -->
          <div class="space-y-6">
            <!-- Легенда прозрачности -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">🎨 Transparency Legend</h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span class="text-gray-300">Excellent (0-10 NTU)</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span class="text-gray-300">Good (10-20 NTU)</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span class="text-gray-300">Poor (20+ NTU)</span>
                </div>
              </div>
            </div>

            <!-- Список водоемов с прозрачностью -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">💧 Water Bodies Transparency</h3>
              <div class="space-y-3 max-h-96 overflow-y-auto">
                <div 
                  v-for="lake in lakes" 
                  :key="lake.name"
                  class="p-3 rounded-lg border cursor-pointer hover:bg-white/5 transition"
                  :class="getTransparencyStatusClass(lake)"
                  @click="focusOnLake(lake)"
                >
                  <div class="flex justify-between items-center">
                    <div>
                      <div class="font-medium">{{ lake.name }}</div>
                      <div class="text-xs text-gray-400">{{ getLakeTransparency(lake.name) }} NTU</div>
                    </div>
                    <div class="text-xl">
                      {{ getTransparencyEmoji(lake.name) }}
                    </div>
                  </div>
                  <!-- Мини прогресс бар -->
                  <div class="mt-2 w-full bg-white/10 rounded-full h-1">
                    <div 
                      class="h-1 rounded-full transition-all"
                      :class="getTurbidityColor(getLakeTransparency(lake.name))"
                      :style="{ width: (getLakeTransparency(lake.name) / 30 * 100) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Информация о прозрачности -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">ℹ️ About NTU</h3>
              <div class="text-sm text-gray-300 space-y-2">
                <p><strong>NTU</strong> - Nephelometric Turbidity Units</p>
                <p>Measures water cloudiness</p>
                <p>Lower values = clearer water</p>
                <p>Affects: light penetration, ecosystem health</p>
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

interface TransparencyData {
  lake: string;
  value: number;
}

interface TransparencyMeasurement {
  id: number;
  lake: string;
  turbidity: number;
  status: 'excellent' | 'good' | 'poor';
  visibilityDepth: string;
  time: string;
}

// Состояние
const activeTab = ref('data');
const currentZoom = ref(12);
const currentCenter = ref<[number, number]>([54.88, 69.16]);

// Данные водоемов
const lakes: Lake[] = [
  { name: 'Lake Pestroe', lat: 54.836699, lng: 69.111328, level: 1.7 },
  { name: 'Lake Beloe', lat: 54.927154, lng: 69.254322, level: 1.3 },
  { name: 'Lake Gorkoe', lat: 54.947573, lng: 68.951122, level: 1.25 },
  { name: 'Lake Poganka', lat: 54.921205, lng: 69.053476, level: 1.7 },
  { name: 'Lake Dikoe', lat: 54.840156, lng: 69.131957, level: 1.77 },
];

// Данные прозрачности
const transparencyData: TransparencyData[] = [
  { lake: 'Lake Pestroe', value: 8.2 },
  { lake: 'Lake Beloe', value: 4.1 },
  { lake: 'Lake Gorkoe', value: 18.2 },
  { lake: 'Lake Poganka', value: 12.5 },
  { lake: 'Lake Dikoe', value: 6.8 },
];

const transparencyMeasurements: TransparencyMeasurement[] = [
  { id: 1, lake: 'Lake Pestroe', turbidity: 8.2, status: 'excellent', visibilityDepth: '4.2m', time: '10:30 AM' },
  { id: 2, lake: 'Lake Beloe', turbidity: 4.1, status: 'excellent', visibilityDepth: '6.8m', time: '10:25 AM' },
  { id: 3, lake: 'Lake Gorkoe', turbidity: 18.2, status: 'poor', visibilityDepth: '2.1m', time: '10:20 AM' },
  { id: 4, lake: 'Lake Poganka', turbidity: 12.5, status: 'good', visibilityDepth: '3.5m', time: '10:15 AM' },
  { id: 5, lake: 'Lake Dikoe', turbidity: 6.8, status: 'excellent', visibilityDepth: '5.1m', time: '10:10 AM' },
];

// Методы
const getLakeTransparency = (lakeName: string): number => {
  const data = transparencyData.find(d => d.lake === lakeName);
  return data ? data.value : 15;
};

const getTurbidityColor = (turbidity: number): string => {
  if (turbidity <= 10) return 'bg-green-500';
  if (turbidity <= 20) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getTransparencyStatus = (lakeName: string): string => {
  const turbidity = getLakeTransparency(lakeName);
  if (turbidity <= 10) return 'Excellent';
  if (turbidity <= 20) return 'Good';
  return 'Poor';
};

const getTransparencyEmoji = (lakeName: string): string => {
  const turbidity = getLakeTransparency(lakeName);
  if (turbidity <= 10) return '💎';
  if (turbidity <= 20) return '🔍';
  return '🌫️';
};

const getTransparencyStatusClass = (lake: Lake) => {
  const turbidity = getLakeTransparency(lake.name);
  if (turbidity <= 10) return 'bg-green-500/10 border-green-500/30';
  if (turbidity <= 20) return 'bg-yellow-500/10 border-yellow-500/30';
  return 'bg-red-500/10 border-red-500/30';
};

const getVisibilityDepth = (lakeName: string): string => {
  const measurement = transparencyMeasurements.find(m => m.lake === lakeName);
  return measurement ? measurement.visibilityDepth : '3.0m';
};

const getTransparencyIcon = (lakeName: string): L.Icon => {
  const emoji = getTransparencyEmoji(lakeName);
  return L.divIcon({
    html: emoji,
    className: 'text-2xl',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  }) as unknown as L.Icon;
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'excellent': return 'bg-green-500/20 text-green-400';
    case 'good': return 'bg-yellow-500/20 text-yellow-400';
    case 'poor': return 'bg-red-500/20 text-red-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
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