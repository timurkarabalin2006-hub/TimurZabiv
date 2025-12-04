<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0b1524] via-[#0e2239] to-[#143d63] text-white p-6">
    <div class="max-w-7xl mx-auto">
      
      <!-- Хедер -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-2">⚡ Conductivity</h1>
        <p class="text-gray-300">Mineral and ion activity measurements in water bodies</p>
      </div>

      <!-- Переключение между данными и картой -->
      <div class="flex gap-4 mb-6">
        <button 
          @click="activeTab = 'data'"
          class="px-6 py-3 rounded-lg transition font-semibold"
          :class="activeTab === 'data' 
            ? 'bg-purple-500 text-white' 
            : 'bg-white/10 text-gray-300 hover:bg-white/20'"
        >
          📊 Conductivity Data
        </button>
        <button 
          @click="activeTab = 'map'"
          class="px-6 py-3 rounded-lg transition font-semibold"
          :class="activeTab === 'map' 
            ? 'bg-purple-500 text-white' 
            : 'bg-white/10 text-gray-300 hover:bg-white/20'"
        >
          🗺️ Conductivity Map
        </button>
      </div>

      <!-- Данные проводимости -->
      <div v-if="activeTab === 'data'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Левая колонка - график проводимости -->
          <div class="space-y-6">
            <!-- Основной график -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">📈 Conductivity Levels</h3>
              
              <!-- Средняя проводимость -->
              <div class="text-center mb-6">
                <div class="text-6xl font-bold text-purple-400">{{ getAverageConductivity() }} µS/cm</div>
                <div class="text-gray-400 mt-2">Average Conductivity</div>
              </div>

              <!-- График -->
              <div class="bg-black/20 rounded-xl p-4 h-64">
                <div class="flex items-end justify-between h-full">
                  <div 
                    v-for="(cond, index) in conductivityData" 
                    :key="index"
                    class="flex flex-col items-center flex-1"
                  >
                    <div 
                      class="w-6 rounded-t transition-all hover:opacity-80"
                      :class="getConductivityColor(cond.value)"
                      :style="{ height: (cond.value / 2000 * 150) + 'px' }"
                      :title="cond.lake + ': ' + cond.value + ' µS/cm'"
                    ></div>
                    <div class="text-xs mt-2 text-gray-400 text-center">{{ cond.lake.split(' ')[1] }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Статистика -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">📊 Conductivity Stats</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-4 bg-white/5 rounded-lg">
                  <div class="text-2xl text-blue-400">💧</div>
                  <div class="text-lg font-semibold">{{ getMinConductivity() }} µS/cm</div>
                  <div class="text-sm text-gray-400">Minimum</div>
                </div>
                <div class="text-center p-4 bg-white/5 rounded-lg">
                  <div class="text-2xl text-purple-400">⚡</div>
                  <div class="text-lg font-semibold">{{ getMaxConductivity() }} µS/cm</div>
                  <div class="text-sm text-gray-400">Maximum</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Правая колонка -->
          <div class="space-y-6">
            <!-- Статус озер -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">💧 Lake Conductivity</h3>
              <div class="space-y-3">
                <div 
                  v-for="lake in lakes" 
                  :key="lake.name"
                  class="p-4 rounded-lg border transition-all"
                  :class="getConductivityStatusClass(lake.name)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <span class="text-2xl">⚡</span>
                      <div>
                        <div class="font-semibold">{{ lake.name }}</div>
                        <div class="text-sm opacity-80">
                          {{ getLakeConductivity(lake.name) }} µS/cm
                        </div>
                      </div>
                    </div>
                    <div class="text-2xl">
                      {{ getConductivityEmoji(lake.name) }}
                    </div>
                  </div>
                  <!-- Прогресс бар проводимости -->
                  <div class="mt-3 w-full bg-white/10 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full transition-all"
                      :class="getConductivityColor(getLakeConductivity(lake.name))"
                      :style="{ width: (getLakeConductivity(lake.name) / 2000 * 100) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Алармы -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">⚠️ Conductivity Alerts</h3>
              <div class="space-y-3">
                <div class="flex items-start gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <span class="text-purple-400 text-xl">⚡</span>
                  <div>
                    <div class="font-medium">High Conductivity</div>
                    <div class="text-sm opacity-80">Lake Дикое: 1420 µS/cm</div>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <span class="text-green-400 text-xl">💧</span>
                  <div>
                    <div class="font-medium">Normal Levels</div>
                    <div class="text-sm opacity-80">Most lakes within optimal range</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Быстрые действия -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">⚡ Quick Actions</h3>
              <div class="grid grid-cols-2 gap-3">
                <button class="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 p-3 rounded-lg transition text-center">
                  <div class="text-xl mb-1">📥</div>
                  <div class="text-sm">Export Data</div>
                </button>
                <button @click="activeTab = 'map'" class="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 p-3 rounded-lg transition text-center">
                  <div class="text-xl mb-1">🗺️</div>
                  <div class="text-sm">View Map</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Информация о проводимости -->
        <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 class="text-xl font-semibold mb-4">ℹ️ About Conductivity</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-2">📊 What is Conductivity?</h4>
              <p class="text-gray-300 text-sm">
                Conductivity measures water's ability to conduct electrical current, 
                indicating the concentration of dissolved salts and minerals.
              </p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">🎯 Optimal Ranges</h4>
              <ul class="text-gray-300 text-sm space-y-1">
                <li>• Low: &lt;500 µS/cm</li>
                <li>• Normal: 500-1500 µS/cm</li>
                <li>• High: &gt;1500 µS/cm</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Карта проводимости -->
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
                  
                  <!-- Маркеры озер с проводимостью -->
                  <LMarker 
                    v-for="(lake, i) in lakes" 
                    :key="i"
                    :lat-lng="[lake.lat, lake.lng]"
                    :icon="getConductivityIcon(lake.name)"
                  >
                    <LTooltip permanent direction="top">
                      ⚡ {{ lake.name }} ({{ getLakeConductivity(lake.name) }} µS/cm)
                    </LTooltip>
                    <LPopup>
                      <div class="text-black p-2 min-w-48">
                        <strong class="text-lg">⚡ {{ lake.name }}</strong>
                        <div class="mt-2 space-y-1 text-sm">
                          <div>📊 Conductivity: {{ getLakeConductivity(lake.name) }} µS/cm</div>
                          <div>⚡ Status: {{ getConductivityStatus(lake.name) }}</div>
                          <div>💧 Mineral Content: {{ getMineralContent(lake.name) }}</div>
                          <div class="mt-2">
                            <div class="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                class="h-2 rounded-full transition-all"
                                :class="getConductivityColor(getLakeConductivity(lake.name))"
                                :style="{ width: (getLakeConductivity(lake.name) / 2000 * 100) + '%' }"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </LPopup>
                  </LMarker>

                  <!-- Круги с цветом по проводимости -->
                  <LCircle 
                    v-for="(lake, i) in lakes" 
                    :key="'circle-'+i"
                    :lat-lng="[lake.lat, lake.lng]"
                    :radius="600"
                    :color="getConductivityColor(getLakeConductivity(lake.name))"
                    :fill-color="getConductivityColor(getLakeConductivity(lake.name))"
                    :fill-opacity="0.2"
                    :weight="2"
                  />
                </LMap>
              </div>

              <!-- Статус бар -->
              <div class="flex justify-between items-center mt-4 text-sm text-gray-300">
                <div>Zoom: {{ currentZoom }}x</div>
                <div>Avg Conductivity: {{ getAverageConductivity() }} µS/cm</div>
                <div>Lakes: {{ lakes.length }}</div>
              </div>
            </div>
          </div>

          <!-- Боковая панель карты -->
          <div class="space-y-6">
            <!-- Легенда проводимости -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">🎨 Conductivity Legend</h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span class="text-gray-300">Low (&lt;500 µS/cm)</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span class="text-gray-300">Normal (500-1500 µS/cm)</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span class="text-gray-300">High (&gt;1500 µS/cm)</span>
                </div>
              </div>
            </div>

            <!-- Список озер с проводимостью -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">💧 Lake Conductivity</h3>
              <div class="space-y-3 max-h-96 overflow-y-auto">
                <div 
                  v-for="lake in lakes" 
                  :key="lake.name"
                  class="p-3 rounded-lg border cursor-pointer hover:bg-white/5 transition"
                  :class="getConductivityStatusClass(lake.name)"
                  @click="focusOnLake(lake)"
                >
                  <div class="flex justify-between items-center">
                    <div>
                      <div class="font-medium">{{ lake.name }}</div>
                      <div class="text-xs text-gray-400">{{ getLakeConductivity(lake.name) }} µS/cm</div>
                    </div>
                    <div class="text-xl">
                      {{ getConductivityEmoji(lake.name) }}
                    </div>
                  </div>
                  <!-- Мини прогресс бар -->
                  <div class="mt-2 w-full bg-white/10 rounded-full h-1">
                    <div 
                      class="h-1 rounded-full transition-all"
                      :class="getConductivityColor(getLakeConductivity(lake.name))"
                      :style="{ width: (getLakeConductivity(lake.name) / 2000 * 100) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Информация о проводимости -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">ℹ️ Conductivity Facts</h3>
              <div class="text-sm text-gray-300 space-y-2">
                <p>⚡ Measures dissolved ions</p>
                <p>💧 Affected by minerals, salts</p>
                <p>📊 Higher values = more minerals</p>
                <p>🎯 Optimal: 500-1500 µS/cm</p>
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




// Типы
interface Lake {
  name: string;
  lat: number;
  lng: number;
  level: number;
}

interface ConductivityData {
  lake: string;
  value: number;
}

// Состояние
const activeTab = ref('data');
const currentZoom = ref(12);
const currentCenter = ref<[number, number]>([54.88, 69.16]);

// Данные озер
const lakes: Lake[] = [
  { name: 'Озеро Пёстрое', lat: 54.836699, lng: 69.111328, level: 1055 },
  { name: 'Озеро Белое', lat: 54.927154, lng: 69.254322, level: 1200 },
  { name: 'Озеро Горькое', lat: 54.947573, lng: 68.951122, level: 1106 },
  { name: 'Озеро Поганка', lat: 54.921205, lng: 69.053476, level: 1235 },
  { name: 'Озеро Дикое', lat: 54.840156, lng: 69.131957, level: 1420 },
];

// Данные проводимости (используем level как значение проводимости)
const conductivityData: ConductivityData[] = lakes.map(lake => ({
  lake: lake.name,
  value: lake.level
}));

// Методы
const getLakeConductivity = (lakeName: string): number => {
  const data = conductivityData.find(d => d.lake === lakeName);
  return data ? data.value : 1000;
};

const getConductivityColor = (conductivity: number): string => {
  if (conductivity < 500) return 'bg-blue-500';
  if (conductivity <= 1500) return 'bg-green-500';
  return 'bg-purple-500';
};

const getConductivityStatus = (lakeName: string): string => {
  const conductivity = getLakeConductivity(lakeName);
  if (conductivity < 500) return 'Low';
  if (conductivity <= 1500) return 'Normal';
  return 'High';
};

const getConductivityEmoji = (lakeName: string): string => {
  const conductivity = getLakeConductivity(lakeName);
  if (conductivity < 500) return '💧';
  if (conductivity <= 1500) return '⚡';
  return '🔥';
};

const getConductivityStatusClass = (lakeName: string) => {
  const conductivity = getLakeConductivity(lakeName);
  if (conductivity < 500) return 'bg-blue-500/10 border-blue-500/30';
  if (conductivity <= 1500) return 'bg-green-500/10 border-green-500/30';
  return 'bg-purple-500/10 border-purple-500/30';
};

const getAverageConductivity = (): number => {
  const sum = conductivityData.reduce((acc, curr) => acc + curr.value, 0);
  return Math.round(sum / conductivityData.length);
};

const getMinConductivity = (): number => {
  return Math.min(...conductivityData.map(t => t.value));
};

const getMaxConductivity = (): number => {
  return Math.max(...conductivityData.map(t => t.value));
};

const getMineralContent = (lakeName: string): string => {
  const conductivity = getLakeConductivity(lakeName);
  if (conductivity < 500) return 'Low';
  if (conductivity <= 1500) return 'Moderate';
  return 'High';
};

const getConductivityIcon = (lakeName: string): any => {
  const emoji = getConductivityEmoji(lakeName);
  return L.divIcon({
    html: emoji,
    className: 'text-2xl',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  }) as any;
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