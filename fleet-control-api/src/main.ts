import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as express from 'express';

const httpsOptions = {
  key: fs.readFileSync('./secrets/cert.key'),
  cert: fs.readFileSync('./secrets/cert.crt'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: new StartupLogger(), // Use o StartupLogger como logger global
    logger: ['error', 'warn', 'log', 'debug', 'verbose'], // Use todos os logs
    httpsOptions,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
    credentials: true,
  });

  console.log("oi");

  await app.listen(8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
  app.use(cookieParser());
}
bootstrap();
