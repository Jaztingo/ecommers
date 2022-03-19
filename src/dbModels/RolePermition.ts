import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { Permition } from "./Permition";

@Index("PK_RolePermitions", ["id"], { unique: true })
@Entity("RolePermitions", { schema: "dbo" })
export class RolePermition {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @ManyToOne(() => Role, (roles) => roles.rolePermitions)
  @JoinColumn([{ name: "RoleId", referencedColumnName: "id" }])
  role: Role;

  @ManyToOne(() => Permition, (permitions) => permitions.rolePermitions)
  @JoinColumn([{ name: "PermitionId", referencedColumnName: "id" }])
  permition: Permition;
}
