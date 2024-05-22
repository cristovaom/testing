import axios from 'axios';
import https from 'https';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard {
  private introspectionEndpoint =
    'https://18.231.118.196/realms/master/protocol/openid-connect/token/introspect';
  private clientId = 'fleetcontrol';
  private clientSecret = 'cOlfOVNjDaEdI6gbciX4IA1WJ5ztDQ0Y';

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      console.log(`type: ${type}, token: ${token}`);
      console.log(`authHeader: ${authHeader}`);

      throw new UnauthorizedException('Invalid authorization header format');
    }

    const isValid = await this.validateToken(token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid access token');
    }

    return true;
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false, // Ignora erros de certificados autoassinados
      });

      const response = await axios.post(this.introspectionEndpoint, null, {
        auth: {
          username: this.clientId,
          password: this.clientSecret,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: token, // Envie apenas o token, sem "Bearer"
        },
        httpsAgent: agent,
      });

      console.log(`Introspection response: ${JSON.stringify(response.data)}`);

      return response.data.active;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }
}
