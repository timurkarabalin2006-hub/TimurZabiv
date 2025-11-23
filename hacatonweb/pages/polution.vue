<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0b1524] via-[#0e2239] to-[#143d63] text-white p-6">
    <div class="max-w-7xl mx-auto">
      
      <!-- Хедер -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-2">🦠 Pathogen Risk</h1>
        <p class="text-gray-300">Pathogen signal detection & risk scoring in water bodies</p>
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
          📊 Risk Assessment
        </button>
        <button 
          @click="activeTab = 'map'"
          class="px-6 py-3 rounded-lg transition font-semibold"
          :class="activeTab === 'map' 
            ? 'bg-red-500 text-white' 
            : 'bg-white/10 text-gray-300 hover:bg-white/20'"
        >
          🗺️ Risk Map
        </button>
      </div>

      <!-- Данные патогенов -->
      <div v-if="activeTab === 'data'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Левая колонка - оценка риска -->
          <div class="space-y-6">
            <!-- Общая оценка риска -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">🦠 Overall Risk Status</h3>
              
              <!-- Индикатор риска -->
              <div class="text-center mb-6">
                <div class="text-6xl font-bold mb-4" :class="getOverallRiskColor()">
                  {{ getOverallRiskEmoji() }}
                </div>
                <div class="text-2xl font-semibold" :class="getOverallRiskColor()">
                  {{ getOverallRiskLevel() }}
                </div>
                <div class="text-gray-400 mt-2">Current Pathogen Risk Level</div>
              </div>

              <!-- Прогресс бар общего риска -->
              <div class="w-full bg-white/10 rounded-full h-4 mb-2">
                <div 
                  class="h-4 rounded-full transition-all"
                  :class="getOverallRiskProgressColor()"
                  :style="{ width: getOverallRiskPercentage() + '%' }"
                ></div>
              </div>
              <div class="flex justify-between text-sm text-gray-400">
                <span>Low Risk</span>
                <span>High Risk</span>
              </div>
            </div>

            <!-- Детали рисков -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">🔍 Risk Details</h3>
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                    <div class="text-2xl mb-2">✅</div>
                    <div class="font-semibold">Safe Lakes</div>
                    <div class="text-2xl text-green-400">{{ getSafeLakesCount() }}</div>
                  </div>
                  <div class="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
                    <div class="text-2xl mb-2">⚠️</div>
                    <div class="font-semibold">Risk Detected</div>
                    <div class="text-2xl text-yellow-400">{{ getRiskLakesCount() }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Правая колонка -->
          <div class="space-y-6">
            <!-- Статус озер -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">💧 Lake Pathogen Status</h3>
              <div class="space-y-3">
                <div 
                  v-for="lake in lakes" 
                  :key="lake.name"
                  class="p-4 rounded-lg border transition-all"
                  :class="getLakeRiskClass(lake)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <span class="text-2xl">🦠</span>
                      <div>
                        <div class="font-semibold">{{ lake.name }}</div>
                        <div class="text-sm opacity-80">
                          {{ lake.patogens }}
                        </div>
                      </div>
                    </div>
                    <div class="text-2xl">
                      {{ getLakeRiskEmoji(lake) }}
                    </div>
                  </div>
                  <!-- Уровень риска -->
                  <div class="mt-3 flex items-center gap-2">
                    <div class="text-xs text-gray-400">Risk Level:</div>
                    <div class="flex gap-1">
                      <div 
                        v-for="n in 3" 
                        :key="n"
                        class="w-3 h-3 rounded-full border border-white/20"
                        :class="n <= getLakeRiskLevel(lake) ? getRiskLevelColor(lake) : 'bg-transparent'"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Рекомендации -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">💡 Safety Recommendations</h3>
              <div class="space-y-3">
                <div class="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <span class="text-yellow-400 text-xl">⚠️</span>
                  <div>
                    <div class="font-medium">Lake Горькое</div>
                    <div class="text-sm opacity-80">Avoid swimming. Boil water before use.</div>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <span class="text-green-400 text-xl">✅</span>
                  <div>
                    <div class="font-medium">Other Lakes</div>
                    <div class="text-sm opacity-80">Safe for recreational activities</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Быстрые действия -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 class="text-xl font-semibold mb-4">⚡ Quick Actions</h3>
              <div class="grid grid-cols-2 gap-3">
                <button class="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 p-3 rounded-lg transition text-center">
                  <div class="text-xl mb-1">🚨</div>
                  <div class="text-sm">Report Issue</div>
                </button>
                <button @click="activeTab = 'map'" class="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 p-3 rounded-lg transition text-center">
                  <div class="text-xl mb-1">🗺️</div>
                  <div class="text-sm">View Map</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Информация о патогенах -->
        <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 class="text-xl font-semibold mb-4">ℹ️ About Pathogen Risks</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-2">🦠 Common Water Pathogens</h4>
              <ul class="text-gray-300 text-sm space-y-1">
                <li>• E. coli bacteria</li>
                <li>• Giardia parasites</li>
                <li>• Cryptosporidium</li>
                <li>• Legionella bacteria</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-2">🎯 Prevention Measures</h4>
              <ul class="text-gray-300 text-sm space-y-1">
                <li>• Regular water testing</li>
                <li>• Proper sanitation</li>
                <li>• Water treatment</li>
                <li>• Public awareness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Карта рисков -->
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
                  
                  <!-- Маркеры озер с риском патогенов -->
                  <LMarker 
                    v-for="(lake, i) in lakes" 
                    :key="i"
                    :lat-lng="[lake.lat, lake.lng]"
                    :icon="getRiskIcon(lake)"
                  >
                    <LTooltip permanent direction="top">
                      {{ getLakeRiskEmoji(lake) }} {{ lake.name }} ({{ getRiskLevelText(lake) }})
                    </LTooltip>
                    <LPopup>
                      <div class="text-black p-2 min-w-48">
                        <strong class="text-lg">{{ getLakeRiskEmoji(lake) }} {{ lake.name }}</strong>
                        <div class="mt-2 space-y-1 text-sm">
                          <div>🦠 Status: {{ lake.patogens }}</div>
                          <div>📊 Risk Level: {{ getRiskLevelText(lake) }}</div>
                          <div>💡 Recommendation: {{ getRecommendation(lake) }}</div>
                          <div class="mt-2 flex gap-1">
                            <div 
                              v-for="n in 3" 
                              :key="n"
                              class="w-4 h-4 rounded-full border border-gray-300"
                              :class="n <= getLakeRiskLevel(lake) ? getRiskLevelColor(lake) : 'bg-transparent'"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </LPopup>
                  </LMarker>

                  <!-- Круги с цветом по уровню риска -->
                  <LCircle 
                    v-for="(lake, i) in lakes" 
                    :key="'circle-'+i"
                    :lat-lng="[lake.lat, lake.lng]"
                    :radius="600"
                    :color="getRiskLevelColor(lake)"
                    :fill-color="getRiskLevelColor(lake)"
                    :fill-opacity="0.2"
                    :weight="2"
                  />
                </LMap>
              </div>

              <!-- Статус бар -->
              <div class="flex justify-between items-center mt-4 text-sm text-gray-300">
                <div>Zoom: {{ currentZoom }}x</div>
                <div>Risk Level: {{ getOverallRiskLevel() }}</div>
                <div>Lakes: {{ lakes.length }}</div>
              </div>
            </div>
          </div>

          <!-- Боковая панель карты -->
          <div class="space-y-6">
            <!-- Легенда рисков -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">🎨 Risk Legend</h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span class="text-gray-300">No Risk</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span class="text-gray-300">Low Risk</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span class="text-gray-300">High Risk</span>
                </div>
              </div>
            </div>

            <!-- Список озер с рисками -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">💧 Lake Risk Status</h3>
              <div class="space-y-3 max-h-96 overflow-y-auto">
                <div 
                  v-for="lake in lakes" 
                  :key="lake.name"
                  class="p-3 rounded-lg border cursor-pointer hover:bg-white/5 transition"
                  :class="getLakeRiskClass(lake)"
                  @click="focusOnLake(lake)"
                >
                  <div class="flex justify-between items-center">
                    <div>
                      <div class="font-medium">{{ lake.name }}</div>
                      <div class="text-xs text-gray-400">{{ lake.patogens }}</div>
                    </div>
                    <div class="text-xl">
                      {{ getLakeRiskEmoji(lake) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Информация о рисках -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 class="text-lg font-semibold mb-3">ℹ️ Safety Info</h3>
              <div class="text-sm text-gray-300 space-y-2">
                <p>✅ No Risk: Safe for all activities</p>
                <p>⚠️ Low Risk: Caution advised</p>
                <p>🚨 High Risk: Avoid water contact</p>
                <p>🔬 Regular monitoring ongoing</p>
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
  patogens: string;
}

// Состояние
const activeTab = ref('data');
const currentZoom = ref(12);
const currentCenter = ref<[number, number]>([54.88, 69.16]);

// Данные озер
const lakes: Lake[] = [
  { name: 'Озеро Пёстрое', lat: 54.836699, lng: 69.111328, patogens: "Отсутствуют" },
  { name: 'Озеро Белое', lat: 54.927154, lng: 69.254322, patogens: "Отсутствуют" },
  { name: 'Озеро Горькое', lat: 54.947573, lng: 68.951122, patogens: "Есть небольшой риск" },
  { name: 'Озеро Поганка', lat: 54.921205, lng: 69.053476, patogens: "Отсутствуют" },
  { name: 'Озеро Дикое', lat: 54.840156, lng: 69.131957, patogens: "Отсутствуют" },
];

// Методы
const getLakeRiskLevel = (lake: Lake): number => {
  if (lake.patogens.includes("небольшой риск")) return 2;
  if (lake.patogens.includes("Отсутствуют")) return 1;
  return 3;
};

const getLakeRiskEmoji = (lake: Lake): string => {
  const level = getLakeRiskLevel(lake);
  if (level === 1) return '✅';
  if (level === 2) return '⚠️';
  return '🚨';
};

const getRiskLevelColor = (lake: Lake): string => {
  const level = getLakeRiskLevel(lake);
  if (level === 1) return '#10B981'; // green
  if (level === 2) return '#F59E0B'; // yellow
  return '#EF4444'; // red
};

const getRiskLevelText = (lake: Lake): string => {
  const level = getLakeRiskLevel(lake);
  if (level === 1) return 'No Risk';
  if (level === 2) return 'Low Risk';
  return 'High Risk';
};

const getLakeRiskClass = (lake: Lake) => {
  const level = getLakeRiskLevel(lake);
  if (level === 1) return 'bg-green-500/10 border-green-500/30';
  if (level === 2) return 'bg-yellow-500/10 border-yellow-500/30';
  return 'bg-red-500/10 border-red-500/30';
};

const getOverallRiskLevel = (): string => {
  const hasRisk = lakes.some(lake => getLakeRiskLevel(lake) > 1);
  return hasRisk ? 'Low Risk' : 'No Risk';
};

const getOverallRiskEmoji = (): string => {
  const hasRisk = lakes.some(lake => getLakeRiskLevel(lake) > 1);
  return hasRisk ? '⚠️' : '✅';
};

const getOverallRiskColor = (): string => {
  const hasRisk = lakes.some(lake => getLakeRiskLevel(lake) > 1);
  return hasRisk ? 'text-yellow-400' : 'text-green-400';
};

const getOverallRiskProgressColor = (): string => {
  const hasRisk = lakes.some(lake => getLakeRiskLevel(lake) > 1);
  return hasRisk ? 'bg-yellow-500' : 'bg-green-500';
};

const getOverallRiskPercentage = (): number => {
  const riskLakes = lakes.filter(lake => getLakeRiskLevel(lake) > 1).length;
  return (riskLakes / lakes.length) * 100;
};

const getSafeLakesCount = (): number => {
  return lakes.filter(lake => getLakeRiskLevel(lake) === 1).length;
};

const getRiskLakesCount = (): number => {
  return lakes.filter(lake => getLakeRiskLevel(lake) > 1).length;
};

const getRecommendation = (lake: Lake): string => {
  const level = getLakeRiskLevel(lake);
  if (level === 1) return 'Safe for all activities';
  if (level === 2) return 'Avoid swimming, boil water';
  return 'Avoid all water contact';
};

const getRiskIcon = (lake: Lake): L.Icon<L.IconOptions> => {
  const emoji = getLakeRiskEmoji(lake);
  return L.divIcon({
    html: emoji,
    className: 'text-2xl',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  }) as unknown as L.Icon<L.IconOptions>;
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