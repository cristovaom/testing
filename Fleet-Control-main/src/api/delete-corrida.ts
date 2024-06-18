import { api } from "@/lib/axios";


interface deletecorrida {
    id : string;
   
    
}

export async function deleteCorrida({id} : deletecorrida){
    const response = await api.put(`/corridas/delete/${id}`);

    return response.data;
}