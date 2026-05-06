<script setup lang="ts">
import { useCurveStore } from '../stores/curveStore';

const curveStore = useCurveStore();
</script>

<template>
  <div class="p-8 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">设置</h1>
    
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <h2 class="text-lg font-semibold mb-4 border-b pb-2">画布设置</h2>
      
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-gray-700">显示网格</label>
          <input type="checkbox" v-model="curveStore.settings.showGrid" class="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
        </div>
        
        <div class="flex items-center justify-between">
          <label class="text-gray-700">闭合曲线</label>
          <input type="checkbox" v-model="curveStore.settings.closeCurve" class="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
        </div>
        
        <div class="flex items-center justify-between">
          <label class="text-gray-700">曲线张力 (Tension)</label>
          <div class="flex items-center w-1/2">
            <input type="range" min="0" max="1" step="0.1" v-model="curveStore.settings.tension" class="w-full">
            <span class="ml-3 text-sm text-gray-500 w-8">{{ curveStore.settings.tension }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
