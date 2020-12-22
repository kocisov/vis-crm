import {Model} from "..";
import {Project} from "./Project";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  projects?: Array<Project>;
  created_at: string;
}

export class User extends Model {}
