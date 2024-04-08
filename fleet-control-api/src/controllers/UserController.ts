import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import * as fs from 'fs'; // Importe o módulo 'fs'
import { diskStorage } from 'multer';

import { Response } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { UserService } from 'src/services/UserService';
import { z } from 'zod';

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email('Email inválido!'),
});

type registerBodySchemaParse = z.infer<typeof registerBodySchema>;

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async registerUser(@Body() { name, email }: registerBodySchemaParse) {
    const userService = await this.userService.createUser({ name, email });

    if (!userService) {
      throw new BadRequestException('Falha ao criar user!');
    }

    return userService;
  }

  @Post('/uploadPhoto')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // Use a extensão original do arquivo
          const originalExtName = extname(file.originalname);
          // Use uma string aleatória para evitar colisões de nome
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          // Chame o callback com o nome do arquivo
          cb(null, `${randomName}${originalExtName}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new Error('File not found!');
    }

    console.log('File uploaded', file);

    return { message: 'File uploaded!' };
  }

  @Get('/videos')
  async serveVideo(@Query('filename') filename: string, @Res() res: Response) {
    const mediaPath = join(process.cwd(), 'uploads', filename);
    // Verifica se o arquivo existe
    if (!fs.existsSync(mediaPath)) {
      return res.status(404).send('File not found');
    }

    // Determina o tipo de conteúdo com base na extensão do arquivo
    const contentType = filename.endsWith('.mp4')
      ? 'video/mp4'
      : filename.endsWith('.png')
        ? 'image/png'
        : 'image/jpeg';

    // Define o cabeçalho Content-Type
    res.setHeader('Content-Type', contentType);

    const stream = fs.createReadStream(mediaPath);
    stream.pipe(res);
  }
}
