<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCurveStore } from '../stores/curveStore';
import { useRouter } from 'vue-router';
import { Trash2, Edit } from 'lucide-vue-next';

const curveStore = useCurveStore();
const router = useRouter();

onMounted(async () => {
  await curveStore.fetchCurves();
});

const loadCurve = (id: number) => {
  curveStore.loadCurve(id);
  router.push('/');
};

const deleteCurve = async (id: number) => {
  if (confirm('确定要删除这条曲线吗？')) {
    await curveStore.deleteCurve(id);
  }
};
</script>

<template>
  <div class="p-8 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">已保存的曲线</h1>
      <button @click="router.push('/')" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        新建曲线
      </button>
    </div>

    <div v-if="curveStore.isLoading" class="text-center py-12">
      <p class="text-gray-500">加载中...</p>
    </div>

    <div v-else-if="curveStore.curves.length === 0" class="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
      <p class="text-gray-500">暂无保存的曲线数据</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="curve in curveStore.curves" :key="curve.id" class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
        <div class="h-32 bg-gray-100 flex items-center justify-center relative">
          <!-- Mini preview could go here -->
          <svg class="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
            <path v-if="curve.vertices && curve.vertices.length > 1" 
                  :d="`M ${curve.vertices.map(v => `${v.x},${v.y}`).join(' L ')}`" 
                  fill="none" stroke="#1E3A8A" stroke-width="4" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-gray-800 truncate">{{ curve.name }}</h3>
          <p class="text-xs text-gray-500 mt-1">包含 {{ curve.vertices?.length || 0 }} 个顶点</p>
          <div class="mt-4 flex justify-between">
            <button @click="loadCurve(curve.id!)" class="text-blue-600 hover:text-blue-800 flex items-center text-sm">
              <Edit class="w-4 h-4 mr-1" /> 编辑
            </button>
            <button @click="deleteCurve(curve.id!)" class="text-red-600 hover:text-red-800 flex items-center text-sm">
              <Trash2 class="w-4 h-4 mr-1" /> 删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
