import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DriverService } from 'src/services/DriverService';
import { UserService } from 'src/services/UserService';
import { z } from 'zod';

const registerDriverBodySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email('Email inválido!'),
  phone: z.string().min(6, 'Telefone inválido!'),
  cpf: z.string().min(8, 'CPF inválido!'),
  cnh: z.string().min(8, 'CNH inválido!'),
  birthdate: z.any(),
  userId: z.string().optional(),
});

type registerBodySchemaParse = z.infer<typeof registerDriverBodySchema>;

@Controller('/driver')
export class DriverController {
  constructor(
    private driverService: DriverService,
    private userService: UserService,
  ) {}

  @Post('/register')
  @UseGuards(AuthGuard('jwt'))
  async registerUser(
    @Body()
    {
      name,
      email,
      phone,
      cpf,
      cnh,
      birthdate,
      userId,
    }: registerBodySchemaParse,
  ) {
    const findDriverExists =
      await this.driverService.findDriverByEmailIfExists(email);

    if (findDriverExists === null) {
      const driverService = await this.driverService.createDriver({
        name,
        email,
        phone,
        cpf,
        cnh,
        birthdate: new Date(birthdate),
        userId,
      });
      if (!driverService) {
        throw new BadRequestException('Falha ao criar !');
      }

      return driverService;
    }
  }

  @Put('/update')
  @UseGuards(AuthGuard('jwt'))
  async updateDriver(
    @Body()
    { id, name, email, phone, cpf, cnh, birthdate }: registerBodySchemaParse,
  ) {
    const driverService = await this.driverService.updateDriver({
      id,
      name,
      email,
      phone,
      cpf,
      cnh,
      birthdate: new Date(birthdate),
    });

    if (!driverService) {
      throw new BadRequestException('Falha ao atualizar !');
    }
    return driverService;
  }

  @Put('/delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteDriver(@Query('id') id: string) {
    return this.driverService.deleteLogicDriver(id);
  }

  @Get('/all')
  @UseGuards(AuthGuard('jwt'))
  async findAllDrivers(@Req() req) {
    console.log(req.user);
    return this.driverService.findAllDrivers();
  }
}
