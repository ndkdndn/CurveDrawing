import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Point } from '../utils/interpolation';
import { curveApi, type CurveDTO } from '../api/curveApi';

export type DrawMode = 'select' | 'draw' | 'delete';

export const useCurveStore = defineStore('curve', () => {
  // Current editing state
  const currentCurveId = ref<number | null>(null);
  const currentCurveName = ref<string>('未命名曲线');
  const vertices = ref<Point[]>([]);
  const selectedVertexIndex = ref<number | null>(null);
  const mode = ref<DrawMode>('draw');
  
  // Settings
  const settings = ref({
    showGrid: true,
    closeCurve: false,
    tension: 0.5,
    vertexRadius: 6,
    lineWidth: 3
  });

  // Data loaded from backend
  const curves = ref<CurveDTO[]>([]);
  const isLoading = ref(false);

  // Actions
  function addVertex(point: Point) {
    vertices.value.push(point);
  }

  function updateVertex(index: number, point: Point) {
    if (index >= 0 && index < vertices.value.length) {
      vertices.value[index] = point;
    }
  }

  function removeVertex(index: number) {
    if (index >= 0 && index < vertices.value.length) {
      vertices.value.splice(index, 1);
      if (selectedVertexIndex.value === index) {
        selectedVertexIndex.value = null;
      } else if (selectedVertexIndex.value !== null && selectedVertexIndex.value > index) {
        selectedVertexIndex.value--;
      }
    }
  }

  function clearCanvas() {
    vertices.value = [];
    selectedVertexIndex.value = null;
    currentCurveId.value = null;
    currentCurveName.value = '未命名曲线';
  }

  function setMode(newMode: DrawMode) {
    mode.value = newMode;
  }

  // API Actions
  async function fetchCurves() {
    isLoading.value = true;
    try {
      curves.value = await curveApi.getAllCurves();
    } catch (error) {
      console.error('Failed to fetch curves:', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function saveCurrentCurve() {
    if (vertices.value.length === 0) return;
    
    isLoading.value = true;
    try {
      const dto: CurveDTO = {
        name: currentCurveName.value,
        vertices: vertices.value.map((v, i) => ({ x: Math.round(v.x), y: Math.round(v.y), orderIndex: i }))
      };

      if (currentCurveId.value) {
        const result = await curveApi.updateCurve(currentCurveId.value, dto);
        currentCurveName.value = result.name;
      } else {
        const result = await curveApi.createCurve(dto);
        currentCurveId.value = result.id!;
        currentCurveName.value = result.name;
      }
      alert('保存成功！');
    } catch (error) {
      console.error('Failed to save curve:', error);
      alert('保存失败，请检查后端服务是否启动。');
    } finally {
      isLoading.value = false;
    }
  }

  async function loadCurve(id: number) {
    isLoading.value = true;
    try {
      const curve = await curveApi.getCurveById(id);
      currentCurveId.value = curve.id!;
      currentCurveName.value = curve.name;
      
      // Sort vertices by orderIndex just in case
      const sortedVertices = [...curve.vertices].sort((a: any, b: any) => a.orderIndex - b.orderIndex);
      vertices.value = sortedVertices.map(v => ({ x: v.x, y: v.y }));
      
      selectedVertexIndex.value = null;
    } catch (error) {
      console.error('Failed to load curve:', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteCurve(id: number) {
    isLoading.value = true;
    try {
      await curveApi.deleteCurve(id);
      if (currentCurveId.value === id) {
        clearCanvas();
      }
      await fetchCurves();
    } catch (error) {
      console.error('Failed to delete curve:', error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    // State
    currentCurveId,
    currentCurveName,
    vertices,
    selectedVertexIndex,
    mode,
    settings,
    curves,
    isLoading,
    
    // Actions
    addVertex,
    updateVertex,
    removeVertex,
    clearCanvas,
    setMode,
    fetchCurves,
    saveCurrentCurve,
    loadCurve,
    deleteCurve
  };
});
