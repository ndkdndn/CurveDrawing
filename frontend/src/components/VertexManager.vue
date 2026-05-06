<script setup lang="ts">
import { useCurveStore } from '../stores/curveStore';
import { Trash2 } from 'lucide-vue-next';

const curveStore = useCurveStore();
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="p-4 border-b">
      <label class="block text-sm font-medium text-gray-700 mb-1">曲线名称</label>
      <input 
        type="text" 
        v-model="curveStore.currentCurveName" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
    </div>
    
    <div class="flex-1 overflow-y-auto p-2">
      <div v-if="curveStore.vertices.length === 0" class="text-center py-8 text-gray-500 text-sm">
        尚未添加顶点
      </div>
      
      <ul v-else class="space-y-2">
        <li 
          v-for="(vertex, index) in curveStore.vertices" 
          :key="index"
          :class="[
            'p-3 border rounded-md flex justify-between items-center transition',
            curveStore.selectedVertexIndex === index ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-white hover:bg-gray-50 border-gray-200'
          ]"
          @click="curveStore.selectedVertexIndex = index"
        >
          <div>
            <div class="text-xs font-semibold text-gray-500 mb-1">P{{ index }}</div>
            <div class="flex space-x-2 text-sm">
              <span class="text-gray-700">X: {{ Math.round(vertex.x) }}</span>
              <span class="text-gray-700">Y: {{ Math.round(vertex.y) }}</span>
            </div>
          </div>
          
          <button 
            @click.stop="curveStore.removeVertex(index)"
            class="p-1 text-gray-400 hover:text-red-600 transition rounded"
            title="删除顶点"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
