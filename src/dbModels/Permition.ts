import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolePermition } from "./RolePermition";

@Index("PK_Permitions", ["id"], { unique: true })
@Entity("Permitions", { schema: "dbo" })
export class Permition {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "Code", length: 10 })
  code: string;

  @Column("nvarchar", { name: "Name", length: 50 })
  name: string;

  @OneToMany(() => RolePermition, (rolePermitions) => rolePermitions.permition)
  rolePermitions: RolePermition[];
}
