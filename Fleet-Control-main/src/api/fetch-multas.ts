
import { api } from "@/lib/axios";

export async function FetchMultas() {
    const response = await api.get(`/multa/get`);
    
    return response.data;
  }