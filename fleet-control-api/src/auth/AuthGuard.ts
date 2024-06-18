import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';
import * as https from 'https';

@Injectable()
export class AuthGuard implements CanActivate {
  private introspectionEndpoint = 'https://18.116.25.134:8443/realms/FleetControl/protocol/openid-connect/token/introspect';
  private clientId = 'admin-fleet';
  private clientSecret = '9bvThfmNwVnnzGb1q4SJBkCKI2trBiYI';

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      console.log(`type: ${type}, acctoken: ${token}`);
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

      const data = new URLSearchParams();
      data.append('token', token);
      data.append('client_id', this.clientId);
      data.append('client_secret', this.clientSecret);

      console.log(data)
      const response = await axios.post(this.introspectionEndpoint, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        httpsAgent: agent,
      });
      console.log(response.data)

      console.log(`Introspection response: ${JSON.stringify(response.data)}`);

      return response.data.active;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }
}
