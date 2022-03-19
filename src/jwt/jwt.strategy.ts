import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from 'src/config/jwt';
import { UserTokenDto } from 'src/modules/user/dto/user.token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETKEY
    });
  }

  async validate(payload: UserTokenDto) {
    const userDataDto: UserTokenDto = {
      id: payload.id,
      username: payload.username,
    };
    return userDataDto;
  }
}
