// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from './UserService';
// import { User } from '@prisma/client';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private userService: UserService,
//     private jwtService: JwtService,
//   ) {}
//   async validateUser(email: string) {
//     const userByEmail = await this.userService.findOneByEmail(email);

//     if (!userByEmail) {
//       throw new UnauthorizedException('Usuario inválido!');
//     }

//     return userByEmail;
//   }

//   generateToken(user: User) {
//     const payload = { sub: user.id, email: user.email, name: user.name };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }
