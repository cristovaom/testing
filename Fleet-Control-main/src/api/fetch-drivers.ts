import { api } from "@/lib/axios";

interface DriverPropsAPI {
    page ?: number;
}

export async function fetchDriversAPI({page} : DriverPropsAPI){
    const response = await api.get(`/driver/all?page=${page}`)
    console.log(response.data)
    return response.data;
}