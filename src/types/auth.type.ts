import { User } from '@prisma/client';

export type LoginUser = Omit<User, 'password'> & { signupRequired: boolean };
