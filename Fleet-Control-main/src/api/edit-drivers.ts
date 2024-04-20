import { api } from "@/lib/axios";


interface EditDriverRequest {
    name : string;
    email: string;
    phone: string;
    cpf: string;
    cnh: string;
    birthdate ?: Date;
}

export async function EditDriver(data : EditDriverRequest){
    const response = await api.put('/driver/update', data);

    return response.data;
}