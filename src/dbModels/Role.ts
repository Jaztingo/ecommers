import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolePermition } from "./RolePermition";
import { UserRole } from "./UserRole";

@Index("PK_Roles", ["id"], { unique: true })
@Entity("Roles", { schema: "dbo" })
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Code", length: 10 })
  code: string;

  @Column("nvarchar", { name: "Name", length: 50 })
  name: string;

  @OneToMany(() => RolePermition, (rolePermition) => rolePermition.role)
  rolePermitions: RolePermition[];

  @OneToMany(() => UserRole, (userRoles) => userRoles.role)
  userRoles: UserRole[];
}
