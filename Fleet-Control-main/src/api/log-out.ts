import { api } from "@/lib/axios";


export async function handleLogoutAPI(){
    const response = await api.post('/auth/logout');

    return response.data;
}