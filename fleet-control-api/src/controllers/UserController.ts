import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/services/UserService';
import { z } from 'zod';
import { AuthGuard } from '@nestjs/passport';

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email('Email inválido!'),
});

type registerBodySchemaParse = z.infer<typeof registerBodySchema>;

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @UseGuards(AuthGuard('jwt'))
  async registerUser(@Body() { name, email }: registerBodySchemaParse) {
    const userService = await this.userService.createUser({ name, email });

    if (!userService) {
      throw new BadRequestException('Falha ao criar user!');
    }

    return userService;
  }
}
