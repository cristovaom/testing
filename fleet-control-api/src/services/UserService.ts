import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserPrismaRepository } from 'src/repositories/prisma/UserPrismaRepository';
import { LoggerService } from '../logs/logger.service';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserPrismaRepository,
    private logger: LoggerService,
  ) {}

  async createUser({ name, email }: RegisterUseCaseRequest) {
    try {
      const user = await this.userRepository.createUser({ name, email });

      if (!user) {
        throw new BadRequestException('Não foi possível criar o usuário.');
      }

      this.logger.log('Novo usuário criado');
      return user;
    } catch (error) {
      this.logger.error(`Erro ao criar usuário: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado.');
      }

      this.logger.log('Usuário encontrado');
      return user;
    } catch (error) {
      this.logger.error(`Erro ao encontrar usuário: ${error.message}`, error.stack);
      throw error;
    }
  }
}
