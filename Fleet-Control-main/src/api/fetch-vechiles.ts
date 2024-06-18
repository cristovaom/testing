

import { api } from "@/lib/axios";


export async function fetchVehiclesAPI() {
    const response = await api.get(`/vehicles/all`);
    console.log(response.data);
    return response.data;
  }