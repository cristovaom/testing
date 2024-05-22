import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from './prismaservice';

@Controller('corridas')
export class CorridaController {
  constructor(private prisma: PrismaService) {}

  @Post('/create')
  // @UseGuards(AuthGuard)
  async createCorrida(
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
      const corrida = await this.prisma.corrida.create({
        data: {
          ...body,
          horarioChegada: new Date(body.horarioChegada),
          horarioSaida: new Date(body.horarioSaida),
        },
      });
      console.log(corrida);
      return corrida;
    } catch (err) {
      console.log(err);
    }
  }

  @Get('/getCrridas')
  async getCorridas() {
    const response = await this.prisma.corrida.findMany();
    if (response.length === 0) {
      return { message: 'Nenhuma corrida encontrada!' };
    }
    return response;
  }

  @Put('/delete/:id')
  async deleteCorrida(@Param('id') id: string) {
    console.log(id);
    try {
      const corrida = await this.prisma.corrida.delete({
        where: {
          id,
        },
      });
      return corrida;
    } catch (err) {
      console.log(err);
    }
  }
}
