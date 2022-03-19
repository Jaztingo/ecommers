import {
  Body,
  Controller,
  Get,
  Param,
  PayloadTooLargeException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthorizeDto } from './dto/user-authorize.dto';
import { UserDataDto } from './dto/user-data.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserTokenDto } from './dto/user.token.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private userService: UserService;
  constructor(_userService: UserService) {
    this.userService = _userService;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAuthedUserData(@Request() req) {
    const userTokenDto: UserTokenDto = req.user;
    const userDataDto: UserDataDto = await this.userService.getUserData(
      userTokenDto.id,
    );
    return userDataDto;
  }

  @Post('authorize')
  async login(@Body() userAuthorizeDto: UserAuthorizeDto) {
    const userSession = this.userService.authorizeUser(
      userAuthorizeDto.userName,
      userAuthorizeDto.password,
    );
    return userSession;
  }

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return await this.userService.registerUser(
      userRegisterDto.userName,
      userRegisterDto.password,
      userRegisterDto.fullName,
    );
  }
}
