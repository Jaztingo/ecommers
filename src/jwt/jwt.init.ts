import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConstants } from 'src/config/jwt';

export const jwtInit = () => {
  return JwtModule.register({
    secret: process.env.SECRETKEY,
    signOptions: { expiresIn: '1d' },
  });
};
