import axios from 'axios';
import type { Point } from '../utils/interpolation';

const API_BASE_URL = 'http://localhost:8080/api/curves';

export interface CurveDTO {
  id?: number;
  name: string;
  vertices: Point[];
  createdAt?: string;
  updatedAt?: string;
}

export const curveApi = {
  async getAllCurves(): Promise<CurveDTO[]> {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  async getCurveById(id: number): Promise<CurveDTO> {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  async createCurve(curve: CurveDTO): Promise<CurveDTO> {
    const response = await axios.post(API_BASE_URL, curve);
    return response.data;
  },

  async updateCurve(id: number, curve: CurveDTO): Promise<CurveDTO> {
    const response = await axios.put(`${API_BASE_URL}/${id}`, curve);
    return response.data;
  },

  async deleteCurve(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
};
