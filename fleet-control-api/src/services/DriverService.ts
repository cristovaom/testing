import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  DriverSchemaEditRequest,
  DriverSchemaRequest,
} from 'src/repositories/DriverRepository';
import { DriverPrismaRepository } from 'src/repositories/prisma/DriverPrismaRepository';

@Injectable()
export class DriverService {
  constructor(private driverRepository: DriverPrismaRepository) {}

  async createDriver(data: DriverSchemaRequest) {
    console.log(data);
    if (!data) {
      throw new BadRequestException('Informações inválidas!');
    }

    return this.driverRepository.createDriver(data);
  }

  async findDriverByEmailIfExists(email: string) {
    if (!email) {
      throw new BadRequestException('Email inválido!');
    }
    const driver = this.driverRepository.findDriverByEmailIfExists(email);
    if (!driver) {
      throw new NotFoundException('Motorista não encontrado!');
    }

    return driver;
  }

  async findAllDrivers(page: number, name?: string, id?: string) {
    console.log(page);
    const drivers = await this.driverRepository.findAllDrivers(page, name, id);
    if (!drivers) {
      throw new NotFoundException('Motoristas não encontrados!');
    }

    return drivers;
  }

  async deleteLogicDriver(id: string) {
    const driverWithIdToDelete =
      await this.driverRepository.deleteLogicDriver(id);

    if (!driverWithIdToDelete) {
      throw new NotFoundException('Motorista não encontrado!');
    }

    return driverWithIdToDelete;
  }

  async updateDriver(data: DriverSchemaEditRequest) {
    const driver = await this.driverRepository.editDriver(data);
    if (!driver) {
      throw new NotFoundException('Motorista não encontrado!');
    }
    return driver;
  }
}
