import { MiddlewareConsumer, Module } from '@nestjs/common';
// import { MagicLoginStrategy } from './auth/MagicLoginStrategy';
import { PassportModule } from '@nestjs/passport';
import 'dotenv/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import LogsMiddleware from './logs/logs.middleware';
import { StartupLogger } from './logs/startupLogger';
import { MultaController } from './controllers/MultaController';
import { PrismaService } from './controllers/prismaservice';
import { CorridaController } from './controllers/CorridaController';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'asdflakweiorjkasdfjiOPFJASDIORJ209489FNASIDRJ28934RASFKL',
      signOptions: { expiresIn: '1d' },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST_EMAIL_AWS,
        service: 'gmail',
        secure: true,
        port: 25,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_EMAIL_PASSWORD,
        },
        ignoreTLS: false,
      },
    }),
  ],
  controllers: [MultaController, CorridaController],
  providers: [StartupLogger, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
