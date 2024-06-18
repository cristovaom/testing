import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from './prismaservice';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { AuthGuard } from 'src/auth/AuthGuard';

@Controller('corridas')
export class CorridaController {
  constructor(
    private prisma: PrismaService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

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
      console.log(body)
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
  @UseGuards(AuthGuard)
  async getCorridas(@Req() request: Request) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return { message: 'Token não encontrado!' };
    }
    const [bearer, token] = authHeader.split(' ');
    // const auth = new AuthGuard();

    const response = await this.prisma.corrida.findMany();
    if (response.length === 0) {
      return { message: 'Nenhuma corrida encontrada!' };
    }
    // await this.elasticsearchService.create({
    //   index: 'corridas',
    //   id: response[0].id,
    //   body: {
    //     cpfMotorista: response[0].cpfMotorista,
    //     PlacaVeiculo: response[0].PlacaVeiculo,
    //     destino: response[0].destino,
    //     horarioSaida: response[0].horarioSaida,
    //     horarioChegada: response[0].horarioChegada,
    //   },
    // });
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
