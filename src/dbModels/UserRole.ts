import {
  BaseEntity,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Role } from "./Role";

@Index("PK_UserRoles", ["id"], { unique: true })
@Entity("UserRoles", { schema: "dbo" })
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @ManyToOne(() => User, (users) => users.userRoles)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Role, (roles) => roles.userRoles)
  @JoinColumn([{ name: "RoleId", referencedColumnName: "id" }])
  role: Role;
}
