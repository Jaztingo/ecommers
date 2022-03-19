import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/dbModels/User';
import { Repository } from 'typeorm';
import { UserDataDto } from './dto/user-data.dto';
import { UserSessionDto } from './dto/user-session.dto';
import { UserTokenDto } from './dto/user.token.dto';
import * as bcryptor from 'bcrypt';
import { UserRole } from 'src/dbModels/UserRole';
import { Role } from 'src/dbModels/Role';
import { RolePermition } from 'src/dbModels/RolePermition';
import { Permition } from 'src/dbModels/Permition';

@Injectable()
export class UserService {
  private jwtService: JwtService;
  private usersRepository: Repository<User>;
  private userRoleRepository: Repository<UserRole>;
  private roleRepository: Repository<Role>;
  private rolePermitionRepository: Repository<RolePermition>;
  private PermitionRepository: Repository<Permition>;
  constructor(
    _jwtService: JwtService,
    @InjectRepository(User) _usersRepository: Repository<User>,
    @InjectRepository(UserRole) _userRoleRepository: Repository<UserRole>,
    @InjectRepository(Role) _roleRepository: Repository<Role>,
    @InjectRepository(RolePermition)
    _rolePermitionRepository: Repository<RolePermition>,
    @InjectRepository(Permition) _PermitionRepository: Repository<Permition>,
  ) {
    this.jwtService = _jwtService;
    this.usersRepository = _usersRepository;
    this.userRoleRepository = _userRoleRepository;
    this.roleRepository = _roleRepository;
    this.rolePermitionRepository = _rolePermitionRepository;
    this.PermitionRepository = _PermitionRepository;
  }
  async authorizeUser(userName, password): Promise<UserSessionDto> {
    console.log('authorizeUser');
    const user: User = await this.usersRepository.findOne({
      where: {
        userName: userName,
      },
    });
    if (!user || !(await bcryptor.compare(password, user.password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const payLoad: UserTokenDto = { username: user.userName, id: user.id };
    const token = this.jwtService.sign(payLoad);
    const userRoles: UserRole[] = await this.userRoleRepository.find({
      where: { user: user },
      relations: [
        'role',
        'role.rolePermitions',
        'role.rolePermitions.permition',
      ],
    });

    let permitionList: Permition[] = [];

    userRoles.forEach((ur) => {
      ur.role.rolePermitions.forEach((rp) => {
        console.log(permitionList);
        permitionList.push(rp.permition);
      });
    });
    const userSessionDto: UserSessionDto = {
      token: token,
      userName: user.userName,
      permitions: permitionList,
    };
    return userSessionDto;
  }

  async getUserData(id: number): Promise<UserDataDto> {
    const user: User = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException('Incorrectdata');
    }
    const userDataDto: UserDataDto = {
      userName: user.userName,
      fullName: user.fullName,
    };
    return userDataDto;
  }

  async registerUser(userName, password, fullName): Promise<UserSessionDto> {
    console.log('registerUser');
    const user: User = await this.usersRepository.findOne({
      where: { userName: userName },
    });

    if (user) {
      throw new BadRequestException('User allready exists');
    }

    const newUser: User = User.create();
    newUser.fullName = fullName;
    newUser.userName = userName;
    newUser.password = password;
    await this.usersRepository.save(newUser);

    const role: Role = await this.roleRepository.findOne({
      where: { code: 'client' },
    });
    const userRole: UserRole = UserRole.create();
    userRole.role = role;
    userRole.user = newUser;
    await this.userRoleRepository.save(userRole);

    const userSessionDto: UserSessionDto = await this.authorizeUser(
      userName,
      password,
    );

    return userSessionDto;
  }
}
