import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/AuthGuard';
import { PrismaService } from './prismaservice';

@Controller('multa')
export class MultaController {
  constructor(private prisma: PrismaService) {}

  @Post('/create')
  // @UseGuards(AuthGuard)
  async createMulta(
    @Body()
    body: {
      idCorrida: string;

      tipoMulta: string;
      valorMulta: string;
      dataPagamento?: Date;
      isPago: string;
    },
  ) {
    try {
      const multa = await this.prisma.multa.create({
        data: {
          idCorrida: body.idCorrida,
          tipoMulta: body.tipoMulta,
          valorMulta: body.valorMulta,

          dataPagamento: body.dataPagamento
            ? new Date(body.dataPagamento)
            : null,
          isPago: body.isPago,
        },
      });

      return multa;
    } catch (err) {
      console.log(err);
    }
  }
  @Get('/get')
  async getMultas() {
    const multas = await this.prisma.multa.findMany();
    if (multas.length === 0) return { message: 'Nenhuma multa encontrada' };
    return multas;
  }

  @Put('/delete/:id')
  async deleteMulta(@Param('id') id: string) {
    const multa = await this.prisma.multa.delete({
      where: {
        id: id,
      },
    });

    return multa;
  }
}
