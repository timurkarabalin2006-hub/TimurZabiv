<template>
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
          {{ lake.name }}
        </LTooltip>
        <LPopup>
          <div class="text-black p-2 min-w-48">
            <strong class="text-lg">{{ lake.name }}</strong>
            <div class="mt-2 space-y-1 text-sm">
              <div>📍 Coordinates: {{ lake.lat.toFixed(4) }}, {{ lake.lng.toFixed(4) }}</div>
              <div>💧 Status: {{ lake.patogens }}</div>
            </div>
          </div>
        </LPopup>
      </LMarker>

      <!-- Круги вокруг озер -->
      <LCircle 
        v-for="(lake, i) in lakes" 
        :key="'circle-'+i"
        :lat-lng="[lake.lat, lake.lng]"
        :radius="600"
        :color="getLakeColor(lake)"
        :fill-color="getLakeColor(lake)"
        :fill-opacity="0.2"
        :weight="2"
      />
    </LMap>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// @ts-ignore
import { LMap, LTileLayer, LMarker, LTooltip, LPopup, LCircle } from '@vue-leaflet/vue-leaflet';
import L from 'leaflet';

// Типы
interface Lake {
  name: string;
  lat: number;
  lng: number;
  patogens: string;
}

// Состояние
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

// Методы для карты
const onZoomUpdate = (zoom: number) => {
  currentZoom.value = zoom;
};

const onCenterUpdate = (center: [number, number]) => {
  currentCenter.value = center;
};

const getLakeIcon = (lake: Lake) => {
  return L.divIcon({
    html: `💧`,
    className: 'text-2xl',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  }) as unknown as L.Icon<L.IconOptions>;
};

const getLakeColor = (lake: Lake) => {
  if (lake.patogens.includes("небольшой риск")) return '#F59E0B';
  return '#3B82F6';
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