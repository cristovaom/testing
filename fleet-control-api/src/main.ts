import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { StartupLogger } from './logs/startupLogger';
import * as fs from 'fs';

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

  // const content = 'asdfasdf';

  // fs.writeFileSync('file.txt', app.useLogger());

  dotenv.config();

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.listen(8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
  app.use(cookieParser());
}
bootstrap();
