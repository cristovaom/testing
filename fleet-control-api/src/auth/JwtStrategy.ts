// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from '../services/AuthService';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: 'asdflakweiorjkasdfjiOPFJASDIORJ209489FNASIDRJ28934RASFKL',
//     });
//   }

//   async validate(payload: any) {
//     const user = this.authService.validateUser(payload.email);
//     return user;
//   }
// }
