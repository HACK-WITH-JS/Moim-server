import { LoginUser } from 'src/types/auth.type';

// req.user의 타입을 확장하기 위함
declare global {
  namespace Express {
    export interface User extends LoginUser {}
  }
}
