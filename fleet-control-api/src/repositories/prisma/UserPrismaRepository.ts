import { PrismaService } from 'src/lib/prisma';
import { UserRepository } from '../UserRepository';
import { Prisma } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}
  async createUser(data: Prisma.UserCreateInput) {
    const user = await this.prismaService.user.create({ data });

    if (!user) {
      throw new UnprocessableEntityException('Não foi possível criar o user!');
    }

    return user;
  }
  async findOneByEmail(email: string) {
    const userWithEmailValidation = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
    if (!userWithEmailValidation) {
      throw new NotFoundException('Usuario não encontrado!');
    }

    return userWithEmailValidation;
  }
}
