import { api } from "@/lib/axios";



export async function fetchDriversAPI(page : number){
    const response = await api.get(`/driver/all`,{
        params: {page: page}
    }
    )
    console.log(response.data)
    return response.data;
}