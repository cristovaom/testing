import { Module } from '@nestjs/common';
import { UserService } from './services/UserService';
import { AuthService } from './services/AuthService';
import { AuthController } from './controllers/AuthController';
import { MagicLoginStrategy } from './auth/MagicLoginStrategy';
import { UserController } from './controllers/UserController';
import { UserPrismaRepository } from './repositories/prisma/UserPrismaRepository';
import { PrismaService } from './lib/prisma';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { DriverController } from './controllers/DriverController';

import { DriverPrismaRepository } from './repositories/prisma/DriverPrismaRepository';
import { DriverService } from './services/DriverService';
import { VehicleService } from './services/VehicleService';
import { VehiclePrismaRepository } from './repositories/prisma/VehiclePrismaRepository';
import { VehicleController } from './controllers/VehicleController';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '1d',
      },
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
  controllers: [
    AuthController,
    UserController,
    DriverController,
    VehicleController,
  ],
  providers: [
    UserService,
    AuthService,
    MagicLoginStrategy,
    UserPrismaRepository,
    PrismaService,
    DriverService,
    DriverPrismaRepository,
    VehiclePrismaRepository,
    VehicleService,
  ],
})
export class AppModule {}
