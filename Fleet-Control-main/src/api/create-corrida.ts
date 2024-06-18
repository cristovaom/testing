import { api } from "@/lib/axios";


export interface Createcorrida {
    id ?: string;
    cpfMotorista : string;
    PlacaVeiculo: string;
    destino: string;
    horarioSaida: Date;
    horarioChegada: Date;
    
}

export async function CreateCorrida(data : Createcorrida){
    const response = await api.post('/corridas/create', data);

    return response.data;
}