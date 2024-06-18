import { api } from "@/lib/axios";


export async function GetCorridas(){
    const response = await api.get('/corridas/getCrridas');
    return response.data;
}