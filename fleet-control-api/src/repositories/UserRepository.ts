import { Prisma, User } from '@prisma/client';

interface UserResponse {
  name: string;
}

export interface UserRepository {
  findOneByEmail(email: string): Promise<UserResponse | null>;
  createUser(data: Prisma.UserCreateInput): Promise<User | null>;
}
