<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-blue-900 text-white shadow-md z-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-14">
          <div class="flex items-center">
            <span class="text-xl font-bold">交互式曲线绘制</span>
          </div>
          <nav class="flex items-center space-x-4">
            <RouterLink to="/" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition" active-class="bg-blue-800">绘制台</RouterLink>
            <RouterLink to="/curves" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition" active-class="bg-blue-800">我的曲线</RouterLink>
            <RouterLink to="/settings" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition" active-class="bg-blue-800">设置</RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="flex-1 flex flex-col">
      <RouterView />
    </main>
  </div>
</template>
