import { Permition } from "src/dbModels/Permition";

export class UserSessionDto {
  readonly userName: string;
  readonly token: string;
  readonly permitions: Permition[];
}
