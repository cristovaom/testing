

import { api } from "@/lib/axios";


export async function fetchVehiclesAPI() {
    const response = await api.get(`/vehicles/all`);
  

    await new Promise(resolve => setTimeout(resolve, 5000));
  
    return response.data;
  }