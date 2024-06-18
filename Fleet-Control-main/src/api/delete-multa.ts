import { api } from "@/lib/axios";


interface deleteMultaProps{
    id: string;
}

export async function deleteMulta(data: deleteMultaProps){
    const response = await api.put(`/multa/delete/${data.id}`);
    return response.data;
}