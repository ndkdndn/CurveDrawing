<script setup lang="ts">
// Main drawing view logic will go here
import CanvasDrawer from '../components/CanvasDrawer.vue';
import Toolbar from '../components/Toolbar.vue';
import VertexManager from '../components/VertexManager.vue';
</script>

<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <!-- Left Toolbar -->
    <div class="w-16 bg-white border-r shadow-sm flex flex-col items-center py-4 z-10">
      <Toolbar />
    </div>

    <!-- Center Canvas Area -->
    <div class="flex-1 relative flex items-center justify-center overflow-auto p-4">
      <div class="bg-white shadow-md rounded-lg overflow-hidden border">
        <CanvasDrawer />
      </div>
    </div>

    <!-- Right Properties Panel -->
    <div class="w-64 bg-white border-l shadow-sm flex flex-col z-10">
      <div class="p-4 border-b">
        <h2 class="text-lg font-semibold text-gray-800">顶点管理</h2>
      </div>
      <div class="flex-1 overflow-y-auto">
        <VertexManager />
      </div>
    </div>
  </div>
</template>
