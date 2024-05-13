import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.interface';
import { LoggerService } from '../logs/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private logger: LoggerService,
  ) {}

  async validateUser(email: string) {
    try {
      const userByEmail = await this.userService.findOneByEmail(email);

      if (!userByEmail) {
        this.logger.error('Usuário inválido!', '');
        throw new UnauthorizedException('Usuário inválido!');
      }

      return userByEmail;
    } catch (error) {
      this.logger.error(`Erro ao validar usuário: ${error.message}`, error.stack);
      throw error;
    }
  }

  generateToken(user: User) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    const token = this.jwtService.sign(payload);

    this.logger.log(`Token gerado para o usuário ${user.name}`);

    return { access_token: token };
  }
}
