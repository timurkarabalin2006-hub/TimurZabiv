<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0b1524] via-[#0e2239] to-[#143d63] text-white p-6">
    <div class="max-w-7xl mx-auto">
      
      <!-- Хедер -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-2">🌊 Water Monitoring Dashboard</h1>
        <p class="text-gray-300">Real-time parameters and interactive map</p>
      </div>

      <!-- Переключение между картой и параметрами -->
      <div class="flex gap-4 mb-6">
        <button 
          @click="activeTab = 'parameters'"
          class="px-6 py-3 rounded-lg transition font-semibold"
          :class="activeTab === 'parameters' 
            ? 'bg-blue-500 text-white' 
            : 'bg-white/10 text-gray-300 hover:bg-white/20'"
        >
          📊 Parameters
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

      <!-- Параметры -->
      <div v-if="activeTab === 'parameters'" class="space-y-6">
        <!-- Основные параметры -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Левая колонка - графики -->
          <div class="space-y-6">
            <!-- Селектор параметра -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div class="flex gap-4 mb-6 flex-wrap">
                <button 
                  v-for="param in parameters" 
                  :key="param.id"
                  @click="selectedParam = param.id"
                  class="px-4 py-2 rounded-lg transition"
                  :class="selectedParam === param.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'"
                >
                  {{ param.emoji }} {{ param.name }}
                </button>
              </div>

              <!-- График -->
              <div class="bg-black/20 rounded-xl p-4 h-80 flex items-center justify-center">
                <div class="text-center w-full">
                  <div class="text-6xl mb-4">{{ getCurrentParam()?.emoji ?? '' }}</div>
                  <div class="text-3xl font-bold mb-2">{{ getCurrentValue() }}</div>
                  <div class="text-gray-400 mb-6">{{ getCurrentParam()?.unit ?? '' }}</div>
                  
                  <!-- Простой график -->
                  <div class="flex items-end justify-center gap-1 h-32 mx-auto max-w-md">
                    <div 
                      v-for="(value, index) in getHistoricalData()" 
                      :key="index"
                      class="w-3 bg-blue-500 rounded-t transition-all hover:bg-blue-400"
                      :style="{ height: (value / (getCurrentParam()?.max ?? 30) * 80) + 'px' }"
                      :title="value + (getCurrentParam()?.unit ?? '')"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Статусы озер -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">💧 Lake Water Levels</h3>
              <div class="space-y-3">
                <div 
                  v-for="lake in lakes" 
                  :key="lake.name"
                  class="p-4 rounded-lg border transition-all"
                  :class="getLakeLevelClass(lake)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <span class="text-2xl">💧</span>
                      <div>
                        <div class="font-semibold">{{ lake.name }}</div>
                        <div class="text-sm opacity-80">Level: {{ lake.level }}m</div>
                      </div>
                    </div>
                    <div class="text-xl">
                      {{ getLakeLevelEmoji(lake) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Правая колонка -->
          <div class="space-y-6">
            <!-- Быстрый обзор -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">📈 Quick Overview</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span>Last Update</span>
                  <span class="text-green-400">Just now</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span>Data Quality</span>
                  <span class="text-yellow-400">95%</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span>Active Sensors</span>
                  <span class="text-blue-400">18/24</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span>Lakes Monitored</span>
                  <span class="text-cyan-400">{{ lakes.length }}</span>
                </div>
              </div>
            </div>

            <!-- Алармы -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">⚠️ Active Alerts</h3>
              <div class="space-y-3">
                <div class="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <span class="text-yellow-400 text-xl">🌡️</span>
                  <div>
                    <div class="font-medium">High Temperature</div>
                    <div class="text-sm opacity-80">Lake Peschanoe +2.3°C above normal</div>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <span class="text-red-400 text-xl">📉</span>
                  <div>
                    <div class="font-medium">Low Water Level</div>
                    <div class="text-sm opacity-80">Lake Gorkoe -0.32m below normal</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Действия -->
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
                <button class="bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 p-3 rounded-lg transition text-center">
                  <div class="text-xl mb-1">🔄</div>
                  <div class="text-sm">Refresh</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Таблица данных -->
        <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 class="text-xl font-semibold mb-4">📋 Recent Measurements</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-white/10">
                  <th class="text-left pb-3">Parameter</th>
                  <th class="text-left pb-3">Value</th>
                  <th class="text-left pb-3">Status</th>
                  <th class="text-left pb-3">Location</th>
                  <th class="text-left pb-3">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="measurement in recentMeasurements" :key="measurement.id" class="border-b border-white/5">
                  <td class="py-3">
                    <div class="flex items-center gap-2">
                      <span>{{ measurement.emoji }}</span>
                      {{ measurement.parameter }}
                    </div>
                  </td>
                  <td class="py-3">{{ measurement.value }}</td>
                  <td class="py-3">
                    <span class="px-2 py-1 rounded-full text-xs" :class="getStatusBadgeClass(measurement.status)">
                      {{ measurement.status }}
                    </span>
                  </td>
                  <td class="py-3">{{ measurement.location }}</td>
                  <td class="py-3 text-gray-400">{{ measurement.time }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Карта -->
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
                  
                  <!-- Маркеры озер -->
                  <LMarker 
                    v-for="(lake, i) in lakes" 
                    :key="i"
                    :lat-lng="[lake.lat, lake.lng]"
                    :icon="getLakeIcon(lake)"
                  >
                    <LTooltip permanent direction="top">
                      💧 {{ lake.name }} ({{ lake.level }}m)
                    </LTooltip>
                    <LPopup>
                      <div class="text-black p-2 min-w-48">
                        <strong class="text-lg">💧 {{ lake.name }}</strong>
                        <div class="mt-2 space-y-1 text-sm">
                          <div>📍 Level: {{ lake.level }}m</div>
                          <div>🌡️ Temp: {{ getRandomValue(15, 25) }}°C</div>
                          <div>🔍 Status: {{ getLakeLevelStatus(lake) }}</div>
                          <div class="mt-2">
                            <button 
                              @click="showLakeDetails(lake)"
                              class="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </LPopup>
                  </LMarker>

                  <!-- Круги вокруг озер -->
                  <LCircle 
                    v-for="(lake, i) in lakes" 
                    :key="'circle-'+i"
                    :lat-lng="[lake.lat, lake.lng]"
                    :radius="800"
                    :color="getLakeColor(lake)"
                    :fill-color="getLakeColor(lake)"
                    :fill-opacity="0.1"
                    :weight="2"
                  />
                </LMap>
              </div>

              <!-- Статус бар -->
              <div class="flex justify-between items-center mt-4 text-sm text-gray-300">
                <div>Zoom: {{ currentZoom }}x</div>
                <div>Lakes: {{ lakes.length }}</div>
                <div>Last update: Just now</div>
              </div>
            </div>
          </div>

          <!-- Боковая панель карты -->
          <div class="space-y-6">
            <!-- Легенда -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">🗺️ Lake Status</h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span class="text-gray-300">Normal Level</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span class="text-gray-300">Slightly Low</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span class="text-gray-300">Very Low</span>
                </div>
              </div>
            </div>

            <!-- Список озер -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">💧 Lakes Overview</h3>
              <div class="space-y-3 max-h-96 overflow-y-auto">
                <div 
                  v-for="lake in lakes" 
                  :key="lake.name"
                  class="p-3 rounded-lg border cursor-pointer hover:bg-white/5 transition"
                  :class="getLakeLevelClass(lake)"
                  @click="focusOnLake(lake)"
                >
                  <div class="flex justify-between items-center">
                    <div>
                      <div class="font-medium">{{ lake.name }}</div>
                      <div class="text-xs text-gray-400">Level: {{ lake.level }}m</div>
                    </div>
                    <div class="text-xl">
                      {{ getLakeLevelEmoji(lake) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Быстрые действия -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">⚡ Map Actions</h3>
              <div class="grid grid-cols-2 gap-2">
                <button @click="currentZoom = 12" class="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition text-center text-sm">
                  <div class="text-lg mb-1">🔍</div>
                  <div>Reset Zoom</div>
                </button>
                <button @click="activeTab = 'parameters'" class="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition text-center text-sm">
                  <div class="text-lg mb-1">📊</div>
                  <div>Parameters</div>
                </button>
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
// @ts-ignore: no type declarations for '@vue-leaflet/vue-leaflet'
import { LMap, LTileLayer, LMarker, LTooltip, LPopup, LCircle } from '@vue-leaflet/vue-leaflet';
import L from 'leaflet';

// Типы
interface Lake {
  name: string;
  lat: number;
  lng: number;
  level: number;
}

interface Parameter {
  id: string;
  name: string;
  emoji: string;
  unit: string;
  min: number;
  max: number;
  optimal: number;
}

interface Measurement {
  id: number;
  parameter: string;
  emoji: string;
  value: string;
  status: 'normal' | 'warning' | 'critical';
  location: string;
  time: string;
}

// Состояние
const activeTab = ref('parameters');
const selectedParam = ref('temperature');
const currentZoom = ref(12);
const currentCenter = ref<[number, number]>([54.88, 69.16]);

// Данные озер
const lakes: Lake[] = [
  { name: 'Озеро Пёстрое', lat: 54.836699, lng: 69.111328, level: -0.14 },
  { name: 'Озеро Белое', lat: 54.927154, lng: 69.254322, level: -0.19 },
  { name: 'Озеро Горькое', lat: 54.947573, lng: 68.951122, level: -0.32 },
  { name: 'Озеро Поганка', lat: 54.921205, lng: 69.053476, level: -0.11 },
  { name: 'Озеро Дикое', lat: 54.840156, lng: 69.131957, level: -0.24 },
];

// Параметры воды
const parameters: Parameter[] = [
  { id: 'temperature', name: 'Temperature', emoji: '🌡️', unit: '°C', min: 0, max: 30, optimal: 18 },
  { id: 'ph', name: 'pH Level', emoji: '🧪', unit: 'pH', min: 6, max: 9, optimal: 7.2 },
  { id: 'oxygen', name: 'Oxygen', emoji: '💨', unit: 'mg/L', min: 5, max: 12, optimal: 8 },
  { id: 'turbidity', name: 'Turbidity', emoji: '🔍', unit: 'NTU', min: 0, max: 50, optimal: 5 },
];

// Последние измерения
const recentMeasurements: Measurement[] = [
  { id: 1, parameter: 'Temperature', emoji: '🌡️', value: '18.2°C', status: 'normal', location: 'Lake Peschanoe', time: '10:30 AM' },
  { id: 2, parameter: 'pH Level', emoji: '🧪', value: '7.1 pH', status: 'normal', location: 'Ishim River', time: '10:25 AM' },
  { id: 3, parameter: 'Oxygen', emoji: '💨', value: '7.8 mg/L', status: 'warning', location: 'Lake Beloe', time: '10:20 AM' },
  { id: 4, parameter: 'Turbidity', emoji: '🔍', value: '12.3 NTU', status: 'critical', location: 'Lake Gorkoe', time: '10:15 AM' },
];

// Методы для параметров
const getCurrentParam = () => {
  return parameters.find(p => p.id === selectedParam.value) || parameters[0];
};

const getCurrentValue = (paramId?: string) => {
  const param = paramId ? parameters.find(p => p.id === paramId) : getCurrentParam();
  if (!param) return '0';
  const value = Math.random() * (param.max - param.min) + param.min;
  return value.toFixed(1);
};

const getHistoricalData = () => {
  const param = getCurrentParam();
  if (!param) return Array(24).fill(0);
  return Array.from({ length: 24 }, () => 
    Math.random() * (param.max - param.min) + param.min
  );
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'normal': return 'bg-green-500/20 text-green-400';
    case 'warning': return 'bg-yellow-500/20 text-yellow-400';
    case 'critical': return 'bg-red-500/20 text-red-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

// Методы для озер
const getLakeLevelClass = (lake: Lake) => {
  if (lake.level >= -0.15) return 'bg-green-500/10 border-green-500/30';
  if (lake.level >= -0.25) return 'bg-yellow-500/10 border-yellow-500/30';
  return 'bg-red-500/10 border-red-500/30';
};

const getLakeLevelEmoji = (lake: Lake) => {
  if (lake.level >= -0.15) return '✅';
  if (lake.level >= -0.25) return '⚠️';
  return '🚨';
};

const getLakeLevelStatus = (lake: Lake) => {
  if (lake.level >= -0.15) return 'Normal';
  if (lake.level >= -0.25) return 'Slightly Low';
  return 'Very Low';
};

const getLakeColor = (lake: Lake) => {
  if (lake.level >= -0.15) return '#10B981';
  if (lake.level >= -0.25) return '#F59E0B';
  return '#EF4444';
};

const getLakeIcon = (lake: Lake) => {
  // create a div icon and cast to Icon to satisfy vue-leaflet typings
  return L.divIcon({
    html: `💧`,
    className: 'text-2xl',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  }) as unknown as L.Icon<L.IconOptions>;
};

// Методы для карты
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

const showLakeDetails = (lake: Lake) => {
  alert(`Details for ${lake.name}:\nLevel: ${lake.level}m\nStatus: ${getLakeLevelStatus(lake)}`);
};

const getRandomValue = (min: number, max: number) => {
  return (Math.random() * (max - min) + min).toFixed(1);
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