import { api } from "@/lib/axios";
import Cookies from "js-cookie";


export async function GetCorridas(){
    const response = await api.get('/corridas/getCrridas',{
        headers: {
            'Authorization': `Bearer ${Cookies.get("token")}`
        }
    
    });
    console.log(response.data)
    return response.data;
}