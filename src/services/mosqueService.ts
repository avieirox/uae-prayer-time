import axios from 'axios';
import { Mosque, CreateMosqueDTO, UpdateMosqueDTO } from '../types/mosque';

// Cambiamos la URL del API para usar la variable de entorno o un valor por defecto
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export class MosqueService {
  private static instance: MosqueService;
  private token: string | null = null;

  private constructor() {}

  static getInstance(): MosqueService {
    if (!MosqueService.instance) {
      MosqueService.instance = new MosqueService();
    }
    return MosqueService.instance;
  }

  setToken(token: string) {
    this.token = token;
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  async getAllMosques(): Promise<Mosque[]> {
    try {
      if (!this.token) {
        throw new Error('No authentication token provided');
      }
      
      console.log('Fetching mosques from:', `${API_URL}/mosques`);
      console.log('Using headers:', this.getHeaders());
      
      const response = await axios.get(`${API_URL}/mosques`, {
        headers: this.getHeaders(),
      });
      
      console.log('Response received:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Detailed error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw new Error(error.response?.data?.message || error.message || 'Error loading mosques');
    }
  }

  async getMosqueById(id: number): Promise<Mosque> {
    try {
      const response = await axios.get(`${API_URL}/mosques/${id}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching mosque ${id}:`, error);
      throw new Error(error.response?.data?.error || 'Error loading mosque');
    }
  }

  async createMosque(mosque: CreateMosqueDTO): Promise<Mosque> {
    try {
      const response = await axios.post(`${API_URL}/mosques`, mosque, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error('Error creating mosque:', error);
      throw new Error(error.response?.data?.error || 'Error creating mosque');
    }
  }

  async updateMosque(mosque: UpdateMosqueDTO): Promise<Mosque> {
    try {
      const response = await axios.put(`${API_URL}/mosques/${mosque.id}`, mosque, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error('Error updating mosque:', error);
      throw new Error(error.response?.data?.error || 'Error updating mosque');
    }
  }

  async deleteMosque(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/mosques/${id}`, {
        headers: this.getHeaders(),
      });
    } catch (error: any) {
      console.error('Error deleting mosque:', error);
      throw new Error(error.response?.data?.error || 'Error deleting mosque');
    }
  }
}
