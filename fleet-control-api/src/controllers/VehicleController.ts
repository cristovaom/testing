import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/pipes/ZodValidation';
import { VehicleService } from 'src/services/VehicleService';
import { z } from 'zod';

/*
brand: string;
  model: string;
  year: number;
  plate: string;
  renavamN: string;
  chassi: string;
*/
const vehicleSchema = z.object({
  id: z.string().optional(),
  brand: z
    .string({
      required_error: 'Marca é obrigatória!',
    })
    .min(2, 'Marca não pode ter menos de 2 caracteres!'),
  model: z
    .string({
      required_error: 'Modelo é obrigatório!',
    })
    .min(2, 'Modelo não pode ter menos de 2 caracteres!'),
  year: z
    .number({
      required_error: 'Ano é obrigatório!',
    })
    .int()
    .min(1990, 'Ano não pode ser menor que 1990!'),
  plate: z
    .string({
      required_error: 'Placa é obrigatória!',
    })
    .min(7, 'Placa não pode ter menos de 7 caracteres!'),
  renavamN: z
    .string({
      required_error: 'Renavam é obrigatório!',
    })
    .min(6, 'Renavam não pode ter menos de 6 caracteres!'),
  chassi: z
    .string({
      required_error: 'Chassi é obrigatório!',
    })
    .min(6, 'Chassi não pode ter menos de 6 caracteres!'),
});

type VehicleSchemaData = z.infer<typeof vehicleSchema>;

@Controller('vehicles')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ZodValidationPipe(vehicleSchema))
  async createVehicle(
    @Body() { brand, model, year, plate, renavamN, chassi }: VehicleSchemaData,
  ) {
    const vehicle = await this.vehicleService.createVehicle({
      brand,
      model,
      year,
      plate,
      renavamN,
      chassi,
    });

    if (!vehicle) {
      throw new Error('Não foi possível criar o veículo!');
    }
    return vehicle;
  }

  @Get('/all')
  @UseGuards(AuthGuard('jwt'))
  async findAllVehicles(
    @Query('page') page?: number,
    @Query('plate') plate?: string,
    @Query('id') id?: string,
  ) {
    const vehicle = await this.vehicleService.findAllVehicles(page, plate, id);
    return vehicle;
  }

  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  @Put('/delete')
  async deleteLogicVehicle(@Query('id') id: string) {
    const vehicleService = await this.vehicleService.deleteLogicVehicle(id);

    return vehicleService;
  }

  @UsePipes(new ZodValidationPipe(vehicleSchema))
  @UseGuards(AuthGuard('jwt'))
  @Put('/edit')
  async editVehicle(
    @Body()
    { id, brand, model, year, plate, renavamN, chassi }: VehicleSchemaData,
  ) {
    console.log(id);
    const edidtVehicle = await this.vehicleService.editVehicle({
      id,
      brand,
      model,
      year,
      plate,
      renavamN,
      chassi,
    });

    return edidtVehicle;
  }
}
