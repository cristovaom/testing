import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { VehicleRepository, VehicleSchema } from '../VehicleRepository';
import { PrismaService } from 'src/lib/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class VehiclePrismaRepository implements VehicleRepository {
  constructor(private prismaRepository: PrismaService) {}

  async createVehicle(data: VehicleSchema) {
    try {
      const existingVehicle = await this.prismaRepository.vehicle.findUnique({
        where: {
          plate: data.plate,
          renavamN: data.renavamN,
          chassi: data.chassi,
        },
        select: {
          isActive: true,
        },
      });

      if (existingVehicle) {
        throw new ConflictException('Veículo já existe!');
      }

      const createdVehicle = await this.prismaRepository.vehicle.create({
        data,
      });

      if (!createdVehicle) {
        throw new Error('Falha ao criar veículo!');
      }

      return createdVehicle;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Já existe um veículo com os mesmos detalhes!',
          );
        }
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro ao processar a solicitação.',
      );
    }
  }

  async findAllVehicles(page?: number, plate?: string, id?: string) {
    const vehicle = await this.prismaRepository.vehicle.findMany({
      where: {
        plate: plate,
        id: id,
        isActive: true,
      },
      take: 20,
      skip: page * 20 || 0,
    });

    if (vehicle instanceof Error) {
      throw new NotFoundException('Veículo não encontrado!');
    }

    return vehicle;
  }

  async deleteLogicVehicle(id: string) {
    try {
      const vehicle = await this.prismaRepository.vehicle.update({
        where: {
          id,
        },
        data: {
          isActive: false,
        },
      });
      return vehicle;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Veículo não encontrado!');
        }
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro ao processar a solicitação.',
      );
    }
  }

  async editVehicle(data: VehicleSchema) {
    try {
      const vehicle = await this.prismaRepository.vehicle.update({
        where: {
          id: data.id,
        },
        data,
      });

      return vehicle;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Veículo não encontrado!');
        }
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro ao processar a solicitação.',
      );
    }
  }
}
