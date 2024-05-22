import { Body, Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth/AuthGuard';
import { PrismaService } from './prismaservice';

@Controller('multa')
export class MultaController {
  constructor(private prisma: PrismaService) {}

  @Get('/create')
  // @UseGuards(AuthGuard)
  async createMulta(
    @Body()
    body: {
      cpfMotorista: string;
      PlacaVeiculo: string;
      destino: string;
      horarioSaida: Date;
      horarioChegada: Date;
    },
  ) {
    try {
      console.log(body);
    } catch (err) {
      console.log(err);
    }
  }
}
