import { api } from "@/lib/axios";


interface RegisterDriverRequest {
    name : string;
    email: string;
    phone: string;
    cpf: string;
    cnh: string;
    birthdate ?: Date;
}

export async function RegisterDriver(data : RegisterDriverRequest){
    const response = await api.post('/driver/register', data);

    return response.data;
}