import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import 'dotenv/config';
import { AuthService } from 'src/services/AuthService';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicLoginStrategy.name);
  constructor(
    private authService: AuthService,
    private mailService: MailerService,
  ) {
    super({
      secret: 'asdflakweiorjkasdfjiOPFJASDIORJ209489FNASIDRJ28934RASFKL',
      jwtOptions: {
        expiresIn: '15m',
      },
      callbackUrl: 'http://localhost:8080/auth/login/callback',
      sendMagicLink: async (destination, href) => {
        await this.mailService.sendMail({
          to: destination,
          from: 'fleetcontrolspeed@gmail.com',
          subject: 'Login mágico!',
          text: `Link de acesso: ${href}  `,
        });
        this.logger.debug(`sending email to ${destination} with link ${href}`);
      },
      verify: async (payload, callback) =>
        callback(null, this.validate(payload)),
    });
  }
  validate(payload: { destination: string }) {
    const user = this.authService.validateUser(payload.destination);

    return user;
  }
}
