import { api } from "@/lib/axios";

interface SignInRequest{
    destination:string;
}

export async function handleSignIn({destination}: SignInRequest){
    const response = await api.post('/auth/login',{destination});

    return response.data;
}