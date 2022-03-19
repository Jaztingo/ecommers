import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './UserRole';
import * as bcryptor from 'bcrypt';
import * as dotenv from 'dotenv'


@Index('PK_Users', ['id'], { unique: true })
@Entity('Users', { schema: 'dbo' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('varchar', { name: 'UserName', length: 50 })
  userName: string;

  @Column('nvarchar', { name: 'Password', length: 500 })
  password: string;

  @Column('nvarchar', { name: 'FullName', length: 500 })
  fullName: string;

  @Column('datetime', { name: 'CrDate', default: () => 'getdate()' })
  crDate: Date;

  @OneToMany(() => UserRole, (userRoles) => userRoles.user)
  userRoles: UserRole[];

  @BeforeInsert()
  async hashPassword() {
    dotenv.config();
    this.password = await bcryptor.hash(
      this.password,
      +process.env.B_CRYPT_SALT_ROUNDS,
    );
  }
}
