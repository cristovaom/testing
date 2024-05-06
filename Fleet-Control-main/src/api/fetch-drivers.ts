import { api } from "@/lib/axios";


export async function fetchDriversAPI() {
    const response = await api.get(`/driver/all`);
  
    return response.data;
  }