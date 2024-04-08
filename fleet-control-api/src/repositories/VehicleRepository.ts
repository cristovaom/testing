export interface VehicleSchema {
  id?: string;
  isActive?: boolean;
  brand: string;
  model: string;
  year: number;
  plate: string;
  renavamN: string;
  chassi: string;
  created_at?: Date | string | null;
  updated_at?: Date | string | null;
  NTickets?: number | null;
  tripId?: string | null;
  Trip?: any;
  Ticket?: any;
}

export interface VehicleRepository {
  createVehicle(data: VehicleSchema): Promise<VehicleSchema | null>;
  editVehicle(data: VehicleSchema): Promise<VehicleSchema | null>;
  findAllVehicles(page?: number, plate?: string, id?: string);
  deleteLogicVehicle(id: string);
}
