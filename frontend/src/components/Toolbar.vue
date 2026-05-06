<script setup lang="ts">
import { useCurveStore } from '../stores/curveStore';
import { MousePointer2, PenLine, Eraser, Trash2, Save } from 'lucide-vue-next';

const curveStore = useCurveStore();
</script>

<template>
  <div class="flex flex-col space-y-4">
    <button 
      @click="curveStore.setMode('select')" 
      :class="['p-2 rounded-md transition', curveStore.mode === 'select' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100']"
      title="选择顶点"
    >
      <MousePointer2 class="w-6 h-6" />
    </button>
    
    <button 
      @click="curveStore.setMode('draw')" 
      :class="['p-2 rounded-md transition', curveStore.mode === 'draw' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100']"
      title="绘制曲线"
    >
      <PenLine class="w-6 h-6" />
    </button>
    
    <button 
      @click="curveStore.setMode('delete')" 
      :class="['p-2 rounded-md transition', curveStore.mode === 'delete' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100']"
      title="删除顶点"
    >
      <Eraser class="w-6 h-6" />
    </button>

    <div class="h-px bg-gray-200 w-full my-2"></div>

    <button 
      @click="curveStore.clearCanvas()" 
      class="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
      title="清空画布"
    >
      <Trash2 class="w-6 h-6" />
    </button>

    <button 
      @click="curveStore.saveCurrentCurve()" 
      class="p-2 rounded-md text-green-600 hover:bg-green-50 transition"
      title="保存曲线"
    >
      <Save class="w-6 h-6" />
    </button>
  </div>
</template>
