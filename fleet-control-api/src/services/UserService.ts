import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserPrismaRepository } from 'src/repositories/prisma/UserPrismaRepository';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private userRepository: UserPrismaRepository) {}

  async createUser({ name, email }: RegisterUseCaseRequest) {
    const user = await this.userRepository.createUser({ name, email });

    if (!user) {
      throw new BadRequestException('Não foi possivel criar o user!.');
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
