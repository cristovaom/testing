

import { api } from "@/lib/axios";


export interface CreateMulta {
    id ?: string;
    idCorrida : string;
    tipoMulta: string;
    valorMulta: string;
    dataPagamento: Date;
    isPago: string;
    
}

export async function CreateMulta(data : CreateMulta){
    const response = await api.post('/multa/create', data);

    return response.data;
}