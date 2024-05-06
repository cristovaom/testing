export interface DriverSchemaRequest {
  id?: string;
  name: string;
  phone: string;
  cpf: string;
  cnh: string;
  email: string;
  birthdate: Date;
  created_at?: Date;
  updated_at?: Date;
  userId: string;
}

export interface DriverSchemaEditRequest {
  id?: string;
  name?: string;
  email?: string;
  cpf?: string;
  cnh?: string;
  phone?: string;
  birthdate?: Date;
}

export interface DriverRepository {
  createDriver(data: DriverSchemaRequest): Promise<DriverSchemaRequest | null>;
  findDriverByEmailIfExists(email: string): Promise<DriverSchemaRequest | null>;
  findAllDrivers(): Promise<DriverSchemaRequest[] | null>;
  deleteLogicDriver(id: string): Promise<DriverSchemaRequest | null>;
  editDriver(
    data: DriverSchemaEditRequest,
  ): Promise<DriverSchemaRequest | null>;
}
