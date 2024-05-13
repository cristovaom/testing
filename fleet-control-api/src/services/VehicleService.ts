import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { VehiclePrismaRepository } from 'src/repositories/prisma/VehiclePrismaRepository';
import { VehicleSchema } from '../repositories/VehicleRepository';
import { LoggerService } from '../logs/logger.service';

@Injectable()
export class VehicleService {
  constructor(
    private vehicleRepository: VehiclePrismaRepository,
    private logger: LoggerService,
  ) {}

  async createVehicle(data: VehicleSchema) {
    try {
      const vehicleCreate = await this.vehicleRepository.createVehicle(data);

      if (!vehicleCreate) {
        throw new UnprocessableEntityException('Não foi possível criar o veículo.');
      }

      this.logger.log('Novo veículo criado');
      return vehicleCreate;
    } catch (error) {
      this.logger.error(`Erro ao criar veículo: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAllVehicles(page?: number, plate?: string, id?: string) {
    try {
      const vehicle = await this.vehicleRepository.findAllVehicles(page, plate, id);
      return vehicle;
    } catch (error) {
      this.logger.error(`Erro ao buscar veículos: ${error.message}`, error.stack);
      throw error;
    }
  }

  async deleteLogicVehicle(id: string) {
    try {
      const vehicle = await this.vehicleRepository.deleteLogicVehicle(id);
      this.logger.log('Veículo deletado logicamente');
      return vehicle;
    } catch (error) {
      this.logger.error(`Erro ao deletar veículo: ${error.message}`, error.stack);
      throw error;
    }
  }

  async editVehicle(data: VehicleSchema) {
    try {
      const vehicle = await this.vehicleRepository.editVehicle(data);
      return vehicle;
    } catch (error) {
      this.logger.error(`Erro ao editar veículo: ${error.message}`, error.stack);
      throw error;
    }
  }
}
