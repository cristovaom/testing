import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { StartupLogger } from './logs/startupLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new StartupLogger(), // Use o StartupLogger como logger global
  });

  // const content = 'asdfasdf';

  // fs.writeFileSync('file.txt', app.useLogger());

  dotenv.config();

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.listen(8080);
  app.use(cookieParser());
}
bootstrap();
