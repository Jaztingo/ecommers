import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permition } from 'src/dbModels/Permition';
import { Role } from 'src/dbModels/Role';
import { RolePermition } from 'src/dbModels/RolePermition';
import { User } from 'src/dbModels/User';
import { UserRole } from 'src/dbModels/UserRole';
import { jwtInit } from 'src/jwt/jwt.init';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    jwtInit(),
    TypeOrmModule.forFeature([User, UserRole, Role, RolePermition, Permition]),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
