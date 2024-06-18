import { api } from "@/lib/axios";


export async function registerTrip(trip: unknown) {
    return await api.post('/trips/register', trip);
}