import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  DriverRepository,
  DriverSchemaEditRequest,
  DriverSchemaRequest,
} from '../DriverRepository';
import { PrismaService } from 'src/lib/prisma';
import { UserPrismaRepository } from './UserPrismaRepository';

@Injectable()
export class DriverPrismaRepository implements DriverRepository {
  constructor(
    private prismaService: PrismaService,
    private userRepository: UserPrismaRepository,
  ) {}
  async editDriver(data: DriverSchemaEditRequest) {
    const editDriver = await this.prismaService.driver.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });

    if (!editDriver) {
      throw new UnprocessableEntityException(
        'Não foi possível editar o motorista!',
      );
    }

    return editDriver;
  }
  async deleteLogicDriver(id: string) {
    const setDriverToFalse = await this.prismaService.driver.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

    return setDriverToFalse;
  }
  async findAllDrivers(page?: number, name?: string, id?: string) {
    const drivers = await this.prismaService.driver.findMany({
      take: 20,
      skip: page * 20 || 0,
      where: {
        isActive: true,
        name: name,
        id: id,
      },
    });

    if (drivers.length === 0) {
      throw new NotFoundException('Não foi possível encontrar motoristas!');
    }
    return drivers;
  }

  async createDriver(data: DriverSchemaRequest) {
    const verifyIfDriverExists = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (verifyIfDriverExists === null) {
      const createUser = await this.prismaService.user.create({
        data: {
          name: data.name,
          email: data.email,
        },
      });

      if (createUser) {
        const driver = await this.prismaService.driver.create({
          data: {
            ...data,
            userId: createUser.id,
          },
        });

        if (!driver) {
          throw new BadRequestException('Não foi possível criar o motorista!');
        }

        return driver;
      }
    }
  }

  async findDriverByEmailIfExists(email: string): Promise<any> {
    const driverByEmail = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (driverByEmail) {
      throw new ConflictException('Motorista já cadastrado em nossa base!');
    }
    return driverByEmail;
  }
}
