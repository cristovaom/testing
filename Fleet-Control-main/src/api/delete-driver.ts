



import { api } from "@/lib/axios";


interface DeleteDriverProps{
    id: string;
}

export async function DeleteDriver({id} : DeleteDriverProps){
    const response = await api.put(`/driver/delete?=${id}`);

    return response.data;
}