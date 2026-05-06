<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useCurveStore } from '../stores/curveStore';
import { getCatmullRomCurve, type Point } from '../utils/interpolation';
import { findCollidingVertex } from '../utils/geometry';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const curveStore = useCurveStore();

const isDragging = ref(false);
const dragOffset = ref<Point>({ x: 0, y: 0 });
const previewPoint = ref<Point | null>(null);

// Get real coordinates relative to canvas
const getMousePos = (evt: MouseEvent): Point => {
  if (!canvasRef.value) return { x: 0, y: 0 };
  const rect = canvasRef.value.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};

const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  if (!curveStore.settings.showGrid) return;
  
  ctx.beginPath();
  ctx.strokeStyle = '#e5e7eb'; // gray-200
  ctx.lineWidth = 1;
  
  for (let x = 0; x <= width; x += 50) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y <= height; y += 50) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
};

const render = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid
  drawGrid(ctx, canvas.width, canvas.height);

  const vertices = [...curveStore.vertices];
  
  // Add preview point if in draw mode
  if (curveStore.mode === 'draw' && previewPoint.value && vertices.length > 0) {
    vertices.push(previewPoint.value);
  }

  // Draw curve
  if (vertices.length > 1) {
    const curvePoints = getCatmullRomCurve(
      vertices, 
      20, 
      curveStore.settings.closeCurve && curveStore.mode !== 'draw', // Only close if not actively drawing
      curveStore.settings.tension
    );
    
    ctx.beginPath();
    ctx.moveTo(curvePoints[0].x, curvePoints[0].y);
    for (let i = 1; i < curvePoints.length; i++) {
      ctx.lineTo(curvePoints[i].x, curvePoints[i].y);
    }
    
    ctx.strokeStyle = '#1e3a8a'; // blue-900
    ctx.lineWidth = curveStore.settings.lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    // Draw connecting line to preview point if any
    if (curveStore.mode === 'draw' && previewPoint.value && vertices.length === 1) {
       ctx.beginPath();
       ctx.moveTo(vertices[0].x, vertices[0].y);
       ctx.lineTo(previewPoint.value.x, previewPoint.value.y);
       ctx.strokeStyle = '#93c5fd'; // light blue for preview line
       ctx.setLineDash([5, 5]);
       ctx.stroke();
       ctx.setLineDash([]);
    }
  }

  // Draw vertices
  curveStore.vertices.forEach((v, index) => {
    ctx.beginPath();
    ctx.arc(v.x, v.y, curveStore.settings.vertexRadius, 0, Math.PI * 2);
    
    if (curveStore.selectedVertexIndex === index) {
      ctx.fillStyle = '#f97316'; // orange-500
      ctx.strokeStyle = '#c2410c';
      ctx.lineWidth = 2;
    } else {
      ctx.fillStyle = '#ef4444'; // red-500
      ctx.strokeStyle = '#b91c1c';
      ctx.lineWidth = 1;
    }
    
    ctx.fill();
    ctx.stroke();
    
    // Draw order index
    ctx.fillStyle = 'white';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(index.toString(), v.x, v.y);
  });
};

// Event handlers
const handleMouseDown = (evt: MouseEvent) => {
  const pos = getMousePos(evt);
  const clickedIndex = findCollidingVertex(pos, curveStore.vertices, curveStore.settings.vertexRadius * 2);

  if (curveStore.mode === 'draw') {
    if (clickedIndex === -1) {
      curveStore.addVertex(pos);
    } else {
      curveStore.selectedVertexIndex = clickedIndex;
    }
  } else if (curveStore.mode === 'select') {
    if (clickedIndex !== -1) {
      curveStore.selectedVertexIndex = clickedIndex;
      isDragging.value = true;
      dragOffset.value = {
        x: curveStore.vertices[clickedIndex].x - pos.x,
        y: curveStore.vertices[clickedIndex].y - pos.y
      };
    } else {
      curveStore.selectedVertexIndex = null;
    }
  } else if (curveStore.mode === 'delete') {
    if (clickedIndex !== -1) {
      curveStore.removeVertex(clickedIndex);
    }
  }
  
  render();
};

const handleMouseMove = (evt: MouseEvent) => {
  const pos = getMousePos(evt);
  
  if (curveStore.mode === 'draw') {
    previewPoint.value = pos;
    render();
  } else if (curveStore.mode === 'select' && isDragging.value && curveStore.selectedVertexIndex !== null) {
    curveStore.updateVertex(curveStore.selectedVertexIndex, {
      x: pos.x + dragOffset.value.x,
      y: pos.y + dragOffset.value.y
    });
    render();
  }
  
  // Hover effect cursor
  const hoveredIndex = findCollidingVertex(pos, curveStore.vertices, curveStore.settings.vertexRadius * 2);
  if (canvasRef.value) {
    if (curveStore.mode === 'select') {
      canvasRef.value.style.cursor = isDragging.value ? 'grabbing' : (hoveredIndex !== -1 ? 'grab' : 'default');
    } else if (curveStore.mode === 'draw') {
      canvasRef.value.style.cursor = 'crosshair';
    } else if (curveStore.mode === 'delete') {
      canvasRef.value.style.cursor = hoveredIndex !== -1 ? 'pointer' : 'default';
    }
  }
};

const handleMouseUp = () => {
  isDragging.value = false;
};

const handleMouseLeave = () => {
  isDragging.value = false;
  previewPoint.value = null;
  render();
};

// Watchers to trigger re-render
watch(() => curveStore.vertices, render, { deep: true });
watch(() => curveStore.settings, render, { deep: true });
watch(() => curveStore.selectedVertexIndex, render);
watch(() => curveStore.mode, () => {
  previewPoint.value = null;
  render();
});

onMounted(() => {
  render();
  
  // Handle window resize to redraw
  window.addEventListener('resize', () => {
    // If we want to make canvas truly responsive, we would update its width/height here
    render();
  });
});
</script>

<template>
  <canvas 
    ref="canvasRef"
    width="800" 
    height="600"
    class="bg-white touch-none"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseLeave"
  ></canvas>
</template>
