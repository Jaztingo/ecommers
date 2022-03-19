import { Transform } from 'class-transformer';
import { Matches } from 'class-validator';
import * as bcryptor from 'bcrypt';
import { Match } from 'src/utilites/decorators/match.decorator';

export class UserRegisterDto {
  readonly userName: string;
  readonly password: string;
  @Match('password')
  readonly rePassword: string;
  readonly fullName: string;
}
