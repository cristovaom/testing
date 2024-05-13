import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DriverSchemaEditRequest, DriverSchemaRequest } from 'src/repositories/DriverRepository';
import { DriverPrismaRepository } from 'src/repositories/prisma/DriverPrismaRepository';
import { LoggerService } from '../logs/logger.service';

@Injectable()
export class DriverService {
  constructor(
    private driverRepository: DriverPrismaRepository,
    private logger: LoggerService,
  ) {}

  async createDriver(data: DriverSchemaRequest) {
    try {
      if (!data) {
        throw new BadRequestException('Informações inválidas!');
      }
      const result = await this.driverRepository.createDriver(data);
      this.logger.log('Novo motorista criado');
      return result;
    } catch (error) {
      this.logger.error(`Erro ao criar motorista: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findDriverByEmailIfExists(email: string) {
    try {
      if (!email) {
        throw new BadRequestException('Email inválido!');
      }
      const driver = await this.driverRepository.findDriverByEmailIfExists(email);
      if (!driver) {
        throw new NotFoundException('Motorista não encontrado!');
      }
      this.logger.log('Motorista encontrado');
      return driver;
    } catch (error) {
      this.logger.error(`Erro ao buscar motorista: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAllDrivers() {
    try {
      const drivers = await this.driverRepository.findAllDrivers();
      if (!drivers) {
        throw new NotFoundException('Motoristas não encontrados!');
      }
      this.logger.log('Todos os motoristas encontrados');
      return drivers;
    } catch (error) {
      this.logger.error(`Erro ao buscar todos os motoristas: ${error.message}`, error.stack);
      throw error;
    }
  }

  async deleteLogicDriver(id: string) {
    try {
      const driverWithIdToDelete = await this.driverRepository.deleteLogicDriver(id);
      if (!driverWithIdToDelete) {
        throw new NotFoundException('Motorista não encontrado!');
      }
      this.logger.log('Motorista deletado logicamente');
      return driverWithIdToDelete;
    } catch (error) {
      this.logger.error(`Erro ao deletar motorista: ${error.message}`, error.stack);
      throw error;
    }
  }

  async updateDriver(data: DriverSchemaEditRequest) {
    try {
      const driver = await this.driverRepository.editDriver(data);
      if (!driver) {
        throw new NotFoundException('Motorista não encontrado!');
      }
      this.logger.log('Motorista atualizado');
      return driver;
    } catch (error) {
      this.logger.error(`Erro ao atualizar motorista: ${error.message}`, error.stack);
      throw error;
    }
  }
}
