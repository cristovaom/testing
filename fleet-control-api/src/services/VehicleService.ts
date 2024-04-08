import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { VehiclePrismaRepository } from 'src/repositories/prisma/VehiclePrismaRepository';
import { VehicleSchema } from '../repositories/VehicleRepository';
@Injectable()
export class VehicleService {
  constructor(private vehicleRepository: VehiclePrismaRepository) {}

  async createVehicle(data: VehicleSchema) {
    const vehicleCreate = await this.vehicleRepository.createVehicle(data);

    if (!vehicleCreate) {
      throw new UnprocessableEntityException(
        'Não foi possivel criar o veículo!.',
      );
    }
    return vehicleCreate;
  }

  async findAllVehicles(page?: number, plate?: string, id?: string) {
    const vehicle = await this.vehicleRepository.findAllVehicles(
      page,
      plate,
      id,
    );
    return vehicle;
  }
  async deleteLogicVehicle(id: string) {
    const vehicle = await this.vehicleRepository.deleteLogicVehicle(id);

    return vehicle;
  }

  async editVehicle(data: VehicleSchema) {
    const vehicle = await this.vehicleRepository.editVehicle(data);

    return vehicle;
  }
}
